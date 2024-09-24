import "./Trailer.css";

function Trailer({ videoKey }) {
  return (
    <iframe
      className="trailer"
      width="100%"
      height="100%"
      src={`https://www.youtube.com/embed/${videoKey}`}
      title="YouTube video player"
      color="white"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
    ></iframe>
  );
}

export default Trailer;