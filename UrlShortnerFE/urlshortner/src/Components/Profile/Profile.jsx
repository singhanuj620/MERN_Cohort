import './Profile.css'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const Profile = () => {
  const location = useLocation()

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search).toString()
    console.log('###', queryParams)
  },[])

  return (
    <div>Profile</div>
  )
}

export default Profile