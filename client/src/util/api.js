import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const API = import.meta.env.VITE_APP_API_URL || 'https://hr4.axleshift.com' // Fallback

const api = axios.create({
    baseURL: `${API}/api`, // Ensure `/api` is included
    withCredentials: true,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
})

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            const navigate = useNavigate()
            navigate('/login') // Use React Router instead of full-page reload
        }
        return Promise.reject(error)
    },
)

export default api
