import './Login.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Login = () => {

    const handleLogin = () => {
        console.log("OOO")
    }

  return (
    <div className='login-container'>
        <div className='login-form'>
    <Form>
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Username</Form.Label>
      <Form.Control type="text" placeholder="Enter username" />
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control type="password" placeholder="Password" />
    </Form.Group>
    <Button variant="primary" type="submit" onClick={handleLogin}>
      Submit
    </Button>
  </Form>
  </div>
  </div>
  )
}

export default Login