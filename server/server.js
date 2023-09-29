
import express from 'express'
import cors from 'cors'
import axios from 'axios'
import dotenv from 'dotenv'


dotenv.config()

const app = express()
const PORT = process.env.PORT ?? 8000
app.use(cors())






app.get('/flights', async (req, res) => {
  console.log('Received GET request to /flights')
  const { url } = req.query
  const options = {
      method: 'GET',
      url, 
      headers: {
        'apikey': process.env.TEQUILA_API_KEY,
        'accept': 'application/json'
      }
    }

    try {
      const response = await axios.request(options)

      res.json(response.data)

    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'An error occurred' })
    }

  })

app.listen(PORT, () => console.log(`Backend is running on port ${PORT}`))