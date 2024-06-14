import React, { useState, useEffect } from "react"
import { Outlet, useLocation } from "react-router-dom"
import { apiRequest } from "../../utils/api"
import Sidebar from "../components/Sidebar"
import MyPageForm from "./MypageForm"
import UserSettingsForm from "./UserSettingsForm"
import "../../css/myPage.css"
import { getUserIdFromToken } from "../auth/authUtils"

const MyPage = () => {
  const location = useLocation()
  const isMainPage = location.pathname === "/my-page"
  const [posts, setPosts] = useState([])
  const [userSettings, setUserSettings] = useState({})
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [profileImageUrl, setProfileImageUrl] = useState(null)
  const token = localStorage.getItem("token")
  const userId = getUserIdFromToken(token)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await apiRequest("GET", "my-page/posts", {
          Authorization: `Bearer ${token}`,
        })
        const data = await response.json()
        setPosts(data)
      } catch (error) {
        console.error("Error fetching posts:", error)
      }
    }
    fetchPosts()
  }, [token])

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await apiRequest("GET", "my-page/settings", {
          Authorization: `Bearer ${token}`,
        })
        const data = await response.json()
        setUserSettings(data || {})
      } catch (error) {
        console.error("Error fetching settings:", error)
      }
    }
    fetchSettings()
  }, [token])

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await apiRequest("GET", "auth/profile", {
          Authorization: `Bearer ${token}`,
        })
        const data = await response.json()
        setProfileImageUrl(data.profileImageUrl)
      } catch (error) {
        console.error("Error fetching profile:", error)
      }
    }
    fetchProfile()
  }, [token])

  const hasUserSettings =
    userSettings.email ||
    userSettings.instagram ||
    userSettings.age ||
    userSettings.occupation ||
    userSettings.description

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen)
  }

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

  return (
    <div className="my-page">
      <Sidebar />
      <main className="content-wrapper">
        <div className="my-page-container">
          {isMainPage && (
            <>
              <div className="header-container">
                <div className="title-container">
                  <div className="title-left">
                    {profileImageUrl && (
                      <img
                        src={`${process.env.REACT_APP_API_HOST}${profileImageUrl}`}
                        alt="Profile"
                        className="profile-image"
                      />
                    )}
                    <h2>My Page</h2>
                  </div>
                  <div className="gear-icon" onClick={togglePopup}>
                    <i className="fas fa-cog"></i>
                  </div>
                </div>
              </div>
              <div className="container-no-header">
                {isPopupOpen && (
                  <div className="popup-form-container">
                    <UserSettingsForm
                      userId={userId}
                      token={token}
                      isEditable={true}
                      onPopupToggle={(isOpen) => setIsPopupOpen(isOpen)}
                    />
                  </div>
                )}

                {!isPopupOpen && (
                  <>
                    <div className="combined-container">
                      {" "}
                      {hasUserSettings && (
                        <div className="desk-my-container">
                          <div
                            className="user-info-container"
                            style={{
                              backgroundColor:
                                userSettings.backgroundColor || "#ffffff",
                            }}
                          >
                            <div className="user-info">
                              <h3>About Me</h3>
                              <p>
                                <i className="fas fa-envelope"></i>{" "}
                                <a href={`mailto:${userSettings.email}`}>
                                  {userSettings.email}
                                </a>
                              </p>
                              <p>
                                <i className="fab fa-instagram"></i>{" "}
                                <a
                                  href={`https://instagram.com/${userSettings.instagram}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  {userSettings.instagram}
                                </a>
                              </p>
                              <p>
                                <i className="fas fa-birthday-cake"></i>{" "}
                                {userSettings.age}{" "}
                                {userSettings.age ? "years old" : ""}
                              </p>
                              <p>
                                <i className="fas fa-briefcase"></i>{" "}
                                {userSettings.occupation}
                              </p>
                              <p>
                                <i className="fas fa-user-tag"></i>{" "}
                                {userSettings.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                      <MyPageForm userId={userId} token={token} />
                    </div>{" "}
                    <div className="posts">
                      {posts.map((post) => (
                        <div key={post._id} className="post">
                          <p>{post.text}</p>
                          {post.imageUrl && (
                            <img
                              src={`${process.env.REACT_APP_API_HOST}${post.imageUrl}`}
                              alt="Post"
                            />
                          )}
                          <p className="post-time">
                            {getTimeSinceMessage(post.createdAt)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </>
          )}
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default MyPage
