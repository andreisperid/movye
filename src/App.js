import "./App.css";
import react, { useEffect, useState } from "react";
import theMovieDBKey from "./keys/keys";
import Movies from "./module/page/Movies";

const theMovieDBOptions = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: "Bearer " + theMovieDBKey(),
  },
};

function App() {
  const [nowPlaying, setNowPlaying] = useState();

  useEffect(() => {
    fetch("https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1", theMovieDBOptions)
      .then((response) => response.json())
      .then((response) => {
        console.log(response)
        setNowPlaying(response)        
      })
      .catch((err) => console.error(err));
  }, []);

  return <div className="App">{nowPlaying ? <Movies data={nowPlaying} /> : "loading"}</div>;
}

export default App;
