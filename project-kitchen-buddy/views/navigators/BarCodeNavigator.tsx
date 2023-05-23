import IngredientsList from '../components/IngredientsList';
import IngredientView from '../components/IngredientView';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { ScannerScreen } from '../screens/ScannerScreen';

const Stack = createNativeStackNavigator();


export default function AddIngredientNavigator ({navigation}:any) :any{
    return (
        <Stack.Navigator>
          <Stack.Screen 
                name="IngredientView"
                component={IngredientView} />
          <Stack.Screen 
                name="Scanner" 
                component={ScannerScreen} />
        </Stack.Navigator>
    );
  };