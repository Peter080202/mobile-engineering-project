import React from 'react';
import {View, Text, FlatList, StyleSheet, Dimensions} from 'react-native';
import {useSelector} from 'react-redux';
import {GroceryListIngredient} from '../../types/types';
import {useGroceryList} from '../../store/groceryListReducer';

export default function ShopDetailScreen({route}: any) {
  const groceryList = useSelector(useGroceryList);

  const ItemDivider = () => {
    return <View style={{height: 1, backgroundColor: 'gray'}} />;
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
      <FlatList
        data={groceryList.filter(
          (groceryListIngredient: GroceryListIngredient) =>
            !groceryListIngredient.bought &&
            (!groceryListIngredient.category ||
              route.params.shop.type.includes(groceryListIngredient.category)),
        )}
        keyExtractor={(item, index) => String(index)}
        renderItem={({item}) => (
          <View style={styles.paddedRow}>
            <Text style={{fontSize: 16}}>{item.ingredientName}</Text>
          </View>
        )}
        ItemSeparatorComponent={ItemDivider}
      />
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
});
