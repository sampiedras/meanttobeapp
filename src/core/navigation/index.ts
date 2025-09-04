import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNavigationContainerRef } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { RootStackParamList, TabParamList } from "../types/StackRoutes";

export { StackNavigation } from "./StackNavigation";
export const Stack = createStackNavigator<RootStackParamList>();
export const Tab = createBottomTabNavigator<TabParamList>();
export const navigationRef = createNavigationContainerRef<RootStackParamList>();
