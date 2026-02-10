export const TMDB_CONFIG = {
  BASE_URL: "https://api.themoviedb.org/3/",
  API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`
  }
}

export const fetchMovies = async ({query}: {query: string}) => {
    const endpoint = query ?
    `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
    :`${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`

    const response = await fetch(endpoint , {
      method: 'GET',
      headers: TMDB_CONFIG.headers
    })

    if(!response.ok){
      // @ts-ignore
       throw new Error(`Failed to fetch movies `, response.statusText)
    }

    const data = await response.json()

    return data.results
}
export const fetchMovieDetails = async (movieId: string): Promise<MovieDetails> => {
    const endpoint = `${TMDB_CONFIG.BASE_URL}/movie/${movieId}?api_key=${TMDB_CONFIG.API_KEY}`

    const response = await fetch(endpoint , {
      method: 'GET',
      headers: TMDB_CONFIG.headers
    })
    if(!response.ok){
      // @ts-ignore
       throw new Error(`Failed to fetch movie details `, response.statusText)
    }
    const data = await response.json()

    return data
}

export const updateSearchCount = async (searchTerm: string , movie: Movie) => {
  try {
    const response =  await fetch('http://192.168.100.18:3000/api/v1/updateSearch', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ searchTerm , movie }),
    });
    if (!response.ok) {
      throw new Error('Failed to update search count');
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating search count:', error);
  }
};

export const getTrendingMovies = async (): Promise<TrendingMovie[] | undefined> => {
  try {
    const response =  await fetch('http://192.168.100.18:3000/api/v1/get-trending', { 
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch trending movies');
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    return [];
  }
};
