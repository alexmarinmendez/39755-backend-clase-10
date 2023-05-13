import express from 'express'
import session from 'express-session'
import FileStore from 'session-file-store'

const DB = [ {
    username: 'coder',
    password: 'secret',
    role: 'admin'
}]

const fileStore = FileStore(session)

const app = express()
app.use(session({
    store: new fileStore({
        path: './sessions',
        // ttl: 10,
        retries: 2

    }),
    secret: 'victoriasecret',
    resave: true,
    saveUninitialized: true
}))

const auth = (req, res, next) => {
    if (req.session.user) return next()
    return res.send('Error de authentication')
}

app.get('/api/login', (req, res) => {
    const { username, password } = req.query
    const user = DB.find(u => u.username === username && u.password === password)
    if (!user) return res.send('Invalid credentials')
    req.session.user = user
    res.send('Login success!')
})

app.get('/api/private', auth, (req, res) => {
    res.send('Bienvenido!!')
})

app.get('/api/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) return res.send('Logout error')
    })
    return res.send('Logout Ok')
})

app.listen(8080, () => console.log('Server Up'))