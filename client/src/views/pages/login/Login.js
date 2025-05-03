import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {
    CButton,
    CCard,
    CCardBody,
    CCardGroup,
    CRow,
    CCol,
    CContainer,
    CForm,
    CAlert,
    CInputGroup,
    CInputGroupText,
    CFormInput,
    CSpinner,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilUser, cilLockLocked } from '@coreui/icons'
import api from '../../../util/api'
import Cookies from 'js-cookie'
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [alert, setAlert] = useState({ visible: false, type: '', message: '' })
    const dispatch = useDispatch()
    const navigate = useNavigate()

    // Regular Login Handler
    const handleLogin = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const response = await api.post(
                'https://backend-admin.axleshift.com/integ/external-login/HR',
                {
                    email,
                    password,
                },
                {
                    headers: {
                        Authorization: 'Bearer admin1229102',
                    },
                },
            )

            const { token, user } = response.data

            // Save user info and token to Redux, Cookies, and Session Storage
            dispatch({ type: 'SET_USER', payload: user })
            dispatch({ type: 'SET_SESSION_ID', payload: token }) // Or use a real session_id if available

            Cookies.set('external_token', token, {
                expires: 30,
                secure: true,
                sameSite: 'Strict',
            })

            sessionStorage.setItem('external_token', token)
            sessionStorage.setItem('role', user.role)
            sessionStorage.setItem('user_id', user.id)
            sessionStorage.setItem('name', user.name)
            sessionStorage.setItem('email', user.email)

            navigate('/dashboard')
        } catch (err) {
            setAlert({
                visible: true,
                type: 'danger',
                message: err.response?.data?.message || 'Login failed. Please try again.',
            })
        } finally {
            setLoading(false)
        }
    }

    // Google Login Handler
    const handleGoogleSuccess = async (response) => {
        try {
            const { credential } = response
            const responseData = await api.post('/api/auth/google', { token: credential })
            const { user, session_id } = responseData.data

            // Store user and session data in Redux, Cookies, and SessionStorage
            dispatch({ type: 'SET_USER', payload: user })
            dispatch({ type: 'SET_SESSION_ID', payload: session_id })

            Cookies.set('session_id', session_id, {
                expires: 30,
                secure: true,
                sameSite: 'Strict',
            })

            sessionStorage.setItem('session_id', session_id)
            sessionStorage.setItem('role', user.role)
            sessionStorage.setItem('user_id', user.id)
            sessionStorage.setItem('name', user.name)
            sessionStorage.setItem('email', user.email)

            navigate('/dashboard')
        } catch (err) {
            setAlert({
                visible: true,
                type: 'danger',
                message: err.response?.data?.message || 'Google Login failed. Please try again.',
            })
        }
    }

    // Google Login Failure Handler
    const handleGoogleFailure = (error) => {
        setAlert({
            visible: true,
            type: 'danger',
            message: 'Google login failed. Please try again.',
        })
    }

    // Auto-hide alert after 3 seconds
    useEffect(() => {
        if (alert.visible) {
            const timer = setTimeout(() => setAlert({ ...alert, visible: false }), 3000)
            return () => clearTimeout(timer)
        }
    }, [alert])

    return (
        <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
            <CContainer>
                <CRow className="justify-content-center">
                    <CCol md={8}>
                        <CCardGroup>
                            <CCard className="p-4">
                                <CCardBody>
                                    <CForm onSubmit={handleLogin}>
                                        <h1>Login</h1>
                                        <p className="text-body-secondary">
                                            Sign in to your account
                                        </p>

                                        {/* Display Alert Message */}
                                        {alert.visible && (
                                            <CAlert color={alert.type}>{alert.message}</CAlert>
                                        )}

                                        {/* Email Input */}
                                        <CInputGroup className="mb-3">
                                            <CInputGroupText>
                                                <CIcon icon={cilUser} />
                                            </CInputGroupText>
                                            <CFormInput
                                                type="email"
                                                placeholder="Email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                            />
                                        </CInputGroup>

                                        {/* Password Input */}
                                        <CInputGroup className="mb-3">
                                            <CInputGroupText>
                                                <CIcon icon={cilLockLocked} />
                                            </CInputGroupText>
                                            <CFormInput
                                                type="password"
                                                placeholder="Password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                            />
                                        </CInputGroup>

                                        {/* Submit Button */}
                                        <CRow>
                                            <CCol xs={6}>
                                                <CButton
                                                    type="submit"
                                                    color="primary"
                                                    disabled={loading}
                                                >
                                                    {loading ? <CSpinner size="sm" /> : 'Login'}
                                                </CButton>
                                            </CCol>
                                        </CRow>
                                    </CForm>
                                </CCardBody>
                            </CCard>
                        </CCardGroup>
                    </CCol>
                </CRow>
            </CContainer>
        </div>
    )
}

export default Login
