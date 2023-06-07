import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import * as Location from 'expo-location';

interface Shop {
  name: string;
  latitude: number;
  longitude: number;
  type: string;
}

const ShopScreen = () => {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null,
  );
  const [error, setError] = useState<string | null>(null);
  const [nearbyShops, setNearbyShops] = useState<Shop[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {status} = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setError('Permission to access location was denied.');
          return;
        }

        const location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        const EXAMPLE_SHOPS: Shop[] = [
          {
            name: 'General Store Bolzano',
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            type: 'general',
          },
          {
            name: 'Shop 2',
            latitude: location.coords.latitude,
            longitude: location.coords.longitude - 1,
            type: 'butcher',
          },
          {
            name: 'Shop 3',
            latitude: location.coords.latitude,
            longitude: location.coords.longitude - 1,
            type: 'general',
          },
          {
            name: 'Bolzano Butcher',
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            type: 'butcher',
          },
        ];
        const nearbyShops = EXAMPLE_SHOPS.filter(
          shop => Number(calculateDistance(location.coords, shop)) <= 1.5,
        );
        setNearbyShops(nearbyShops);
      } catch (error) {
        setError('Error retrieving location.');
      }
    };

    fetchData();
  }, []);

  // ...

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

  if (error) {
    return (
      <View>
        <Text>{error}</Text>
      </View>
    );
  }

  if (!location) {
    return (
      <View>
        <Text>Loading location...</Text>
      </View>
    );
  }

  return (
    <View>
      <Text>
        Your location: {location.coords.latitude}, {location.coords.longitude}
      </Text>
      <Text>Nearby shops:</Text>
      {nearbyShops.map(shop => (
        <Text key={shop.name}>{shop.name}</Text>
      ))}
    </View>
  );
};

export default ShopScreen;
