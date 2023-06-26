import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Linking,
  Platform,
} from 'react-native';
import * as Location from 'expo-location';
import SearchBar from '../components/SearchBar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Shop} from '../../types/types';
import {shops} from '../../types/testdata';
import {useIsFocused} from '@react-navigation/native';

export default function ShopScreen({navigation}: any): JSX.Element {
  const isFocused = useIsFocused();
  const [searchPattern, setSearchPattern] = useState<string>('');
  const [focusSearchBar, setFocusSearchBar] = useState<boolean>(false);
  const [location, setLocation] = useState<Location.LocationObject | undefined>(
    undefined,
  );
  const [error, setError] = useState<string | null>(null);
  const [nearbyShops, setNearbyShops] = useState<Shop[]>([]);

  useEffect(() => {
    const fetchCurrentPosition = async () => {
      try {
        const {status} = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setError('Permission to access location was denied.');
          return;
        }

        const location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        // Showing shops within a range of 15 km
        setNearbyShops(
          shops
            .filter(
              shop => Number(calculateDistance(location.coords, shop)) <= 15,
            )
            .sort(
              (a: Shop, b: Shop) =>
                Number(calculateDistance(location.coords, a)) -
                Number(calculateDistance(location.coords, b)),
            ),
        );
      } catch (error) {
        setError('Error retrieving location.');
      }
    };

    if (isFocused) {
      fetchCurrentPosition();
    }
  }, [isFocused]);

  const calculateDistance = (
    coords1: Location.LocationObjectCoords,
    coords2: Shop,
  ) => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = toRad(coords2.latitude - coords1.latitude);
    const dLon = toRad(coords2.longitude - coords1.longitude);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(coords1.latitude)) *
        Math.cos(toRad(coords2.latitude)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance.toFixed(2); // Return distance as a string
  };
  const toRad = (angle: number) => (angle * Math.PI) / 180;

  const StoreComp = ({store}: {store: Shop}) => {
    return (
      <View style={styles.paddedRow}>
        <Text style={styles.text}>{store.name}</Text>
        <TouchableOpacity
          style={styles.navigationButton}
          onPress={() => {
            const scheme = Platform.select({
              ios: 'maps://0,0?q=',
              android: 'geo:0,0?q=',
            });
            const latLng = `${store.latitude},${store.longitude}`;
            const url = Platform.select({
              ios: `${scheme}${store.name}@${latLng}`,
              android: `${scheme}${latLng}(${store.name})`,
            });
            if (url !== undefined) {
              Linking.openURL(url);
            }
          }}>
          <Ionicons name="navigate" size={20} color={Colors.black} />
        </TouchableOpacity>
      </View>
    );
  };

  const ItemDivider = () => {
    return <View style={styles.divider} />;
  };

  return error && location === undefined ? (
    <View style={styles.container}>
      <Text style={styles.text}>
        {error}
        {'\n\n'}Please enter into your settings and allow location permission!
      </Text>
    </View>
  ) : location === undefined ? (
    <View style={styles.container}>
      <Text style={styles.loadingText}>Loading location...</Text>
    </View>
  ) : (
    <View style={styles.container}>
      {nearbyShops.length == 0 ? (
        <Text
          style={[
            styles.text,
            {
              margin: 15,
            },
          ]}>
          No shops found
        </Text>
      ) : (
        <>
          <SearchBar
            searchPattern={searchPattern}
            setSearchPattern={setSearchPattern}
            focusSearchBar={focusSearchBar}
            setFocusSearchBar={setFocusSearchBar}
          />
          <Text style={{fontSize: 18, paddingBottom: 20}}>
            Showing all shops within a range of 15km:
          </Text>
          <FlatList
            data={nearbyShops.filter((store: Shop) =>
              store.name.includes(searchPattern),
            )}
            keyExtractor={(item, index) => String(index)}
            renderItem={({item}: {item: Shop}) => (
              <TouchableOpacity
                key={item.name}
                onPress={() => {
                  navigation.navigate('ShopDetail', {
                    shop: item,
                    title: `${item.name}`,
                  });
                }}>
                <StoreComp store={item} />
              </TouchableOpacity>
            )}
            ItemSeparatorComponent={ItemDivider}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingBottom: 5,
    backgroundColor: '#fff',
  },
  loadingText: {
    fontSize: 24,
  },
  paddedRow: {
    padding: 10,
    flexDirection: 'row',
    width: Dimensions.get('window').width - 30,
  },
  text: {
    fontSize: 18,
    flex: 1,
  },
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: '#607D8B',
  },
  navigationButton: {
    width: 32,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 5,
    marginHorizontal: 5,
    borderRadius: 5,
  },
});
