import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddIngredient from "./components/AddIngredient";
import HomeScreen from "./components/HomeScreen";
import Queries from "./components/Queries";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Welcome" }}
        />
        <Stack.Screen
          name="AddItem"
          component={AddIngredient}
          options={{ title: "Add item to ingredients" }}
        />
        <Stack.Screen
          name="Queries"
          component={Queries}
          options={{ title: "Queries" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
