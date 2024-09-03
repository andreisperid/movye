import Movie from "../module/Movie";

function Movies({ data, genreReference }) {
  const movies = data.results.map((item, key) => (
    <Movie
      key={key}
      title={item.original_title}
      description={item.overview}
      poster={item.poster_path}
      release={item.release_date}
      voteAverage={item.vote_average}
      voteCount={item.vote_count}
      genres={item.genre_ids}
      genreReference={genreReference}
    />
  ));

  return <div className="movies">{movies}</div>;
}

export default Movies;
