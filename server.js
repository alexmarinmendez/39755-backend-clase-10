import express from 'express'

const app = express()

app.get('/', (req, res) => res.send('0K'))

app.listen(8080, () => console.log('Server Up'))