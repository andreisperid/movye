import "./App.css";
import { useEffect, useState } from "react";

import theMovieDBKey from "./keys/keys";
import Movies from "./components/page/Movies";
import CallToAction from "./components/module/CallToAction";

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
  const [currentSelection, setCurrentSelection] = useState(0);

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
            <Movies
              data={nowPlaying}
              genreReference={genreReference}
              theMovieDBOptions={theMovieDBOptions}
              setCurrentSelection={setCurrentSelection}
            />
            <CallToAction data={nowPlaying} currentSelection={currentSelection} />
          </>
        ) : (
          <div className="loading">loading...</div>
        )}
      </div>
    </>
  );
}

export default App;
