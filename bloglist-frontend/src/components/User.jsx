const User = ({ user, handleLogout }) => {
    return (
        <div>
            {user.name} logged in
            <form onSubmit={handleLogout}>
                <button type="submit">Logout</button>
            </form>
        </div>
    )
}

export default User
