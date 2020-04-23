import React,{useState} from "react";
import axios from 'axios'
import '../index.css'
function UpdateMovie(props) {

    const [movie,setMovie] = useState({id:props.match.params.id})

    const  handleSubmit = (e) => {
        e.preventDefault()
        const movieData = {
            ...movie,
            stars:movie.stars.split(',')
        }
        axios.put(`http://localhost:5000/api/movies/${props.match.params.id}`,movieData)
            .then(res => {
                alert("SUCCESS ID UPDATED: " + props.match.params.id)
                props.history.push("/")
            })
            .catch()
}
    const handleChange = (e) => {
        setMovie({
            ...movie,
            [e.target.name] : e.target.value
        })

    }
    return(
        <form onSubmit={handleSubmit}>
            <input
            type="text"
            placeholder="title"
            name = "title"
            onChange={handleChange}
            />
            <br/>
            <input
                type="text"
                placeholder="director"
                name = "director"
                onChange={handleChange}
            />
            <br/>
            <input
                type="text"
                placeholder="metascore"
                name = "metascore"
                onChange={handleChange}
            />
            <br/>
            <input
                type="text"
                placeholder="stars"
                name = "stars"
                onChange={handleChange}
            />
            <br/>
            <button className="add_btn" type = "submit">Add</button>
        </form>
    )
}

export default UpdateMovie