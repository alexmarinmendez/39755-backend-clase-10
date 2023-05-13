import express from 'express'
import cookieParser from 'cookie-parser'

const app = express()
app.use(cookieParser())

app.get('/', (req, res) => res.send('0K'))

app.get('/cookie/set', (req, res) => {
    res.cookie('oreo', 'Es una galleta muy rica!').send('Cookie seteada!')
})

app.get('/cookie/get', (req, res) => {
    res.send(req.cookies.oreo)
    // res.send(req.cookies)
})

app.listen(8080, () => console.log('Server Up'))