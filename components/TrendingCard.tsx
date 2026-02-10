import { images } from '@/constants/images';
import MaskedView from '@react-native-masked-view/masked-view';
import { Link } from 'expo-router';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
const TrendingCard = ({ movie: {movie_id , movie_title , poster_url}, index }: TrendingCardProps) => {
  return (
    <Link href={`/movie/${movie_id}`} asChild>
      <TouchableOpacity className='w-32 relative pl-3'>
        <Image
        source={{uri: poster_url}}
        className='w-32 h-48 rounded-lg'
        resizeMode='cover'
         />
         <View className='absolute bottom-9 left-0 px-2 py-1'>
              <MaskedView maskElement={
                <Text className='text-white font-bold text-6xl' numberOfLines={1}>{index + 1}</Text>
              }>
                <Image
                  source={images.rankingGradient}
                  className='size-14'
                  resizeMode='cover'
                />
              </MaskedView>
         </View>
         <View className='mt-2 w-32'>
          <Text className='text-white font-bold text-sm' numberOfLines={1}>{movie_title}</Text>
               
         </View>
       </TouchableOpacity>
    </Link>
  )
}

export default TrendingCard