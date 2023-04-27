import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import IngredientsList from './IngredientsList';
import {
  categories,
  confectionTypes,
  locations,
  incompleteIngredients,
  recentlyAddedIngredients,
} from '../services/constants';
import {Ingredient} from '../types/types';

const Stack = createNativeStackNavigator();

export default function QueriesNavigator({navigation, route}: any) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="QueriesHome"
        component={QueriesHomeScreen}
        initialParams={{
          ingredients: route.params.ingredients,
          setIngredients: route.params.setIngredients,
        }}
        options={{title: 'Search Ingredients'}}
      />
      <Stack.Screen
        name="ButtonMenuScreen"
        component={ButtonMenuScreen}
        initialParams={{
          ingredients: route.params.ingredients,
          setIngredients: route.params.setIngredients,
        }}
        options={({route}: any) => ({title: route.params.title})}
      />
      <Stack.Screen
        name="IngredientsList"
        component={IngredientsList}
        options={({route}: any) => ({title: route.params.title})}
      />
    </Stack.Navigator>
  );
}

enum SelectionType {
  Location = 'Location',
  Confection_type = 'Confection Type',
  Category = 'Category',
}

function ButtonMenuScreen({navigation, route}: any) {
  const getFilteredIngredients = (
    option: string,
    selectionType: SelectionType,
  ): Ingredient[] => {
    switch (selectionType) {
      case SelectionType.Location:
        return route.params.ingredients.filter(
          (ingredient: Ingredient) => ingredient.location === option,
        );
      case SelectionType.Category:
        return route.params.ingredients.filter(
          (ingredient: Ingredient) => ingredient.category === option,
        );
      case SelectionType.Confection_type:
        return route.params.ingredients.filter(
          (ingredient: Ingredient) => ingredient.confectionType === option,
        );
    }
  };

  return (
    <View style={styles.container}>
      {route.params.selection.map((option: string) => (
        <TouchableOpacity
          key={option}
          style={styles.button}
          onPress={() =>
            navigation.navigate('IngredientsList', {
              ingredients: route.params.ingredients,
              setIngredients: route.params.setIngredients,
              filteredIngredients: getFilteredIngredients(
                option,
                route.params.selectionType,
              ),
              title: `${route.params.selectionType} ${option}`,
            })
          }
          disabled={
            getFilteredIngredients(option, route.params.selectionType).length ==
            0
          }>
          <Text style={styles.buttonText}>{option}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

function QueriesHomeScreen({navigation, route}: any) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate('IngredientsList', {
            ingredients: route.params.ingredients,
            setIngredients: route.params.setIngredients,
            filteredIngredients: incompleteIngredients(
              route.params.ingredients,
            ),
            title: 'Incomplete Ingredients',
          })
        }>
        <Text style={styles.buttonText}>Incomplete Ingredients</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate('IngredientsList', {
            ingredients: route.params.ingredients,
            setIngredients: route.params.setIngredients,
            filteredIngredients: recentlyAddedIngredients(
              route.params.ingredients,
            ),
            title: 'Recently Added Ingredients',
          })
        }>
        <Text style={styles.buttonText}>Recently Added</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate('ButtonMenuScreen', {
            selection: locations,
            title: 'Same Location',
            selectionType: SelectionType.Location,
          })
        }>
        <Text style={styles.buttonText}>Same Location</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate('ButtonMenuScreen', {
            selection: categories,
            title: 'Same Category',
            selectionType: SelectionType.Category,
          })
        }>
        <Text style={styles.buttonText}>Same Category</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate('ButtonMenuScreen', {
            selection: confectionTypes,
            title: 'Same Confection Type',
            selectionType: SelectionType.Confection_type,
          })
        }>
        <Text style={styles.buttonText}>Same Confection Type</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    width: '80%',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});
