import React from 'react'
import { Link } from 'react-router-dom'
import './Navigation.css'

export default function Navigation() {
    return (
        <div>
            
            <Link to='/' className='navigation-link'>Movie Info</Link> {'  '}
            <Link to='/moviePoster' className='navigation-link'>Movie Poster</Link>

        </div>
    )
}