import React, {useEffect, useMemo, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import AddIngredient from './components/AddIngredient';
import HomeScreen from './components/HomeScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import QueriesNavigator from './components/QueriesNavigator';
import IngredientsList from './components/IngredientsList';
import {expiringSoonIngredients} from './services/constants';
import {testIngredients} from './types/testdata';
import {Ingredient} from './types/types';
import {Provider} from 'react-redux';
import store from './store/store';

const Tab = createBottomTabNavigator();

export default function App({navigation}: any) {
  const [ingredients, setIngredients] = useState<Ingredient[]>(testIngredients);
  const [expiringSoonIngredientsList, setExpiringSoonIngredientsList] =
    useState<Ingredient[]>(expiringSoonIngredients(ingredients));

  const [stateChanged, setStateChanged] = useState<boolean>(false);

  useEffect(() => {
    setExpiringSoonIngredientsList(expiringSoonIngredients(ingredients));
    setStateChanged(false);
  }, [stateChanged]);

  return (
    <Provider store={store}>
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
            children={() => (
              <AddIngredient
                ingredients={ingredients}
                setIngredients={setIngredients}
                setStateChanged={setStateChanged}
              />
            )}
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
                navigation={navigation}
                ingredients={ingredients}
                setIngredients={setIngredients}
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
            children={() => (
              <QueriesNavigator
                navigation={navigation}
                ingredients={ingredients}
                setIngredients={setIngredients}
              />
            )}
            options={{
              tabBarLabel: 'Query Ingredients',
              tabBarIcon: ({color, size}) => (
                <Ionicons name="search" size={size} color={color} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
