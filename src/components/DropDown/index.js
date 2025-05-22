import styles from './styles';
import {Colors} from '../../theme';
import React, {useState} from 'react';
import Modal from 'react-native-modal';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {View, TextInput, FlatList, TouchableOpacity, Text, SafeAreaView} from 'react-native';
import { ms } from 'react-native-size-matters';

const DropDown = ({data, isModalVisible, handleHideModal, handlePress,isDarkMode}) => {
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const handleSearch = text => {
    setSearchText(text);
    const filteredItems = data.filter(el => {
      const elText = el?.name ? el.name.toLowerCase() : el.toLowerCase();
      return elText.includes(text.toLowerCase());
    });

    setFilteredData(filteredItems);
  };

  return (
    <Modal
      onBackdropPress={handleHideModal}
      style={{
        margin: 0,
        left: 0,
        right: 0,
      }}
      isVisible={isModalVisible}>
     <SafeAreaView style={{
      flex:1,
      backgroundColor:Colors.White
     }}>
     <View style={[styles.modalDropDownStyle,{
        backgroundColor:isDarkMode ? Colors.more_black[900]:Colors.White
      }]}>
        <TouchableOpacity
          onPress={handleHideModal}
          style={{
            alignSelf: 'flex-end',
            marginBottom: 10,
          }}>
          <AntDesign name="closecircleo" color={isDarkMode ? Colors.more_black[800] : Colors.Black_21} size={ms(22)} />
        </TouchableOpacity>
        <View style={styles.modalSearchBarViewStyle}>
          <TextInput
            placeholder="Search"
            placeholderTextColor={Colors.Whiite_B8}
            onChangeText={handleSearch}
            value={searchText}
            style={styles.modalSearchBarStyle}
          />
          <AntDesign name="search1" color={Colors.Black} size={ms(22)} />
        </View>
        <FlatList
          data={filteredData.length == 0 ? data : filteredData}
          keyExtractor={item => item.name}
          renderItem={({item}) => (
            <TouchableOpacity
            activeOpacity={0.7}
              onPress={() => {
                handlePress(item);
              }}
              style={[styles.modalRenderItemView,{
                borderWidth:1,
              borderColor:isDarkMode ? Colors.more_black[800] : Colors.Black_21
              }]}>
              <Text style={[styles.modalRenderItemtextStyle,{
                color:isDarkMode? Colors.Whiite_B8 : Colors.Black_21
              }]}>
                {item.name ?? item.title}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
     </SafeAreaView>
    </Modal>
  );
};

export default React.memo(DropDown);
