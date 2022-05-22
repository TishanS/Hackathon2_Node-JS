const mongoose = require('mongoose')

const User = new mongoose.Schema(
	{
		moviename: { type: String, required: true },
		theatrename: { type: String, required: true, unique:true},
	},
	{ collection: 'movie_theatre' }
)

const theatre = mongoose.model('movie_theatre', User)

module.exports = theatre