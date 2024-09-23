import { useEffect, useState } from "react";

function CallToActionButton({ data, currentSelection }) {
  const [background, setBackground] = useState();
  const [search, setSearch] = useState();

  useEffect(() => {
    try {
      setSearch(data.results[currentSelection].title.replace(" ", "+").toLowerCase());
    } catch (e) {
      console.log(e);
    }
  }, [data, currentSelection]);

  return (
    <div
      className="button call-to-action-background"
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
