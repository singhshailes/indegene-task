import React, { useState } from 'react'
import Header from '../../atoms/Header/Header'
import Navigation from '../Navigation'
import './MoviePoster.css'

export default function MoviePoster() {

    const [movieName,setMovieName] = useState('');
    const [releaseYear,setReleaseYear] = useState('');
    const [movieCollection,setMovieCollection] = useState([])

    const handleSubmit = (e)=>{
        e.preventDefault()
        let url='http://www.omdbapi.com/?s='+movieName+'&y='+releaseYear+'&apikey=328cb361'
        fetch(url)
        .then(res=>res.json())
        .then(res=>setMovieCollection(res.Search))               
    }

    console.log('movie collection',movieCollection)

    const handleChange=(e)=>{        
        e.preventDefault()
        if(e.target.name==='movieName'){
            setMovieName(e.target.value)
        }
        if(e.target.name==='releaseYear'){            
            setReleaseYear(e.target.value)
        }
    }


    return (
        <div>
            <Header />
            <Navigation />

            <form className='movie-poster-form'>
                <h3>Movie Poster</h3>
                <label>Movie Name</label>
                <input type="text"  
                    name="movieName" 
                    value={movieName} 
                    placeholder="Movie name.."
                    onChange={handleChange}/><br/>

                <label>Release year</label>
                <input type="text" 
                    name="releaseYear" 
                    value={releaseYear} 
                    placeholder="Release year .."
                    onChange={handleChange}/><br/>
                <button onClick={handleSubmit}>Submit</button>
            </form>
            <div className="movie-poster-container">
            {
                movieCollection.length>0 
                ? movieCollection.map(item=>
                <div>
                    <img src={item.Poster} alt='error'/>
                </div>)
                :null
            }
            </div>
            

        </div>
    )
}