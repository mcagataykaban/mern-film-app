import React from "react";
import Film from "../components/Film";

const FilmsPage = (props) => {
  
  return (
    <div className="row p-4 justify-content-center align-items-center">
      {props.films.map((f) => (
        <div key={f._id} className="m-3">
          <Film rate={f.rate} id={f._id} name={f.name} minutes={f.minutes} imgUrl={f.imgUrl} />
        </div>
      ))}
    </div>
  );
};

export default FilmsPage;
