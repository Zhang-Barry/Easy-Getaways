import { View, Text, TouchableOpacity, Image, ImageBackground, Alert } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from '@expo/vector-icons';
import { useDispatch, useSelector } from "react-redux";
import { insertNewPlace } from "../actions/places";
import { getMyPlacesFromServer } from "../actions/places";

const ItemCardContainer = ({ imageSrc, title, location, json }) => {

  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();


  const handlePress = (place_id) => {

    Alert.alert('Save Destination', `Do you want to save the destination ${json?.name}?`, [
      {
        text: 'No',
      },
      {
        text: 'Yes',
        onPress: () => handleClick(),
      },
    ]);
  
  }


  const handleClick = async () => {
    const jwt = auth["access"]
    const uid = auth["user"]["pk"]
    await insertNewPlace(jwt, uid, json)(dispatch);
    await getMyPlacesFromServer(jwt, uid)(dispatch);
  }

  return (
    <TouchableOpacity className="rounded-md border border-gray-300 space-y-2 px-3 py-2 shadow-md bg-white w-[175px] my-2" onPress={ () => handlePress() }>
      <Image 
        source={{uri: imageSrc}}
        className="w-full h-40 rounded-md object-cover"
      />
      <Text className="text-[16px] font-bold">
        {title?.length > 14 ? `${title.slice(0,14)}..` : title}
      </Text>

      <View className="flex-row items-center space-x-1">
        <FontAwesome name="map-marker" size={18} color="black" />
        <Text className="text-[14px] font-bold">
          {location?.length > 18 ? `${location.slice(0,18)}..` : location}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ItemCardContainer;