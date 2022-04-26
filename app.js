const express = require('express')
const { check, validationResult } = require('express-validator')
const app = express()
const port = 4000

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    res.render('login.ejs')
})

app.get('/register', (req, res) => {
    res.render('register.ejs')
})

app.post('/register', [ 
    check('username', 'Your username is too short').exists().isLength({ min: 3}),
    check('email', 'This email is not valid').isEmail().normalizeEmail() ],
    (req, res) => {

    const error = validationResult(req)

    if (!error.isEmpty()) {

        const alert = error.array()
        res.render('register', { alert })
        // return res.status(422).jsonp(error.array())
    }
    res.json(req.body)
})

app.listen(port, () => {
    console.info(`Server listening on port ${port}....`)
})