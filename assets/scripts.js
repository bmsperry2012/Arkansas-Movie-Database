const TMDB_API_KEY = "YOUR_TMDB_API_KEY";

// Sample local data (would be replaced by backend or database)
const arkansasMovies = [
    { title: "True Grit", id: 37729 },
    { title: "Sling Blade", id: 11548 },
];

const arkansasActors = [
    { name: "Billy Bob Thornton", id: 293 },
    { name: "Mary Steenburgen", id: 10910 },
];

function showTab(tabName) {
    document.querySelectorAll('.tab').forEach(tab => tab.style.display = 'none');
    document.getElementById(tabName + 'Tab').style.display = 'block';
}

function loadMovies() {
    const list = document.getElementById('movieList');
    list.innerHTML = '';
    arkansasMovies.forEach(movie => {
        const li = document.createElement('li');
        li.textContent = movie.title;
        li.onclick = () => fetchMovieDetails(movie.id);
        list.appendChild(li);
    });
}

function fetchMovieDetails(movieId) {
    fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${TMDB_API_KEY}&append_to_response=credits`)
        .then(res => res.json())
        .then(data => {
            const details = document.getElementById('movieDetails');
            details.innerHTML = `
                <h3>${data.title}</h3>
                <img src="https://image.tmdb.org/t/p/w500${data.poster_path}" alt="Poster">
                <p>${data.overview}</p>
                <h4>Cast:</h4>
                <ul>${data.credits.cast.slice(0, 10).map(actor => `<li>${actor.name}</li>`).join('')}</ul>
            `;
        });
}

function loadActors() {
    const list = document.getElementById('actorList');
    list.innerHTML = '';
    arkansasActors.forEach(actor => {
        const li = document.createElement('li');
        li.textContent = actor.name;
        li.onclick = () => fetchActorDetails(actor.id);
        list.appendChild(li);
    });
}

function fetchActorDetails(actorId) {
    fetch(`https://api.themoviedb.org/3/person/${actorId}?api_key=${TMDB_API_KEY}`)
        .then(res => res.json())
        .then(data => {
            const details = document.getElementById('actorDetails');
            details.innerHTML = `
                <h3>${data.name}</h3>
                <img src="https://image.tmdb.org/t/p/w500${data.profile_path}" alt="Profile">
                <p>${data.biography || 'No biography available.'}</p>
                <p>Born: ${data.place_of_birth || 'N/A'} on ${data.birthday || 'N/A'}</p>
            `;
        });
}

document.getElementById('submissionForm').onsubmit = function (e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const entry = {
        type: formData.get('type'),
        name: formData.get('name'),
        notes: formData.get('notes'),
    };
    // For real site: send this to a backend
    document.getElementById('submissionStatus').textContent = `Submitted: ${entry.name} (${entry.type})`;
    e.target.reset();
};

window.onload = () => {
    loadMovies();
    loadActors();
};
