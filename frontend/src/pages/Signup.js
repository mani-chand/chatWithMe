/* eslint-disable no-unused-vars */
import React,{useState} from "react";
import styled from 'styled-components'
import axios from "axios";
const Signup = () =>{
const [user,setUser] = useState({
  username:"",
  email:"",
  password:"",
  number:"",
  confirmPassword:""
})
const handleSubmit = async ()=>{
   try{
      if(user.password!==user.confirmPassword){
        document.querySelector('.error').innerText="Please enter same password and confirm password"    
      }else{
        document.querySelector('.error').innerText=""
        const response = await axios.post('http://localhost:5000/',user)
        if(response.data==="created user"){
          window.location.replace("/login");
        }
        if(response.data==="user already exists"){
          document.querySelector('.error').innerText="user already exists with same username or email"    
        }
    }
    setUser({ username:"",
  email:"",
  password:"",
  number:"",
  confirmPassword:""
})
   }catch(err){
  }

}
  return (
    <>
      <Container> 
        <h2>Chat with me!</h2>
        <div className="register">
          <label>username</label>
          <input 
          type="text" 
          className="input-field inp-username" 
          placeholder="Enter your username"
          value={user.username}
          onChange={(e)=>{setUser({...user,username:e.target.value})}}/>
          <label>email</label>
          <input 
          type="email" 
          value={user.email}
          className="input-field inp-email" 
          placeholder="Enter your email"
          onChange={(e)=>{setUser({...user,email:e.target.value})}}/>
          <label>Mobile Number</label>
          <input type="text"
          value={user.number}
          className="input-field inp-number" 
          placeholder="Enter your Mobile Number"
          onChange={(e)=>{setUser({...user,number:e.target.value})}}/>
          <label>password</label>
          <input type="password"
          value={user.password} 
          className="input-field" 
          placeholder="Enter your password"
          onChange={(e)=>{setUser({...user,password:e.target.value})}}/>
          <label>confirm password</label>
          <input type="password" 
          value={user.confirmPassword}
          className="input-field inp-passwd" 
          placeholder="Enter your confirm password"
          onChange={(e)=>{setUser({...user,confirmPassword:e.target.value})}}
          />
          <p>
         <Button primary onClick={handleSubmit}>Submit</Button>
         <a href="/login">already had an account</a>
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
background-color:#002147;
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
  color:red;
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
export default Signup