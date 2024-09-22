import Movie from "../module/Movie";

function Movies({ data, genreReference, theMovieDBOptions }) {
  const userLocale = new Intl.NumberFormat().resolvedOptions().locale;

  const movies = data.results.map((item, key) => (
    <Movie
      key={key}
      title={item.title}
      description={item.overview}
      poster={item.poster_path}
      release={item.release_date}
      voteAverage={item.vote_average}
      voteCount={item.vote_count}
      genres={item.genre_ids}
      genreReference={genreReference}
      theMovieDBOptions={theMovieDBOptions}
      id={item.id}
      userLocale={userLocale}
    />
  ));

  return <div className="movies">{movies}</div>;
}

export default Movies;
