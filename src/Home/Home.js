import React,{useState} from 'react'
import Header from '../atoms/Header/Header'
import { Link, Route } from 'react-router-dom'
import Navigation from './Navigation'
import './Home.css'

export default function Home(props) {
    const [movieName,setMovieName] = useState('');
    const [releaseYear,setReleaseYear] = useState('');
    const [movieInfoCollection,setMovieInfoCollection] = useState([])

    const handleSubmit = (e)=>{
        e.preventDefault()
        let url='http://www.omdbapi.com/?s='+movieName+'&y='+releaseYear+'&apikey=328cb361'
        fetch(url)
        .then(res=>res.json())
        .then(res=>setMovieInfoCollection(res.Search))               
    }

 

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
            <Navigation/>
            <form className='movie-info-form'>
                <h3>Movie info</h3>
                <label>Movie Name</label><br/>
                <input type="text"  
                    name="movieName" 
                    value={movieName} 
                    placeholder="Movie name.."
                    onChange={handleChange}/><br/><br/>

                <label>Release year</label><br/>
                <input type="text" 
                    name="releaseYear" 
                    value={releaseYear} 
                    placeholder="Release year .."
                    onChange={handleChange}/><br/><br/>
                <button onClick={handleSubmit}>Submit</button>
            </form>
            {
                movieInfoCollection.length>0
                ?movieInfoCollection.map(item=>(
                    <div key={item.imdbID}>
                        <div className="movie-info-card">
                            <p>{item.Title}</p>
                            <p>{item.Year}</p>
                            <p>{item.Type}</p>

                        </div>
                    </div>
                ))
                :null
            }
        </div>
    )

}