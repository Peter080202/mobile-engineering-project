import {FilterType, SelectionType} from '../../types/types';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

export default function SelectionMenuScreen({navigation, route}: any) {
  const getFilterType = (selectionType: SelectionType): FilterType => {
    switch (selectionType) {
      case SelectionType.Category:
        return FilterType.Category;
      case SelectionType.Location:
        return FilterType.Location;
      case SelectionType.ConfectionType:
        return FilterType.ConfectionType;
      case SelectionType.Ripeness:
        return FilterType.Ripeness;
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
