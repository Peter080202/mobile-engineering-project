import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import QueriesNavigator from './views/navigators/QueriesNavigator';
import {Provider, useDispatch} from 'react-redux';
import store from './store/store';
import ExpiringSoonNavigator from './views/navigators/ExpiringSoonNavigator';
import GroceryListNavigator from './views/navigators/GroceryListNavigator';
import ShopNavigator from './views/navigators/ShopNavigator';
import AddIngredientNavigator from './views/navigators/BarCodeNavigator';
import {getIngredients} from './store/ingredientsReducer';
import {getGroceryList} from './store/groceryListReducer';

const Tab = createBottomTabNavigator();

export default function AppWrapper() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

function App() {
  const dispatch = useDispatch<any>();
  useEffect(() => {
    dispatch(getIngredients());
    dispatch(getGroceryList());
  });
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Add Ingredient"
          component={AddIngredientNavigator}
          options={{
            tabBarLabel: 'Add Ingredient',
            tabBarIcon: ({color, size}) => (
              <Ionicons name="add" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Queries"
          component={QueriesNavigator}
          options={{
            tabBarLabel: 'Queries',
            tabBarIcon: ({color, size}) => (
              <Ionicons name="search" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Expiring Soon"
          component={ExpiringSoonNavigator}
          options={{
            tabBarLabel: 'Expiring Soon',
            tabBarIcon: ({color, size}) => (
              <Ionicons name="time" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Grocery List"
          component={GroceryListNavigator}
          options={{
            tabBarLabel: 'Grocery List',
            tabBarIcon: ({color, size}) => (
              <Ionicons name="cart-outline" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Shops"
          component={ShopNavigator}
          options={{
            tabBarLabel: 'Shops',
            tabBarIcon: ({color, size}) => (
              <Ionicons name="cart" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
