import {RootState} from '@/libraries/redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {PayloadAction, createSlice} from '@reduxjs/toolkit';

interface IUserSlice {
  accessToken: string;
  permissionLocation: boolean;
  permissionNotification: boolean;
  permissionLocationLocal: boolean;
  permissionNotificationLocal: boolean;
  permissionAppTrackingTransparencyLocal: boolean;
}

const initialState: IUserSlice = {
  accessToken: '',
  permissionLocation: true,
  permissionNotification: true,
  permissionLocationLocal: false,
  permissionNotificationLocal: false,
  permissionAppTrackingTransparencyLocal: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    setPermissionLocation: (state, action: PayloadAction<boolean>) => {
      state.permissionLocation = action.payload;
    },
    setPermissionNotification: (state, action: PayloadAction<boolean>) => {
      state.permissionNotification = action.payload;
    },
    setPermissionLocationLocal: (state, action) => {
      state.permissionLocationLocal = action.payload;
      saveToAsyncStorage('permissionLocationLocal', action.payload);
    },
    setPermissionNotificationLocal: (state, action) => {
      state.permissionNotificationLocal = action.payload;
      saveToAsyncStorage('permissionNotificationLocal', action.payload);
    },
    setPermissionAppTrackingTransparencyLocal: (state, action) => {
      state.permissionAppTrackingTransparencyLocal = action.payload;
      saveToAsyncStorage(
        'permissionAppTrackingTransparencyLocal',
        action.payload,
      );
    },
    initializePermissions: (state, action) => {
      return action.payload;
    },
  },
});

const saveToAsyncStorage = async (key: string, value: boolean) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    // TODO: handle error
  }
};

export const {
  setAccessToken,
  setPermissionLocation,
  setPermissionNotification,
  setPermissionLocationLocal,
  setPermissionNotificationLocal,
  setPermissionAppTrackingTransparencyLocal,
  initializePermissions,
} = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export const loadPermissionsAsync = () => async (dispatch: any) => {
  try {
    const permissionLocationLocalString = await AsyncStorage.getItem(
      'permissionLocationLocal',
    );
    const permissionNotificationLocalString = await AsyncStorage.getItem(
      'permissionNotificationLocal',
    );
    const permissionAppTrackingTransparencyLocalString =
      await AsyncStorage.getItem('permissionAppTrackingTransparencyLocal');

    const permissionLocationLocal = permissionLocationLocalString
      ? JSON.parse(permissionLocationLocalString)
      : false;
    const permissionNotificationLocal = permissionNotificationLocalString
      ? JSON.parse(permissionNotificationLocalString)
      : false;

    const permissionAppTrackingTransparencyLocal =
      permissionAppTrackingTransparencyLocalString
        ? JSON.parse(permissionAppTrackingTransparencyLocalString)
        : false;

    dispatch(
      initializePermissions({
        permissionLocationLocal,
        permissionNotificationLocal,
        permissionAppTrackingTransparencyLocal,
      }),
    );
  } catch (error) {
    // TODO: handle error
  }
};

export default userSlice.reducer;
