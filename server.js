import express from 'express'
import cookieParser from 'cookie-parser'

const app = express()
app.use(cookieParser('victoriasecret'))

app.get('/', (req, res) => res.send('0K'))

app.get('/preference', (req, res) => {
    const address = {
        street: 'Calle Uno',
        zipcode: 13008,
        city: 'Trujillo'
    }
    res.cookie('manor_address', JSON.stringify(address), { signed: true }).send('Dirección guardada con exito')
})

app.get('/profile', (req, res) => {
    if (!req.signedCookies.manor_address) return res.send('No registraste ninguna dirección de envio')
    const direccion = JSON.parse(req.signedCookies.manor_address)
    res.send(`Tu dirección de envio es: CALLE: ${direccion.street} - CIUDAD: ${direccion.city}`)
})

app.listen(8080, () => console.log('Server Up'))