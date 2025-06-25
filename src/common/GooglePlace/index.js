import React, {useRef, useState, useEffect} from 'react';
import {
  TextInput,
  View,
  Modal,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {ms, ScaledSheet} from 'react-native-size-matters';
import {Colors, Fonts} from '../../theme';
import {SafeAreaView} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const GooglePlacesPopup = ({
  placeholder = 'Search',
  placeholderTextColor = '#999',
  onPlaceSelected,
  value = '',
  visible,
  onClose,
  expIndex,
}) => {
  console.log("🚀 ~ expIndex GooglePlacesPopup:", expIndex)
  const ref = useRef();
  const [inputValue, setInputValue] = useState(value);

  // Sync with external value
  useEffect(() => {
    setInputValue(value);
    if (ref.current?.setAddressText && value) {
      ref.current.setAddressText(value);
    }
  }, [value]);

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

    onClose?.(); // close the popup after selection
  };

  const isDarkMode = false;

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: Colors.White,
        }}>
        <View
          style={[
            styles.modalDropDownStyle,
            {
              backgroundColor: isDarkMode
                ? Colors.more_black[900]
                : Colors.White,
            },
          ]}>
          <TouchableOpacity
            onPress={() => onClose?.()}
            style={{
              alignSelf: 'flex-end',
              marginBottom: 10,
              marginRight:ms(20),
            }}>
            <AntDesign
              name="closecircleo"
              color={isDarkMode ? Colors.more_black[800] : Colors.Black_21}
              size={ms(22)}
            />
          </TouchableOpacity>
          <View style={styles.modalOverlay}>
            <View style={styles.popupContainer}>
              <GooglePlacesAutocomplete
                ref={ref}
                placeholder={placeholder}
                fetchDetails={true}
                onPress={handlePlaceSelect}
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
                currentLocationLabel="Current location"
                enableHighAccuracyLocation={true}
              />
            </View>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = ScaledSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  popupContainer: {
    height: '100%',
    width: '100%',
    backgroundColor: Colors.White,
    borderRadius: 10,
    padding: 16,
  },
  autoCompleteContainer: {
    flex: 0,
  },
  textInput: {
    backgroundColor: Colors.White_EB,
    fontSize: '13@ms',
    fontFamily: Fonts.type.Roman,
    height: 50,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.Border,
    paddingHorizontal: 10,
  },
  closeButton: {
    marginTop: 10,
    alignSelf: 'flex-end',
  },
  closeText: {
    color: 'red',
    fontSize: 14,
  },
  modalDropDownStyle: {
    flex: 1,
    backgroundColor: Colors.White,
  },
});

export default GooglePlacesPopup;
