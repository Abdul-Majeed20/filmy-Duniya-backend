import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import TrendingCard from "@/components/TrendingCard";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
// import { getTrendingMovies } from "@/services/appwrite";
import { getTrendingMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import { FlatList, Image, ScrollView, Text, View } from "react-native";

export default function Index() {
  const router = useRouter();

  const {
    data: trendingMovies,
    loading: trendingLoading,
    error: trendingError,
  } = useFetch(getTrendingMovies);
  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() => fetchMovies({ query: "" }));
  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0" />

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
      >
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />

        {moviesLoading && trendingLoading ? (
          <Text className="text-white">Loading movies...</Text>
        ) : moviesError && trendingError ? (
          <Text>
            Error loading movies{" "}
            {moviesError?.message || trendingError?.message}
          </Text>
        ) : (
          <View className="flex-1 mt-5">
            {/* SearhBar */}
            <SearchBar
              onPress={() => router.push("/Search")}
              placeholder="Search for a movie"
            />
            {trendingMovies && (
              <View className="mt-10">
                <Text className="text-white text-lg font-bold mx-2 mb-3">
                  Trending Movies
                </Text>
                <FlatList
                  data={trendingMovies}
                  renderItem={({ item , index }) => <TrendingCard movie={item} index={index} />}
                  // keyExtractor={(item) => item.id.toString()}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  className="mx-2"
                  contentContainerStyle={{ gap: 20 }}
                />
              </View>
            )}
            <>
              <Text className="text-white text-lg font-bold mx-2 mt-10 mb-3">
                Latest Movies
              </Text>

              <FlatList
                data={movies}
                renderItem={({ item }) => <MovieCard {...item} />}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                columnWrapperStyle={{
                  justifyContent: "flex-start",
                  gap: 20,
                  paddingRight: 5,
                  marginBottom: 10,
                }}
                scrollEnabled={false}
                className="mx-2 mt-2 pb-32"
              />
            </>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
