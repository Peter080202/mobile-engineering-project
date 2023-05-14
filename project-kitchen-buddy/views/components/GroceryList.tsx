import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';

import {Ingredient} from '../../types/types';
import {LogBox} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useSearchPattern} from '../../store/searchPatternReducer';
import {
  addToGroceryList,
  removeFromGroceryList,
  useGroceryList,
} from '../../store/groceryListReducer';
import {updateIngredients} from '../../store/ingredientsReducer';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

export default function GroceryList({navigation, route}: any) {
  const dispatch = useDispatch();
  const groceryList = useSelector(useGroceryList);

  const IngredientComp = ({
    ingredient,
    index,
  }: {
    ingredient: Ingredient;
    index: number;
  }) => {
    return (
      <View style={styles.paddedRow}>
        <Text style={styles.text}>{ingredient.ingredientName}</Text>
        <TouchableOpacity
          style={styles.ingredientCompButton}
          onPress={() => dispatch(removeFromGroceryList(index))}>
          <Text>Remove</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.ingredientCompButton}
          onPress={() => console.log('here bought one')}>
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
      {groceryList.length == 0 ? (
        <Text style={[styles.text, {marginTop: 20}]}>
          {' '}
          No ingredients found
        </Text>
      ) : (
        <FlatList
          data={groceryList}
          keyExtractor={(item, index) => String(index)}
          renderItem={({item, index}: {item: Ingredient; index: number}) => (
            <IngredientComp ingredient={item} index={index} />
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
