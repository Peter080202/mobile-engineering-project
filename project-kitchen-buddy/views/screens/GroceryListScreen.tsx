import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {FilterType} from '../../types/types';
import React from 'react';
import GroceryList from '../components/GroceryList';
import {Colors} from 'react-native/Libraries/NewAppScreen';

export default function GroceryListScreen({navigation}: any) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate('GroceryListAddSelectionScreen', {
            filter: FilterType.Incomplete,
            title: 'Add items to grocery list',
          })
        }>
        <Text style={styles.buttonText}>Add ingredients</Text>
      </TouchableOpacity>
      <GroceryList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 20,
    backgroundColor: Colors.white,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    borderRadius: 5,
    width: '80%',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});
