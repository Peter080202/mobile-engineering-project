import { Button, View, Text } from "react-native";

export default function HomeScreen({ navigation }: any) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <Button
        title="Data entry of kitchen ingredients"
        onPress={() => navigation.navigate("AddItem")}
      />
    </View>
  );
}
