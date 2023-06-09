import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {FilterType} from '../../types/types';
import {
  categories,
  confectionTypes,
  locations,
  ripenesses,
} from '../../services/constants';
import React from 'react';

export default function QueriesHomeScreen({navigation}: any): JSX.Element {
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
          navigation.navigate('IngredientsList', {
            filter: FilterType.NeedRipenessCheck,
            title: 'Ripeness check required',
          })
        }>
        <Text style={styles.buttonText}>Ripeness Check required</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate('ButtonMenuScreen', {
            selection: categories,
            title: 'Same Category',
            selectionType: FilterType.Category,
            selectionTitle: 'Category',
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
            selectionType: FilterType.Location,
            selectionTitle: 'Location',
          })
        }>
        <Text style={styles.buttonText}>Same Location</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate('ButtonMenuScreen', {
            selection: ripenesses,
            title: 'Same Ripeness',
            selectionType: FilterType.Ripeness,
            selectionTitle: 'Ripeness',
          })
        }>
        <Text style={styles.buttonText}>Same Ripeness</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate('ButtonMenuScreen', {
            selection: confectionTypes,
            title: 'Same Confection Type',
            selectionType: FilterType.ConfectionType,
            selectionTitle: 'Confection Type',
          })
        }>
        <Text style={styles.buttonText}>Same Confection Type</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate('IngredientsList', {
            filter: FilterType.RecentlyBought,
            title: 'Recently Bought Ingredients',
          })
        }>
        <Text style={styles.buttonText}>Recently Bought</Text>
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
