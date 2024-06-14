import React, { useState, useEffect, useRef } from "react"
import { useParams } from "react-router-dom"
import { io } from "socket.io-client"
import { getUserIdFromToken } from "../auth/authUtils"
import { apiRequest } from "../../utils/api"
import "../../css/privateChat.css"

const PrivateChat = () => {
  const { friendId } = useParams()
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState("")
  const [socket, setSocket] = useState(null)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    const token = localStorage.getItem("token")

    apiRequest("GET", `/private-chat/messages/${friendId}`, {
      Authorization: `Bearer ${token}`,
    }).then(async (v) => {
      const data = await v.json()
      if (data) {
        data.forEach((msg) => {
          addMessageToChat(msg)
        })
      }
    })

    const newSocket = io(process.env.REACT_APP_API_HOST, {
      transports: ["websocket"],
      auth: { token },
    })
    setSocket(newSocket)

    return () => {
      newSocket.disconnect()
    }
  }, [friendId])

  const addMessageToChat = (message) => {
    const currentUserId = getUserIdFromToken(localStorage.getItem("token"))

    const isSenderLeft = message.userId !== currentUserId

    const formattedMessage = {
      ...message,
      isSenderLeft,
      timestamp: new Date(message.timestamp || Date.now()),
    }
    console.log(formattedMessage.timestamp)

    setMessages((prevMessages) => [...prevMessages, formattedMessage])
  }

  useEffect(() => {
    if (!socket) return

    socket.on("message", (message) => {
      addMessageToChat(message)
    })

    return () => {
      socket.off("message")
    }
  }, [socket])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(scrollToBottom, [messages])

  const sendMessage = async (e) => {
    e.preventDefault()

    try {
      const userId = getUserIdFromToken(localStorage.getItem("token"))
      socket.emit("sendMessage", {
        message: newMessage,
        userId: userId,
        receiverId: friendId,
      })
      setNewMessage("")
    } catch (error) {
      console.error("Failed to send message.", error)
    }
  }

  return (
    <>
      <div className="private-chat-container">
        <div className="private-msg">
          <ul>
            {messages.map((message, index) => (
              <li
                key={index}
                className={message.isSenderLeft ? "left" : "right"}
              >
                <div className="message-priv">
                  <strong>{message.sender}: </strong> {message.text}
                </div>
              </li>
            ))}
            <div ref={messagesEndRef} />
          </ul>
        </div>
        <form className="private-form" onSubmit={sendMessage}>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
          />
          <button className="fill-button privet" type="submit">
            Send
          </button>
        </form>
      </div>
    </>
  )
}

export default PrivateChat
