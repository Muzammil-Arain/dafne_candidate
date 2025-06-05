import { ms, ScaledSheet } from "react-native-size-matters";
import { Colors, Fonts } from "../../theme";
import datahandler from "../../helper/datahandler";

const isDarkMode = datahandler.getAppTheme();

export const styles = ScaledSheet.create({
    sectionContainer: {
      marginBottom: '40@ms', // Scaled marginBottom
    },
    textStyle: {
      marginLeft: '20@ms', // Scaled marginLeft
      width:'270@ms'
    },
    imageBackground: {
      alignSelf: 'center',
      marginVertical: '20@ms', // Scaled marginVertical
      width: '100%',
      height: '250@ms', // Scaled height
    },
    counterCircle: {
      marginTop: '-15@ms', // Scaled marginTop (negative margin)
      marginLeft: '-13@ms', // Scaled marginLeft (negative margin)
      backgroundColor: Colors.Yellow,
      width: '40@ms', // Scaled width
      height: '40@ms', // Scaled height
      borderRadius: '100@ms', // Scaled borderRadius
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: '0.5@ms', // Scaled borderWidth
      borderColor: Colors.Back_70,
    },
    imageStyle: {
      width: '170@ms', // Scaled width
      height: '170@ms', // Scaled height
      alignSelf: 'center',
    },
    buttonContainer: {
      paddingHorizontal: '20@ms', // Scaled paddingHorizontal
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-evenly',
      position: 'absolute',
      bottom: '-15@ms', // Scaled bottom margin
      right: 0,
      left: 0,
    },
    linearGradientStyle: {
      width: '70@ms', // Scaled width
      height: '35@ms', // Scaled height
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '20@ms', // Scaled borderRadius
    },
    progressContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    progressBar: {
      height: '15@ms', // Scaled height
      borderRadius: '10@ms', // Scaled borderRadius
      marginVertical: '10@ms', // Scaled marginVertical
      width: '300@ms', // Scaled width
    },
    progressText: {
      color: isDarkMode ? Colors.White: Colors.Black,
      fontFamily:Fonts.type.Black,
      marginLeft: '10@ms', // Scaled marginLeft
      fontSize: Fonts.size.size_14,
    },
    errorText: {
      color: 'red',
      fontSize: ms(14),
      marginTop: ms(5),
      marginLeft: ms(5),
    },
    titleRow:{
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-between'
    },
  });