import { useState, useEffect } from 'react'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import AddBlogForm from './components/AddBlogForm'
import User from './components/User'
import Notification from './components/Notification'
import Error from './components/Error'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setNotificationMessage(`${user.username} successfully logged in`)
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('Incorrect username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()

    const loggedOutUserJSON = window.localStorage.getItem('loggedBlogappUser')
    const loggedOutUser = JSON.parse(loggedOutUserJSON)

    window.localStorage.removeItem('loggedBlogappUser')

    setUser(null)
    setNotificationMessage(`${loggedOutUser.username} successfully logged out`)
    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)
  }

  const handleAddBlog = async (event) => {
    event.preventDefault()
    const newBlog = {
      title: title,
      author: author,
      url: url
    }
    
    try {
      const returnedBlog = await blogService.create(newBlog)
      
      setBlogs(blogs.concat(returnedBlog.data))
      setTitle('')
      setAuthor('')
      setUrl('')
      
      setNotificationMessage(`Blog ${returnedBlog.data.title} by ${returnedBlog.data.author} successfully added.`)
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    } catch (exception) {
      let exceptionMessage = 'Unable to add blog'
      if (exception.response.data) {
        exceptionMessage = exception.response.data.error || exceptionMessage
      }

      setErrorMessage(exceptionMessage)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <div>
      <Notification message={notificationMessage} />
      <Error message={errorMessage} />
      {!user && 
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />}
      {user &&  (<div>
          <h2>Blogs</h2>
          <User
            user={user}
            handleLogout={handleLogout}
          />
          <br/>
          <AddBlogForm
            handleAddBlog={handleAddBlog}
            title={title}
            setTitle={setTitle}
            author={author}
            setAuthor={setAuthor}
            url={url}
            setUrl={setUrl}
          />
          <br/>
          <BlogList 
            blogs={blogs}
          />
        </div>)}
    </div>
  )
}

export default App