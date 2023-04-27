import React, {useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import SelectDropdown from 'react-native-select-dropdown';
import {getFormattedDate} from '../services/commons';

import {Ingredient} from '../types/types';
import {categories, confectionTypes, locations} from '../services/constants';
import {LogBox} from 'react-native';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

export default function IngredientsList({navigation, route}: any) {
  const [editIngredientIndex, setEditIngredientIndex] = useState<number>();
  const [currentListIndex, setCurrentListIndex] = useState(0);
  const [currentIngredient, setCurrentIngredient] = useState(
    route.params.filteredIngredients[currentListIndex],
  );
  const [onEdit, setOnEdit] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const handleNextIngredient = () => {
    setCurrentListIndex(currentListIndex + 1);
    setCurrentIngredient(
      route.params.filteredIngredients[currentListIndex + 1],
    );
    setOnEdit(false);
  };

  const handlePrevIngredient = () => {
    setCurrentListIndex(currentListIndex - 1);
    setCurrentIngredient(
      route.params.filteredIngredients[currentListIndex - 1],
    );
    setOnEdit(false);
  };

  const handleInputChange = (key: keyof Ingredient, value: string | Date) => {
    // TODO: State change is permanent
    setCurrentIngredient({...currentIngredient, [key]: value});
  };

  const handleSaveIngredient = () => {
    if (editIngredientIndex) {
      route.params.filteredIngredients[currentListIndex] = currentIngredient;
      route.params.ingredients[editIngredientIndex] = currentIngredient;
      route.params.setIngredients(route.params.ingredients);
    }
    setOnEdit(false);
  };

  const getIndexFromCategoriesList = (): number => {
    for (let i = 0; i < route.params.ingredients.length; i++) {
      if (
        route.params.ingredients[i].ingredientName ===
          currentIngredient.ingredientName &&
        route.params.ingredients[i].category === currentIngredient.category &&
        route.params.ingredients[i].location === currentIngredient.location &&
        route.params.ingredients[i].confectionType ===
          currentIngredient.confectionType &&
        route.params.ingredients[i].expirationDate ===
          currentIngredient.expirationDate &&
        route.params.ingredients[i].timestamp === currentIngredient.timestamp
      ) {
        return i;
      }
    }
    return -1;
  };

  const handleEditButton = () => {
    if (!onEdit) {
      setEditIngredientIndex(getIndexFromCategoriesList());
    }
    setOnEdit(!onEdit);
  };

  const renderItem = ({item}: {item: Ingredient}) =>
    onEdit ? (
      <View style={styles.item}>
        <Text style={styles.text}>Ingredient Name:</Text>
        <TextInput
          style={styles.input}
          defaultValue={String(item.ingredientName)}
          onChangeText={value => handleInputChange('ingredientName', value)}
        />
        <Text style={styles.text}>Category:</Text>
        <SelectDropdown
          data={categories}
          onSelect={(selectedCategory: string) =>
            handleInputChange('category', selectedCategory)
          }
          buttonTextAfterSelection={(selectedCategory: string) =>
            selectedCategory
          }
          rowTextForSelection={(category: string) => category}
          defaultButtonText={String(item.category)}
        />
        <Text style={styles.text}>Location:</Text>
        <SelectDropdown
          data={locations}
          onSelect={(selectedLocation: string) =>
            handleInputChange('location', selectedLocation)
          }
          buttonTextAfterSelection={(selectedCategory: string) =>
            selectedCategory
          }
          rowTextForSelection={(location: string) => location}
          defaultButtonText={String(item.location)}
        />
        <Text style={styles.text}>Confection Type:</Text>
        <SelectDropdown
          data={confectionTypes}
          onSelect={(selectedConfectionType: string) =>
            handleInputChange('confectionType', selectedConfectionType)
          }
          buttonTextAfterSelection={(selectedConfectionType: string) =>
            selectedConfectionType
          }
          rowTextForSelection={(confectionType: string) => confectionType}
          defaultButtonText={String(item.confectionType)}
        />
        <Text style={styles.text}>Expiration Date:</Text>

        <TouchableOpacity
          style={styles.customButton}
          onPress={() => setDatePickerVisibility(true)}>
          <Text style={styles.text}>
            {item.expirationDate
              ? getFormattedDate(item.expirationDate)
              : '---'}
          </Text>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          date={item.expirationDate}
          onConfirm={(expirationDate: Date) => {
            setDatePickerVisibility(false);
            handleInputChange('expirationDate', expirationDate);
          }}
          onCancel={() => setDatePickerVisibility(false)}
        />
        <View style={{padding: 20}}>
          <Button title="Save Ingredient" onPress={handleSaveIngredient} />
        </View>
      </View>
    ) : (
      <View style={styles.item}>
        <Text style={styles.text}>Ingredient Name: {item.ingredientName}</Text>
        <Text style={styles.text}>Category: {item.category || '---'}</Text>
        <Text style={styles.text}>Location: {item.location || '---'}</Text>
        <Text style={styles.text}>
          Confection Type: {item.confectionType || '---'}
        </Text>
        <Text style={styles.text}>
          Expiration Date:{' '}
          {item.expirationDate ? getFormattedDate(item.expirationDate) : '---'}
        </Text>
      </View>
    );

  return (
    <View style={styles.container}>
      <FlatList
        data={[currentIngredient]}
        renderItem={renderItem}
        keyExtractor={(_, index) => String(index)}
      />
      <Button title={onEdit ? 'Cancel' : 'Edit'} onPress={handleEditButton} />
      <View style={styles.buttonContainer}>
        <Button
          title="Previous Ingredient"
          onPress={handlePrevIngredient}
          disabled={currentListIndex === 0}
        />
        <Button
          title="Next Ingredient"
          onPress={handleNextIngredient}
          disabled={
            currentListIndex === route.params.filteredIngredients.length - 1
          }
        />
      </View>
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
    padding: 10,
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
});
