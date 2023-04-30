import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import AddIngredient from './views/components/IngredientView';
import HomeScreen from './views/screens/HomeScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import QueriesNavigator from './views/navigators/QueriesNavigator';
import IngredientsList from './views/components/IngredientsList';
import {Provider} from 'react-redux';
import store from './store/store';
import {FilterType} from './types/types';
import ExpiringSoonNavigator from './views/navigators/ExpiringSoonNavigator';

const Tab = createBottomTabNavigator();

export default function AppWrapper({navigation}: any) {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

function App() {
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
          options={{
            tabBarLabel: 'Add Ingredient',
            tabBarIcon: ({color, size}) => (
              <Ionicons name="add" size={size} color={color} />
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
          name="Queries"
          component={QueriesNavigator}
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
