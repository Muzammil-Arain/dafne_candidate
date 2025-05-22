// @flow
import { max } from "lodash";
import Geocoder from "react-native-geocoding";
import { ShowErrorToast, Util } from ".";
import {GOOGLE_API_KEY} from '../config/Constants';

function initLibrary() {
  Geocoder.init(GOOGLE_API_KEY);
}

function getAddressObject(params, callback) {
  Geocoder.init(GOOGLE_API_KEY);
  /*
  callback(
    {
      city: 'karachi',
      state: 'Sindh',
      country: 'Pakistan',
      formattedAddress: 'karachi new nipa',
      lat: 24.87194,
      lng: 66.98806,
    },
    true
  );

  return null;
    */

  Geocoder.from(params)
    .then((json) => {
      if (json.results && json.results.length > 0) {
        const result = json.results[0];

        const { city, state, country } = getCityStateCountryFromResult(result);
        const formattedAddress = getFormattedAddressFromResult(result);
        const { lat, lng } = getLatLngFromResult(result);

        const addressObject = {
          city,
          state,
          country,
          // formattedAddress,
          address: formattedAddress,
          lat,
          lng,
        };
        callback(addressObject, true);
      } else {
        callback("No Result Found", false);
      }
    })
    .catch((error) => {
      console.log("agaayi => err", error);

      console.log("error response", error);

      const errorMessage = getErrorMessage();
      callback(errorMessage, false);
    });
}

function getCityStateCountryFromResult(result) {
  let city = "";
  let state = "";
  let country = "";
  for (let i = 0; i < result.address_components.length; i++) {
    for (let j = 0; j < result.types.length; j++) {
      switch (result.address_components[i].types[j]) {
        case "locality":
          city = result.address_components[i].long_name;
          break;
        case "administrative_area_level_1":
          state = result.address_components[i].long_name;
          break;
        case "country":
          country = result.address_components[i].long_name;
          break;
      }
    }
  }
  return { city, state, country };
}

function getLatLngFromResult(result) {
  const lat = result?.geometry?.location?.lat ?? 0;
  const lng = result?.geometry?.location?.lng ?? 0;
  return { lat, lng };
}

function getFormattedAddressFromResult(result) {
  const formattedAddress = result?.formatted_address ?? "";
  return formattedAddress;
}

function getErrorMessage() {
  const errorMessage = Util.showMessage('Network Not Available','danger')
    ? "Something Went Wrong"
    : "Network Not Available";
  return errorMessage;
}

export default {
  initLibrary,
  getCityStateCountryFromResult,
  getLatLngFromResult,
  getFormattedAddressFromResult,
  getErrorMessage,
  getAddressObject,
};