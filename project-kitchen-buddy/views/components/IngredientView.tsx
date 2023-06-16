import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Switch,
  Alert,
  LogBox,
  ScrollView,
  DeviceEventEmitter,
} from 'react-native';
import React, {useState, useRef} from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import DatesPickerModal from 'react-native-modal-datetime-picker';

import {
  getDifferenceDaysFromDateAndTimestamp,
  getFormattedDate,
  getDateSixMonths,
} from '../../services/commons';
import {GroceryListIngredient, Ingredient} from '../../types/types';
import {
  categories,
  confectionTypes,
  locations,
  quantityTypes,
  ripenesses,
} from '../../services/constants';
import {useDispatch, useSelector} from 'react-redux';
import {addIngredient, updateIngredients} from '../../store/ingredientsReducer';
import {
  removeFromGroceryList,
  useGroceryList,
} from '../../store/groceryListReducer';
import Dropdown from './Dropdown';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

export default function IngredientView({navigation, route}: any) {
  const dispatch = useDispatch();
  const groceryList = useSelector(useGroceryList);

  const reBoughtMode =
    route.params !== undefined &&
    route.params.reBought !== undefined &&
    route.params.reBought;

  const editMode = reBoughtMode
    ? false
    : route.params !== undefined && route.params.ingredient !== undefined;

  const defaultText = '---';

  const [ingredientName, setIngredientName] = useState<string>(
    reBoughtMode || editMode ? route.params.ingredient.ingredientName : '',
  );

  const [ingredientBrand, setIngredientBrand] = useState<string | undefined>(
    reBoughtMode || editMode ? route.params.ingredient.ingredientBrand : '',
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

  const [expirationDate, setExpirationDate] = useState<Date | undefined>(
    reBoughtMode && route.params.ingredient.expirationDate !== undefined
      ? new Date(
          route.params.ingredient.expirationDate.getTime() +
            getDifferenceDaysFromDateAndTimestamp(
              route.params.ingredient.expirationDate,
              route.params.ingredient.timestamp,
            ),
        )
      : editMode
      ? route.params.ingredient.expirationDate
      : undefined,
  );

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const [quantity, setQuantity] = useState<string | number | undefined>(
    reBoughtMode || editMode ? route.params.ingredient.quantity : undefined,
  );
  const quantityTypesDropdownRef = useRef<SelectDropdown>(null);

  const [ripeness, setRipeness] = useState<string | undefined>(
    route.params !== undefined &&
      (editMode || reBoughtMode) &&
      route.params.ingredient.ripeness !== undefined
      ? route.params.ingredient.ripeness
      : undefined,
  );
  const ripenessDropdownRef = useRef<SelectDropdown>(null);

  const [openStatus, setOpenStatus] = useState<boolean>(
    editMode ? route.params.ingredient.open : false,
  );

  const [freshAndFrozen, setFreshAndFrozen] = useState<boolean>(false);

  DeviceEventEmitter.addListener('event.successfulScan', (eventData: any) => {
    setIngredientName(eventData.ingredientName);
    setIngredientBrand(eventData.ingredientBrand);
  });

  const resetForm = () => {
    setIngredientName('');
    setIngredientBrand(undefined);
    setCategory(undefined);
    categoriesDropdownRef.current?.reset();
    setLocation(undefined);
    locationsDropdownRef.current?.reset();
    setConfectionType(undefined);
    confectionTypesDropdownRef.current?.reset();
    setExpirationDate(undefined);
    setQuantity(undefined);
    quantityTypesDropdownRef.current?.reset();
    setRipeness(undefined);
    ripenessDropdownRef.current?.reset();
    setOpenStatus(false);
    setFreshAndFrozen(false);
  };

  const addNewItem = () => {
    if (ingredientName.length === 0) {
      Alert.alert('Please enter an item name!');
    } else {
      const newIngredient: Ingredient = {
        timestamp: Date.now(),
        ingredientName: ingredientName,
        ingredientBrand: ingredientBrand,
        category: category,
        location: location,
        confectionType:
          freshAndFrozen && confectionType === 'fresh'
            ? 'frozen'
            : confectionType,
        expirationDate:
          freshAndFrozen && confectionType === 'fresh'
            ? getDateSixMonths(expirationDate)
            : expirationDate,
        quantity: quantity,
        ripeness: ripeness,
        ripenessTimestamp: ripeness !== undefined ? Date.now() : undefined,
        open: openStatus,
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
      const editedIngredient: Ingredient = {
        timestamp: route.params.ingredient.timestamp,
        ingredientName: ingredientName,
        ingredientBrand: ingredientBrand,
        category: category,
        location: location,
        confectionType:
          freshAndFrozen && confectionType === 'fresh'
            ? 'frozen'
            : confectionType,
        expirationDate:
          freshAndFrozen && confectionType === 'fresh'
            ? getDateSixMonths(expirationDate)
            : expirationDate,
        quantity: quantity,
        ripeness: ripeness,
        ripenessTimestamp:
          ripeness !== route.params.ingredient.ripeness
            ? Date.now()
            : route.params.ingredient.ripenessTimestamp,
        open: openStatus,
      };
      dispatch(
        updateIngredients({
          ingredient: editedIngredient,
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
        timestamp: Date.now(),
        ingredientName: ingredientName,
        ingredientBrand: ingredientBrand,
        category: category,
        location: location,
        confectionType:
          freshAndFrozen && confectionType === 'fresh'
            ? 'frozen'
            : confectionType,
        expirationDate:
          freshAndFrozen && confectionType === 'fresh'
            ? getDateSixMonths(expirationDate)
            : expirationDate,
        quantity: quantity,
        ripeness: ripeness,
        ripenessTimestamp: ripeness !== undefined ? Date.now() : undefined,
        open: openStatus,
      };
      dispatch(
        removeFromGroceryList(
          groceryList.findIndex(
            (groceryListIngredient: GroceryListIngredient) =>
              groceryListIngredient === route.params.ingredient,
          ),
        ),
      );
      dispatch(addIngredient(newIngredient));

      Alert.alert('Saved re-bought item successfully!');
      navigation.goBack();
    }
  };

  const handleOpenStatusChange = () => {
    if (!openStatus) {
      Alert.alert(
        'Change Expiration Date',
        'Item is being opened, do you want to change its expiration date?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Accept',
            onPress: () => setDatePickerVisibility(true),
          },
        ],
      );
    }
  };

  const navigateToScanner = () => {
    navigation.navigate('Scanner');
  };

  return (
    <ScrollView style={{margin: 10}}>
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

        {!editMode && !reBoughtMode && (
          <View style={styles.buttonView}>
            <TouchableOpacity style={styles.button} onPress={navigateToScanner}>
              <Text style={styles.buttonText}>Scan Barcode</Text>
            </TouchableOpacity>
          </View>
        )}
        <View style={styles.rowContainer}>
          <Text style={styles.text}>Item name:</Text>
          <TextInput
            style={styles.input}
            value={ingredientName}
            onChangeText={itemName => setIngredientName(itemName)}
          />
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.text}>Brand name:</Text>
          <TextInput
            style={styles.input}
            value={ingredientBrand}
            onChangeText={itemName => setIngredientBrand(itemName)}
          />
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.text}>Category:</Text>
          <Dropdown
            options={categories}
            dropdownRef={categoriesDropdownRef}
            defaultValue={
              reBoughtMode || editMode
                ? route.params.ingredient.category
                : undefined
            }
            setValue={setCategory}
          />
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.text}>Location:</Text>
          <Dropdown
            options={locations}
            dropdownRef={locationsDropdownRef}
            defaultValue={
              reBoughtMode || editMode
                ? route.params.ingredient.location
                : undefined
            }
            setValue={setLocation}
          />
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.text}>Confection type:</Text>
          <Dropdown
            options={confectionTypes}
            dropdownRef={confectionTypesDropdownRef}
            defaultValue={
              reBoughtMode || editMode
                ? route.params.ingredient.confectionType
                : undefined
            }
            setValue={setConfectionType}
          />
        </View>
        {confectionType === 'fresh' && (
          <View style={styles.rowContainer}>
            <Text style={styles.text}>Freeze:</Text>
            <Switch
              value={freshAndFrozen}
              onValueChange={() => {
                setFreshAndFrozen(!freshAndFrozen);
              }}
            />
          </View>
        )}

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
          <Text style={{fontSize: 20, flex: 2}}>Quantity:</Text>
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
          <View style={{flex: 3}}>
            <Dropdown
              options={quantityTypes}
              dropdownRef={quantityTypesDropdownRef}
              defaultValue={
                route.params !== undefined &&
                (editMode || reBoughtMode) &&
                route.params.ingredient.quantity !== undefined &&
                typeof route.params.ingredient.quantity === 'string'
                  ? route.params.ingredient.quantity
                  : undefined
              }
              setValue={setQuantity}
            />
          </View>
        </View>
        {confectionType === 'fresh' && (
          <View style={styles.rowContainer}>
            <Text style={styles.text}>Ripeness:</Text>
            <Dropdown
              options={ripenesses}
              dropdownRef={ripenessDropdownRef}
              defaultValue={
                route.params !== undefined &&
                route.params.ingredient.ripeness !== undefined
                  ? route.params.ingredient.ripeness
                  : undefined
              }
              setValue={setRipeness}
            />
          </View>
        )}
        <View style={styles.rowContainer}>
          <Text style={styles.text}>Open:</Text>
          <Switch
            value={openStatus}
            onValueChange={() => {
              setOpenStatus(!openStatus);
              handleOpenStatusChange();
            }}
          />
        </View>

        <View style={styles.space} />
        <View style={styles.buttonView}>
          {reBoughtMode ? (
            <TouchableOpacity
              style={styles.button}
              onPress={() => saveReBoughtItem()}>
              <Text style={styles.buttonText}>Save re-bought item</Text>
            </TouchableOpacity>
          ) : editMode ? (
            <TouchableOpacity
              style={styles.button}
              onPress={() => saveEditedItem()}>
              <Text style={styles.buttonText}>Save item</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.button}
              onPress={() => addNewItem()}>
              <Text style={styles.buttonText}>Save new item</Text>
            </TouchableOpacity>
          )}
        </View>
        <DatesPickerModal
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
    </ScrollView>
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
    padding: 10,
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
  buttonView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  space: {
    width: 20,
    height: 10,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    width: '80%',
  },
  customButton: {
    height: 40,
    flex: 1.25,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 4,
    backgroundColor: '#edeff2',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
