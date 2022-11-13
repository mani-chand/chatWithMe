/* eslint-disable no-unused-vars */
import React,{useState,useEffect} from "react";
import axios from "axios";
import './../utils/chatArea.css'
const ChatArea = ({isLoggedIn,toId}) => {
    const [messages, setMessage] = useState([])
    const getMessages=async ()=>{
        await axios.get(`http://localhost:5000/message/${isLoggedIn._id}/${toId}`).then(res => {  
            setMessage(res.data)    
        })
    }
    useEffect(()=>{
        getMessages()

    },)
    return ( 
        <>
          <div>
            {(messages.length===0)?
            "no chats":
              <div>
                 {messages.map(msg=>{
                     return <div className="all-messages" key={msg._id}>
                           {(toId===msg.to)?
                               <div className="to-message">
                                <p key={msg._id}>{msg.message}</p>
                               </div>  :
                               <div className="from-message">
                                <p key={msg._id}>{msg.message}</p>
                               </div> 
                          } 
                       </div>
                 })}
              </div>
            }
          </div>
        </>
     );
}

export default ChatArea;