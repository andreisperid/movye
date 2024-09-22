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
  const [certificationReference, setCertificationReference] = useState();

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

    // get youtube trailer IDs
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
        <div className="left blind-secondary"></div>
        <div className="right blind-secondary"></div>
        <div className="header">
          <div className="logo">movyeo</div>
        </div>
        {nowPlaying ? (
          <>
            <Movies data={nowPlaying} genreReference={genreReference} />
            <div
              className="button call-to-action"
              onClick={() =>
                window.open(
                  // `https://www.google.com/search?q=${title.replace(" ", "+").toLowerCase()}+movie+theater+showtimes`,
                  "_blank"
                )
              }
            >
              See available times nearby
            </div>
          </>
        ) : (
          <div className="loading">loading...</div>
        )}
      </div>
    </>
  );
}

export default App;
