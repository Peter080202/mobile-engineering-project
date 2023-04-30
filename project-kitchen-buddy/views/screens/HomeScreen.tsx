import {Button, View, Text, StyleSheet} from 'react-native';

export default function HomeScreen({navigation}: any) {
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Button
        title="Data entry of kitchen ingredients"
        onPress={() => navigation.navigate('Add Ingredient')}
      />
      <Button
        title="Show queries"
        onPress={() => navigation.navigate('Queries')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
