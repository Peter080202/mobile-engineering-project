import React from 'react';
import {View, Text, FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import {Ingredient} from '../../types/types';
import {useIngredients} from '../../store/ingredientsReducer';

export default function ShopItemsScreen({route}: any) {
  const ingredients = useSelector(useIngredients);

  const shopIngredients = ingredients.filter(
    (ingredient: Ingredient) => ingredient.shop === route.params.shop,
  );

  const ItemDivider = () => {
    return <View style={{height: 1, backgroundColor: 'gray'}} />;
  };

  return (
    <View style={{flex: 1}}>
      <Text style={{fontSize: 20, fontWeight: 'bold', margin: 10}}>
        {route.params.shop}
      </Text>
      <FlatList
        data={shopIngredients}
        keyExtractor={(item, index) => String(index)}
        renderItem={({item}) => (
          <View style={{padding: 10}}>
            <Text style={{fontSize: 16}}>{item.ingredientName}</Text>
          </View>
        )}
        ItemSeparatorComponent={ItemDivider}
      />
    </View>
  );
}
