import {useAuthProvider} from '@/context/AuthContext';
import {RootStackRoutes} from '@/types/stackRoutes';
import {TabsHomeRoutes, TabsHomeScreenProps} from '@/types/tabRoutes';
import {useEffect, useState} from 'react';
import Qonversion, {Product} from 'react-native-qonversion';

export const useActions = ({
  route: {params},
  navigation: {navigate},
}: TabsHomeScreenProps<TabsHomeRoutes.MESSAGES>) => {
  const {user} = useAuthProvider();
  const [searchText, setSearchText] = useState('');
  const [filters, setFilters] = useState<any>({
    members: {
      $in: [user?.id.toString()],
    },
  });
  const [subscriptions, setSubscriptions] = useState<Map<string, Product>>(
    new Map<string, Product>(),
  );
  const [modalPremium, setModalPremium] = useState(false);

  useEffect(() => {
    fetchProductsItems();
  }, []);

  const fetchProductsItems = async () => {
    try {
      const products: Map<string, Product> =
        await Qonversion.getSharedInstance().products();
      if (products?.size > 0) {
        const productsArray = Array.from(products.values());
        productsArray.sort(
          (a, b) =>
            parseFloat(a?.price?.toString() || '0') -
            parseFloat(b.price?.toString() || '0'),
        );
        console.log('11111111111', JSON.stringify(productsArray));
        setSubscriptions(
          new Map(
            productsArray.map(product => [product.qonversionID, product]),
          ),
        );
      }
    } catch (e) {
      // TODO: handle error
      console.log('$$$$$$$$', e)
    }
  };

  useEffect(() => {
    if (params?.channelId) {
      navigateToChannel(params?.channelId);
    }
  }, []);

  useEffect(() => {
    if (searchText) {
      setFilters({
        members: {
          $in: [user?.id.toString(), searchText],
        },
        'member.user.name': {
          $autocomplete: searchText,
        },
      });
    } else {
      setFilters({
        members: {
          $in: [user?.id.toString(), searchText],
        },
      });
    }
  }, [searchText]);

  const navigateToChannel = (id: string | undefined) => {
    navigate(RootStackRoutes.CHAT, {
      channelId: id || '',
    });
  };

  return {
    user,
    filters,
    searchText,
    subscriptions,
    modalPremium,
    setModalPremium,
    setFilters,
    setSearchText,
    navigateToChannel,
  };
};
