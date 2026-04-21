import express from "express"
import fetch from "node-fetch"
import dotenv from "dotenv"
import cors from "cors"

dotenv.config() // --> Activa .env 

const app = express() // --> Creo servidor
app.use(cors()) // --> Permito conexiones desde React

app.get("/images", async (req, res) => {
    try {
        const response = await fetch( // --> Devuelve la respuesta HTTP (carta cerrada)
            "https://api.pexels.com/v1/search?query=aggressive skates&per_page=8",
        {headers: {
            Authorization: process.env.PEXELS_API_KEY
        }
    }
)
const data = await response.json() // --> Lee el contenido de la respuesta y lo parsea como JSON (puedo leer el contenido de la carta)
res.json(data)
}catch(error){
    res.status(500).json({ error: error.message })
}
})

// Arranco el servidor
app.listen(3001, () => {
    console.log("Servidor corriendo en http://localhost:3001")
})