import Venue from "./Venue";

function Time({ venue = "venue"}) {
    return (
      <div className="times">
        <div className="venue">{venue}</div>
        <Venue />
      </div>
    );
  }
  
  export default Time;
  