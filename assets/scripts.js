const API_KEY = '257c2dffd5a19ea29083b6b181ceedb0';

document.addEventListener("DOMContentLoaded", () => {
  fetchArkansasMovies();
  fetchArkansasActors();

  document.getElementById('submissionForm').addEventListener('submit', handleSubmission);
});

function showTab(tabId) {
  document.querySelectorAll('.tab').forEach(tab => tab.style.display = 'none');
  document.getElementById(tabId + 'Tab').style.display = 'block';
}

// Sample Arkansas movies (by title)
const arkansasMovieTitles = [
  "Sling Blade",
  "True Grit",
  "Mud",
  "The Legend of Boggy Creek",
  "A Soldier’s Story"
];

function fetchArkansasMovies() {
  const movieList = document.getElementById('movieList');
  movieList.innerHTML = '';

  arkansasMovieTitles.forEach(title => {
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(title)}`)
      .then(res => res.json())
      .then(data => {
        const movie = data.results?.[0];
        if (movie) {
          const li = document.createElement('li');
          li.textContent = `${movie.title} (${movie.release_date?.split('-')[0] || 'N/A'})`;
          li.style.cursor = 'pointer';
          li.onclick = () => showMovieDetails(movie);
          movieList.appendChild(li);
        }
      });
  });
}

function showMovieDetails(movie) {
  const details = document.getElementById('movieDetails');
  const posterUrl = movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : '';
  details.innerHTML = `
    <h3>${movie.title}</h3>
    ${posterUrl ? `<img src="${posterUrl}" alt="${movie.title} poster">` : ''}
    <p><strong>Release Date:</strong> ${movie.release_date}</p>
    <p><strong>Overview:</strong> ${movie.overview}</p>
  `;
}

const arkansasActors = [
  { name: "Billy Bob Thornton" },
  { name: "Mary Steenburgen" },
  { name: "Joey Lauren Adams" }
];

function fetchArkansasActors() {
  const actorList = document.getElementById('actorList');
  actorList.innerHTML = '';

  arkansasActors.forEach(actor => {
    fetch(`https://api.themoviedb.org/3/search/person?api_key=${API_KEY}&query=${encodeURIComponent(actor.name)}`)
      .then(res => res.json())
      .then(data => {
        const person = data.results?.[0];
        if (person) {
          const li = document.createElement('li');
          li.textContent = person.name;
          li.style.cursor = 'pointer';
          li.onclick = () => showActorDetails(person);
          actorList.appendChild(li);
        }
      });
  });
}

function showActorDetails(person) {
  const details = document.getElementById('actorDetails');
  const profileUrl = person.profile_path ? `https://image.tmdb.org/t/p/w200${person.profile_path}` : '';
  details.innerHTML = `
    <h3>${person.name}</h3>
    ${profileUrl ? `<img src="${profileUrl}" alt="${person.name} profile">` : ''}
    <p><strong>Known For:</strong> ${person.known_for.map(m => m.title || m.name).join(', ')}</p>
  `;
}

function handleSubmission(event) {
  event.preventDefault();
  const form = event.target;
  const type = form.type.value;
  const name = form.name.value;
  const notes = form.notes.value;

  document.getElementById('submissionStatus').innerText =
    `Submitted ${type}: "${name}" with notes: "${notes}" (Note: data not saved — static example)`;

  form.reset();
}
