export default async function handler(req, res){
    // Home data
    try {
    const options = {
      headers: {
        Authorization: process.env.PEXELS_API_KEY,
      },
    }

    const [
      responseHero,
      responseProd,
      responseHelmet,
      responseProtections,
      responseWheels,
    ] = await Promise.all([
      fetch("https://api.pexels.com/v1/search?query=aggressive skates&per_page=8", options),
      fetch("https://api.pexels.com/v1/search?query=rollerblades inline&per_page=16", options),
      fetch("https://api.pexels.com/v1/search?query=helmet&per_page=4", options),
      fetch("https://api.pexels.com/v1/search?query=protections&per_page=4", options),
      fetch("https://api.pexels.com/v1/search?query=wheels rollers&per_page=4", options),
    ])

    const [
      dataHero,
      dataProd,
      dataHelmet,
      dataProtections,
      dataWheels,
    ] = await Promise.all([
      responseHero.json(),
      responseProd.json(),
      responseHelmet.json(),
      responseProtections.json(),
      responseWheels.json(),
    ])

    res.status(200).json({
      heroImages: dataHero.photos || [],
      products: dataProd.photos || [],
      helmets: dataHelmet.photos || [],
      protections: dataProtections.photos || [],
      wheels: dataWheels.photos || [],
    })
  } catch (error) {
    res.status(500).json({
      error: error.message,
    })
  }
}


    

