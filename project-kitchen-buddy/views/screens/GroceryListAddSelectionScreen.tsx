import {FilterType} from '../../types/types';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

export default function GroceryListAddSelectionScreen({navigation}: any) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate('IngredientsList', {
            filter: FilterType.GroceryList,
            title: `Recommended Ingredients`,
          })
        }>
        <Text style={styles.buttonText}>Recommended Ingredients</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate('QuickEntry', {
            title: `Add item to grocery list`,
          })
        }>
        <Text style={styles.buttonText}>Quick entry</Text>
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
