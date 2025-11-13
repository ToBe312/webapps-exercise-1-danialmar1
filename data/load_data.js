const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const Movie = require('../models/movieModel');
const Series = require('../models/seriesModel');
const Episode = require('../models/episodeModel');

const IMAGE_DIR = 'images';

async function loadMovies() {
  const data = JSON.parse(fs.readFileSync('./data/movies.json'));
  const count = await Movie.countDocuments();
  if (count === 0) {
    await Movie.insertMany(data.map(m => ({
      tmdbId: m.id,
      title: m.title,
      releaseDate: m.releaseDate,
      genres: m.genres,
      overview: m.overview,
      posterPath: m.posterUrl ? path.join(IMAGE_DIR, `movie_${m.id}.jpg`) : null,
      popularity: m.popularity,
      rating: m.rating,
      cast: m.cast.map(c => ({
        name: c.name,
        character: c.character,
        profilePath: c.profileUrl ? path.join(IMAGE_DIR, `actor_${c.name.replace(/\s+/g,'_')}.jpg`) : null
      }))
    })));
    console.log('Movies loaded');
  }
}

async function loadSeries() {
  const data = JSON.parse(fs.readFileSync('./data/series.json'));
  const count = await Series.countDocuments();
  if (count === 0) {
    await Series.insertMany(data.map(s => ({
      tmdbId: s.id,
      title: s.title,
      releaseDate: s.releaseDate,
      genres: s.genres,
      overview: s.overview,
      posterPath: s.posterUrl ? path.join(IMAGE_DIR, `series_${s.id}.jpg`) : null,
      popularity: s.popularity,
      rating: s.rating,
      cast: s.cast.map(c => ({
        name: c.name,
        character: c.character,
        profilePath: c.profileUrl ? path.join(IMAGE_DIR, `actor_${c.name.replace(/\s+/g,'_')}.jpg`) : null
      }))
    })));
    console.log('Series loaded');
  }
}

async function loadEpisodes() {
  const data = JSON.parse(fs.readFileSync('./data/episodes.json'));
  const count = await Episode.countDocuments();
  if (count === 0) {
    for (const e of data) {
      const series = await Series.findOne({ tmdbId: e.seriesId });
      if (!series) {
        console.warn(`Series with tmdbId ${e.seriesId} not found, skipping episode`);
        continue;
      }

      await Episode.create({
        seriesId: series._id,
        seasonNumber: e.seasonNumber,
        episodeNumber: e.episodeNumber,
        title: e.title,
        overview: e.overview,
        airDate: e.airDate,
        stillPath: e.stillUrl
      });
    }
    console.log('Episodes loaded with links to Series');
  }
}

async function loadData() {
    await loadMovies();
    await loadSeries();
    await loadEpisodes();
}

module.exports = {
    loadData
}
