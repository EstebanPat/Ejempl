const BASE_URL = "http://ejemplo-proyecto.vercel.app"

function getImageUrl(imagePath){
    console.log(`${BASE_URL}/${imagePath}`)
    return `${BASE_URL}/${imagePath}`
}

module.exports = {
    getImageUrl
}