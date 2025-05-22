import { ScaledSheet } from "react-native-size-matters";
import { Colors, Fonts } from "../../theme";
import { Dimensions, Platform } from "react-native";

const {width, height} = Dimensions.get('window');

export const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: '20@ms',
    backgroundColor: Colors.App_Background,
    elevation: 5,
    justifyContent: 'space-between',
    height: Platform.OS == 'android' ? height * 0.15 : height * 0.12,
    paddingBottom: height * 0.05,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    width: width * 0.6,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: width * 0.1,
    height: width * 0.1,
    borderRadius: width * 0.05,
    marginRight: width * 0.03,
    borderWidth:1,
    borderColor:Colors.LightYellow
  },
  profileName: {
    fontWeight: 'bold',
    fontSize: Fonts.size.size_16,
    color: Colors.Black_02,
  },
  chatList: {
    flex: 1,
    backgroundColor: Colors.White,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: '-30@ms',
  },
  inputToolbar: {
    backgroundColor: Colors.more_black[500],
    height: '70@ms',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F1F1F1',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: '10@ms',
  },
  sendButton: {
    marginHorizontal: 10,
  },
});
