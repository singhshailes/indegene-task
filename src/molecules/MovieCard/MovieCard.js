import React, { useState, useEffect } from 'react'
import './MovieCard.css'
import Modal from 'react-bootstrap/Modal'

export default function MovieCard(props) {

    const [showModalBox, setShowModalBox] = useState(false)
    const [imdbData, setImdbData] = useState([])
    const [rating, setRating] = useState('')
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
                        <div>
                            <img src={imdbData.Poster} alt="NA" />
                            <p>{imdbData.Title}</p>
                            <p>{imdbData.Actors}</p>
                            <p>{imdbData.Language}</p>
                            <p>{imdbData.Ratings[0].Value}</p>
                    <p>{}</p>
                        </div>)
                    }
                </Modal.Body>
            </Modal>
        </div>
    )



}
