import Blog from "./Blog"

const BlogList = ({ blogs, user }) => {
    return (
      <div>
        <h2>Blogs</h2>
        {user.name} logged in
        <br/><br/>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )
}

export default BlogList
