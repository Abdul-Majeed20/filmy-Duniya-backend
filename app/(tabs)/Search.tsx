import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
// import { updateSearchCount } from "@/services/appwrite";
import { updateSearchCount } from "@/services/api";
import useFetch from "@/services/useFetch";
import React, { useEffect } from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";

const Search = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
    refetch: laodMovies,
    reset,
  } = useFetch(() => fetchMovies({ query: searchQuery }), false);

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
    if (searchQuery.trim()) {
       await laodMovies();
    } else {
      reset();
    }
  }, 500);

    return () => clearTimeout(timeoutId); 

  }, [searchQuery]);

  useEffect(() => {
  if (
    searchQuery.trim() &&
    movies &&
    movies.length > 0
  ) {
    updateSearchCount(searchQuery, movies[0]);
  }
}, [movies]);


  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="flex-1 absolute w-full z-0"
        resizeMode="cover"
      />

      <FlatList
        data={movies}
        renderItem={({ item }) => <MovieCard {...item} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "center",
          marginVertical: 16,
          gap: 20,
          paddingRight: 5,
        }}
        contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
        ListHeaderComponent={
          <>
            {moviesLoading ? (
              <ActivityIndicator
                size="large"
                color="#0000ff"
                className="mt-20"
              />
            ) : moviesError ? (
              <View className="mt-20">
                <Text className="text-white text-center">
                  {moviesError?.message}
                </Text>
              </View>
            ) : (
              <>
                <View className="flex-row w-full justify-center mt-20 items-center">
                  <Image source={icons.logo} className="w-12 h-10" />
                </View>
                <View className="my-5">
                  <SearchBar
                    placeholder="Search for a movie"
                    value={searchQuery}
                    onChangeText={(text: string) => setSearchQuery(text)}
                  />
                </View>
                {!moviesLoading &&
                  !moviesError &&
                  searchQuery.trim() &&
                  movies?.length > 0 && (
                    <View className="mt-5">
                      <Text className="text-white text-lg font-bold mx-2">
                        Search results for 
                        <Text className="text-light-300 ml-2">{searchQuery}</Text>
                      </Text>
                    </View>
                  )}
              </>
            )}
          </>
        }
        ListEmptyComponent={
          !moviesLoading && !moviesError ? (
            <View className="mt-10 px-5">
              <Text className="text-gray-500 text-center">
                {searchQuery.trim()
                  ? `${searchQuery} Not found` : "Start typing to search for movies."
                }
              </Text>
            </View>
          ) : null
        }
      />
    </View>
  );
};

export default Search;
