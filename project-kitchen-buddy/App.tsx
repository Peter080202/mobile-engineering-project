import React, {useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import AddIngredient from './components/AddIngredient';
import HomeScreen from './components/HomeScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import QueriesNavigator from './components/QueriesNavigator';
import IngredientList from './components/IngredientsList';
import {expiringSoonIngredients} from './services/constants';
import {testIngredients} from './types/testdata';
import {Ingredient} from './types/types';

const Tab = createBottomTabNavigator();

export default function App() {
  const [ingredients, setIngredients] = useState<Ingredient[]>(testIngredients);
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
          component={AddIngredient}
          initialParams={{
            ingredients: ingredients,
            setIngredients: setIngredients,
          }}
          options={{
            tabBarLabel: 'Add Ingredient',
            tabBarIcon: ({color, size}) => (
              <Ionicons name="add" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Expiring Soon"
          component={IngredientList}
          initialParams={{ingredients: expiringSoonIngredients(ingredients)}}
          options={{
            tabBarLabel: 'Expiring Soon',
            tabBarIcon: ({color, size}) => (
              <Ionicons name="time" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Queries"
          component={QueriesNavigator}
          initialParams={{
            ingredients: ingredients,
          }}
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
