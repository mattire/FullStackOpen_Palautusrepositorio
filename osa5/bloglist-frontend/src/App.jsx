import { useState, useEffect, useRef } from 'react'
import Blog         from './components/Blog'
//import Blog2         from './components/Blog2'
import Notification from './components/Notification'
import NewBlog      from './components/NewBlog'
import Toggleable      from './components/Togglable'
import blogService  from './services/blogs'
import loginService from './services/login'
import './index.css'

const getUser = () => {
  const lsUser   = window.localStorage.getItem('user')
  return JSON.parse(lsUser)
}

const App = () => {
  const [blogs, setBlogs]       = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [styleNotification, setStyleNotification] = useState({ msg: '', style: 'notif' })

  const blogFormRef = useRef()

  const userOjb  =  getUser()
  const loggedIn = userOjb !== null

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  const handleNewBlog = async (props) => {
    const newBlog = props.blog
    console.log('newBlog')
    console.log(props.blog)

    blogFormRef.current.toggleVisibility()
    //const newBlog = blogFormRef.current.getNewBlog()
    try {
      const uObj  =  getUser()
      console.log(`userObj ${uObj}`)
      console.log(uObj.id)

      const r = await blogService.postNewBlogObj(newBlog, uObj.id, uObj.token)
      if(r.request.status===201){
        //console.log(r.data);
        r.data.user = {
          'username': uObj.username,
          'name': uObj.name,
          'id': uObj.id
        }

        var newBlogs = blogs.concat(r.data)
        setBlogs(newBlogs)
        setTimedNotif({ msg:`Creating blog ${newBlog.title} succeeded`, style : 'notif' })
        props.aftersend()
      } else {
        setTimedNotif({ msg:`Creating blog ${newBlog.title} failed`, style: 'error' })
      }
    } catch (error) {
      console.log(error)
      setTimedNotif({ msg:`Creating blog ${newBlog.title} failed`, style: 'error' })
    }
  }

  const setTimedNotif = (notifObj) => {
    setStyleNotification(notifObj)
    setTimeout(function() {
      setStyleNotification({ msg: '', style: 'notif' })
    }.bind(this), 4000 )
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      var jsonUser = JSON.stringify(user)
      window.localStorage.setItem('user', jsonUser)
      setUsername('')
      setPassword('')
      setTimedNotif({ msg: 'login successful', style: 'notif' })
    } catch (error) {
      console.log(error)
      //console.log(error.request.statusText);
      setTimedNotif({ msg: `login failed ${error.request.statusText} ${error}`, style: 'error' })
    }
  }

  const handleLogout = async() => {
    window.localStorage.removeItem('user', null)
    //setUser(null)

    //setStyleNotification({ msg: 'logout successful', style: 'notif'})
    setTimedNotif({ msg: 'logout successful', style: 'notif' })
  }

  const removeHandler = (blog) => {
    console.log('rem')
    const newBlogs = blogs.filter(b => b.id!==blog.id)
    setBlogs(newBlogs)
  }

  if(!loggedIn){
    return (
      <div>
        <h2>log in to application</h2>
        <Notification msg = {styleNotification.msg} style={styleNotification.style}/>
        <form onSubmit={handleLogin}>
          <div>
            <label>
            username
              <input
                type="text"
                value={username}
                onChange={( event ) => { setUsername(event.target.value) }
                }
                // onChange={( target ) => setUsername(target.value)}
              />
            </label>
          </div>
          <div>
            <label>
            password
              <input
                type="text"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
              />
            </label>
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }
  else{
    blogs.sort((a, b) => b.likes - a.likes)
    return (
      <div>
        <Notification msg = {styleNotification.msg} style={styleNotification.style}/>
        <div>
          {userOjb.name} logged in<button onClick={() => handleLogout()}>logout</button>
        </div><br/>

        <Toggleable buttonLabel="Create new blog" ref={blogFormRef}>
          <NewBlog
            handleNewBlog = {handleNewBlog}
          >
          </NewBlog>
        </Toggleable>
        <h2>blogs</h2>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} removeHandler={removeHandler} />
          //<Blog2 key={blog.id} blog={blog} removeHandler={removeHandler} />
        )}
      </div>
    )
  }
}

export default App