import { ScaledSheet } from 'react-native-size-matters';
import { Colors, Fonts } from '../../theme';

const styles = ScaledSheet.create({
  modalDropDownStyle: {
    flex:1,
    backgroundColor: Colors.White,
    padding: '20@ms',  // Scaled padding
  },
  modalSearchBarViewStyle: {
    backgroundColor: Colors.White_EB,
    height: '45@ms',  // Scaled height
    paddingHorizontal: '10@ms',  // Scaled padding
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: '14@ms',  // Scaled border radius
    justifyContent: 'space-between',
    marginBottom: '20@ms',  // Scaled margin
  },
  modalSearchBarStyle: {
    flex: 1,
    color: Colors.Black_21,
    fontSize: '15@ms',  // Scaled font size
  },
  modalRenderItemView: {
    height: '50@ms',  // Scaled height
    justifyContent: 'center',
    paddingLeft: '10@ms',  // Scaled padding
    marginBottom: '10@ms',  // Scaled margin
    borderWidth: 1,
    borderRadius: '5@ms',  // Scaled border radius
    borderColor: Colors.Border,
  },
  modalRenderItemtextStyle: {
    fontSize: '15@ms',  // Scaled font size
    textAlign: 'left',
    fontFamily: Fonts.type.Roman,
    color: Colors.Black_21,
  },
});

export default styles;
