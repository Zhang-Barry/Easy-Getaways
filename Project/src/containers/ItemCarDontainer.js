import { View, Text, TouchableOpacity, RectangularListItem } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const ItemCarDontainer = ({title, location }) => {
  const navigation = useNavigation();
  return (
    <View
    //   onPress={() => navigation.navigate("ItemScreen", { param: data })}
    //   className="rounded-md border border-gray-300 space-y-2 px-3 py-2 shadow-md bg-white w-[182px] my-2"
    >
        <Text>{title}</Text>
        <Text>{location}</Text>
    </View>
  );
};

export default ItemCarDontainer;