import React from 'react'
import { useAuthStore } from '../../store/authUser'
import HomePage from "./HomePage"
import AuthPage from "./AuthPage"

const HomeScreen = () => {
    const { user } = useAuthStore()
    
  return (
    <>
      { user ? <HomePage /> : <AuthPage />}
    </>
  )
}

export default HomeScreen
