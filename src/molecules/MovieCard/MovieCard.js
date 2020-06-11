import React, { useState, useEffect } from 'react'
import './MovieCard.css'
import Modal from 'react-bootstrap/Modal'

export default function MovieCard(props) {

    const [showModalBox, setShowModalBox] = useState(false)
    const [imdbData, setImdbData] = useState([])
    const [isLoading, setIsLoading] = useState(true)



    const showModal = () => {
        setIsLoading(true)
        let url = 'http://www.omdbapi.com/?i=' + props.imdbID + '&plot=full&apikey=328cb361'
        fetch(url)
            .then(res => res.json())
            .then((res) => {
                setImdbData(res)
                setIsLoading(false)

            })
        setShowModalBox(true)
    }


    const handleClose = () => setShowModalBox(false);

    console.log('imdbrating', imdbData)

    return (
        <div className="movie-card-container">
            <p>{props.name}</p>
            <p>{props.year}</p>
            <div className='btn-more-info' onClick={showModal}>More Info</div>

            <Modal show={showModalBox} onHide={handleClose}>
                <Modal.Body>
                    {isLoading ? <p>Loading.. </p> :
                        (
                            <div className='movie-card-modal-content'>
                                <div>
                                <img  className="movie-card-image" src={imdbData.Poster} alt="NA" />
                                </div>
                                <div className='movie-card-allFields'>
                                <p className="movie-card-title">{imdbData.Title}</p>
                                <p className="movie-card-actors">Actors : {imdbData.Actors}</p>
                                <p className="movie-card-lang">Language: {imdbData.Language}</p>
                                <p className="movie-card-awards">Awards: {imdbData.Awards}</p>
                                <p className='movie-card-production'>Production: {imdbData.Production}</p>
                                <p className="movie-card-rating">{Number(imdbData.imdbRating) > 7 ? "BoxOffice:hit" : "BoxOffice : Flop"}</p>
                                
                                </div>
                            </div>)
                    }
                </Modal.Body>
            </Modal>
        </div>
    )



}
