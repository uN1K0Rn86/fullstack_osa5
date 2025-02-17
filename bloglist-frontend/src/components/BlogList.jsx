import Blog from "./Blog"

const BlogList = ({ blogs, like }) => {
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
                    <th></th>
                </tr>
            </thead>
            <tbody>
            {blogs.map(blog =>
                <Blog
                    key={blog.id}
                    blog={blog}
                    like={like}
                />
            )}
            </tbody>
        </table>
        
      </div>
    )
}

export default BlogList
