import {ScaledSheet, ms} from 'react-native-size-matters';
import {Colors, Fonts} from '../../theme';
import datahandler from '../../helper/datahandler';

const isDarkMode = datahandler.getAppTheme();

export const styles = ScaledSheet.create({
  stepContainer: {
    flexDirection: 'row',
  },
  circleContainer: {
    alignItems: 'center',
    marginRight: '10@ms', // Scaled margin
  },
  circle: {
    width: '30@ms', // Scaled width
    height: '30@ms', // Scaled height
    borderRadius: '15@ms', // Scaled border radius
    backgroundColor: Colors.Whiite_CC,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepNumber: {
    color: Colors.White,
    fontFamily: Fonts.type.Roman,
  },
  line: {
    flex: 1,
    width: '2@ms', // Scaled width
    height: '30@ms', // Scaled height
    backgroundColor: '#ccc',
  },
  stepText: {
    fontSize: '19@ms', // Scaled font size
    fontFamily: Fonts.type.Mediu,
    marginTop: '2@ms', // Scaled margin
  },
  activeCircle: {
    borderWidth: 0.5,
    borderColor: Colors.Border,
    backgroundColor: Colors.Yellow,
  },
  inactiveCircle: {
    backgroundColor: '#aaaaaa',
  },
  formContainer: {
    padding: '10@ms',
    flex: 1,
    marginVertical: '10@ms',
    borderRadius: '10@ms', // Scaled border radius
    backgroundColor: isDarkMode ? Colors.more_black[900] : Colors.Whiite_FA,
    shadowColor: Colors.Black,
    elevation: 1,
  },
  plusButton: {
    backgroundColor: Colors.Yellow,
    width: '30@ms', // Scaled width
    height: '30@ms', // Scaled height
    borderRadius: '3@ms', // Scaled border radius
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: '2@ms', // Scaled border width
    borderColor: Colors.Back_c8,
    alignSelf: 'flex-end',
  },
  AddMoreButton: {
    width: '100%',
    marginVertical: '5@ms',
    alignItems: 'flex-end',
  },
  profileStatusText: {
    marginTop: '20@ms', // Scaled margin
    color: isDarkMode ? Colors.White : Colors.Black,
    fontSize: '16@ms', // Scaled font size
    fontFamily: Fonts.type.Mediu,
  },
  progressBar: {
    height: '15@ms', // Scaled height
    borderRadius: '10@ms', // Scaled border radius
    marginVertical: '10@ms', // Scaled margin
    width: '300@ms', // Scaled width
  },
  progressText: {
    color: isDarkMode ? Colors.White : Colors.Black,
    marginLeft: '10@ms', // Scaled margin
    fontSize: '14@ms', // Scaled font size
  },
  dropdownViewStyle: {
    width: '130@ms', // Scaled width
  },
  flexViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  plusFlexView: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  selectedExperienceContainer: {
    marginVertical: '10@ms',
    paddingHorizontal: '5@ms',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownStyle: {
    flex: 1,
    width: '130@ms',
  },
  checkboxContainer: {
    marginVertical: 10,
  },
  checkBoxText: {
    fontFamily: Fonts.type.Roman,
  },
  experienceButton: {
    flexDirection: 'row',
    backgroundColor: isDarkMode ? Colors.more_black[800] : Colors.Whiite_FA,
    paddingHorizontal: ms(20),
    height: ms(40),
    marginBottom: '10@ms',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 5,
    width: '280@ms',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
    shadowColor: isDarkMode ? Colors.White : Colors.Back_70,
  },
  addButtonText: {
    color: Colors.Yellow,
    textAlign: 'right',
    fontSize: ms(16),
    fontFamily: Fonts.type.Roman,
  },
});
