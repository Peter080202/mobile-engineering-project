import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ShopsNearbyScreen from '../screens/ShopScreen';
import ShopDetailScreen from '../screens/ShopDetailScreen';

const Stack = createNativeStackNavigator();

const ShopNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Shops Nearby" component={ShopsNearbyScreen} />
      <Stack.Screen
        name="ShopDetail"
        component={ShopDetailScreen}
        options={({route}: any) => ({
          title: route.params.title,
        })}
      />
    </Stack.Navigator>
  );
};

export default ShopNavigator;
