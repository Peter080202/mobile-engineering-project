import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {FilterType, SelectionType} from '../../types/types';
import {categories, confectionTypes, locations} from '../../services/constants';
import React from 'react';

export default function GroceryList({navigation, route}: any) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate('GroceryListAddSelection', {
            filter: FilterType.Incomplete,
            title: 'Add items to grocery list',
          })
        }>
        <Text style={styles.buttonText}>Add ingredients</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
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
