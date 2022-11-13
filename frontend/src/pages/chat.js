/* eslint-disable no-unused-vars */
import React,{useEffect,useState} from "react";
import axios from "axios";
import styled from 'styled-components'
import MessageChat from "../components/MessageChat";
import WelcomeChat from './../utils/images/welcome_chat.gif'
const Chat = () =>{
const [isLoggedIn,setLoggedIn] = useState({})
const [toId,setToid] = useState("")
const [users,setUser] = useState([])
const [isChatOpen,setChatOpen] = useState(false)
useEffect(()=>{
    const user = JSON.parse(localStorage.getItem('user'))
    setLoggedIn(user)
    if(user===null){
      window.location.replace("/login");
    }
    else{
  try{
     axios.get(`http://localhost:5000/users/${user._id}`).then((res)=>{
     let data= res.data.map(user =>{
        user.selected=false
        return user;
      })
      setUser(data)
     })
  }catch{

  }
}
},[])
const handleSelect = (id)=>{
    console.log(users)
    let data= users.map(user =>{
      if(id===user._id){
        user.selected=!user.selected 
        if(user.selected){
          setChatOpen(true)
          setToid(id)
        } 
        else{
          setChatOpen(false)
        }
      }
      else user.selected=false
      return user;
    })
    setUser(data)
}
  return (
    <div>
       <Container>
        <div className="chat">
        <h1>ChatWithMe</h1>
        <div className="chat-view">
          <div className="chat-view-friends">
            <h2>Friends</h2>
          <div className="chat-frnds">
             {users.map(user=>{
               
               return (
                 <div key={user._id}> 
                 <p 
                 className={(user.selected)?'frnd-chat':'no-frnd'}
                 onClick={(e)=>handleSelect(user._id)}
                 >
                  {user.username}
                  </p>
                 </div>
               )
             })}
          </div>
          </div>
          <div className={(isChatOpen?"":"chat-msgs")}>
           {isChatOpen?<MessageChat isLoggedIn={isLoggedIn} toId={toId}/>:
           <div>
            <div className="no-chat-image">
           <img src={WelcomeChat} alt="no chats"/>
            </div>  
           <h1 className="No-Chat-text">hello , {isLoggedIn.username} start chatting</h1>
           </div>
          } 
          </div>
        </div>
      </div>
       </Container>
    </div>
  )
}
export default Chat
const Container = styled.div`
min-height: 96vh;
width:auto;
   background-color:#C08C8C;
   display:flex;
   flex-direction:colomn;
   margin:0 auto;
   h1{
    margin:auto auto;
    width:auto;
    display:grid;
    grid-template-columns:1fr;
    justify-items:start;
    align-items:center;
    align-items:center;
    font-size:50px;
  }
    .chat{
      margin:0 auto;
      display:grid;
      padding:0px 0px 10px 0px;
      column-gap: 10px;
      justify-content: start;
      align-content: center;  
      grid-template-rows:1fr auto; 
      place-items: start;
      .chat-view{
        min-height: 76vh;
        display:grid;
        justify-content: start;
        grid-template-columns:1fr 5fr;
        gap:40px;
        border-radius:3px solid white;
        width:100%;
        .chat-view-friends{
          overflow-y:scroll;
          border:2px solid #ccc;
        min-width:100%;
        padding-right: 27px;
        padding-left:25px;
        padding-bottom:10px;
        box-sizing: content-box;
       }
        .chat-frnds{
          max-height:57px;
          grid-auto-flow: column ;
          h2{
            font-size:30px;
          }
          .frnd-chat{
            
          }
          .no-frnd{
            color:#ccc;
            border:2px solid lightgrey;
            font-size:25px;
            justify-content: start; 
            &:hover{
              cursor: pointer;
            }
          }
        }
      }
      .frnd-chat{
        color:white;
        font-weight:bold;
        background-color:green;
        border:2px solid lightgrey;
        font-size:25px;
        justify-content: start; 
        &:hover{
          cursor: pointer;
        }
      }
      .chat-msgs{
        display:flex;
        background-color:#ccc;
        justify-content:center;
        allign-items:center;
      }
    }
    img{
      height:400px;
      width:100%;
  }
  .No-Chat-text{
    color:#1f2703;
  }
    `;