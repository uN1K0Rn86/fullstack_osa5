import PropTypes from 'prop-types'
import { useState } from 'react'

const Blog = ({ blog, like, username, remove }) => {
    const [showInfo, setShowInfo] = useState(false)

    const infoShown = { display: showInfo ? '' : 'none' }
    const infoHidden = { display: showInfo ? 'none' : '' }

    const toggleInfo = () => {
        setShowInfo(!showInfo)
    }

    const addLike = () => {
        const id = blog.id
        const likedBlog = { ...blog }
        likedBlog.likes = blog.likes + 1
        like(id, likedBlog)
    }

    const deleteBlog = () => {
        const id = blog.id
        remove(blog)
    }

    const user = blog.user

    const isOwner = user
        ? username === user.username
        : false

    return (
        <>
            <tr style={infoHidden}>
                <td>
                    {blog.title}
                </td>
                <td>{blog.author}</td>
                <td><button
                    type="submit"
                    onClick={toggleInfo}>Show More
                </button><br/>
                </td>
            </tr>
            <tr style={infoShown}>
                <td>
                    {blog.title}<br/>
                    {blog.url}<br/>
                    <span>Likes: {blog.likes} </span>
                    <button type="submit" onClick={addLike}>Like</button><br/>
                    {user?.username || 'User not found'}
                </td>
                <td>{blog.author}</td>
                <td><button
                    type="submit"
                    onClick={toggleInfo}>Show Less
                </button><br/>
                {isOwner &&
                    <><br/><button
                        type="submit"
                        onClick={deleteBlog}>Remove
                    </button></>}
                </td>
            </tr>
        </>
    )
}

Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    like: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    remove: PropTypes.func.isRequired
}

export default Blog
