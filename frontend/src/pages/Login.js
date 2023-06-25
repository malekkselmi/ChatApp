import { useState ,useEffect } from "react";
import { Link  ,  useNavigate} from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginRoute } from "../APIRoutes"
import styled from "styled-components";

export default function Login () {
const [username , setUsername] = useState('')
const [password , setPassword] = useState('')
const navigate = useNavigate()

const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

 /* useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/");
    }
  }, []); */

  const handleValidation= () => {
    if (username === "") {
      toast.error("Username and Password are required.", toastOptions);
      return false;
    } else if (password === "") {
      toast.error("Username and Password are required.", toastOptions);
      return false;
    }
    return true;
  };

const handleSubmit = async (e) => {
    e.preventDefault()
    if (handleValidation()) {
      try {
      const { data } = await axios.post(loginRoute, {
        username,
        password,
      });
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(data.user)
        );
        navigate("/setavatar");
      }}
      catch(err){
        console.log(err.msg)
      }
    }
}

    return (  
      <>
      <FormContainer>
        <form onSubmit={handleSubmit} >
        <h2>ChatApp</h2>
        <input type="text" placeholder="Username" required="true" 
        value={username} onChange={(e)=> setUsername(e.target.value)} />
         <input type="password" placeholder="Password" required="true" 
        value={password} onChange={(e)=> setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        <span> Don't have an account ? <Link to='/register'>Create Account</Link> </span>
        </form>
        </FormContainer>
        <ToastContainer/>
        </>
    );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  h2 {
      color: white;
      text-transform: uppercase;
      text-align: center
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;
 
