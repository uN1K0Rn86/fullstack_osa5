const BlogList = ({ blogs }) => {
    return (
      <div>
        <table>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Author</th>
                </tr>
            </thead>
            <tbody>
            {blogs.map(blog =>
                <tr key={blog.id}>
                    <td>{blog.title}</td>
                    <td>{blog.author}</td>
                </tr>
            )}
            </tbody>
        </table>
        
      </div>
    )
}

export default BlogList
