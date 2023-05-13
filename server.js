import express from 'express'
import session from 'express-session'

const app = express()
app.use(session({
    secret: 'victoriasecret',
    resave: true,
    saveUninitialized: true
}))

app.get('/', (req, res) => res.send('0K'))

app.get('/preference', (req, res) => {
    const address = {
        street: 'Calle Uno',
        zipcode: 13008,
        city: 'Trujillo'
    }
    req.session.manor_address = address
    res.send('Dirección guardada con exito')
})

app.get('/profile', (req, res) => {
    if (!req.session.manor_address) return res.send('No registraste ninguna dirección de envio')
    const direccion = req.session.manor_address
    res.send(`Tu dirección de envio es: CALLE: ${direccion.street} - CIUDAD: ${direccion.city}`)
})

app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) return res.send('Logout error')
    })
    return res.send('Logout Ok')
})

app.listen(8080, () => console.log('Server Up'))