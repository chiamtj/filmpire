import React from 'react'
import { useState, useEffect } from 'react';
import './App.css';
import searchicon from './search.svg';
import MovieCard from './component/MovieCard';

const API_URL = 'http://www.omdbapi.com/?i=tt3896198&apikey=ac323fb6'

// const movie1 = 
// {
//     "Title": "Spiderman",
//     "Year": "1990",
//     "imdbID": "tt0100669",
//     "Type": "movie",
//     "Poster": "N/A"
// }

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`)
    const data = await response.json();

    // console.log(data)
    setMovies(data.Search)
  }

  useEffect ( () => {
    searchMovies('spiderman');
  },[]);

  return (
    <div className='app'>
      <h1>MovieLand</h1>

      <div className='search'>
        <input 
          placeholder='Search for movies'
          value= {searchTerm}
          onChange={(e)=> {setSearchTerm(e.target.value)} }
        />
        <img 
          src = {searchicon} 
          alt='search'
          onClick={()=>{searchMovies(searchTerm)} }
        />
      </div>
      {
        movies?.length > 0 ?
        ( <div className='container'>
          {movies.map((m) => (
            <MovieCard movie={m}/>
          ))}
          
          </div> ) : (
            <div className='empty'>
              <h2>No movies found</h2>
            </div>
        )
      }
      

    </div>
    
  )
}

export default App;
