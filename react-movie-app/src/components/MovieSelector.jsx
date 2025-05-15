import { useState } from "react";

const MovieSelector = () => {

    let moviesData = [
        {
            genre: "Animation",
            movieNames: ["The Lion King", "Toy Story", "Moana", "Finding Nemo"]
        },

        { 
            genre: "Sci-Fi", 
            movieNames: ["Space Man", "Gravity", "Martian", "The Terminator"] 
        },

        { 
            genre: "Comedy", 
            movieNames: ["The Nice Guys", "The Lego Movie", "Midnight in Paris"] 
        },

        { 
            genre: "Action", 
            movieNames: ["Mission: Impossible", "Tenet", "Spider-Man"] 
        }

    ];

//Assign the empty value for genre & movieNames to current state variable genreData
    const [genreData, setGenreData] = useState({
        genre:"",
        movieNames:[],
    });

//Create a state variable selectedGenre which stores the selected genre if the user selects the genre in the page.
    const [selectedGenre, setSelectedGenre] = useState("");

//Create state variable for display the error
    const [error, setErrorMessage] = useState("");

//create a state variable for display the loading message
const[loadingState, setLoadingMessage] = useState(false);

//Create a hanlder function which stores the selected genre value to the state variable "selectedGenre".
    const handleGenre = (e) => {
        //console.log(e.target.value);
        setSelectedGenre(e.target.value);
        setErrorMessage("");
           
    };

//Create a handler function which displays the movies name based on the selected genre
    const handleFetchButton = (e) => {
       
        const movies = moviesData.find((movie) => movie.genre === selectedGenre);
        console.log("Movies name" ,movies);
        
        
 //Assign the selected genre value and the corressponding movies using setGenreData() 
        if(movies) {

            setLoadingMessage(true);            
            setTimeout(() => {
                                setGenreData({
                                    genre:movies.genre,
                                    movieNames:movies.movieNames,
                                    });
                                setLoadingMessage(false); 
                            }, 900);
        }
        else {
             setErrorMessage("Need to select the genre!!");

        }

    };
   

    return (
        <div className="moviePage">
            <h1>Movie Selector Application</h1>
          
            <div className="data">
               
                <label> Select Genre </label>
                <select name ="genre" onChange={handleGenre} >
                    <option value="">Genre</option>

                    { moviesData.map((movie, index) => 
                        <option key={index} value={movie.genre}> {movie.genre} </option>) 
                    }
                </select>

                <button type = "button" onClick={handleFetchButton}> Fetch Movies</button>
                {error && (<p>Error: {error}</p>)}
                {loadingState && <p>⌛ Loading Movies.. Please wait!</p>}
         
                <ul>
                {genreData.genre && <h2>{genreData.genre} genre movies list</h2> }

                    { genreData.movieNames.map((movie) => 
                            <li >{movie} </li> )
                    }
                </ul>

            </div>

        </div>
    );
}

export default MovieSelector;