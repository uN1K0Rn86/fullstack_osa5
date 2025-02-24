import Blog from './Blog'
import PropTypes from 'prop-types'

const BlogList = ({ blogs, like, username, remove }) => {
    const columnStyle = {
        minWidth: '250px'
    }

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th style={columnStyle}>Info</th>
                        <th>Author</th>
                        <th>Functions</th>
                    </tr>
                </thead>
                <tbody>
                    {blogs.map(blog =>
                        <Blog
                            key={blog.id}
                            blog={blog}
                            like={like}
                            username={username}
                            remove={remove}
                        />
                    )}
                </tbody>
            </table>

        </div>
    )
}

BlogList.propTypes = {
    blogs: PropTypes.array.isRequired,
    like: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    remove: PropTypes.func.isRequired
}

export default BlogList
