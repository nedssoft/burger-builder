import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://react-burger-faa4f.firebaseio.com/'
})

export default instance;