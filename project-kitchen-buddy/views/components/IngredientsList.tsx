import React, {useEffect, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import {FilterType, GroceryListIngredient, Ingredient} from '../../types/types';
import {LogBox} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  updateSearchPattern,
  useSearchPattern,
} from '../../store/searchPatternReducer';
import SearchBar from './SearchBar';
import {useIngredients} from '../../store/ingredientsReducer';
import {
  expiringSoonIngredients,
  groceryListIngredients,
  incompleteIngredients,
  needRipenessCheckIngredients,
  recentlyAddedIngredients,
} from '../../services/constants';
import {getDiffFromPastTimestamp, getDifferenceDaysFromNow} from '../../services/commons';
import {addToGroceryList, useGroceryList} from '../../store/groceryListReducer';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

export default function IngredientsList({navigation, route}: any) {
  const dispatch = useDispatch();
  const [focusSearchBar, setFocusSearchBar] = useState<boolean>(false);
  const ingredients = useSelector(useIngredients);
  const groceryList = useSelector(useGroceryList);
  const searchPattern = useSelector(useSearchPattern);

  useEffect(() => {
    // Reset search pattern on every mount
    dispatch(updateSearchPattern(''));
  }, []);

  const filteredIngredients = (): Ingredient[] | GroceryListIngredient[] => {
    switch (route.params.filter) {
      case FilterType.NeedRipenessCheck:
        return needRipenessCheckIngredients(ingredients);
      case FilterType.ExpiringSoon:
        return expiringSoonIngredients(ingredients);
      case FilterType.Incomplete:
        return incompleteIngredients(ingredients);
      case FilterType.RecentlyAdded:
        return recentlyAddedIngredients(ingredients);
      case FilterType.GroceryList:
        const timestamps: number[] = groceryList.map(
          (groceryListItem: GroceryListIngredient) => groceryListItem.timestamp,
        );
        return groceryListIngredients(ingredients).filter(
          (ingredient: Ingredient) =>
            !timestamps.includes(ingredient.timestamp),
        );
      case FilterType.RecentlyBought:
        return groceryList.filter(
          (groceryListItem: GroceryListIngredient) => groceryListItem.bought,
        );
      case FilterType.Category:
        return ingredients.filter(
          (ingredient: Ingredient) =>
            ingredient.category === route.params.filterOption,
        );
      case FilterType.Location:
        return ingredients.filter(
          (ingredient: Ingredient) =>
            ingredient.location === route.params.filterOption,
        );
      case FilterType.ConfectionType:
        return ingredients.filter(
          (ingredient: Ingredient) =>
            ingredient.confectionType === route.params.filterOption,
        );
      case FilterType.Ripeness:
        return ingredients.filter(
          (ingredient: Ingredient) =>
            ingredient.ripeness === route.params.filterOption,
        );
    }
    return [];
  };

  const getIndex = (ingredient: Ingredient) => {
    for (let i = 0; i < ingredients.length; i++) {
      if (ingredients[i].ingredientName === ingredient.ingredientName) {
        return i;
      }
    }
    return -1;
  };

  const openEditMode = (ingredient: Ingredient, reBought: boolean) => {
    navigation.navigate('EditIngredientView', {
      ingredient: ingredient,
      index: getIndex(ingredient),
      reBought: reBought,
    });
    setFocusSearchBar(false);
  };

  const IngredientComp = ({ingredient}: {ingredient: Ingredient}) => {
    return (
      <View style={styles.paddedRow}>
        <Text style={styles.text}>{ingredient.ingredientName}</Text>

        {route.params.filter === FilterType.NeedRipenessCheck ? (
            <Text style={styles.text}>
            {Math.round(getDiffFromPastTimestamp(ingredient.ripenessTimestamp))}{' '} days ago
          </Text>
          ) : (
            ""
          )}

        {route.params.filter === FilterType.ExpiringSoon &&
          ingredient.expirationDate &&
          (Math.round(getDifferenceDaysFromNow(ingredient.expirationDate)) <=
          0 ? (
            <Text
              style={[
                styles.text,
                {
                  color: 'red',
                },
              ]}>
              Expired
            </Text>
          ) : (
            <Text style={styles.text}>
              {Math.round(getDifferenceDaysFromNow(ingredient.expirationDate))}{' '}
              {Math.round(
                getDifferenceDaysFromNow(ingredient.expirationDate),
              ) === 1
                ? 'day'
                : 'days'}
            </Text>
          ))}
        {route.params.filter === FilterType.GroceryList &&
          ingredient.quantity && (
            <TouchableOpacity
              style={styles.button}
              onPress={() => dispatch(addToGroceryList(ingredient))}>
              <Text>Add to grocery list</Text>
            </TouchableOpacity>
          )}
      </View>
    );
  };

  const ItemDivider = () => {
    return <View style={styles.divider} />;
  };

  return (
    <View style={styles.container}>
      
      {filteredIngredients().length == 0 ? (
        <Text
          style={[
            styles.text,
            {
              margin: 15,
            },
          ]}>
          No ingredients found
        </Text>
      ) : (
        <>
          <SearchBar
            focusSearchBar={focusSearchBar}
            setFocusSearchBar={setFocusSearchBar}
          />
          {route.params.filter === FilterType.NeedRipenessCheck ? (
            <Text style={{fontSize: 18}}>
            Last checked: 
          </Text>
          ) : (
            ""
          )}
          <FlatList
            data={filteredIngredients().filter((ingredient: Ingredient) =>
              ingredient.ingredientName.includes(searchPattern),
            )}
            keyExtractor={(item, index) => String(index)}
            renderItem={({
              item,
            }: {
              item: Ingredient | GroceryListIngredient;
            }) => (
              <TouchableOpacity
                key={item.timestamp}
                onPress={() => {
                  openEditMode(item, 'bought' in item);
                }}>
                <IngredientComp ingredient={item} />
              </TouchableOpacity>
            )}
            ItemSeparatorComponent={ItemDivider}
          />
        </>
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
    width: Dimensions.get('window').width,
  },
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: '#607D8B',
  },
});
