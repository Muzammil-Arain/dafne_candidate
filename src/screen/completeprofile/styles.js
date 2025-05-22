import { ScaledSheet,ms } from "react-native-size-matters";
import { Colors, Fonts } from "../../theme";
import datahandler from "../../helper/datahandler";

const isDarkMode  = datahandler.getAppTheme();

export const styles = ScaledSheet.create({
    image: {
      width: '100@ms',  // Scaled width
      height: '90@ms',  // Scaled height
      alignSelf: 'center',
    },
    titleContainer: {
      height: '70@ms',  // Scaled height
      justifyContent: 'center',
      alignItems: 'center',
    },
    heading: {
      height: '50@ms',  // Scaled height
      fontSize: '35@ms',  // Scaled font size
      color: isDarkMode ? Colors.White : Colors.Black_02,
      fontFamily: Fonts.type.Mediu,
    },
    subheading: {},
    description: {
      color: isDarkMode ? Colors.Black_56 : Colors.Black_21,
      lineHeight: '25@ms',  // Scaled lineHeight
      marginHorizontal: '20@ms',  // Scaled margin
    },
    saveButton: {
      marginRight: '10@ms',  // Scaled margin
    },
    notesTextStyle: {
      marginBottom: '10@ms',  // Scaled margin
    },
    container: {
      margin: '20@ms',  // Scaled margin
    },
    text: {
      fontSize: '15@ms',  // Scaled font size
      color: isDarkMode ? Colors.Whiite_B1 : Colors.Black_02,
      lineHeight: '22@ms',  // Scaled lineHeight
    },
    highlight: {
      color: '#f5a623',
    },
  });