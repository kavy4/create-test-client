import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://school-test-api.onrender.com'
    // baseURL: 'http://localhost:5000'
})

export default instance