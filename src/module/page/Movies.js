import Movie from "../item/Movie";

function Movies({ data }) {
  const movies = data.results.map((item, key) => <Movie key={key} title={item.original_title} description={item.overview} poster={item.poster_path} />);

  return <div className="movies">{movies}</div>;
}

export default Movies;
