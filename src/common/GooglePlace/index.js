import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  Modal,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  PermissionsAndroid,
  Platform,
  Text,
  ScrollView,
} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Geolocation from '@react-native-community/geolocation';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {ms} from 'react-native-size-matters';
import { Colors } from '../../theme';

const GooglePlacesPopup = ({
  placeholder = 'Search',
  placeholderTextColor = '#999',
  onPlaceSelected,
  value = '',
  visible,
  onClose,
  expIndex,
}) => {
  const ref = useRef();
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
    if (ref.current?.setAddressText && value) {
      ref.current.setAddressText(value);
    }
  }, [value]);

  useEffect(() => {
    if (visible) {
      requestLocationPermission();
    }
  }, [visible]);

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'This app needs access to your location.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        console.warn('Location permission denied');
      }
    }
  };

  const handlePlaceSelect = (data, details) => {
    const locationName = data?.description;
    const lat = details?.geometry?.location?.lat;
    const lng = details?.geometry?.location?.lng;

    setInputValue(locationName);

    if (onPlaceSelected && lat && lng) {
      onPlaceSelected(expIndex, {
        name: locationName,
        latitude: lat,
        longitude: lng,
      });
    }

    onClose?.();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
        <View style={styles.modalDropDownStyle}>
          <TouchableOpacity
            onPress={onClose}
            style={{alignSelf: 'flex-end', marginBottom: 10, marginRight: 20}}>
            <AntDesign name="closecircleo" color="#000" size={22} />
          </TouchableOpacity>

          {/* <GooglePlacesAutocomplete
            ref={ref}
            placeholder={placeholder}
            fetchDetails={true}
            // onPress={handlePlaceSelect}
            onPress={(data, details = null) => {
              console.log(data, details);
            }}
            query={{
              key: 'AIzaSyBhYoprbLYQdKzaQVAMj-4rr84DpTj7Uv0',
              language: 'en',
              types: 'geocode',
            }}
            textInputProps={{
              value: inputValue,
              onChangeText: setInputValue,
              placeholderTextColor: placeholderTextColor,
            }}
            styles={{
              textInput: styles.textInput,
              container: styles.autoCompleteContainer,
            }}
            enablePoweredByContainer={false}
            nearbyPlacesAPI="GooglePlacesSearch"
            debounce={300}
            currentLocation={true}
            currentLocationLabel="Use Current Location"
          /> */}
          <ScrollView keyboardShouldPersistTaps="always">
            <GooglePlacesAutocomplete
              placeholder="Search location"
              fetchDetails={true}
              onFail={err => console.error('Places error', err)}
              onPress={(data, details = null) => {
                console.log('DATA:', data);
                console.log('DETAILS:', details);
                if (!details?.geometry?.location) {
                  console.warn('No location details');
                  return;
                }
                const {lat, lng} = details.geometry.location;
                onPlaceSelected(expIndex, {
                  name: data.description,
                  latitude: lat,
                  longitude: lng,
                });
                onClose();
              }}
              query={{
                key: 'AIzaSyBhYoprbLYQdKzaQVAMj-4rr84DpTj7Uv0',
                language: 'en',
              }}
              enablePoweredByContainer={false}
              textInputProps={{
                value: inputValue,
                onChangeText: setInputValue,
                placeholderTextColor: placeholderTextColor,
              }}
              listViewDisplayed={false}
              keepResultsAfterBlur={true}
              GooglePlacesDetailsQuery={{fields: 'formatted_address,geometry'}}
              currentLocation={true}
              currentLocationLabel="Current location"
              nearbyPlacesAPI="GooglePlacesSearch"
              debounce={300}
              styles={{
                textInput: styles.textInput,
                container: styles.autoCompleteContainer,
                container: {flex: 0},
                textInput: {
                  backgroundColor:Colors.Whiite_DC,
                  color: '#222', // 👈 Set text color for dark mode
                  borderRadius: 5,
                  paddingHorizontal: 10,
                },
                description: {
                  color: '#222', // 👈 dropdown item text color
                },
              }}
            />
          </ScrollView>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalDropDownStyle: {
    flex: 1,
    padding: ms(20),
    backgroundColor: '#fff',
  },
  autoCompleteContainer: {
    flex: 0,
  },
  textInput: {
    backgroundColor: '#f1f1f1',
    fontSize: 14,
    height: 50,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
  },
});

export default GooglePlacesPopup;
