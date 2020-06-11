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
    const [postsPerpage,setPostsPerPage] = useState(3)

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

    //get current posts
    const IndexOfLastPost = currentPage * postsPerpage; 
    const IndexOfFirstPost = IndexOfLastPost - postsPerpage; 
    const currentPost = movieInfoCollection.slice(IndexOfFirstPost,IndexOfLastPost)

    //change page number
    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <div>
            <Header />
            <Navigation />
            <form className='movie-info-form'>
                <h3>Movie info</h3>
                <label>Movie Name</label><br />
                <input type="text"
                    name="movieName"
                    value={movieName}
                    placeholder="Movie name.."
                    onChange={handleChange} /><br /><br />

                <label>Release year</label><br />
                <input type="text"
                    name="releaseYear"
                    value={releaseYear}
                    placeholder="Release year .."
                    onChange={handleChange} /><br /><br />
                <button onClick={handleSubmit}>Submit</button>
            </form>
            <div className="movie-info-container">
            {
                movieInfoCollection.length > 0
                    ? currentPost.map(item => (
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
            
            </div>
            
            <Pagination
                postsPerpage={postsPerpage}
                totalPosts={movieInfoCollection.length}
            />
        </div>
    )

}