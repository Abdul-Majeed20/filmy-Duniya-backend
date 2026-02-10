import { icons } from "@/constants/icons";
import { fetchMovieDetails } from "@/services/api";
import useFetch from "@/services/useFetch";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface MovieInfoProps {
  label: string;
  value?: string | number | null;
}

const MovieInfo = ({ label, value }: MovieInfoProps) => (
  <View className="flex-col items-start justify-center mt-5">
    <Text className="text-light-300 font-normal text-sm">{label}</Text>
    <Text className="text-light-200 font-bold text-sm mt-2">
      {value || "N/A"}
    </Text>
  </View>
);
const MovieDetails = () => {
  const { id } = useLocalSearchParams();
  const {
    data: movie,
    loading: movieLoading,
    error: movieError,
  } = useFetch(() => fetchMovieDetails(id as string));
  return (
    <View className="flex-1 bg-primary">
      {movieLoading ? (
        <ActivityIndicator size="large" color="#0000ff" className="mt-20" />
      ) : movieError ? (
        <View className="mt-20">
          <Text className="text-white text-center">{movieError?.message}</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
          <View className="">
            <Image
              source={{
                uri: movie?.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : "https://via.placeholder.com/600x400/1a1a1a/fffff.png",
              }}
              className="w-full h-[550px]"
              resizeMode="stretch"
            />
          </View>
          <View className="flex-col items-start justify-center mt-5 px-5">
            <Text className="text-white text-2xl font-bold mb-2">
              {movie?.title}
            </Text>
            <View className="flex-row items-center gap-x-1 mt-2">
              <Text className="text-light-200 text-sm">
                {movie?.release_date?.split("-")[0]}
              </Text>
              <Text className="text-light-200 text-sm">•</Text>
              <Text className="text-light-200 text-sm">
                {movie?.runtime} mins
              </Text>
            </View>
            <View className="flex-row items-center justify-start gap-x-1 mt-2">
              <Image
                source={icons.star}
                className="size-4"
                resizeMode="contain"
              />
              <Text className="text-white font-bold text-sm">
                {movie?.vote_average.toFixed(1)}/10
              </Text>
              <Text className="text-light-200 text-sm">
                ({movie?.vote_count} votes)
              </Text>
            </View>
            <MovieInfo label="Overview" value={movie?.overview} />
            <MovieInfo
              label="Genres"
              value={movie?.genres.map((genre) => genre.name).join(" - ")}
            />
            <View className="flex flex-row justify-between w-1/2">
              <MovieInfo
                label="Budget"
                value={
                  movie?.budget ? `$${movie.budget / 1_000_000} million` : null
                }
              />
              <MovieInfo
                label="Revenue"
                value={
                  movie?.revenue
                    ? `$${Math.round(movie?.revenue) / 1_000_000}`
                    : null
                }
              />
            </View>
            <MovieInfo
              label="Production Companies"
              value={movie?.production_companies
                .map((company) => company.name)
                .join(" - ")}
            />
            <MovieInfo label="Release Date" value={movie?.release_date} />
          </View>
        </ScrollView>
      )}
      <TouchableOpacity
        className="absolute bottom-5 left-0 right-0 mx-5 bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center z-50"
        onPress={() => {
          // Navigate back to the previous screen
          router.back();
        }}
      >
        <Image
          source={icons.arrow}
          className="size-10 mr-1 mt-0.5 rotate-180"
          tintColor={"#ffffff"}
          resizeMode="contain"
        />
        <Text className="text-white font-semibold text-base">Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MovieDetails;
