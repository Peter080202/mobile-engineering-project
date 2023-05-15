import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import IngredientsList from '../components/IngredientsList';
import IngredientView from '../components/IngredientView';
import QueriesHomeScreen from '../screens/QueriesHomeScreen';
import SelectionMenuScreen from '../screens/SelectionMenuScreen';

const Stack = createNativeStackNavigator();

export default function QueriesNavigator({navigation}: any) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="QueriesHome"
        component={QueriesHomeScreen}
        options={{title: 'Search Ingredients'}}
      />
      <Stack.Screen
        name="ButtonMenuScreen"
        component={SelectionMenuScreen}
        options={({route}: any) => ({title: route.params.title})}
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
        options={({route}: any) => ({
          title: route.params.reBought ? 'Re-bought item' : 'Edit Ingredient',
        })}
      />
    </Stack.Navigator>
  );
}
