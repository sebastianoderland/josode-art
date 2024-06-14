import React, { useState, useEffect, useCallback } from "react"
import "../css/ChatPage.css"
import { jsonApiRequest } from "../utils/api"

const ChatPage = () => {
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState("")
  const [charCount, setCharCount] = useState(0)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [userName, setUserName] = useState("")
  const [likedMessages, setLikedMessages] = useState([])

  useEffect(() => {
    setIsLoading(true)
    fetchMessages()
  }, [])

  const fetchMessages = async () => {
    try {
      const response = await jsonApiRequest("GET", "/messages")
      const data = await response.json()
      setMessages(data)
      setIsLoading(false)
    } catch (error) {
      console.error("Error fetching messages:", error)
      setIsLoading(false)
    }
  }

  const sendMessage = useCallback(
    async (e) => {
      e.preventDefault()
      if (newMessage.length > 140) {
        setError("Message exceeds 140 characters")
        return
      }
      if (!userName.trim()) {
        setError("User name is required")
        return
      }

      try {
        const response = await jsonApiRequest("POST", "/messages", {
          text: newMessage,
          user: userName,
        })

        if (response.ok) {
          const data = await response.json()
          setMessages([...messages, data])
          setNewMessage("")
          setUserName("")
          setCharCount(0)
        } else {
          console.error("Failed to send message, Response:", response)
        }
      } catch (error) {
        console.error("Error sending message:", error)
      }
    },
    [newMessage, userName, messages]
  )

  const getTimeSinceMessage = (createdAt) => {
    const now = new Date()
    const messageDate = new Date(createdAt)
    const diffInMinutes = Math.floor((now - messageDate) / (1000 * 60))

    if (diffInMinutes < 5) {
      return "now"
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes} minute${diffInMinutes !== 1 ? "s" : ""} ago`
    } else if (diffInMinutes < 1440) {
      const hours = Math.floor(diffInMinutes / 60)
      const minutes = diffInMinutes % 60
      return `${hours} hour${hours !== 1 ? "s" : ""} ${minutes} minute${
        minutes !== 1 ? "s" : ""
      } ago`
    } else {
      const month = (messageDate.getMonth() + 1).toString().padStart(2, "0")
      const day = messageDate.getDate().toString().padStart(2, "0")
      return `${month}/${day}`
    }
  }

  const toggleLike = async (messageId, actionType) => {
    try {
      let newLikes = 0
      if (actionType === "like") {
        newLikes = 1
      } else if (actionType === "unlike") {
        newLikes = -1
      }

      const response = await jsonApiRequest(
        "POST",
        `/messages/${messageId}/like`,
        {
          likes: newLikes,
        }
      )

      if (response.ok) {
        const updatedMessages = messages.map((message) => {
          if (message._id === messageId) {
            return { ...message, likes: message.likes + newLikes }
          }
          return message
        })

        if (actionType === "like" && !likedMessages.includes(messageId)) {
          setLikedMessages([...likedMessages, messageId])
        } else if (
          actionType === "unlike" &&
          likedMessages.includes(messageId)
        ) {
          setLikedMessages(likedMessages.filter((id) => id !== messageId))
        }

        setMessages(updatedMessages)
      } else {
        console.error("Failed to toggle like/unlike, Response:", response)
      }
    } catch (error) {
      console.error("Error toggling like/unlike:", error)
    }
  }

  if (isLoading) {
    return <p>Loading...</p>
  }

  return (
    <div className="chat-container">
      <div className="form-desk">
        <form className="my-form" onSubmit={sendMessage}>
          <h3 className="text-label">Your Name</h3>
          <input
            type="text"
            id="newMessageInput"
            name="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="..."
            className="input-field"
          />
          <h3 className="text-label">Write your message here</h3>
          <input
            type="text"
            id="newMessageInput"
            name="newMessage"
            value={newMessage}
            onChange={(e) => {
              const inputValue = e.target.value
              setNewMessage(inputValue)
              setCharCount(inputValue.length)
              setError("")
            }}
            placeholder="..."
            className="input-field"
          />
          <p className={charCount > 140 ? "char-count exceeded" : "char-count"}>
            {charCount}/140 characters
          </p>
          {error && <p style={{ color: "#FFADAD" }}>{error}</p>}
          <button className="fill-button" type="submit">
            Send
          </button>
        </form>
      </div>
      <h2 className="title">Chat</h2>
      <div className="list-desk">
        <div className="message-list">
          {messages.map((message) => (
            <div key={message._id} className="message">
              <p className="user-name">{message.user}:</p>
              <p className="message-text">{message.text}</p>
              <div className="message-footer">
                <button
                  onClick={() =>
                    toggleLike(
                      message._id,
                      likedMessages.includes(message._id) ? "unlike" : "like"
                    )
                  }
                >
                  {likedMessages.includes(message._id) ? "❤️️" : "♥"}{" "}
                  {message.likes}
                </button>
                <p>{getTimeSinceMessage(message.createdAt)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ChatPage
