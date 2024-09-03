function getGenres(genres, genreReference) {
  let genreList = [];

  if (genres && genreReference) {
    for (const genre of genres) {
      if (genreReference.get(genre)) {
        genreList.push(genreReference.get(genre));
      }
    }
  }
  return genreList.join(", ") + ".";
}

function Movie({
  title = "",
  poster = "",
  description = "",
  rated = "",
  release = "",
  popularity = "",
  voteAverage = "",
  voteCount = "",
  genres,
  genreReference,
}) {
  return (
    <div className="movie-background" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w500${poster})` }}>
      <div className="movie">
        <div className="poster" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w500${poster})` }}></div>
        <div className="title">{title}</div>
        <div className="description">{description}</div>
        <div className="rated">{rated}</div>
        <div className="release">Released on {release}</div>
        <div className="popularity">{popularity}</div>
        <div className="votes">{`${parseFloat(voteAverage).toFixed(1)} of 10 (${voteCount})`}</div>
        <div className="genres">{getGenres(genres, genreReference)}</div>
      </div>
    </div>
  );
}

export default Movie;
