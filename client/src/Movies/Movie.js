import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import MovieCard from "./MovieCard";
import {Link} from "react-router-dom";
import '../index.css'


function Movie({ addToSavedList,props }) {
  const [movie, setMovie] = useState(null);
  const params = useParams();

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

   const handleDelete = (id) => {
        axios
            .delete(`http://localhost:5000/api/movies/${params.id}`)
            .then(res => {
                console.log(res);
                alert("SUCCESS ID REMOVED: " + params.id)
                props.history.push("/");

            })
            .catch(err => console.log(err));
    };

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />
      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
    <br/>
    <Link to = {`/update-movie/${movie.id}`}>Update Movie</Link>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default Movie;
