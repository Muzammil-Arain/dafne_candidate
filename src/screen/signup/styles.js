import { ScaledSheet } from "react-native-size-matters";
import datahandler from "../../helper/datahandler";
import { Colors } from "../../theme";

const isDarkMode = datahandler.getAppTheme();

export const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: isDarkMode ? Colors.more_black[900] : Colors.White_F8,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  logo: {
    alignSelf: 'center',
    marginTop: '10@s', // Scaled vertical margin
    width: '200@s', // Scaled width
    height: '200@s', // Scaled height, instead of Metrics.scaleVertical
  },
  contentContainer: {
    marginTop: '5@s', // Scaled margin
    paddingVertical: '30@s', // Scaled vertical padding
    paddingHorizontal: '20@s', // Scaled horizontal padding
    borderTopLeftRadius: '24@s', // Scaled radius
    borderTopRightRadius: '24@s', // Scaled radius
    shadowColor: Colors.Black,
    flex: 1,
    elevation: 2,
    backgroundColor: isDarkMode ? Colors.Black_21 : Colors.White,
  },
  descriptionText: {
    marginBottom: '20@s', // Scaled margin
  },
  inputContainer: {
    marginBottom: '15@s', // Scaled margin
  },
  buttonContainer: {
    marginVertical: '10@s', // Scaled vertical margin
  },
  rememberInnerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 0,
  },
  rememberText: {
    marginHorizontal: '10@s', // Scaled margin
    color: Colors.Yellow,
    fontWeight: '500',
  },
  cvViewButtonStyle: {
    width: '160@s', // Scaled width
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    padding: '10@s', // Scaled padding
    height: '45@s', // Scaled height
    marginTop: '15@ms',
    marginBottom: '10@ms',
    borderRadius: '5@s', // Scaled border radius
    borderWidth: 1,
    borderColor: Colors.Border,
    backgroundColor: Colors.Whiite_FA, // Fixed typo in color
    shadowRadius: 2,
  },
  signUpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: '10@s', // Scaled margin
  },
  signUpText: {},
  text: {
    marginLeft: '3@s', // Scaled margin
    textDecorationLine: 'underline',
  },
});
