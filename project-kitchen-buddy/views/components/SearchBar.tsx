import React from 'react';
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
  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        {/* search Icon */}
        <Feather
          name="search"
          size={20}
          color="black"
          style={{marginLeft: 1}}
        />
        {/* Input field */}
        <TextInput
          style={styles.input}
          placeholder="Search"
          value={useSelector(useSearchPattern)}
          onChangeText={searchPattern =>
            dispatch(updateSearchPattern(searchPattern))
          }
          onFocus={() => {
            setFocusSearchBar(true);
          }}
        />
        {/* cross Icon, depending on whether the search bar is clicked or not */}
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