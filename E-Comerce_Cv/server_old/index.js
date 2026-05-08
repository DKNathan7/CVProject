import express from "express"
import fetch from "node-fetch"
import dotenv from "dotenv"
import cors from "cors"

dotenv.config() // --> Activa .env 

const app = express() // --> Creo servidor
app.use(cors()) // --> Permito conexiones desde React

// Home data
app.get("/home-data", async (req, res) => {
    try {
        const responseHero = await fetch( // --> Devuelve la respuesta HTTP (carta cerrada)
            "https://api.pexels.com/v1/search?query=aggressive skates&per_page=8",
            {headers: {
                Authorization: process.env.PEXELS_API_KEY
            }}
        )
        const responseProd = await fetch(
            "https://api.pexels.com/v1/search?query=rollerblades inline&per_page=30",
            {headers: {
                Authorization: process.env.PEXELS_API_KEY
            }}
        )
        const responseHelmet = await fetch(
            "https://api.pexels.com/v1/search?query=helmet&per_page=4",
            {headers: {
                Authorization: process.env.PEXELS_API_KEY
            }}
        )
        const responseProtections = await fetch(
            "https://api.pexels.com/v1/search?query=protections&per_page=4",
            {headers: {
                Authorization: process.env.PEXELS_API_KEY
            }}
        )
        const responseWheels = await fetch(
            "https://api.pexels.com/v1/search?query=wheels rollers&per_page=4",
            {headers: {
                Authorization: process.env.PEXELS_API_KEY
            }}
        )
        const dataHero = await responseHero.json() // --> Lee el contenido de la respuesta y lo parsea como JSON (puedo leer el contenido de la carta)
        const dataProd = await responseProd.json()
        const dataHelmet = await responseHelmet.json()
        const dataProtections = await responseProtections.json()
        const dataWheels = await responseWheels.json()
        res.json({heroImages: dataHero.photos,
            products:dataProd.photos,
            helmets: dataHelmet.photos,
            protections: dataProtections.photos,
            wheels: dataWheels.photos}
        )
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

// Arranco el servidor
app.listen(3001, () => {
    console.log("Servidor corriendo en http://localhost:3001")
})