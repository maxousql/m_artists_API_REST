const Artist = require('../models/artist')

exports.getAllArtists = async (req, res) => {
    try {
        let artists = await Artist.findAll()

        return res.json({ data: artists })
    } catch (err) {
        return res.status(500).json({ message: 'Database Error' })
    }
}

exports.getArtist = async (req, res) => {
    let artistId = parseInt(req.params.id)

    if (!artistId) {
        return res.json(400).json({ message: 'Missing Parameter' })
    }

    try {
        let artist = await Artist.findOne({ where: { id: artistId }, raw: true })

        if ((artist === null)) {
            return res.status(404).json({ message: 'This artist does not exist !' })
        }

        return res.json({ data: artist })
    } catch (err) {
        res.status(500).json({ message: 'Database Error' })
    }
}

exports.addArtist = async (req, res) => {
    const { name, streams, daily, as_lead, solo, as_feature } = req.body

    if (!name || !name || !streams | !daily || !as_lead || !solo || !as_feature) {
        return res.status(400).json({ message: 'Missing data' })
    }

    try {
        let artist = await Artist.findOne({ where: { name: name }, raw: true })

        if (artist !== null) {
            return res.status(409).json({ message: `The artist ${name} already exists !` })
        }

        artist = await Artist.create(req.body)

        return res.json({ message: 'Artist created', data: artist })
    } catch (err) {
        res.status(500).json({ message: 'Database Error' })
    }
}

exports.updateArtist = async (req, res) => {
    let artistId = parseInt(req.params.id)

    if (!artistId) {
        return res.status(400).json({ message: 'Missing parameter' })
    }
    
    try {
        let artist = await Artist.findOne({ where: {id: artistId}, raw: true})

        if (artist == null) {
            return res.status(404).json({ message: 'This artist does not exist !' })
        }
        artist = await Artist.update(req.body, { where: {id: artistId}})

        return res.json({ message: 'Artist updated' })
    } catch (error) {
        return res.status(500).json({ message: 'Database error'})
    }
}

exports.softDelete = async (req, res) => {
    let artistId = parseInt(req.params.id)

    if (!artistId) {
        return res.status(400).json({ message: 'Missing parameter' })
    }

    try {
        await Artist.destroy({ where: {id: artistId}})

        return res.status(204).json({})
    } catch (err) {
        return res.status(500).json({ message: 'Database error'})
    }
}

exports.restoreUser = async (req, res) => {
    let artistId = parseInt(req.params.id)

    if (!artistId) {
        return res.status(400).json({ message: 'Missing parameter' })
    }

    try {
        await Artist.restore({ where: {id: artistId}})

        return res.status(204).json({})
    } catch (err) {
        return res.status(500).json({ message: 'Database error'})
    }
}

exports.deleteUser = async (req, res) => {
    let artistId = parseInt(req.params.id)

    if (!artistId) {
        return res.status(400).json({ message: 'Missing parameter' })
    }

    try {
        await Artist.destroy({ where: {id: artistId}, force: true})

        return res.status(204).json({})
    } catch (err) {
        return res.status(500).json({ message: 'Database error'})
    }
}