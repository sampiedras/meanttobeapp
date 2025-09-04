import { PermissionsAndroid } from "react-native";

export const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "Location App Location Permission",
        message:
          "Location App needs access to your location " +
          "to show the information.",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK",
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can use the ACCESS_FINE_LOCATION");
      return true;
    } else {
      console.log("ACCESS_FINE_LOCATION permission denied");
      return false;
    }
  } catch (err) {
    console.log("Error Permission.ts -> requestLocationPermission", err);
    return false;
  }
};

export const requestLocationCoarsePermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      {
        title: "Location App Location Permission",
        message:
          "Location App needs access to your location " +
          "to show the information.",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK",
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can use the ACCESS_COARSE_LOCATION");
      return true;
    } else {
      console.log("ACCESS_COARSE_LOCATION permission denied");
      return false;
    }
  } catch (err) {
    console.log("Error Permission.ts -> requestLocationCoarsePermission", err);
    return false;
  }
};
