import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {GroceryListIngredient} from '../../types/types';
import {
  boughtFromGroceryList,
  removeFromGroceryList,
  useGroceryList,
} from '../../store/groceryListReducer';

export default function ShopDetailScreen({route}: any) {
  const dispatch = useDispatch();
  const groceryList = useSelector(useGroceryList);

  const ItemDivider = () => {
    return <View style={{height: 1, backgroundColor: 'gray'}} />;
  };

  const GroceryListComp = ({
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
          style={styles.button}
          onPress={() => dispatch(removeFromGroceryList(index))}>
          <Text>Remove</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => dispatch(boughtFromGroceryList(index))}>
          <Text>Bought</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={{fontSize: 18, fontWeight: 'bold', margin: 10}}>
        Latitude: {route.params.shop.latitude.toFixed(4)}
      </Text>
      <Text style={{fontSize: 18, fontWeight: 'bold', margin: 10}}>
        Longitude: {route.params.shop.longitude.toFixed(4)}
      </Text>
      <Text style={{fontSize: 18, fontWeight: 'bold', margin: 10}}>
        Ingredients to buy
      </Text>
      {groceryList.filter(
        (groceryListIngredient: GroceryListIngredient) =>
          !groceryListIngredient.bought &&
          (!groceryListIngredient.category ||
            route.params.shop.type.includes(groceryListIngredient.category)),
      ).length == 0 ? (
        <Text style={[styles.text, {marginTop: 20}]}>
          {' '}
          No ingredients found
        </Text>
      ) : (
        <FlatList
          data={groceryList.filter(
            (groceryListIngredient: GroceryListIngredient) =>
              !groceryListIngredient.bought &&
              (!groceryListIngredient.category ||
                route.params.shop.type.includes(
                  groceryListIngredient.category,
                )),
          )}
          keyExtractor={(item, index) => String(index)}
          renderItem={({item}) => (
            <GroceryListComp groceryListIngredient={item} />
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
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingBottom: 5,
    backgroundColor: '#fff',
  },
  paddedRow: {
    padding: 10,
    flexDirection: 'row',
    width: Dimensions.get('window').width - 30,
  },
  button: {
    width: 70,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 5,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  text: {
    fontSize: 18,
    flex: 1,
  },
});
