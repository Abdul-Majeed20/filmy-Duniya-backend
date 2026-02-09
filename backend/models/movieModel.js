import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  searchTerm: { type: String, required: true , maxlength: 100 },
  count: { type: Number , default: 0 },
  poster_url: { type: String },
  movie_id: { type: Number, required: true, unique: true },
  movie_title: { type: String, required: true },

}, { timestamps: true })

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;