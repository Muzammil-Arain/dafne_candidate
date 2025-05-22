import { ScaledSheet } from "react-native-size-matters";
import { Colors, Fonts } from "../../theme";

export const styles = ScaledSheet.create({
  rememberInnerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '20@ms',
  },
  rememberText: {
    marginLeft: '10@ms',
    color: Colors.Yellow,
    fontFamily: Fonts.type.Mediu,
  },
});