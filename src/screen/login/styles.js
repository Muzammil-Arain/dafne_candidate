import {ScaledSheet} from 'react-native-size-matters';
import {Colors, Fonts} from '../../theme';
import datahandler from '../../helper/datahandler';

const isDarkMode = datahandler.getAppTheme();

export const styles = ScaledSheet.create({
  flex: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: isDarkMode ? Colors.more_black[900] : Colors.White_F8,
  },
  logo: {
    alignSelf: 'center',
    marginTop: '10@ms',
    width: '200@s',
    height: '200@s',
  },
  contentContainer: {
    flex: 1,
    marginTop: 5,
    paddingHorizontal: '20@s',
    paddingVertical: '30@vs',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: '#000',
    elevation: 2,
    backgroundColor: isDarkMode ? Colors.Black_21 : Colors.White,
  },
  descriptionText: {
    marginBottom: '20@s',
  },
  inputContainer: {
    marginBottom: '15@s',
  },
  rememberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '50@vs',
  },
  rememberInnerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rememberText: {
    marginLeft: '10@s',
    fontFamily: Fonts.type.Regular,
  },
  text: {
    textDecorationLine: 'underline',
    textAlign:'center',
  },
  signUpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '10@s',
  },
  signUpText: {
    marginRight: '5@s',
    fontFamily: Fonts.type.Regular,
  },
  gifStyle: {
    width: '100@s',
    height: '100@vs',
    marginBottom: '20@s',
  },
  Modalcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    height: '65@ms',
    paddingHorizontal: '10@ms',
    marginBottom: '10@ms',
    margin: '5@ms',
    backgroundColor: Colors.more_black[500],
    shadowColor: Colors.more_black[700],
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 3,
  },
  image: {
    width: '50@ms',
    height: '50@ms',
    borderRadius: 100,
    borderWidth: 1,
    borderColor: Colors.DarkYellow,
    marginRight: '8@ms',
  },
  textContainer: {},
  emailContainer: {
    marginTop: '-7@ms',
    width: '220@ms',
  },
  buttonContainer: {
    flex: 1,
  },
});
