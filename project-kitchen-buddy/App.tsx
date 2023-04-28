import React, {useEffect, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import AddIngredient from './components/AddIngredient';
import HomeScreen from './components/HomeScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import QueriesNavigator from './components/QueriesNavigator';
import IngredientsList from './components/IngredientsList';
import {expiringSoonIngredients} from './services/constants';
import {Ingredient} from './types/types';
import {Provider, useSelector} from 'react-redux';
import store from './store/store';
import {useIngredients} from './store/ingredientsReducer';
import {testIngredients} from './types/testdata';

const Tab = createBottomTabNavigator();

export default function AppWrapper({navigation}: any) {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

function App({navigation}: any) {
  const ingredients = useSelector(useIngredients);
  const [expiringSoonIngredientsList, setExpiringSoonIngredientsList] =
    useState<Ingredient[]>(expiringSoonIngredients(ingredients));

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({color, size}) => (
              <Ionicons name="home" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Add Ingredient"
          children={() => <AddIngredient />}
          options={{
            tabBarLabel: 'Add Ingredient',
            tabBarIcon: ({color, size}) => (
              <Ionicons name="add" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Expiring Soon"
          children={() => (
            <IngredientsList
              filteredIngredients={expiringSoonIngredientsList}
            />
          )}
          options={{
            tabBarLabel: 'Expiring Soon',
            tabBarIcon: ({color, size}) => (
              <Ionicons name="time" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Queries"
          children={() => <QueriesNavigator navigation={navigation} />}
          options={{
            tabBarLabel: 'Query Ingredients',
            tabBarIcon: ({color, size}) => (
              <Ionicons name="search" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
