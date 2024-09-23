import { useEffect, useState } from "react";

import { MaterialSymbolsLightOpenInNewRounded } from "../scripts/icons.js";

function CallToActionButton({ data, currentSelection }) {
  const [search, setSearch] = useState();

  useEffect(() => {
    try {
      setSearch(data.results[currentSelection].title.replace(" ", "+").toLowerCase());
    } catch (e) {
      // console.log(e);
    }
  }, [data, currentSelection]);

  return (
    <div className="button call-to-action-background">
      <div
        className="call-to-action"
        onClick={() => window.open(`https://www.google.com/search?q=${search}+movie+theater+showtimes`, "_blank")}
      >
        See available times nearby{" "}
        <span style={{ paddingLeft: "0.2em" }}>
          <MaterialSymbolsLightOpenInNewRounded />
        </span>
      </div>
    </div>
  );
}

export default CallToActionButton;
