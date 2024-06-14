import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { apiRequest } from "../../utils/api.js"
import FriendRequestForm from "./FriendRequestForm"
import "../../css/userPage.css"

const UserPage = () => {
  const { userId } = useParams()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [posts, setPosts] = useState([])
  const [userSettings, setUserSettings] = useState(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true)
        const response = await apiRequest("GET", `/userId/${userId}`)
        const userData = await response.json()
        setUser(userData)

        const postsResponse = await apiRequest(
          "GET",
          `/my-page/posts/${userId}`
        )
        const postsData = await postsResponse.json()
        setPosts(postsData)

        const settingsResponse = await apiRequest(
          "GET",
          `/my-page/settings/${userId}`,
          {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }
        )
        const settingsData = await settingsResponse.json()
        setUserSettings(settingsData)

        setLoading(false)
      } catch (error) {
        console.error("Error fetching user data, settings or posts:", error)
        setLoading(false)
      }
    }
    fetchUser()
  }, [userId])

  if (loading) {
    return <div>Loading...</div>
  }

  if (!user) {
    return <div>User not found.</div>
  }

  return (
    <div className="user-page">
      <div className="header-container">
        {user.profileImageUrl && (
          <img
            src={`${process.env.REACT_APP_API_HOST}${user.profileImageUrl}`}
            alt="Profile"
            className="profile-image"
          />
        )}
        <h2>{user.username}'s Profile</h2>
      </div>
      <FriendRequestForm userId={userId} onRequestSent={() => {}} />
      {userSettings && (
        <div className="user-info-container">
          <div className="user-info">
            <h3>About {user.username}</h3>
            <p>
              <i className="fas fa-envelope"></i>{" "}
              <a href={`mailto:${userSettings.email}`}>{userSettings.email}</a>
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
              <i className="fas fa-birthday-cake"></i> {userSettings.age}{" "}
              {userSettings.age ? "year old" : ""}
            </p>
            <p>
              <i className="fas fa-briefcase"></i> {userSettings.occupation}
            </p>
            <p>
              <i className="fas fa-user-tag"></i> {userSettings.description}
            </p>
          </div>
        </div>
      )}
      <div className="posts">
        {posts.length === 0 ? (
          <p className="no-posts-message">
            This user has not posted anything yet.
          </p>
        ) : (
          posts.map((post) => (
            <div key={post._id} className="post">
              <p>{post.text}</p>
              {post.imageUrl && (
                <img
                  src={`${process.env.REACT_APP_API_HOST}${post.imageUrl}`}
                  alt="Post"
                />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default UserPage
