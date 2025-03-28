import { useEffect, useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import api from '../util/api'
import Cookies from 'js-cookie'

const useAuthStatus = () => {
    const dispatch = useDispatch()
    const [status, setStatus] = useState('loading')

    const checkAuthStatus = useCallback(
        async (session_id) => {
            try {
                const response = await api.post('/auth/verify-session', { session_id })

                if (response.data.user) {
                    dispatch({ type: 'SET_USER', payload: response.data.user })
                    dispatch({ type: 'SET_SESSION_ID', payload: session_id })
                    setStatus('authenticated')
                } else {
                    throw new Error('Session invalid')
                }
            } catch (error) {
                Cookies.remove('session_id')
                setStatus('unauthenticated')
            }
        },
        [dispatch],
    )

    useEffect(() => {
        const sessionId = Cookies.get('session_id')
        if (sessionId) {
            checkAuthStatus(sessionId)
        } else {
            setStatus('unauthenticated')
        }
    }, [checkAuthStatus])

    return status
}

export default useAuthStatus
