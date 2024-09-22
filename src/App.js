import "./App.css";
import { useEffect, useState } from "react";
import theMovieDBKey from "./keys/keys";
import Movies from "./components/page/Movies";

const theMovieDBOptions = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: "Bearer " + theMovieDBKey(),
  },
};

function App() {
  const [nowPlaying, setNowPlaying] = useState();
  const [genreReference, setGenresReference] = useState();

  useEffect(() => {
    // get films
    fetch("https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1", theMovieDBOptions)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setNowPlaying(response);
      })
      .catch((err) => console.error(err));

    // get categories and populate a map
    fetch("https://api.themoviedb.org/3/genre/movie/list?language=en", theMovieDBOptions)
      .then((response) => response.json())
      .then((response) => {
        const genresMap = new Map();
        response.genres.map((item) => genresMap.set(item.id, item.name));
        setGenresReference(genresMap);
      })
      .catch((err) => console.error(err));

    fetch("https://api.themoviedb.org/3/movie/1022789/videos?language=en-US", theMovieDBOptions)
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
    <div className="noise"></div>
      <div className="App">
        <div className="left blind"></div>
        <div className="right blind"></div>
        <div className="header">
          <div className="logo">movyeo</div>
        </div>
        <div className="scroll-area">
          {nowPlaying ? (
            <Movies data={nowPlaying} genreReference={genreReference} />
          ) : (
            <div className="loading">loading...</div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
