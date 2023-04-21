export const Movies = ({ movies }) => {
  const hasMovies = movies?.length > 0;

  return hasMovies ? <ListOfMovies movies={movies} /> : <NoMoviesResults />;
};

export const ListOfMovies = ({ movies }) => {
  return (
    <ul className="w-full grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4 text-white">
      {movies.map((movie) => (
        <li key={movie.id}>
          <div className="flex xl:flex-col items-center justify-between mb-2">
            <h3 className="text-2xl line-clamp-1">{movie.title}</h3>
            <p>{movie.year}</p>
          </div>
          <img src={movie.poster} alt={movie.title} className="w-full" />
        </li>
      ))}
    </ul>
  );
};

export const NoMoviesResults = () => {
  return (
    <p className="text-red-500">
      No se encontraron películas para esta búsqueda
    </p>
  );
};
