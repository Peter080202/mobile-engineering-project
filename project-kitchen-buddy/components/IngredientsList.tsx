import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import {Ingredient} from '../types/types';
import {LogBox} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  updateSearchPattern,
  useSearchPattern,
} from '../store/searchPatternReducer';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

type IngredientsListProps = {
  filteredIngredients: Ingredient[];
};

export default function IngredientsList({
  filteredIngredients,
}: IngredientsListProps) {
  console.log('HERE RENDERING');
  console.log(filteredIngredients);
  // TODO: CHECK THESE ONES
  const dispatch = useDispatch();

  const openEditMode = (ingredient: Ingredient) => {
    // TODO: OPEN EDIT MODE HERE
    console.log('TODO OPEN EDIT MODE');
  };

  const IngredientComp = ({ingredient}: {ingredient: Ingredient}) => {
    return (
      <View style={[styles.paddedRow]}>
        <Text style={{fontSize: 18}}>{ingredient.ingredientName}</Text>
      </View>
    );
  };

  const ItemDivider = () => {
    return (
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: '#607D8B',
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={{
          flex: 1,
          height: 40,
          width: 100,
          padding: 10,
          margin: 12,
          borderWidth: 1,
        }}
        value={useSelector(useSearchPattern)}
        onChangeText={searchPattern =>
          dispatch(updateSearchPattern(searchPattern))
        }
      />
      <FlatList
        data={filteredIngredients.filter((ingredient: Ingredient) =>
          ingredient.ingredientName.includes(useSelector(useSearchPattern)),
        )}
        keyExtractor={(item, index) => String(index)}
        renderItem={({item}: {item: Ingredient}) => (
          <TouchableOpacity
            key={item.timestamp}
            onPress={() => {
              openEditMode(item);
            }}>
            <IngredientComp ingredient={item} />
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={ItemDivider}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 5,
  },
  item: {
    padding: 10,
    height: 'auto',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginVertical: 5,
    alignSelf: 'stretch',
    paddingBottom: 5,
  },
  text: {
    fontSize: 18,
    padding: 10,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    marginTop: 15,
  },
  customButton: {
    flex: 1.25,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
    backgroundColor: '#edeff2',
  },
  paddedRow: {
    // Task 1: Adjust padding
    padding: 10,
    flexDirection: 'row',
    width: Dimensions.get('window').width,
  },
});
