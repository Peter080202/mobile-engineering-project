import IngredientsList from '../components/IngredientsList';
import IngredientView from '../components/IngredientView';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import GroceryListScreen from '../screens/GroceryListScreen';
import GroceryListAddSelectionScreen from '../screens/GroceryListAddSelectionScreen';
import QuickEntryScreen from '../screens/QuickEntryScreen';

const Stack = createNativeStackNavigator();

export default function GroceryListNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="GroceryList"
        component={GroceryListScreen}
        options={{title: 'Grocery List'}}
      />
      <Stack.Screen
        name="GroceryListAddSelectionScreen"
        component={GroceryListAddSelectionScreen}
        options={{title: 'Add items to Grocery List'}}
      />
      <Stack.Screen
        name="QuickEntry"
        component={QuickEntryScreen}
        options={{title: 'Add item to Grocery List'}}
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
