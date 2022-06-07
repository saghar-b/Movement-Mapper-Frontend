//DEVELOP
// const BASE_URL="http://localhost:3001"
//PROD
const BASE_URL="https://movementmapper-back.herokuapp.com"

module.exports = {
    getBaseUrl: () => {
        return  BASE_URL;
    }

}
