const express = require('express');
const router = express.Router();
const adminMiddleware = require('../middleware/adminMiddleware');

const Movie = require('../models/movieModel');
const Series = require('../models/seriesModel');
const Episode = require('../models/episodeModel');
const Genre = require('../models/genreModel');


router.get('/dashboard', adminMiddleware, (req, res) => {
    res.json({ message: 'Welcome Admin!' });
});


router.post('/add/movie', adminMiddleware, async (req, res) => {
    try {
        const { title, releaseDate, genres, overview, posterPath, popularity, rating, cast } = req.body;

        // create if genre doesn't exist in db
        const genreIds = [];
        for (let g of genres) {
            let genre = await Genre.findOne({ name: g });
            if (!genre) {
                genre = await Genre.create({ name: g });
            }
            genreIds.push(genre._id);
        }

        const movie = await Movie.create({
            title,
            releaseDate,
            genres: genreIds,
            overview,
            posterPath,
            popularity,
            rating,
            cast
        });

        res.status(201).json({ message: 'Movie added', movie });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to add movie' });
    }
});


router.post('/add/series', adminMiddleware, async (req, res) => {
    try {
        const { title, releaseDate, genres, overview, posterPath, popularity, rating, cast } = req.body;

        // creating new genres
        const genreIds = [];
        for (let g of genres) {
            let genre = await Genre.findOne({ name: g });
            if (!genre) {
                genre = await Genre.create({ name: g });
            }
            genreIds.push(genre._id);
        }

        const series = await Series.create({
            title,
            releaseDate,
            genres: genreIds,
            overview,
            posterPath,
            popularity,
            rating,
            cast
        });

        res.status(201).json({ message: 'Series added', series });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to add series' });
    }
});


router.post('/add/episode', adminMiddleware, async (req, res) => {
    try {
        const { seriesId, seasonNumber, episodeNumber, title, overview, airDate, stillPath } = req.body;

        const series = await Series.findById(seriesId);
        if (!series) return res.status(404).json({ error: 'Series not found' });

        const episode = await Episode.create({
            seriesId: series._id,
            seasonNumber,
            episodeNumber,
            title,
            overview,
            airDate,
            stillPath
        });

        res.status(201).json({ message: 'Episode added', episode });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to add episode' });
    }
});

module.exports = router;