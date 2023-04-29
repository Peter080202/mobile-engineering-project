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
import {FilterType, Ingredient} from '../types/types';
import {useSelector} from 'react-redux';
import {useIngredients} from '../store/ingredientsReducer';
import IngredientView from './IngredientView';

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
        component={ButtonMenuScreen}
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
        options={{title: 'Edit Ingredient'}}
      />
    </Stack.Navigator>
  );
}

enum SelectionType {
  Category = 'Category',
  Location = 'Location',
  ConfectionType = 'Confection Type',
}

function ButtonMenuScreen({navigation, route}: any) {
  const getFilterType = (selectionType: SelectionType): FilterType => {
    switch (selectionType) {
      case SelectionType.Category:
        return FilterType.Category;
      case SelectionType.Location:
        return FilterType.Location;
      case SelectionType.ConfectionType:
        return FilterType.ConfectionType;
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
              filter: getFilterType(route.params.selectionType),
              filterOption: option,
              title: `${route.params.selectionType}: ${option}`,
            })
          }>
          <Text style={styles.buttonText}>{option}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

function QueriesHomeScreen({navigation, route}: any) {
  const ingredients = useSelector(useIngredients);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate('IngredientsList', {
            filter: FilterType.Incomplete,
            title: 'Incomplete Ingredients',
          })
        }>
        <Text style={styles.buttonText}>Incomplete Ingredients</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate('IngredientsList', {
            filter: FilterType.RecentlyAdded,
            title: 'Recently Added Ingredients',
          })
        }>
        <Text style={styles.buttonText}>Recently Added</Text>
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
            selection: confectionTypes,
            title: 'Same Confection Type',
            selectionType: SelectionType.ConfectionType,
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
