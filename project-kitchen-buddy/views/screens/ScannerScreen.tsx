import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Button, DeviceEventEmitter} from 'react-native';
import {BarCodeScanner, PermissionResponse} from 'expo-barcode-scanner';

export const ScannerScreen = ({navigation}: any) => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState<boolean>(false);
  const [productData, setProductData] = useState<any>(null);

  useEffect(() => {
    BarCodeScanner.getPermissionsAsync().then(
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
      setProductData(data.product);
      handleAddScan(data.product);
    } catch (error) {
      console.log('Error fetching product data:', error);
    }
  };

  const handleScanAgain = () => {
    setScanned(false);
    setProductData(null);
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
        <Button title={'Tap to Scan Again'} onPress={handleScanAgain} />
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
  productContainer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
  },
});
