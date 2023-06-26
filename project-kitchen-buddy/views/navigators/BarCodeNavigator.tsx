import IngredientView from '../components/IngredientView';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ScannerScreen} from '../screens/ScannerScreen';

const Stack = createNativeStackNavigator();

export default function AddIngredientNavigator(): JSX.Element {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="IngredientView"
        component={IngredientView}
        options={{title: 'Add Ingredient'}}
      />
      <Stack.Screen name="Scanner" component={ScannerScreen} />
    </Stack.Navigator>
  );
}
