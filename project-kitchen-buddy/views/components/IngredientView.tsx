import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
  LogBox,
} from 'react-native';
import {useState, useRef} from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {
  getDifferenceDaysFromDateAndTimestamp,
  getFormattedDate,
} from '../../services/commons';
import {Ingredient} from '../../types/types';
import {
  categories,
  confectionTypes,
  locations,
  quantityTypes,
} from '../../services/constants';
import {useDispatch, useSelector} from 'react-redux';
import {addIngredient, updateIngredients} from '../../store/ingredientsReducer';
import {
  removeFromGroceryList,
  useGroceryList,
} from '../../store/groceryListReducer';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

export default function IngredientView({navigation, route}: any) {
  const dispatch = useDispatch();
  const groceryList = useSelector(useGroceryList);

  const reBoughtMode =
    route.params !== undefined &&
    route.params.ingredient.category !== undefined &&
    route.params.reBought !== undefined &&
    route.params.reBought;
  const editMode = reBoughtMode
    ? false
    : route.params !== undefined && route.params.ingredient !== undefined;
  const defaultText = '---';

  const [ingredientName, setIngredientName] = useState<string>(
    reBoughtMode || editMode ? route.params.ingredient.ingredientName : '',
  );

  const [category, setCategory] = useState<string | undefined>(
    reBoughtMode || editMode ? route.params.ingredient.category : undefined,
  );
  const categoriesDropdownRef = useRef<SelectDropdown>(null);

  const [location, setLocation] = useState<string | undefined>(
    reBoughtMode || editMode ? route.params.ingredient.location : undefined,
  );
  const locationsDropdownRef = useRef<SelectDropdown>(null);

  const [confectionType, setConfectionType] = useState<string | undefined>(
    reBoughtMode || editMode
      ? route.params.ingredient.confectionType
      : undefined,
  );
  const confectionTypesDropdownRef = useRef<SelectDropdown>(null);

  const getReBoughtExpirationDateSuggestion = (): Date => {
    const reBoughtExpirationDateSuggestion =
      route.params.ingredient.expirationDate;
    reBoughtExpirationDateSuggestion.setDate(
      reBoughtExpirationDateSuggestion.getDate() +
        getDifferenceDaysFromDateAndTimestamp(
          route.params.ingredient.expirationDate,
          route.params.ingredient.timestamp,
        ),
    );
    return reBoughtExpirationDateSuggestion;
  };

  const [expirationDate, setExpirationDate] = useState<Date | undefined>(
    reBoughtMode
      ? getReBoughtExpirationDateSuggestion()
      : editMode
      ? route.params.ingredient.expirationDate
      : undefined,
  );
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const [quantity, setQuantity] = useState<string | number | undefined>(
    reBoughtMode || editMode ? route.params.ingredient.quantity : undefined,
  );
  const quantityTypesDropdownRef = useRef<SelectDropdown>(null);

  const resetForm = () => {
    setIngredientName('');
    setCategory(undefined);
    categoriesDropdownRef.current?.reset();
    setLocation(undefined);
    locationsDropdownRef.current?.reset();
    setConfectionType(undefined);
    confectionTypesDropdownRef.current?.reset();
    setExpirationDate(undefined);
    setQuantity(undefined);
    quantityTypesDropdownRef.current?.reset();
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
        quantity: quantity,
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
        quantity: quantity,
        timestamp: route.params.ingredient.timestamp,
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

  const saveReBoughtItem = () => {
    if (ingredientName.length === 0) {
      Alert.alert('Please enter an item name!');
    } else {
      const newIngredient: Ingredient = {
        ingredientName: ingredientName,
        category: category,
        location: location,
        confectionType: confectionType,
        expirationDate: expirationDate,
        quantity: quantity,
        timestamp: Date.now(),
      };
      for (let i = 0; i < groceryList.length; i++) {
        if (groceryList[i].timestamp === route.params.ingredient.timestamp) {
          dispatch(removeFromGroceryList(i));
          dispatch(addIngredient(newIngredient));
        }
      }

      Alert.alert('Saved re-bought item successfully!');
      navigation.goBack();
    }
  };

  return (
    <View style={{flex: 1, flexDirection: 'column'}}>
      <View style={styles.header}>
        {reBoughtMode ? (
          <Text style={styles.headerText}>Save re-bought item</Text>
        ) : editMode ? (
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
            reBoughtMode || editMode
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
            reBoughtMode || editMode
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
            reBoughtMode || editMode
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
      <View style={styles.rowContainer}>
        <View style={{flex: 2}}>
          <Text style={styles.text}>Quantity:</Text>
        </View>
        <TextInput
          style={styles.quantityInput}
          value={
            typeof quantity === 'number'
              ? String(quantity)
              : quantity?.replace(/[^0-9]/g, '')
          }
          keyboardType="numeric"
          onChangeText={quantity => {
            quantity = quantity.replace(/[^0-9]/g, '');
            if (quantity.length > 0) {
              setQuantity(Number(quantity));
              quantityTypesDropdownRef.current?.reset();
            } else if (quantity.length == 0) {
              setQuantity(undefined);
            }
          }}
        />
        <View style={{flex: 1}}>
          <SelectDropdown
            buttonStyle={{width: 80}}
            data={quantityTypes}
            ref={quantityTypesDropdownRef}
            defaultValue={
              route.params !== undefined &&
              route.params.ingredient.quantity !== undefined &&
              typeof route.params.ingredient.quantity === 'string'
                ? route.params.ingredient.quantity
                : undefined
            }
            onSelect={(selectedQuantity: string) =>
              setQuantity(selectedQuantity)
            }
            buttonTextAfterSelection={(selectedQuantity: string) =>
              selectedQuantity
            }
            rowTextForSelection={(quantity: string) => quantity}
            defaultButtonText={defaultText}
          />
        </View>
      </View>
      <View style={styles.space} />
      {reBoughtMode ? (
        <Button
          title="Save re-bought item"
          onPress={() => saveReBoughtItem()}
        />
      ) : editMode ? (
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
  quantityInput: {
    flex: 1,
    height: 40,
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
  space: {
    width: 20,
    height: 10,
  },
  customButton: {
    height: 40,
    flex: 1.25,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 4,
    backgroundColor: '#edeff2',
  },
});
