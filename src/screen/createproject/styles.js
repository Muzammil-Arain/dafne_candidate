import { ScaledSheet } from "react-native-size-matters";
import { Colors } from "../../theme";

export const styles = ScaledSheet.create({
    formContainer: {
      marginTop: '-40@ms',
      backgroundColor: Colors.White,
      paddingHorizontal: '20@ms',
      paddingVertical: '40@ms',
      borderRadius: 14,
      shadowColor: Colors.Back_70,
      elevation: 10,
    },
    buttonContainer: {
      marginTop: '20@ms',
    },
    input: {
      marginHorizontal: '20@ms',
      marginTop: '20@ms', 
    },
  });
  