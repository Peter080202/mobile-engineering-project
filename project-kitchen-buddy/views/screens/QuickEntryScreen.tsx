import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Ingredient} from '../../types/types';
import React, {useState} from 'react';
import {addToGroceryList} from '../../store/groceryListReducer';
import {useDispatch} from 'react-redux';

export default function QuickEntryScreen({navigation}: any) {
  const dispatch = useDispatch();
  const [ingredientName, setIngredientName] = useState<string>('');
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Name: </Text>
      <TextInput
        style={styles.input}
        value={ingredientName}
        onChangeText={itemName => setIngredientName(itemName)}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          if (ingredientName.length === 0) {
            Alert.alert('Please enter an item name!');
          } else {
            const newGroceryListItem: Ingredient = {
              ingredientName: ingredientName,
              timestamp: Date.now(),
            };
            dispatch(addToGroceryList(newGroceryListItem));
            Alert.alert('Saved item successfully!');
            navigation.goBack();
          }
        }}>
        <Text style={styles.buttonText}>Add to grocery list</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
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
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  input: {
    height: 40,
    width: 120,
    padding: 10,
    margin: 12,
    borderWidth: 1,
  },
  text: {
    fontSize: 20,
  },
});
