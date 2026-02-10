import { Client, Databases } from "react-native-appwrite";

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const MOVIES_TABLE_ID = "movies";

const client = new Client()
  .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);

const database = new Databases(client);

// export const updateSearchCount = async (searchTerm: string, movie?: Movie) => {
//   try {
//     if (!searchTerm || !movie) return;
//     const result = await database.listDocuments(DATABASE_ID, MOVIES_TABLE_ID, [
//       Query.equal("searchTerm", searchTerm),
//     ]);

//     if (result.documents.length > 0) {
//       const existinMovie = result.documents[0];
//       await database.updateDocument(
//         DATABASE_ID,
//         MOVIES_TABLE_ID,
//         existinMovie.$id,
//         {
//           count: existinMovie.count + 1,
//         }
//       );
//     } else {
//       await database.createDocument(DATABASE_ID, MOVIES_TABLE_ID, ID.unique(), {
//         searchTerm,
//         movie_id: movie.id,
//         movie_title: movie.title,
//         poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
//         count: 1,
//       });
//     }
//   } catch (error) {
//     console.error("Error updating search count:", error);
//   }
// };


// export const getTrendingMovies = async (): Promise<TrendingMovie[] | undefined> => {
//   try {
//     const result = await database.listDocuments(
//       DATABASE_ID,
//       MOVIES_TABLE_ID, 
//       [Query.orderDesc("count"), Query.limit(10)]
//     );
//     return result.documents as unknown as TrendingMovie[];
//   }
//   catch (error) {
//     console.error("Error fetching trending movies:", error);
//     return [];
//   }
// };