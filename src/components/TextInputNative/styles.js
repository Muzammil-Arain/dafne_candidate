import { ScaledSheet } from 'react-native-size-matters';
import { Platform } from 'react-native';
import { Fonts, Colors } from '../../theme';

export default ScaledSheet.create({
  input: {
    paddingBottom:
      Platform.OS == 'ios' ? '15@s' : '10@s', // Scaled padding
    paddingTop:
      Platform.OS == 'ios' ? '15@s' : '10@s', // Scaled padding
    paddingHorizontal: '15@s', // Scaled padding
    fontSize: Fonts.size.size_14,
    color: Colors.Black,
    includeFontPadding: false,
  },
  multline: {
    paddingBottom: '24@s', // Scaled padding
  },
  inputContainer: {
    height: '85@vs', // Scaled height for vertical dimension
    backgroundColor: 'red',
  },
  errorText: {
    fontSize: Fonts.size.size_12,
    color: Colors.errorInput,
    marginTop: '0@s', // Scaled margin
  },
  hint: {
    marginTop: '6@s', // Scaled margin
  },
  title: {
    fontFamily: Fonts.type.Roman,
    fontSize: Fonts.size.size_15,
    color: Colors.Text2,
    marginBottom: '5@s', // Scaled margin
    textTransform: 'capitalize',
  },
  arrowStyle: { marginRight: '4@s' }, // Scaled margin
  bottomSpace: { marginBottom: '8@s' }, // Scaled margin
  topSpace: { marginTop: '19@s' }, // Scaled margin
  labelText: {
    bottom: '0@s', // Scaled bottom
    fontSize: Fonts.size.size_12,
  },
  leftIconStyle: {
    width: '49@s', // Scaled width
    height: '49@s', // Scaled height
    borderRadius: '24.5@s', // Scaled border radius
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: '10@s', // Scaled margin
    marginLeft: '2@s', // Scaled margin
    bottom: '-5@s', // Scaled bottom
  },
  rightIconStyle: {
    // Styles can be added here if needed
  },
  inputContaine: {},
  onFocuslabelText: {
    fontFamily: Fonts.type.regular,
    bottom: '0@s', // Scaled bottom
    paddingTop: '0@s', // Scaled padding
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  textField: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.size_13,
    color: Colors.black,
  },
});
