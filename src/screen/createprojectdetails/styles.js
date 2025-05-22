import { ScaledSheet } from "react-native-size-matters";
import { Colors } from "../../theme";

export const styles = ScaledSheet.create({
  cardContainer: {
    backgroundColor: Colors.White,
    padding: 20,
    marginVertical: '10@ms',
    borderRadius: 14,
    shadowColor: Colors.Black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,

    elevation: 5,
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: '10@ms',
    alignItems: 'center',
  },
  buttonStyle: {
    width: '70@ms',
    height: '40@ms',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: '10@ms',
  },
  flexViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '65@ms',
  },
  cuntomStyle: {
    width: '160@ms',
  },
  labelTextStyle: {
    marginLeft: '10@ms',
    marginTop: '10@ms',
  },
  checkboxContainer: {
    marginVertical: '20@ms',
  },
});
