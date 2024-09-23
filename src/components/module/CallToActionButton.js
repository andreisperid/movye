import { useEffect, useState } from "react";

function CallToActionButton({ data, currentSelection }) {
  const [background, setBackground] = useState();
  const [search, setSearch] = useState();

  useEffect(() => {
    try {
      setBackground(data.results[currentSelection].poster_path);
      setSearch(data.results[currentSelection].title.replace(" ", "+").toLowerCase());
    } catch (e) {
      console.log(e);
    }
  }, [data, currentSelection]);

  return (
    <div
      className="button call-to-action-background"
      style={{
        backgroundColor: "red",
        backgroundImage: `url(https://image.tmdb.org/t/p/w500${background})`,
      }}
    >
      <div
        className="call-to-action"
        onClick={() => window.open(`https://www.google.com/search?q=${search}+movie+theater+showtimes`, "_blank")}
      >
        See available times nearby
      </div>
    </div>
  );
}

export default CallToActionButton;
