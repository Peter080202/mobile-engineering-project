import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Platform,
  Alert,
} from "react-native";
import { useState } from "react";
import SelectDropdown from "react-native-select-dropdown";
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function AddItem({ navigation, route }: any) {
  const [itemName, setItemName] = useState<string>("");

  const categories = ["fruit", "vegetable", "dairy", "fish", "meat", "liquid"];
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    undefined
  );

  const locations = ["fridge", "freezer", "pantry"];
  const [selectedLocation, setSelectedLocation] = useState<string | undefined>(
    undefined
  );
  const confectionTypes = ["fresh", "canned", "frozen", "cured"];
  const [selectedConfectionType, setSelectedConfectionType] = useState<
    string | undefined
  >(undefined);

  const [expirationDate, setExpirationDate] = useState<Date | undefined>(
    undefined
  );
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const addNewItem = () => {
    console.log(itemName);
    console.log(selectedCategory);
    console.log(selectedLocation);
    console.log(selectedConfectionType);
    console.log(expirationDate);
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Add a new item</Text>
      <Text>Name:</Text>
      <TextInput
        style={styles.input}
        value={itemName}
        onChangeText={(itemName) => setItemName(itemName)}
      />
      <SelectDropdown
        data={categories}
        onSelect={(selectedCategory: string) =>
          setSelectedCategory(selectedCategory)
        }
        buttonTextAfterSelection={(selectedCategory: string) =>
          selectedCategory
        }
        rowTextForSelection={(category: string) => category}
        defaultButtonText="Select a category"
      />
      <SelectDropdown
        data={locations}
        onSelect={(selectedLocation: string) =>
          setSelectedLocation(selectedLocation)
        }
        buttonTextAfterSelection={(selectedLocation: string) =>
          selectedLocation
        }
        rowTextForSelection={(location: string) => location}
        defaultButtonText="Select a location"
      />
      <SelectDropdown
        data={confectionTypes}
        onSelect={(selectedConfectionType: string) =>
          setSelectedConfectionType(selectedConfectionType)
        }
        buttonTextAfterSelection={(selectedConfectionType: string) =>
          selectedConfectionType
        }
        rowTextForSelection={(confectionType: string) => confectionType}
        defaultButtonText="Select a confection type"
      />
      <Button
        title="Select expiration date"
        onPress={() => setDatePickerVisibility(true)}
      />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        date={expirationDate}
        onConfirm={(expirationDate: Date) => {
          setExpirationDate(expirationDate);
          setDatePickerVisibility(false);
        }}
        onCancel={() => setDatePickerVisibility(false)}
      />
      <Button title="Save new item" onPress={() => addNewItem()} />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: 100,
    padding: 10,
    margin: 12,
    borderWidth: 1,
  },
});
