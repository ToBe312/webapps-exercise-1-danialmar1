const fs = require('fs');
const axios = require('axios');
const path = require('path');

const API_KEY = "8341de77e3a24593226752d83720f88b";
const TOTAL_PAGES = 2;
const IMAGE_DIR = path.join(__dirname, 'images');


async function downloadImage(url, filename) {
  if (!url) return;
  const res = await axios.get(url, { responseType: 'arraybuffer' });
  fs.writeFileSync(path.join(IMAGE_DIR, filename), res.data);
}


async function fetchMovieCast(movieId) {
  const res = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}&language=he`
  );
  return res.data.cast.map(c => ({
    name: c.name,
    character: c.character,
    profileUrl: c.profile_path ? `https://image.tmdb.org/t/p/w200${c.profile_path}` : null
  }));
}

async function fetchSeriesCast(seriesId) {
  const res = await axios.get(
    `https://api.themoviedb.org/3/tv/${seriesId}/credits?api_key=${API_KEY}&language=he`
  );
  return res.data.cast.map(c => ({
    name: c.name,
    character: c.character,
    profileUrl: c.profile_path ? `https://image.tmdb.org/t/p/w200${c.profile_path}` : null
  }));
}

async function fetchEpisodes(seriesId, totalSeasons) {
  let episodes = [];
  for (let season = 1; season <= totalSeasons; season++) {
    const res = await axios.get(
      `https://api.themoviedb.org/3/tv/${seriesId}/season/${season}?api_key=${API_KEY}&language=he`
    );
    for (const ep of res.data.episodes) {
      episodes.push({
        seriesId,
        seasonNumber: season,
        episodeNumber: ep.episode_number,
        title: ep.name,
        overview: ep.overview,
        airDate: ep.air_date,
        stillUrl: ep.still_path ? `https://image.tmdb.org/t/p/w500${ep.still_path}` : null
      });
    }
  }
  return episodes;
}

async function fetchMovies() {
  let allMovies = [];
  for (let page = 1; page <= TOTAL_PAGES; page++) {
    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=he&page=${page}`
    );
    for (const movie of res.data.results) {
      const cast = await fetchMovieCast(movie.id);
      const posterUrl = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : null;

      if (posterUrl) await downloadImage(posterUrl, `movie_${movie.id}.jpg`);

      allMovies.push({
        id: movie.id,
        title: movie.title,
        releaseDate: movie.release_date,
        genres: movie.genre_ids,
        overview: movie.overview,
        posterUrl,
        popularity: movie.popularity,
        rating: movie.vote_average,
        cast
      });
    }
  }
  return allMovies;
}

async function fetchSeries() {
  let allSeries = [];
  let allEpisodes = [];
  for (let page = 1; page <= TOTAL_PAGES; page++) {
    const res = await axios.get(
      `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=he&page=${page}`
    );
    for (const series of res.data.results) {
      const cast = await fetchSeriesCast(series.id);
      const posterUrl = series.poster_path ? `https://image.tmdb.org/t/p/w500${series.poster_path}` : null;

      if (posterUrl) await downloadImage(posterUrl, `series_${series.id}.jpg`);

      const episodes = await fetchEpisodes(series.id, series.number_of_seasons || 1);
      allEpisodes = allEpisodes.concat(episodes);

      allSeries.push({
        id: series.id,
        title: series.name,
        releaseDate: series.first_air_date,
        genres: series.genre_ids,
        overview: series.overview,
        posterUrl,
        popularity: series.popularity,
        rating: series.vote_average,
        cast
      });
    }
  }
  return { allSeries, allEpisodes };
}

async function main() {
  if (!fs.existsSync(IMAGE_DIR)) fs.mkdirSync(IMAGE_DIR);

  const movies = await fetchMovies();
  const { allSeries, allEpisodes } = await fetchSeries();

  fs.writeFileSync('movies.json', JSON.stringify(movies, null, 2));
  fs.writeFileSync('series.json', JSON.stringify(allSeries, null, 2));
  fs.writeFileSync('episodes.json', JSON.stringify(allEpisodes, null, 2));

  console.log(`Saved ${movies.length} movies, ${allSeries.length} series, ${allEpisodes.length} episodes with images`);
}

main();
