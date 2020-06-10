import React from 'react'
import Home from './Home/Home'
import {Switch,Router,Route} from 'react-router-dom'
import MoviePoster from './Home/MoviePoster/MoviePoster'
import { createBrowserHistory } from "history";

export default function App(){
    const history=createBrowserHistory();
    return(
        <div>
           <Router history={history}>
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route path ='/moviePoster' component = {MoviePoster}/>
                    </Switch>
                </Router>
        </div>
    )
}