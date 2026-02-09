import Movie from "../models/movieModel.js";

export const updateSearchCount = async (req, res) => {
  // Logic to fetch trending movies from the database
  const { searchTerm , movie } = req.body;
  try{
  if(!searchTerm || !movie){
    return res.status(400).json({ message: "Invalid request data" });
  }
  const existingmovie = await Movie.findOne({ movie_id: movie.id });
  if(existingmovie){
    existingmovie.count += 1;
    const response = await existingmovie.save();
    if(response){
      return res.status(200).json({ message: "Movie updated successfully", data: response });
    }
  }
  const newMovie = new Movie({
    searchTerm: searchTerm,
    count: 1,
    poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
    movie_id: movie.id,
    movie_title: movie.title,
  });
  const response = await newMovie.save();
  if(response){
    return res.status(200).json({ message: "Movie saved successfully", data: response });
  }
}  catch(error){
    console.error("Error saving movie:", error);
    return res.status(500).json({ message: "Server error" });
  }
}

export const getTrendingMovies = async (req, res) => {
  // Logic to fetch trending movies from the database
  try {
    const trendingMovies = await Movie.find().sort({ count: -1 }).limit(10);
    return res.status(200).json({ data: trendingMovies });
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    return res.status(500).json({ message: "Server error" });
  }
};