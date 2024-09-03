function Movie({ title = "title", poster = "poster", description = "description", rated = "rated" }) {
  return (
    <div className="movie-background" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w500${poster})` }}>
      <div className="movie">
        <div className="title">{title}</div>
        <div className="poster" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w500${poster})` }}></div>
        <div className="description">{description}</div>
        <div className="rated">{rated}</div>
      </div>
    </div>
  );
}

export default Movie;
