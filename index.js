
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/usermodel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const movie_theatre_Router = require('./router/movie_theatre')

app.use(cors())
app.use(express.json())

mongoose.connect('mongodb+srv://Tishan:ZS7jEzX5qsbmgTI2@cluster1.ucjer.mongodb.net/?retryWrites=true&w=majority')



app.post('/api/register', async (req, res) => {
	console.log(req.body)
	try {
		const newPassword = await bcrypt.hash(req.body.password, 10)
		await User.create({
			name: req.body.name,
			email: req.body.email,
			password: newPassword,
            role: req.body.role,
		})
		res.json({ status: 'ok' })
	} catch (err) {
		res.json({ status: 'error', error: 'Duplicate email' })
	}
})

app.post('/api/login', async (req, res) => {
	const user = await User.findOne({
		email: req.body.email,
	})

	if (!user) {
		return { status: 'error', error: 'Invalid login' }
	}

	const isPasswordValid = await bcrypt.compare(
		req.body.password,
		user.password
	)

	if (isPasswordValid) {
		const token = jwt.sign(
			{
				name: user.name,
				email: user.email,
			},
			'secret123'
		)

		return res.json({ status: 'ok', user: token , role: user.role})
	} else {
		return res.json({ status: 'error', user: false })
	}
})


app.use('/admin',movie_theatre_Router);

app.use('/',(req,res,next)=>{
    res.send('Welcome')
    console.log('middleware')

    next();
})

const port = process.env.PORT || 3000;
app.listen(port, function {
	console.log('Server started on 3000')
});