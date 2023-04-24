import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SearchScreen from './Hello';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Hello from './Hello';

const Stack = createNativeStackNavigator();

export default function QueriesNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="QueriesHome"
        component={QueriesHomeScreen}
        options={{ title: 'Search Ingredients' }}
      />
      <Stack.Screen
        name="MissingData"
        component={Hello}
        options={{ title: 'Incomplete Ingredients' }}
      />
      <Stack.Screen
        name="RecentlyAdded"
        component={Hello}
        options={{ title: 'Recently Added Ingredients' }}
      />
      <Stack.Screen
        name="SameLocation"
        component={Hello}
        options={{ title: 'Ingredients in the same Location' }}
      />
      <Stack.Screen
        name="SameCategory"
        component={Hello}
        options={{ title: 'Same Category/Confection' }}
      />
    </Stack.Navigator>
  );
}

function QueriesHomeScreen({ navigation }:any) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MissingData')}>
        <Text style={styles.buttonText}>Incomplete Ingredients</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('RecentlyAdded')}>
        <Text style={styles.buttonText}>Recently Added</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SameLocation')}>
        <Text style={styles.buttonText}>Same Location</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SameCategory')}>
        <Text style={styles.buttonText}>Same Category/Confection</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
});
