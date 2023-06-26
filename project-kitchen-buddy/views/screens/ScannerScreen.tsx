import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  DeviceEventEmitter,
  TouchableOpacity,
} from 'react-native';
import {BarCodeScanner, PermissionResponse} from 'expo-barcode-scanner';

export const ScannerScreen = ({navigation}: any): JSX.Element => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState<boolean>(false);

  useEffect(() => {
    BarCodeScanner.requestPermissionsAsync().then(
      (permissionResponse: PermissionResponse) => {
        setHasPermission(permissionResponse.status === 'granted');
      },
    );
  }, []);

  const handleBarCodeScanned = async (data: any) => {
    await fetchProductData(data.data);
    setScanned(true);
  };

  const fetchProductData = async (barcode: any) => {
    try {
      const response = await fetch(
        `https://world.openfoodfacts.org/api/v2/product/${barcode}.json`,
      );
      const data = await response.json();
      handleAddScan(data.product);
    } catch (error) {
      console.log('Error fetching product data:', error);
    }
  };

  const handleScanAgain = () => {
    setScanned(false);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (!hasPermission) {
    return <Text>No access to camera</Text>;
  }

  const handleAddScan = (product: any) => {
    if (product !== null) {
      const ingredientName = product.product_name;
      const ingredientBrand = product.brands;
      DeviceEventEmitter.emit('event.successfulScan', {
        ingredientName: ingredientName,
        ingredientBrand: ingredientBrand,
      });
      navigation.navigate('IngredientView');
    }
  };

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <View style={styles.buttonView}>
          <TouchableOpacity style={styles.button} onPress={handleScanAgain}>
            <Text style={styles.buttonText}>Tap to Scan Again</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  buttonView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
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
});
