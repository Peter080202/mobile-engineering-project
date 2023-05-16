import IngredientsList from '../components/IngredientsList';
import IngredientView from '../components/IngredientView';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {FilterType} from '../../types/types';

const Stack = createNativeStackNavigator();

export default function RipenessNavigator({navigation}: any) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="IngredientsList"
        component={IngredientsList}
        initialParams={{filter: FilterType.NeedRipenessCheck}}
        options={{title: 'Ripeness check required Ingredients'}}
      />
      <Stack.Screen
        name="EditIngredientView"
        component={IngredientView}
        options={{title: 'Edit Ingredient'}}
      />
    </Stack.Navigator>
  );
}