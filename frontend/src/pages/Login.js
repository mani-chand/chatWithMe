/* eslint-disable no-unused-vars */
import React,{useState} from "react";
import styled from 'styled-components'
import axios from 'axios'
const Login = () =>{
const [user,setUser] = useState({
  email:"",
  password:"",
})
const handleSubmit=async()=>{
  try{
    const response = await axios.post('/validate',user)
    console.log(response.data._id)
    if(response.data==="user does not exist"){
      document.querySelector('.error').innerText="user does not already exists with email"
    }
    if(response.data==="password is incorrect"){
      document.querySelector('.error').innerText="password is incorrect"
    }
    if(response.data._id!==undefined){
      document.querySelector('.error').innerText=" "
      window.location.replace("/");
      localStorage.setItem('user',JSON.stringify(response.data))
    }
    setUser({
      email:"",
      password:"",
    })
  }
  catch(err){
  }
}
  return (
    <>
      <Container> 
        <h2>Chat with me!</h2>
        <div className="register">
          <label>email</label>
          <input 
          type="email" 
          value={user.email}
          className="input-field" 
          placeholder="Enter your email"
          onChange={(e)=>{setUser({...user,email:e.target.value})}}/>
          <label>password</label>
          <input type="password" 
           value={user.password} 
          className="input-field" 
          placeholder="Enter your password"
          onChange={(e)=>{setUser({...user,password:e.target.value})}}/>
          <p>
         <Button primary onClick={handleSubmit}>Submit</Button>
         <a href="/signup">don't had an account</a>
          </p>
          <p className = "error"></p>
        </div>
      </Container>
    </>
  )
}
const Container = styled.div`
display:flex;
flex-direction:column;
justify-content:center;
allign-items:center;
margin:0px;
padding:0px;
min-height: 97vh;
width: auto;
background-color:#52595D;
border-radius:5px;
h2{
  margin: 0 auto;
  font-size:40px;
  display:flex;
  flex-direction:column;
  justify-content:center;
  color:white;
  &{
    text-transform: uppercase;
  }
}
p{
  margin: 0 auto;
}
.register{
  display:flex;
  flex-direction:column;
  justify-content:center;
  margin: 0 auto;
  gap:5px;
  border:2px solid #ccc;
  padding:10px;
  margin-top:5px;
  label{
    color:#ccc;
    font-size:20px;
  }
  .input-field{
    height: 30px;
    width: 90vw;
  }
a{
  color:#ccc;
  margin:5px;
}
Button:hover {
  cursor: pointer;
  padding:0.75em 0.5em;
  }
}
.error{
  color:#ccc;
  font-size:20px;
  font-weight:bold;
}
`;
const Button = styled.button`
  /* Adapt the colors based on primary prop */
  background: ${props => props.primary ? "#551a8b" : "#551a8b"};
  color: ${props => props.primary ? "white" : "palevioletred"};

  font-size: 1em;
  margin: 1em;
  margin: 0 auto;
  margin:5px;
  width:100px;
  padding: 0.5em 0.25em;
  border: 2px solid #ccc;
  border-radius: 3px;
`;
export default Login