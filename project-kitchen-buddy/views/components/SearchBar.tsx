import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {Feather, Entypo} from '@expo/vector-icons';

type SearchBarProps = {
  searchPattern: string;
  setSearchPattern: React.Dispatch<React.SetStateAction<string>>;
  focusSearchBar: boolean;
  setFocusSearchBar: React.Dispatch<React.SetStateAction<boolean>>;
};

function SearchBar({
  searchPattern,
  setSearchPattern,
  focusSearchBar,
  setFocusSearchBar,
}: SearchBarProps): JSX.Element {
  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <Feather
          name="search"
          size={20}
          color="black"
          style={{marginLeft: 1}}
        />
        <TextInput
          style={styles.input}
          placeholder="Search"
          value={searchPattern}
          onChangeText={searchPattern => setSearchPattern(searchPattern)}
          onFocus={() => {
            setFocusSearchBar(true);
          }}
        />
        {focusSearchBar && (
          <Entypo
            name="cross"
            size={20}
            color="black"
            style={{padding: 1}}
            onPress={() => setSearchPattern('')}
          />
        )}
      </View>
    </View>
  );
}

export default SearchBar;

// styles
const styles = StyleSheet.create({
  container: {
    margin: 15,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    width: '90%',
  },
  searchBar: {
    padding: 10,
    flexDirection: 'row',
    backgroundColor: '#d9dbda',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  input: {
    fontSize: 20,
    marginLeft: 10,
    width: '90%',
  },
});
