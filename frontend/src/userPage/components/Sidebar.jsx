import React, { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { apiRequest } from "../../utils/api"
import "../../css/sidebar.css"

const Sidebar = () => {
  const [unreadMessages, setUnreadMessages] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUnreadMessages = async () => {
      try {
        const token = localStorage.getItem("token")
        if (!token) {
          console.error("No token available")
          return
        }

        const response = await apiRequest("GET", `/private-chat/unread-count`, {
          Authorization: `Bearer ${token}`,
        })

        const data = await response.json()
        setUnreadMessages(data.unreadCount)
      } catch (error) {
        console.error("Failed to load unread messages count:", error)
      }
    }

    fetchUnreadMessages()
  }, [])

  const handleChatClick = () => {
    navigate("/my-page/chat")
  }

  return (
    <div className="sidebar">
      <ul>
        <li>
          <Link to="/my-page">
            <i className="far fa-user" aria-label="user page"></i>
          </Link>
        </li>
        <li>
          <Link to="/my-page/friends" aria-label="your friends">
            <i className="fas fa-users"></i>
          </Link>
        </li>
        <li>
          <span onClick={handleChatClick}>
            <i className="fas fa-comments"></i>
            {unreadMessages > 0 && (
              <span className="unread-count">{unreadMessages}</span>
            )}
          </span>
        </li>
        <li>
          <Link to="/my-page/search-component" aria-label="search for users">
            <i className="fas fa-search"></i>
          </Link>
        </li>
        <li>
          <Link to="/my-page/friend-requests" aria-label="friend requests">
            <i className="fas fa-exchange-alt"></i>
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar
