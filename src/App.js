import "./App.css";
import { useEffect, useState } from "react";
import Movies from "./components/page/Movies";
import CallToActionButton from "./components/module/CallToActionButton";
import Assistant from "./components/module/Assistant";
import prompt from "./components/scripts/prompt";

import keys from "./keys/keys"; // TODO: create backend script to obfuscate keys

const theMovieDBOptions = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: "Bearer " + keys.theMovieDBKey(),
  },
};

const openAIOptions = {
  apiKey: keys.openAIKey(),
  dangerouslyAllowBrowser: true,
};

function App() {
  const [announcements, setAnnouncements] = useState();
  const [genreReference, setGenresReference] = useState();
  const [currentSelection, setCurrentSelection] = useState(0);
  const [prePrompt, setPrePrompt] = useState();

  useEffect(() => {
    // get films
    fetch("https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1", theMovieDBOptions)
      .then((response) => response.json())
      .then((response) => {
        setAnnouncements(response);
        setPrePrompt(prompt.filmFragment(response, openAIOptions));
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
      <div className="App">
        <div className="noise"></div>
        <div className="left blind"></div>
        <div className="right blind"></div>
        <div className="left blind-secondary"></div>
        <div className="right blind-secondary"></div>
        <div className="header">
          <div className="logo">movyeo</div>
        </div>
        {announcements ? (
          <>
            <Movies
              data={announcements}
              genreReference={genreReference}
              theMovieDBOptions={theMovieDBOptions}
              setCurrentSelection={setCurrentSelection}
            />
            <CallToActionButton data={announcements} currentSelection={currentSelection} />
            <Assistant prePrompt={prePrompt} openAIOptions={openAIOptions} />
          </>
        ) : (
          <div className="loading"></div>
        )}
      </div>
    </>
  );
}

export default App;
