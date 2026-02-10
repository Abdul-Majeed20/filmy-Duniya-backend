import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import React from "react";
import { Image, Text, TextInput, View } from "react-native";

const Profile = () => {
  return (
    <View className="bg-primary flex-1 ">
      <Image source={images.bg} className="absolute w-full z-0" />
      <View className="flex-1">
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />
      </View>
      <View className="flex justify-center items-center flex-1 flex-col">
        <Image source={icons.person} className="w-20 h-20 mb-4" />
        <Text className="text-white font-bold text-lg mb-2">User Name</Text>
        <Text className="text-gray-300 text-sm">user@example.com</Text>
        <TextInput
          className="border text-white border-white px-3 py-2 text-sm"
          placeholder="Enter password"
          placeholderTextColor={"#a8b5db"}
        />
      </View>
    </View>
  );
};

export default Profile;
