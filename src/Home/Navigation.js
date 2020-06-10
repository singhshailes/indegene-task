import React from 'react'
import { Link } from 'react-router-dom'

export default function Navigation(props){
    return(
        <div>
            <nav>
                <Link to='/'>Movie Info</Link> {' | '}
                <Link to='/moviePoster'>Movie Poster</Link>
            </nav>
        </div>
    )
}