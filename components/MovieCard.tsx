import { icons } from "@/constants/icons";
import { Link } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const MovieCard = (movie: Movie) => {
  return (
    <Link href={`/movie/${movie.id}`} asChild>
      <TouchableOpacity className="w-[30%] mb-4">
        <Image
          source={{
            uri: movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "https://via.placeholder.com/600x400/1a1a1a/fffff.png",
          }}
          className="w-full h-52 rounded-lg"
          resizeMode="cover"
        />
        <Text className="text-white font-bold text-sm mt-2" numberOfLines={1}>
          {movie.title}
        </Text>
        <View className="flex-row items-center justify-start gap-x-1">
          <Image source={icons.star} className="w-3 h-3" resizeMode="contain" />
          <Text className="text-gray-300 text-xs">
            {movie.vote_average.toFixed(1)}
          </Text>
        </View>

        <View className="flex-row justify-between items-center">
          <Text className="text-gray-400 text-xs font-medium mt-1">
            {movie.release_date?.split("-")[0]}
          </Text>
          <Text className="text-xs font-medium text-light-300 uppercase">
            MOVIE
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default MovieCard;
