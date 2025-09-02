import {MatchUserEntity} from '@/api/match/entities/matchEntity';
import {useCreateMatchMutation} from '@/api/match/matchApi';
import {
  useBlockUserAccountMutation,
  useGetIsFirstTimeMatchMutation,
} from '@/api/user/userApi';
import {useAuthProvider} from '@/context/AuthContext';
import {setChannelId, setHiddenItsMatch, setImg} from '@/slices/itsMatchSlice';
import {setHiddenItsMatchTutorial} from '@/slices/itsMatchTutorialSlice';
import {setShowTabBar} from '@/slices/tabBarSlice';
import {useEffect, useRef, useState} from 'react';
import {useDispatch} from 'react-redux';
import {CardItemHandle} from 'rn-tinder-card';
import Geocode from 'react-native-geocoding';
import {API_KEY_GEOCODER_MAP} from '@/utils/config';
import {Alert} from 'react-native';

export const useCardFragment = (item: MatchUserEntity) => {
  // Authentication context hook
  const {user} = useAuthProvider();

  // State variables
  const [avatar, setAvatar] = useState('');
  const [imgUser, setImgUser] = useState<any[]>([]);
  const [address, setAddress] = useState('');
  const [distanceOfUsers, setDistanceOfUsers] = useState(0);
  const dispatch = useDispatch();
  const [blockUser] = useBlockUserAccountMutation();
  const [handleCreateMatch] = useCreateMatchMutation();
  const tinderCardsRef = useRef<Array<CardItemHandle | null>>([]);
  const [handleIsFirstMatch] = useGetIsFirstTimeMatchMutation();

  async function getUserMedias() {
    const imageUrls = [];
    for (const media of item.userMedias || []) {
      const imageUrl = media?.image;
      imageUrls.push({
        url: imageUrl,
        id: media.id,
      });
    }
    setImgUser(imageUrls);
  }

  const fetchAddressOne = async () => {
    const longitude = item?.location?.coordinates[1] ?? 0;
    const latitude = item?.location?.coordinates[0] ?? 0;
    Geocode.init(`${API_KEY_GEOCODER_MAP}`);
    try {
      const response = await Geocode.from({latitude, longitude});
      let city = '';
      let state = '';
      response?.results[0]?.address_components &&
        response?.results[0]?.address_components?.forEach(component => {
          if (component?.types?.includes('locality')) {
            city = component?.long_name;
          } else if (component?.types.includes('administrative_area_level_1')) {
            state = component?.long_name;
          }
        });

      const address = `${city}, ${state}`;
      setAddress(address);
    } catch (error) {}
  };

  // Effect to update user images when userMedias change
  useEffect(() => {
    getUserMedias();
    calculateDistance();
  }, [item.userMedias]);

  useEffect(() => {
    fetchAddressOne();
  }, [item?.location?.coordinates]);

  // Effect to update avatar when item avatar changes
  useEffect(() => {
    async function fetchAsyncData() {
      const signedURL = item?.avatar || '';
      setAvatar(signedURL);
      if (!signedURL) {
        setAvatar(require('../../../assets/image/user_avatar.png'));
      }
    }
    fetchAsyncData();
  }, [item.avatar]);

  // Function to trigger a right swipe on the card at a given index
  const swipeRight = (index: number) => {
    tinderCardsRef.current?.[index]?.swipeRight();
  };

  // Function to trigger a left swipe on the card at a given index
  const swipeLeft = (index: number) => {
    tinderCardsRef.current?.[index]?.swipeLeft();
  };

  // Function to handle scrolling events and show/hide the tab bar
  const handleScroll = (event: any) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    if (scrollY > 0) {
      dispatch(setShowTabBar(true));
    } else {
      dispatch(setShowTabBar(false));
    }
  };

  // Function to create a match with another user
  const createMatch = async (idTwo: number) => {
    const body = {
      user1Id: (user && user.id) || 0,
      user2Id: idTwo || 0,
      tokenGetStream: user?.tokenGetStream || '',
    };

    const result: any = await handleCreateMatch(body);
    if (result.data && result.data.match === true) {
      const imgUserTwo = result.data?.user2?.avatar;
      const channelId = result.data?.channelId;
      dispatch(setHiddenItsMatch(true));
      dispatch(setImg(imgUserTwo));
      dispatch(setChannelId(channelId.toString()));

      const resultIsFirstTime: any = await handleIsFirstMatch({
        idUser: user?.id || 0,
      });
      if (resultIsFirstTime.data?.itsFirstTime) {
        dispatch(setHiddenItsMatchTutorial(true));
      }
    }
  };

  // Calculate person's age based on date of birth
  let personAge;
  if (item && item.person?.date_of_birth) {
    const birthDate = new Date(item.person?.date_of_birth);
    const now = new Date();
    personAge = now.getFullYear() - birthDate.getFullYear();
  }

  // function to calculate the distance between th profiles on the match
  function calculateDistance() {
    const R = 6371;
    const latProfileMatch = item?.location?.coordinates[0] || 0;
    const lonProfileMatch = item?.location?.coordinates[1] || 0;

    const latRootUser = user?.location?.coordinates[0] || 0;
    const lonRootUser = user?.location?.coordinates[1] || 0;

    if (
      latProfileMatch === 0 ||
      lonProfileMatch === 0 ||
      latRootUser === 0 ||
      lonRootUser === 0
    ) {
      setDistanceOfUsers(0);
    } else {
      const dLat = (latRootUser - latProfileMatch) * (Math.PI / 180);
      const dLon = (lonRootUser - lonProfileMatch) * (Math.PI / 180);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(latProfileMatch * (Math.PI / 180)) *
          Math.cos(latRootUser * (Math.PI / 180)) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const d = R * c;
      const roundedDistance = d.toFixed(2);
      setDistanceOfUsers(Number(roundedDistance));
    }
  }

  // Function to handle blocking a user
  const handleBlockUser = async (id: number, index: number) => {
    Alert.alert(
      'Block and Report person',
      'Are you sure you want to report this person?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Yes, report',
          onPress: async () => {
            await blockUser(id);
            swipeLeft(index);
            console.log('Block user', item.id);
          },
          style: 'destructive',
        },
      ],
    );
  };

  // Return an object with the exposed variables and functions
  return {
    distanceOfUsers,
    avatar,
    imgUser,
    tinderCardsRef,
    personAge,
    user,
    address,
    handleBlockUser,
    handleScroll,
    swipeLeft,
    swipeRight,
    createMatch,
  };
};
