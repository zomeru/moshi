import React, { useState, useReducer, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';

import * as Location from 'expo-location';

import { useNavigation } from '../utils';

const screenWidth = Dimensions.get('screen').width;

export const LandingScreen = () => {
  const { navigate } = useNavigation();

  const [errorMsg, setErrorMsg] = useState('');
  const [address, setAddress] = useState<Location.LocationGeocodedAddress>();
  const [displayAddress, setDisplayAddress] = useState('');

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
      }

      let location: any = await Location.getCurrentPositionAsync({});

      const { coords } = location;

      if (coords) {
        const { latitude, longitude } = coords;
        let addressResponse: any = await Location.reverseGeocodeAsync({
          latitude,
          longitude,
        });

        for (let item of addressResponse) {
          setAddress(item);
          let currentAddress = `${item.name}, ${item.street}, ${item.postalCode}, ${item.country}`;
          setDisplayAddress(currentAddress);

          if (currentAddress.length > 0) {
            setTimeout(() => {
              navigate('homeStack');
            }, 1000);
          }
          return;
        }
      } else {
        // notify user of error
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.navigation} />

      <View style={styles.body}>
        <Image
          source={require('../images/delivery_icon.png')}
          style={styles.deliveryIcon}
        />

        <View style={styles.addressContainer}>
          <Text style={styles.addressTitle}>Your Delivery Address</Text>
        </View>

        <Text style={styles.addressText}>Waiting for Current Location</Text>
      </View>

      <View style={styles.footer}>
        <Text>Footer</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  navigation: {
    flex: 2,
  },
  body: {
    flex: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deliveryIcon: {
    width: 100,
    height: 100,
  },
  addressContainer: {
    width: screenWidth - 100,
    borderBottomColor: 'red',
    borderBottomWidth: 0.5,
    padding: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  addressTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#7d7d7d',
  },
  addressText: {
    fontSize: 20,
    fontWeight: '200',
    color: '#474747',
  },
  footer: {
    flex: 1,
  },
});
