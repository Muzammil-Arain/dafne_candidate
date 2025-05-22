import { ScaledSheet } from "react-native-size-matters";
import { Colors, Metrics } from "../../theme";
import { Platform } from "react-native";

export const styles = ScaledSheet.create({
  container: {
    flex: 1,
    padding: 20,
    borderTopRightRadius: '26@ms',
    borderTopLeftRadius: '26@ms',
    marginHorizontal: ' -20@ms',
    marginBottom: ' -20@ms',
    height: Metrics.screenHeight,
  },
  fieldContainer: {
    marginBottom: '20@ms',
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '5@ms',
  },
  textInputStyle: {
    borderWidth: 1,
    backgroundColor: Colors.Whiite_FA,
    fontSize: '14@ms',
    color: Colors.Black,
    paddingBottom:
      Platform.OS === 'ios' ? Metrics.ratio(12) : Metrics.ratio(10),
    paddingTop: Platform.OS === 'ios' ? Metrics.ratio(12) : Metrics.ratio(10),
    paddingHorizontal: Metrics.ratio(15),
    includeFontPadding: false,
    borderColor: 'rgba(2, 2, 2, 0.15)',
    borderRadius: 5,
  },
  editIcon: {
    width: '17@ms',
    height: '17@ms',
  },
  logoutTextStyle:{
    textDecorationLine:'underline',
    color:Colors.DarkYellow,
    textAlign:'right',
    marginBottom:'10@ms',
  }
});
