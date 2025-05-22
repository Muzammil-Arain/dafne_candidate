import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const VectorIcon = ({type, name, color, size}) => {
  switch (type) {
    case 'AntDesign':
      return <AntDesign name={name} color={color} size={size} />;
    case 'EvilIcons':
      return <EvilIcons name={name} color={color} size={size} />;
    case 'FontAwesome':
      return <FontAwesome name={name} color={color} size={size} />;
    case 'FontAwesome5':
      return <FontAwesome5 name={name} color={color} size={size} />;
    case 'Fontisto':
      return <Fontisto name={name} color={color} size={size} />;
    case 'Ionicons':
      return <Ionicons name={name} color={color} size={size} />;
    case 'Octicons':
      return <Octicons name={name} color={color} size={size} />;
    case 'MaterialIcons':
      return <MaterialIcons name={name} color={color} size={size} />;
    case 'MaterialCommunityIcons':
      return <MaterialCommunityIcons name={name} color={color} size={size} />;
    case 'Entypo':
      return <Entypo name={name} color={color} size={size} />;
    default:
      return null;
  }
};

export default React.memo(VectorIcon);

// Example usage of VectorIcon component
// <VectorIcon type="Ionicons" name="home" color="#000" size={24} />
