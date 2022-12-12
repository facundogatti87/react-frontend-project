import React, { useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../loader/Loader";
import "./TodayMovie.css";


import VideoDescriptionPage from "../../pages/videoDescriptionPage/VideoDescriptionPage";
import useRandomMovie from "../../hooks/useRandomMovie";

const BASE_IMG = process.env.REACT_APP_BASE_URL_IMG;

let movieId;
const movies = 'movies';    // hard

const TodayMovie = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const showDescription = (e, id) => {        
        e.preventDefault()
        handleShow()
        movieId = id;
    } 

    const {loadedMovie, loadedClip, showPlayer} = useRandomMovie()    

    return (        
        <div className="movie_container">
            { loadedMovie ? 
                <div className="home-movie">
                    <img src={BASE_IMG + loadedMovie.backdrop_path} alt='news' className="home-movie-img"></img>
                    {showPlayer ? loadedClip : '' }
                    <div className="home-info-container">
                        <div className={"home-movie-title " + (showPlayer ? "smaller" : "") }>
                            <span className="home-movie-movie">Película</span>
                        </div>
                        <div className={"home-movie-title " + (showPlayer ? "smaller" : "") }>{loadedMovie.title}</div>
                        <p className={"home-movie-overview " + (showPlayer ? "smaller" : "")}>{loadedMovie.overview}</p>
                        <div className="home-movie-buttons">
                            <Link to={"/player/"+loadedMovie.id} className="home-movie-button-rep"><span className="fas fa-play fs-5"></span> Reproducir</Link>
                            <Link to="#" className="home-movie-button-info" onClick={(e)=>{showDescription(e, loadedMovie.id)}}><span className="fas fa-info-circle fs-5"></span> Más información</Link>
                        </div>
                    </div>

                    <VideoDescriptionPage 
                        movieId={movieId}
                        show={show}
                        handleClose={handleClose}
                        type={movies}
                    >
                    </VideoDescriptionPage>
                    <div className="home-movie-bottom"></div>
                </div>
                : <Loader />
            }
        </div>
    );
};

export default TodayMovie;

// const login = (e) => {
//     e.preventDefault()
//     const user = document.forms[0].username.value
//     const pass = document.forms[0].password.value
//     logInWithEmail(user, pass)
// }