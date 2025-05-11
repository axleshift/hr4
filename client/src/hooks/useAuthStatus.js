import { useEffect, useState } from 'react'
import api from '../util/api'
import Cookies from 'js-cookie'
import { useDispatch } from 'react-redux'

const useAuthStatus = () => {
    const dispatch = useDispatch()
    const [status, setStatus] = useState('loading')

    const checkAuthStatus = async (session_id) => {
        try {
            const response = await api.post('/api/auth/verify-session', { session_id })
            setStatus('authenticated')
        } catch (error) {
            if (Cookies.get('session_id')) Cookies.remove('session_id')
            setStatus('unauthenticated')
        }
    }

    useEffect(() => {
        const sessionId = Cookies.get('session_id')
        if (sessionId) {
            checkAuthStatus(sessionId)
        } else {
            setStatus('unauthenticated')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch])

    return status
}

export default useAuthStatus
