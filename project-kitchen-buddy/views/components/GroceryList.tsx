import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import {GroceryListIngredient} from '../../types/types';
import {LogBox} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  boughtFromGroceryList,
  removeFromGroceryList,
  useGroceryList,
} from '../../store/groceryListReducer';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

export default function GroceryList() {
  const dispatch = useDispatch();
  const groceryList = useSelector(useGroceryList);

  const IngredientComp = ({
    groceryListIngredient,
  }: {
    groceryListIngredient: GroceryListIngredient;
  }) => {
    const index = groceryList.findIndex(
      (groceryListIngredientToBeMatched: GroceryListIngredient) =>
        groceryListIngredientToBeMatched === groceryListIngredient,
    );
    return (
      <View style={styles.paddedRow}>
        <Text style={styles.text}>{groceryListIngredient.ingredientName}</Text>
        <TouchableOpacity
          style={styles.ingredientCompButton}
          onPress={() => dispatch(removeFromGroceryList(index))}>
          <Text>Remove</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.ingredientCompButton}
          onPress={() => dispatch(boughtFromGroceryList(index))}>
          <Text>Bought</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const ItemDivider = () => {
    return <View style={styles.divider} />;
  };

  return (
    <View style={styles.container}>
      {groceryList.filter(
        (groceryListItem: GroceryListIngredient) => !groceryListItem.bought,
      ).length == 0 ? (
        <Text style={[styles.text, {marginTop: 20}]}>
          {' '}
          No ingredients found
        </Text>
      ) : (
        <FlatList
          data={groceryList.filter(
            (groceryListItem: GroceryListIngredient) => !groceryListItem.bought,
          )}
          keyExtractor={(item, index) => String(index)}
          renderItem={({item}: {item: GroceryListIngredient}) => (
            <IngredientComp groceryListIngredient={item} />
          )}
          ItemSeparatorComponent={ItemDivider}
        />
      )}
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
  ingredientCompButton: {
    width: 70,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 5,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 5,
    borderRadius: 5,
    width: '45%',
  },
  text: {
    fontSize: 18,
    flex: 1,
  },
  paddedRow: {
    padding: 10,
    flexDirection: 'row',
    width: Dimensions.get('window').width - 30,
  },
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: '#607D8B',
  },
});
