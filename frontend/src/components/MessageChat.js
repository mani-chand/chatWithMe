/* eslint-disable no-unused-vars */
import React,{useState} from "react";
import axios from "axios";
import styled from "styled-components";
import { AiOutlineSend,AiOutlinePoweroff } from "react-icons/ai";
import ChatArea from "./ChatArea";
export default function MessageChat({isLoggedIn,toId}) {
    const [Messages, setMessage] = useState({
        from:"",
        to:"",
        message:""
    });
    const handleSend = (e)=>{
        axios.post('http://localhost:5000/sendmessage',Messages)
        .then(res =>{
           console.log(res)
        }).catch(err=>{
          console.log(err)
        })
        setMessage({
            from:"",
            to:"",
            message:""
        });
    }
    return ( 
        <>
        <Container>
         <div className="chat-messages">
        <div className="chat-area">
           <ChatArea isLoggedIn={isLoggedIn} toId={toId}/>
        </div>
        <div className="profile-logout">
        <div className="profile">
         <h3>logged in as {isLoggedIn.username}</h3>
        </div> 
        <div className="logout">
            <button className="logout-user">
            <AiOutlinePoweroff size={40} value={{className:"logout-user"}} onClick={()=>{localStorage.clear() ; window.location.replace("http://localhost:3000/login");}}/>
            </button>
            
        </div>
        </div>    
         </div>
         <div className="message-input-box">
            <input type="text"
            value={Messages.message} 
            className="text-box" 
            onChange={(e)=>{setMessage({...Messages,message:e.target.value,from:isLoggedIn._id,to:toId})}}/>
            <button 
            className="send-button"
            onClick={(e)=>handleSend(e)}
            >
                <AiOutlineSend 
                value={{ className: "send-button", size: 30 }} 
                />
            </button>
         </div>
         </Container>
        </>
     );
    }
const Container = styled.div`
    max-height:76vh;
    background-color:#E2DFD2;
    padding:0px 50px 10px 50px;
    display:grid;
    gap-colomn:10px;
    grid-template-rows:26.5fr 1fr;
    .chat-messages{
        display:flex;
        flex-direction:column-reverse;
        justify-content:space-between;
      .profile-logout{
         display:flex;
         justify-content:space-between;
         color:#1f2703;
      }
    }
    .message-input-box{
        display:flex;
        .text-box{
            height:30px;
            width:100%;
        }
        .send-button{
            height:35px;
            width:55px;
                &:hover{
                    cursor: pointer;
                    background-color:#63bbf2;
                }
        }
    }   
    }
.logout-user{
        &:hover{
            cursor: pointer;
            background-color:#63bbf2;
        }  
    }
.chat-area{
    overflow-y:scroll;
}
`