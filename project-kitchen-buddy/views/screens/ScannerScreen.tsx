import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

export const ScannerScreen = ({ navigation }: any) => {

    const [hasPermission, setHasPermission] = useState<boolean | null>(null);
    const [scanned, setScanned] = useState<boolean>(false);
    const [productData, setProductData] = useState<any>(null);

    useEffect(() => {
        const getBarCodeScannerPermissions = async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        };

        getBarCodeScannerPermissions();
    }, []);

    const handleBarCodeScanned = (data: any) => {
        setScanned(true);
        fetchProductData(data.data);
    };

    const fetchProductData = async (barcode: any) => {
        try {
            const response = await fetch(
                `https://world.openfoodfacts.org/api/v2/product/${barcode}.json`
            );
            const data = await response.json();
            setProductData(data.product);
            handleAddScan(data.product, true)
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
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    const handleAddScan = (product: any, scanStatus: boolean) => {
        if (product !== null) {
            console.log('handling scan')
            const ingredientName = product.product_name;
            const ingredientBrand = product.brands
            navigation.navigate('IngredientView', {
                ingredientName: ingredientName,
                ingredientBrand: ingredientBrand,
                scanStatus: true,
            })
        }
    }


    return (
        <View style={styles.container}>
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
            />
            {scanned && <Button title={'Tap to Scan Again'} onPress={handleScanAgain} />}
        </View>
    );
}

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