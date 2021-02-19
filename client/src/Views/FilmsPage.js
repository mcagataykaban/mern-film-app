import React, { useEffect, useState } from "react";
import Film from "../components/Film";

const FilmsPage = () => {
  const [films, setFilms] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4000/films")
      .then((res) => res.json())
      .then((data) => setFilms(data));
  }, []);
  return (
    <div className="row p-4 justify-content-center align-items-center">
      {films.map((f) => (
        <div key={f._id} className="m-3">
          <Film rate={f.rate} id={f._id} name={f.name} minutes={f.minutes} imgUrl={f.imgUrl} />
        </div>
      ))}
    </div>
  );
};

export default FilmsPage;
