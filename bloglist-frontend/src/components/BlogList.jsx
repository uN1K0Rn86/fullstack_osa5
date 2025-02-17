import Blog from "./Blog"

const BlogList = ({ blogs }) => {
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
                />
            )}
            </tbody>
        </table>
        
      </div>
    )
}

export default BlogList
