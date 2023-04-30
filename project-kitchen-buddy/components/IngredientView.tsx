import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useState, useRef} from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {getFormattedDate} from '../services/commons';
import {Ingredient} from '../types/types';
import {categories, confectionTypes, locations} from '../services/constants';
import {useDispatch} from 'react-redux';
import {addIngredient, updateIngredients} from '../store/ingredientsReducer';

export default function IngredientView({navigation, route}: any) {
  const dispatch = useDispatch();

  const defaultText = '---';

  const [ingredientName, setIngredientName] = useState<string>(
    route.params !== undefined &&
      route.params.ingredient.ingredientName !== undefined
      ? route.params.ingredient.ingredientName
      : '',
  );

  const [category, setCategory] = useState<string | undefined>(
    route.params !== undefined && route.params.ingredient.category !== undefined
      ? route.params.ingredient.category
      : undefined,
  );
  const categoriesDropdownRef = useRef<SelectDropdown>(null);

  const [location, setLocation] = useState<string | undefined>(
    route.params !== undefined && route.params.ingredient.location !== undefined
      ? route.params.ingredient.location
      : undefined,
  );
  const locationsDropdownRef = useRef<SelectDropdown>(null);

  const [confectionType, setConfectionType] = useState<string | undefined>(
    route.params !== undefined &&
      route.params.ingredient.confectionType !== undefined
      ? route.params.ingredient.confectionType
      : undefined,
  );
  const confectionTypesDropdownRef = useRef<SelectDropdown>(null);

  const [expirationDate, setExpirationDate] = useState<Date | undefined>(
    route.params !== undefined &&
      route.params.ingredient.expirationDate !== undefined
      ? route.params.ingredient.expirationDate
      : undefined,
  );
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const resetForm = () => {
    setIngredientName('');
    setCategory(undefined);
    categoriesDropdownRef.current?.reset();
    setLocation(undefined);
    locationsDropdownRef.current?.reset();
    setConfectionType(undefined);
    confectionTypesDropdownRef.current?.reset();
    setExpirationDate(undefined);
  };

  const addNewItem = () => {
    if (ingredientName.length === 0) {
      Alert.alert('Please enter an item name!');
    } else {
      const newIngredient: Ingredient = {
        ingredientName: ingredientName,
        category: category,
        location: location,
        confectionType: confectionType,
        expirationDate: expirationDate,
        timestamp: Date.now(),
      };
      dispatch(addIngredient(newIngredient));

      resetForm();
      Alert.alert('Saved item successfully!');
    }
  };

  const saveEditedItem = () => {
    if (ingredientName.length === 0) {
      Alert.alert('Please enter an item name!');
    } else {
      const newIngredient: Ingredient = {
        ingredientName: ingredientName,
        category: category,
        location: location,
        confectionType: confectionType,
        expirationDate: expirationDate,
        timestamp: Date.now(),
      };
      dispatch(
        updateIngredients({
          ingredient: newIngredient,
          index: route.params.index,
        }),
      );
      Alert.alert('Edited item successfully!');
      navigation.goBack();
    }
  };

  return (
    <View style={{flex: 1, flexDirection: 'column'}}>
      <View style={styles.header}>
        {route.params !== undefined && route.params.ingredient !== undefined ? (
          <Text style={styles.headerText}>Edit item</Text>
        ) : (
          <Text style={styles.headerText}>Add a new item</Text>
        )}
      </View>
      <View style={styles.rowContainer}>
        <Text style={styles.text}>Item name:</Text>
        <TextInput
          style={styles.input}
          value={ingredientName}
          onChangeText={itemName => setIngredientName(itemName)}
        />
      </View>
      <View style={styles.rowContainer}>
        <Text style={styles.text}>Category:</Text>
        <SelectDropdown
          data={categories}
          ref={categoriesDropdownRef}
          defaultValue={
            route.params !== undefined &&
            route.params.ingredient.category !== undefined
              ? route.params.ingredient.category
              : undefined
          }
          onSelect={(selectedCategory: string) => setCategory(selectedCategory)}
          buttonTextAfterSelection={(selectedCategory: string) =>
            selectedCategory
          }
          rowTextForSelection={(category: string) => category}
          defaultButtonText={defaultText}
        />
      </View>
      <View style={styles.rowContainer}>
        <Text style={styles.text}>Location:</Text>
        <SelectDropdown
          data={locations}
          ref={locationsDropdownRef}
          defaultValue={
            route.params !== undefined &&
            route.params.ingredient.location !== undefined
              ? route.params.ingredient.location
              : undefined
          }
          onSelect={(selectedLocation: string) => setLocation(selectedLocation)}
          buttonTextAfterSelection={(selectedLocation: string) =>
            selectedLocation
          }
          rowTextForSelection={(location: string) => location}
          defaultButtonText={defaultText}
        />
      </View>
      <View style={styles.rowContainer}>
        <Text style={styles.text}>Confection type:</Text>
        <SelectDropdown
          data={confectionTypes}
          ref={confectionTypesDropdownRef}
          defaultValue={
            route.params !== undefined &&
            route.params.ingredient.confectionType !== undefined
              ? route.params.ingredient.confectionType
              : undefined
          }
          onSelect={(selectedConfectionType: string) =>
            setConfectionType(selectedConfectionType)
          }
          buttonTextAfterSelection={(selectedConfectionType: string) =>
            selectedConfectionType
          }
          rowTextForSelection={(confectionType: string) => confectionType}
          defaultButtonText={defaultText}
        />
      </View>
      <View style={styles.rowContainer}>
        <Text style={styles.text}>Expiration date:</Text>
        <TouchableOpacity
          style={styles.customButton}
          onPress={() => setDatePickerVisibility(true)}>
          <Text style={styles.text}>
            {expirationDate ? getFormattedDate(expirationDate) : defaultText}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.space} />
      {route.params !== undefined && route.params.ingredient !== undefined ? (
        <Button title="Save item" onPress={() => saveEditedItem()} />
      ) : (
        <Button title="Save new item" onPress={() => addNewItem()} />
      )}
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        date={expirationDate}
        onConfirm={(expirationDate: Date) => {
          setDatePickerVisibility(false);
          setExpirationDate(expirationDate);
        }}
        onCancel={() => setDatePickerVisibility(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    flex: 1,
    height: 40,
    width: 100,
    padding: 10,
    margin: 12,
    borderWidth: 1,
  },
  rowContainer: {
    flex: 0.1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    marginTop: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  text: {
    flex: 1,
    fontSize: 20,
  },
  button: {
    width: 40,
  },
  space: {
    width: 20,
    height: 10,
  },
  customButton: {
    flex: 1.25,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
    backgroundColor: '#edeff2',
  },
});
