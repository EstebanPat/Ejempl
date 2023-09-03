const BASE_URL = "http://localhost:3000"

function getImageUrl(imagePath){
    console.log(`${BASE_URL}/${imagePath}`)
    return `${BASE_URL}/${imagePath}`
}

module.exports = {
    getImageUrl
}