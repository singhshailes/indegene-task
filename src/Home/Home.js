import React, { useState } from 'react'
import Header from '../atoms/Header/Header'
import { Link, Route } from 'react-router-dom'
import Navigation from './Navigation'
import './Home.css'
import MovieCard from '../molecules/MovieCard/MovieCard'
import Pagination from './Pagination'



export default function Home(props) {
    const [movieName, setMovieName] = useState('');
    const [releaseYear, setReleaseYear] = useState('');
    const [movieInfoCollection, setMovieInfoCollection] = useState([])
    const [currentPage,setCurrentPage] = useState(1)
    const [lowIndex,setLowIndex] = useState(0)
    const [highIndex,setHighIndex] = useState(3)

    const handleSubmit = (e) => {
        e.preventDefault()
        let url = 'http://www.omdbapi.com/?s=' + movieName + '&y=' + releaseYear + '&apikey=328cb361'
        fetch(url)
            .then(res => res.json())
            .then(res => setMovieInfoCollection(res.Search))
    }



    const handleChange = (e) => {
        e.preventDefault()
        if (e.target.name === 'movieName') {
            setMovieName(e.target.value)
        }
        if (e.target.name === 'releaseYear') {
            setReleaseYear(e.target.value)
        }
    }
    function handlePageChange (currentPage){
        console.log('pagevalue',currentPage)
        setCurrentPage(currentPage)
        setLowIndex((currentPage - 1) * 3)
        setHighIndex(currentPage*3)

    }
    return (
        <div>
            <Header />
            <Navigation />
            <form className='movie-info-form'>
                <h3>Movie Info</h3>
                <label>Movie Name</label>
                <input type="text"
                    name="movieName"
                    value={movieName}
                    placeholder="Movie name.."
                    onChange={handleChange} /><br />

                <label>Release year</label>
                <input type="text"
                    name="releaseYear"
                    value={releaseYear}
                    placeholder="Release year .."
                    onChange={handleChange} /><br />
                <button onClick={handleSubmit}>Submit</button>
            </form>
            <div className="movie-info-container">
                {
                    movieInfoCollection.length > 0
                        ? movieInfoCollection.slice(lowIndex,highIndex).map(item => (
                            <div key={item.imdbID}>
                                <MovieCard
                                    name={item.Title}
                                    year={item.Year}
                                    imdbID={item.imdbID}
                                />
                            </div>
                        ))
                        : null
                }
                <Pagination
                    perPage={3}
                    totalPages={Math.ceil(movieInfoCollection.length/3)}
                    page={currentPage}
                    goToPage={handlePageChange}
                />

            </div>


        </div>
    )

}