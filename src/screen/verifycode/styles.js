import { ms, ScaledSheet } from "react-native-size-matters";
import { Colors, Fonts } from "../../theme";

export const styles = ScaledSheet.create({
  otpCodeContainer: {
    marginTop: '-30@ms',
  },
  descriptionText: {
    marginBottom: '20@ms',
  },
  otpInputView: {
    alignSelf: 'center',
    height: '100@ms',
    paddingLeft: '20@ms',
    marginBottom: '30@ms',
    color: Colors.Black_02,
    fontFamily: Fonts.type.Roman,
  },
  underlineStyleBase: {
    width: '70@ms',
    height: '70@ms',
    borderWidth: 2,
    borderRadius: 5,
    color: Colors.Black,
    fontSize: '25@ms',
    backgroundColor: Colors.Whiite_FA,
    borderWidth: 1,
    borderColor: 'rgba(2, 2, 2, 0.15)',
  },
  underlineStyleHighLighted: {
    borderColor: Colors.Yellow,
  },
  resendContainer: {
    alignSelf: 'flex-end',
  },
  signUpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
    marginTop: '10@ms',
    width: '150@ms',
  },
  signUpText: {
    marginLeft: '10@ms',
    fontFamily: Fonts.type.Regular,
  },
  resendText: {
    textDecorationLine: 'underline',
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
  },
  input: {
    marginTop: ms(20),
    backgroundColor: Colors.more_black[600],
    borderRadius: ms(10),
    paddingHorizontal: ms(15),
    paddingVertical: ms(12),
    color: Colors.White,
    fontSize: ms(14),
  },
  button: {
    marginTop: ms(25),
  },
});