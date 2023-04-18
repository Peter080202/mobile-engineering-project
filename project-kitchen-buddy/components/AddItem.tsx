import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useState, useRef } from "react";
import SelectDropdown from "react-native-select-dropdown";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { getFormattedDate } from "../services/commons";

export default function AddItem({ navigation, route }: any) {
  const defaultText = "---";

  const [itemName, setItemName] = useState<string>("");

  const categories = ["fruit", "vegetable", "dairy", "fish", "meat", "liquid"];
  const [category, setCategory] = useState<string | undefined>(undefined);
  const categoriesDropdownRef = useRef<SelectDropdown>(null);

  const locations = ["fridge", "freezer", "pantry"];
  const [location, setLocation] = useState<string | undefined>(undefined);
  const locationsDropdownRef = useRef<SelectDropdown>(null);

  const confectionTypes = ["fresh", "canned", "frozen", "cured"];
  const [confectionType, setConfectionType] = useState<string | undefined>(
    undefined
  );
  const confectionTypesDropdownRef = useRef<SelectDropdown>(null);

  const [expirationDate, setExpirationDate] = useState<Date | undefined>(
    undefined
  );
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const resetForm = () => {
    setItemName("");
    setCategory(undefined);
    categoriesDropdownRef.current?.reset();
    setLocation(undefined);
    locationsDropdownRef.current?.reset();
    setConfectionType(undefined);
    confectionTypesDropdownRef.current?.reset();
    setExpirationDate(undefined);
  };

  const addNewItem = () => {
    if (itemName.length === 0) {
      Alert.alert("Please enter an item name!");
    } else {
      resetForm();
    }
  };

  return (
    <View style={{ flex: 1, flexDirection: "column" }}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Add a new item</Text>
      </View>
      <View style={styles.rowContainer}>
        <Text style={styles.text}>Item name:</Text>
        <TextInput
          style={styles.input}
          value={itemName}
          onChangeText={(itemName) => setItemName(itemName)}
        />
      </View>
      <View style={styles.rowContainer}>
        <Text style={styles.text}>Category:</Text>
        <SelectDropdown
          data={categories}
          ref={categoriesDropdownRef}
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
          onPress={() => setDatePickerVisibility(true)}
        >
          <Text style={styles.text}>
            {expirationDate ? getFormattedDate(expirationDate) : defaultText}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.space} />
      <Button title="Save new item" onPress={() => addNewItem()} />
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  header: {
    marginTop: 10,
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#2196F3",
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
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 8,
    backgroundColor: "#edeff2",
  },
});
