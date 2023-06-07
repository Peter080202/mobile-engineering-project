import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ShopsNearbyScreen from '../screens/ShopScreen';
import ShopsItemsScreen from '../screens/ShopItemsScreen';

const Stack = createNativeStackNavigator();

const ShopNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ShopsNearby" component={ShopsNearbyScreen} />
      <Stack.Screen name="ShopItems" component={ShopsItemsScreen} />
    </Stack.Navigator>
  );
};

export default ShopNavigator;
