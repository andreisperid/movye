import { useEffect, useState } from "react";

import {
  MaterialSymbolsLightStarOutlineRounded,
  MaterialSymbolsLightCalendarMonthOutline,
  MaterialSymbolsLightRocketLaunchOutline,
} from "./icons.js";

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

function Trailer({ video }) {
  return (
    <iframe
      className="trailer"
      // width="100%"
      src={`https://www.youtube.com/embed/${video}`}
      title=""
      color="white"
      // controls="0"
      iv_load_policy="3"
      frameBorder="0"
      rel="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
    ></iframe>
  );
}

function Movie({
  title = "",
  poster = "",
  description = "",
  certification = "",
  release = "",
  popularity = "",
  voteAverage = "",
  voteCount = "",
  id = 0,
  genres,
  genreReference,
  theMovieDBOptions = {},
}) {
  const [releaseDate, setReleaseDate] = useState();
  const [detailsActive, setDetailsActive] = useState(false);
  const [trailerId, setTrailerId] = useState("");
  const [runtime, setRuntime] = useState("");
  const [country, setCountry] = useState("");

  useEffect(() => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };

    // get extra details from this movie
    fetch(`https://api.themoviedb.org/3/movie/${id}language=en-US`, theMovieDBOptions)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setRuntime(response.runtime);
        setCountry(response.origin_country);
      })
      .catch((err) => console.error(err));

    // get first youtube official trailer based on ID, then fallback to less ideal video categories
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, theMovieDBOptions)
      .then((response) => response.json())
      .then((response) => {
        // console.log(title, response.results);
        // prioritize videos that starts with ideal match, then broaden
        for (const r of response.results) {
          if (r.name.startsWith("Official Trailer")) {
            setTrailerId(r.key);
            return;
          }
        }
        for (const r of response.results) {
          if (r.name.includes("Official Trailer")) {
            // console.log(r.name);
            setTrailerId(r.key);
            return;
          }
        }
        for (const r of response.results) {
          if (r.name.startsWith("Trailer")) {
            // console.log(r.name);
            setTrailerId(r.key);
            return;
          }
        }
        for (const r of response.results) {
          if (r.name.includes("Trailer")) {
            // console.log(r.name);
            setTrailerId(r.key);
            return;
          }
        }
        for (const r of response.results) {
          if (r.name.includes("Clip")) {
            // console.log(r.name);
            setTrailerId(r.key);
            return;
          }
        }
        // extreme fallback in case nothing better is found
        setTrailerId(response.results[0].key);
      })
      .catch((err) => console.error(err));

    setReleaseDate(new Date(release).toLocaleDateString("en-US", options));
  }, []);

  return (
    <>
      <div className="movie-background" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w500${poster})` }}>
        <div className="movie">
          <div
            className="details"
            style={{
              height: detailsActive ? "100%" : "calc(100% - 80vw / 0.66)",
              mask: detailsActive
                ? "linear-gradient(0deg, white 0%, white 100%)"
                : "linear-gradient(0deg, transparent 15%, black 100%)",
            }}
          >
            <div className="title">{title}</div>
            <div className="genres">{getGenres(genres, genreReference).replace(".", "")}</div>{" "}
            <div className="votes">
              <MaterialSymbolsLightStarOutlineRounded />
              {` ${parseFloat(voteAverage).toFixed(1)} of 10 (${voteCount})`}
            </div>
            <div className="description" lang="en">
              {description.split(". ").map((item, key) => (
                <p key={key}>{(item + ".").replace("..", ".")}</p>
              ))}
            </div>
            <div className="extra-information">
              <div className="two-column">
                <div className="release">
                  {/* <MaterialSymbolsLightRocketLaunchOutline /> */}
                  {`Release: ${releaseDate}`}
                </div>
                <div className="country">
                  {/* <MaterialSymbolsLightRocketLaunchOutline /> */}
                  {country.length > 1 ? "Countries:" : "Country:" + ` ${country}`}
                </div>
              </div>

              <div className="two-column">
                {/* <div className="popularity">{popularity}a</div> */}
                <div className="runtime">{`Runtime: ${runtime} min`}</div>
                <div className="certification">{`Rated: ${certification}`}</div>
              </div>
            </div>
          </div>
          {trailerId ? <Trailer video={trailerId} /> : null}
          <div
            className="collapsible"
            style={{
              height: detailsActive ? "69px" : "calc( 80vw / 0.66 + 35px)",
              opacity: detailsActive ? 0.75 : 1,
            }}
          >
            <div className="more-information" onClick={() => setDetailsActive(!detailsActive)}>
              {detailsActive ? `↑ poster` : `↓ details`}
            </div>
            <div
              className="poster"
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/w500${poster})`,
              }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Movie;
