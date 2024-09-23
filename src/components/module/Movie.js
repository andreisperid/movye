import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

import {
  MaterialSymbolsLightStarOutlineRounded,
  MaterialSymbolsLightCalendarMonthOutline,
  MaterialSymbolsLightRocketLaunchOutline,
} from "../scripts/icons.js";

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

function Trailer({ videoKey }) {
  return (
    <iframe
      className="trailer"
      // width="100%"
      // src={`https://www.youtube.com/embed/${videoKey}`}
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
  release = "",
  voteAverage = "",
  voteCount = "",
  id = 0,
  genres,
  genreReference,
  theMovieDBOptions = {},
  userLocale = "",
  setCurrentSelection,
  index,
}) {
  const [releaseDate, setReleaseDate] = useState();
  const [detailsActive, setDetailsActive] = useState(false);
  const [trailerId, setTrailerId] = useState("");
  const [runtime, setRuntime] = useState("");
  const [country, setCountry] = useState("");
  const [certification, setCertification] = useState("");
  const [actors, setActors] = useState("");
  const [director, setDirector] = useState("");

  const { ref, inView } = useInView({
    threshold: 0.75,
  });

  useEffect(() => {
    if (inView) {
      setCurrentSelection(index);
    } else {
      setDetailsActive(false);
    }

    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };

    // get extra details
    fetch(`https://api.themoviedb.org/3/movie/${id}language=en-US`, theMovieDBOptions)
      .then((response) => response.json())
      .then((response) => {
        // console.log(response);
        setRuntime(response.runtime);
        setCountry(response.origin_country);
      })
      .catch((err) => console.error(err));

    // get rating certification
    fetch(`https://api.themoviedb.org/3/movie/${id}/release_dates`, theMovieDBOptions)
      .then((response) => response.json())
      .then((response) => {
        // console.log(response.results);
        for (const r of response.results) {
          if (r.iso_3166_1 == userLocale.slice(-2))
            // console.log(r.release_dates)
            for (const c of r.release_dates) {
              if (c.type == "3") {
                setCertification(c.certification);
                return;
              }
              // in case no movie theater rating is available, try picking a Digital, Physical or TV one‰
              if (c.type > 3) {
                setCertification(c.certification);
                return;
              }
            }
        }
        return "";
      })
      .catch((err) => console.error(err));

    // get director and main actors
    fetch(`https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`, theMovieDBOptions)
      .then((response) => response.json())
      .then((response) => {
        // console.log(response)
        for (const r of response.crew) {
          if (r.job == "Director") {
            // console.log(r.name);
            setDirector(r.name);
          }
        }
        const topActors = [];
        for (let i = 0; i < 3; i++) {
          topActors.push(response.cast[i].name);
        }
        setActors(topActors);
        // console.log(actors);
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
  }, [inView]);

  return (
    <>
      <div
        id={`movie${index}`}
        className="movie-background"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w500${poster})`,
          zIndex: inView ? "100" : "unset",
        }}
      >
        <div
          className="movie"
          style={{
            outline: inView ? "2px solid #ffffffff" : "2px solid #ffffff00",
          }}
          ref={ref}
        >
          <div
            className="details"
            style={{
              height: detailsActive ? "100%" : "calc(100% - 75vw / 0.66)",
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
              {/* TODO: smart paragraph breaking, below doesn't work for short sentences */}
              {/* {description.split(". ").map((item, key) => (
                <p key={key}>{(item + ".").replace("..", ".")}</p>
              ))} */}
              <p>{description}</p>
            </div>
            <div className="extra-information">
              <div className="three-column">
                {/* <div className="popularity">{popularity}a</div> */}
                <div className="country">
                  {/* <MaterialSymbolsLightRocketLaunchOutline /> */}
                  <span className="label">Country</span>
                  {` ${country}`}
                </div>
                <div className="runtime">
                  <span className="label">Runtime</span>
                  {` ${runtime} min`}
                </div>
                <div className="certification">
                  <span className="label">Rated</span>
                  {` ${certification ? certification : "-"}`}
                </div>
              </div>

              <div className="one-column">
                <div className="item release">
                  {/* <MaterialSymbolsLightRocketLaunchOutline /> */}
                  <span className="label">Release</span>
                  {` ${releaseDate}`}
                </div>
                <div className="item runtime">
                  <span className="label">Director</span>
                  {` ${director}`}
                </div>
                <div className="item certification">
                  <span className="label">Cast</span>
                  {` ${actors.toString().replaceAll(",", ", ")}`}
                </div>
              </div>
            </div>
          </div>
          {trailerId ? <Trailer video={trailerId} /> : null}
          <div
            className="collapsible"
            style={{
              height: detailsActive ? "69px" : "calc( 75vw / 0.66 + 35px)",
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
              onClick={() => setDetailsActive(!detailsActive)}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Movie;
