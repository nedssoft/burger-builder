import axios from 'axios'

const apiKey = 'AIzaSyDeYFbP9xNjhdeT3X-iKrsdC0lCzS2pPIs'
const AUTH_URL = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${apiKey}`
const instance = axios.create({
  baseURL: AUTH_URL
})

export default instance;