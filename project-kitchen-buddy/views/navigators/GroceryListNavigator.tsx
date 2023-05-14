import IngredientsList from '../components/IngredientsList';
import IngredientView from '../components/IngredientView';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {FilterType} from '../../types/types';
import GroceryList from '../screens/GroceryList';
import GroceryListAddSelection from '../screens/GroceryListAddSelection';

const Stack = createNativeStackNavigator();

export default function GroceryListNavigator({navigation}: any) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="GroceryList"
        component={GroceryList}
        options={{title: 'Expiring Soon Ingredients'}}
      />
      <Stack.Screen
        name="GroceryListAddSelection"
        component={GroceryListAddSelection}
        options={{title: 'Expiring Soon Ingredients'}}
      />
      <Stack.Screen
        name="IngredientsList"
        component={IngredientsList}
        options={({route}: any) => ({
          title: route.params.title,
        })}
      />
      <Stack.Screen
        name="EditIngredientView"
        component={IngredientView}
        options={{title: 'Edit Ingredient'}}
      />
    </Stack.Navigator>
  );
}
