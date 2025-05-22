import { ScaledSheet } from "react-native-size-matters";
import { Colors } from "../../theme";
import datahandler from "../../helper/datahandler";

const isDarkMode = datahandler.getAppTheme();

export const styles = ScaledSheet.create({
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  button: {
    padding: '10@ms',
    height: '45@ms', 
    width: '150@ms',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 26,
    borderWidth: 1,
  },
  sectionMenu: {
    marginVertical: '20@ms', 
    padding: '20@ms',
    backgroundColor: isDarkMode ? Colors.more_black[900] : Colors.White,
    borderRadius: 10,
    shadowColor: Colors.Black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    height: '250@ms', 
  },
  flexView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  jobDescriptionViewStyle: {
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    padding: '8@ms',
    borderWidth: 1,
    borderColor: Colors.Back_70,
  },
  buttonStyle: {
    borderRadius: 35,
    height: '40@ms',
    justifyContent: 'center',
    alignItems: 'center',
    width: '140@ms',
  },
  interestedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: '15@ms',
  },
  listContentContainer: {
    paddingBottom: '20@ms', 
    paddingHorizontal: '10@ms',
  },
  jobHistoryViewStyle: {
    height: '35@ms',
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: Colors.Back_70,
    width: '160@ms',
  },
});
