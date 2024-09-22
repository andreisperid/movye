import { useEffect, useState } from "react";

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

function Trailer(key) {
  return (
    <iframe
      width="100%"
      // aspectRatio={1.5}
      src={`https://www.youtube.com/embed/${key}`}
      title="Trailer"
      showinfo={0}
      controls={0}
      autohide={1}
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
          <div className={detailsActive ? "details-active" : "details-inactive"}>
            <div className="title">{title}</div>
            <div className="popularity">{popularity}</div>
            <div className="rated">{rated}</div>
            <div className="genres">{getGenres(genres, genreReference)}</div>
            {/* <div className="two-column">
            <div className="release">{releaseDate}</div>
            <div className="votes">{`${parseFloat(voteAverage).toFixed(1)} of 10 (${voteCount})`}</div>{" "}
          </div> */}
            <div className="description">{description}</div>
          </div>
          {/* <Trailer key={`YNoRgQ9rgYI`} /> */}
          <div
            className="collapsible"
            style={{
              height: detailsActive ? "50px" : "unset",
              opacity: detailsActive ? 0.75 : 1,
            }}
          >
            <div className="more-information" onClick={() => setDetailsActive(!detailsActive)}>
              {detailsActive ? `less` : `more`}
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
