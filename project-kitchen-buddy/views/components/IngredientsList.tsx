import React, {useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import {FilterType, Ingredient} from '../../types/types';
import {LogBox} from 'react-native';
import {useSelector} from 'react-redux';
import {useSearchPattern} from '../../store/searchPatternReducer';
import SearchBar from './SearchBar';
import {useIngredients} from '../../store/ingredientsReducer';
import {
  expiringSoonIngredients,
  incompleteIngredients,
  recentlyAddedIngredients,
} from '../../services/constants';
import {getDifferenceDaysFromNow} from '../../services/commons';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

export default function IngredientsList({navigation, route}: any) {
  const [focusSearchBar, setFocusSearchBar] = useState<boolean>(false);
  const ingredients = useSelector(useIngredients);
  const searchPattern = useSelector(useSearchPattern);

  const filteredIngredients = (): Ingredient[] => {
    switch (route.params.filter) {
      case FilterType.ExpiringSoon:
        return expiringSoonIngredients(ingredients);
      case FilterType.Incomplete:
        return incompleteIngredients(ingredients);
      case FilterType.RecentlyAdded:
        return recentlyAddedIngredients(ingredients);
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
    }
    return [];
  };

  // navigation.addListener('focus', () => {
  //   setIngredients(useSelector(useIngredients));
  // });

  const getIndex = (ingredient: Ingredient) => {
    for (let i = 0; i < ingredients.length; i++) {
      if (ingredients[i].ingredientName === ingredient.ingredientName) {
        return i;
      }
    }
    return -1;
  };

  const openEditMode = (ingredient: Ingredient) => {
    navigation.navigate('EditIngredientView', {
      ingredient: ingredient,
      index: getIndex(ingredient),
    });
    setFocusSearchBar(false);
  };

  const IngredientComp = ({ingredient}: {ingredient: Ingredient}) => {
    return (
      <View style={[styles.paddedRow]}>
        <Text style={styles.text}>{ingredient.ingredientName}</Text>
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
      </View>
    );
  };

  const ItemDivider = () => {
    return <View style={styles.divider} />;
  };

  return (
    <View style={styles.container}>
      <SearchBar
        focusSearchBar={focusSearchBar}
        setFocusSearchBar={setFocusSearchBar}
      />
      <FlatList
        data={filteredIngredients().filter((ingredient: Ingredient) =>
          ingredient.ingredientName.includes(searchPattern),
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
    flex: 1,
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
