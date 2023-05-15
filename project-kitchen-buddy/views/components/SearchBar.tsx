import React, {useEffect, useState} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {Feather, Entypo} from '@expo/vector-icons';
import {useDispatch, useSelector} from 'react-redux';
import {
  updateSearchPattern,
  useSearchPattern,
} from '../../store/searchPatternReducer';

type SearchBarProps = {
  focusSearchBar: boolean;
  setFocusSearchBar: any;
};

function SearchBar({focusSearchBar, setFocusSearchBar}: SearchBarProps) {
  const dispatch = useDispatch();
  const [searchPattern, setSearchPattern] = useState<string>();
  useEffect(() => {
    dispatch(updateSearchPattern(searchPattern));
  }, [searchPattern]);
  console.log('first render');
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
            onPress={() => {
              dispatch(updateSearchPattern(''));
            }}
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
