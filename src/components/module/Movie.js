import "./Movie.css";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { MaterialSymbolsLightStarOutlineRounded, MaterialSymbolsLightOpenInNewRounded } from "../scripts/icons.js";
import Trailer from "./Trailer.js";

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
  const [divId, setDivId] = useState(`movie${index}`);

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
        setRuntime(response.runtime);
        setCountry(response.origin_country);
      })
      .catch((err) => console.error(err));

    // get rating certification
    fetch(`https://api.themoviedb.org/3/movie/${id}/release_dates`, theMovieDBOptions)
      .then((response) => response.json())
      .then((response) => {
        for (const r of response.results) {
          if (r.iso_3166_1 == userLocale.slice(-2))
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
        for (const r of response.crew) {
          if (r.job == "Director") {
            setDirector(r.name);
          }
        }
        const topActors = [];
        for (let i = 0; i < 3; i++) {
          topActors.push(response.cast[i].name);
        }
        setActors(topActors);
      })
      .catch((err) => console.error(err));

    // get youtube official trailer based on movie ID
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, theMovieDBOptions)
      .then((response) => response.json())
      .then((response) => {
        // prioritize videos that starts with ideal match, then broaden
        for (const r of response.results) {
          if (r.name.startsWith("Official Trailer")) {
            setTrailerId(r.key);
            return;
          }
        }
        for (const r of response.results) {
          if (r.name.includes("Official Trailer")) {
            setTrailerId(r.key);
            return;
          }
        }
        for (const r of response.results) {
          if (r.name.startsWith("Trailer")) {
            setTrailerId(r.key);
            return;
          }
        }
        for (const r of response.results) {
          if (r.name.includes("Trailer")) {
            setTrailerId(r.key);
            return;
          }
        }
        for (const r of response.results) {
          if (r.name.includes("Clip")) {
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
        id={divId}
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
            <div className="genres">{getGenres(genres, genreReference).replace(".", "")}</div>
            <div className="votes">
              <MaterialSymbolsLightStarOutlineRounded />
              {` ${parseFloat(voteAverage).toFixed(1)} of 10 (${voteCount})`}
            </div>
            <div className="description" lang="en">
              {/* TODO: smart paragraph breaking for description */}
              <p>{description}</p>
            </div>
            <div className="extra-information">
              <div className="three-column">
                <div className="country">
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
              <div className="three-columns">
                <div></div>
                <div className="trailer-link">
                  <a href={`https://www.youtube.com/watch?v=${trailerId}`} target="_blank">
                    Watch trailer
                  </a>{" "}
                  <MaterialSymbolsLightOpenInNewRounded />
                </div>
                <div></div>
              </div>
            </div>
          </div>
          {trailerId && detailsActive ? <Trailer videoKey={trailerId} /> : null}
          <div
            className="collapsible"
            style={{
              height: detailsActive ? "69px" : "calc( 75vw / 0.66 + 35px)",
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
