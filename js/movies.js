// Function to display movies
function displayMovies(movies) {
    const movieList = document.getElementById("movie-list");
    movieList.innerHTML = "";

    movies.forEach((movie) => {
        const movieItem = document.createElement("li");
        movieItem.textContent = `Title: ${movie.title}, Genre: ${movie.genre}`;
        movieList.appendChild(movieItem);
    });
}

// Function to fetch movies from the JSON server
function fetchMoviesFromServer() {
    const serverUrl = 'http://localhost:3000/movies'; // Replace with your JSON server URL

    fetch(serverUrl)
        .then((response) => response.json())
        .then((movies) => displayMovies(movies))
        .catch((error) => console.error(error));
}

// Function to fetch movies from the external API
function fetchMoviesFromAPI() {
    const apiUrl = 'https://api.example.com/movies'; // Replace with your external API URL

    fetch(apiUrl)
        .then((response) => response.json())
        .then((movies) => displayMovies(movies))
        .catch((error) => console.error(error));
}

// Function to add a movie
function addMovie(event) {
    event.preventDefault();

    const titleInput = document.getElementById("title");
    const genreInput = document.getElementById("genre");

    const title = titleInput.value;
    const genre = genreInput.value;

    const movie = { title, genre };

    const serverUrl = 'http://localhost:3000/movies'; // Replace with your JSON server URL

    fetch(serverUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(movie),
    })
        .then(() => {
            titleInput.value = "";
            genreInput.value = "";
            fetchMoviesFromServer();
        })
        .catch((error) => console.error(error));
}

// Function to initialize the app
function init() {
    fetchMoviesFromServer();
    fetchMoviesFromAPI();

    const addButton = document.getElementById("add-button");
    addButton.addEventListener("click", addMovie);
}

// Initialize the app
init();
