const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

// ==================== DATA MOVIE ANIME ====================
let movies = [
  { id: 1, title: "Attack on Titan", year: 2013, director: "Tetsurō Araki" },
  { id: 2, title: "Your Name", year: 2016, director: "Makoto Shinkai" },
  { id: 3, title: "Demon Slayer: Mugen Train", year: 2020, director: "Haruo Sotozaki" },
  { id: 4, title: "One Piece Film: Red", year: 2022, director: "Gorō Taniguchi" },
];


let directors = [
  { id: 1, name: "Tetsurō Araki", birthYear: 1976 },
  { id: 2, name: "Makoto Shinkai", birthYear: 1973 },
  { id: 3, name: "Haruo Sotozaki", birthYear: 1970 },  
  { id: 4, name: "Gorō Taniguchi", birthYear: 1966 },
];


// ==================== CRUD MOVIES ====================
app.get("/movies", (req, res) => res.json(movies));

app.get("/movies/:id", (req, res) => {
  const movie = movies.find((m) => m.id === parseInt(req.params.id));
  if (!movie) return res.status(404).json({ message: "Movie not found" });
  res.json(movie);
});

app.post("/movies", (req, res) => {
  const { title, year, director } = req.body;
  if (!title || !year || !director) {
    return res.status(400).json({ message: "title, year, and director are required" });
  }
  const newMovie = {
    id: movies.length ? movies[movies.length - 1].id + 1 : 1,
    title,
    year,
    director,
  };
  movies.push(newMovie);
  res.status(201).json(newMovie);
});

app.put("/movies/:id", (req, res) => {
  const movie = movies.find((m) => m.id === parseInt(req.params.id));
  if (!movie) return res.status(404).json({ message: "Movie not found" });

  const { title, year, director } = req.body;
  if (title) movie.title = title;
  if (year) movie.year = year;
  if (director) movie.director = director;

  res.json(movie);
});

app.delete("/movies/:id", (req, res) => {
  const index = movies.findIndex((m) => m.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Movie not found" });

  const deleted = movies.splice(index, 1);
  res.json(deleted[0]);
});

// ==================== CRUD DIRECTORS ====================
app.get("/directors", (req, res) => res.json(directors));

app.get("/directors/:id", (req, res) => {
  const director = directors.find((d) => d.id === parseInt(req.params.id));
  if (!director) return res.status(404).json({ message: "Director not found" });
  res.json(director);
});

app.post("/directors", (req, res) => {
  const { name, birthYear } = req.body;
  if (!name || !birthYear) {
    return res.status(400).json({ message: "name and birthYear are required" });
  }
  const newDirector = {
    id: directors.length ? directors[directors.length - 1].id + 1 : 1,
    name,
    birthYear,
  };
  directors.push(newDirector);
  res.status(201).json(newDirector);
});

app.put("/directors/:id", (req, res) => {
  const director = directors.find((d) => d.id === parseInt(req.params.id));
  if (!director) return res.status(404).json({ message: "Director not found" });

  const { name, birthYear } = req.body;
  if (name) director.name = name;
  if (birthYear) director.birthYear = birthYear;

  res.json(director);
});

app.delete("/directors/:id", (req, res) => {
  const index = directors.findIndex((d) => d.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Director not found" });

  const deleted = directors.splice(index, 1);
  res.json(deleted[0]);
});

// ==================== ERROR HANDLING ====================
app.use((req, res) => {
  res.status(404).json({ message: "Endpoint not found" });
});

// ==================== START SERVER ====================
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
