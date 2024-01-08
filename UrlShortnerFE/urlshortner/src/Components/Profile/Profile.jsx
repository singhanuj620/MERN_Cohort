import './Profile.css'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Cookies from 'js-cookie';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

const Profile = () => {
  const location = useLocation()
  const [isNewUrl, setIsNewUrl] = useState(false)
  const [newUrl, setNewUrl] = useState()
  const [allUrl, setAllUrl] = useState()
  const [isError, setIsError] = useState(false)
  const [errorMsg, setErrorMsg] = useState()

  useEffect(() => {
    const getNewUrl = new URLSearchParams(location.search).get("shorturl")
    if(getNewUrl) {
      setIsNewUrl(true)
      setNewUrl(getNewUrl)
    }
  },[])

  const handleGetAllUrl = async () => {
    const resp = await axios({
      method: 'GET',
      url: `${import.meta.env.VITE_BACKEND_DOMAIN}/getallurl`,
      headers: {
        Authorization : Cookies.get("jwtToken")
      }
    })
    if(resp && resp?.data && resp?.data?.msg){
      setIsError(true)
      setErrorMsg(resp.data.msg)
    }
    else {
      setAllUrl(resp.data.getAllUrl)
      setIsError(false)
      setErrorMsg()
    } 
  }

  useEffect(() => {
    handleGetAllUrl()
  },[])

  return (
    <div>
      {
        isNewUrl && 
        <div className='newShortUrl-container'>
          <div className='newShortUrl-title'>
            Your new short URL is :
          </div>
          <div className='newShortUrl-url'>
            <div>
              {`${import.meta.env.VITE_BACKEND_DOMAIN}/${newUrl}`}
            </div>
            <div className='newShortUrl-btns'>
              <Button variant="info">Visit</Button>
              &nbsp;&nbsp;&nbsp;
              <Button variant="primary">Copy</Button>
            </div>
          </div>
        </div>
      }

      <div className='allurl-container'>
        <div className='allurl-title'>
          Your all short URLs :
        </div>
        <div className='allurl-table'>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Long Url</th>
                <th>Short Url</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {allUrl && allUrl.map((url,ind) => (
                <tr key={ind}>
                  <td>{ind}</td>
                  <td>{url.longUrl}</td>
                  <td>{url.shortUrl}</td>
                  <td><Button variant="info">Visit</Button></td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  )
}

export default Profile