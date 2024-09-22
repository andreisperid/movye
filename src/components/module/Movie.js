import { useEffect, useState } from "react";

import {
  MaterialSymbolsLightStarOutlineRounded,
  MaterialSymbolsLightCalendarMonthOutline
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

function Trailer({video}) {

  return (
    <iframe
      className="trailer"
      width="100%"
      src={`https://www.youtube.com/embed/${video}`}
      title=""
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
    ></iframe>
  );
}

function Movie({
  title = "",
  poster = "",
  description = "",
  rated = "",
  release = "",
  popularity = "",
  voteAverage = "",
  voteCount = "",
  genres,
  genreReference,
}) {
  const [releaseDate, setReleaseDate] = useState();
  const [detailsActive, setDetailsActive] = useState(false);

  useEffect(() => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    setReleaseDate(new Date(release).toLocaleDateString("en-US", options));
  });

  return (
    <>
      <div className="movie-background" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w500${poster})` }}>
        <div className="movie">
          <div
            //  className={detailsActive ? "details-active" : "details-inactive"}
            className="details"
            style={{
              height: detailsActive ? "100%" : "calc(100% - 80vw / 0.66)",
              mask: detailsActive
                ? "linear-gradient(0deg, white 0%, white 100%)"
                : "linear-gradient(0deg, transparent 15%, black 100%)",
            }}
          >
            <div className="title">{title}</div>
            <div className="popularity">{popularity}</div>
            <div className="rated">{rated}</div>
            <div className="genres">{getGenres(genres, genreReference).replace(".", "")}</div>
            <div className="description">{description}</div>
            <div className="two-column">
              <div className="release"><MaterialSymbolsLightCalendarMonthOutline/>{` ${releaseDate}`}</div>
              <div className="votes"><MaterialSymbolsLightStarOutlineRounded/>{` ${parseFloat(voteAverage).toFixed(1)} of 10 (${voteCount})`}</div>{" "}
            </div>
            {/* <Trailer video={`LEjhY15eCx0`} />  */}
          </div>
          <div
            className="collapsible"
            style={{
              height: detailsActive ? "39px" : "calc( 80vw / 0.66 + 40px)",
              opacity: detailsActive ? 0.75 : 1,
            }}
          >
            <div className="more-information" onClick={() => setDetailsActive(!detailsActive)}>
              {detailsActive ? `▴ poster` : `▾ details`}
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
