const LoginForm = ({ handleLogin, username, setUsername, password, setPassword }) => {
    const formstyle = {
        display: 'grid',
        gridTemplateColumns: '100px 150px',
        gap: '5px'
    }
    
    return (
    <div>
        <h2>Login</h2>
        <form onSubmit={handleLogin} style={formstyle}>
            <div>
            <label htmlFor="Username">Username: </label>
            </div>
            <div>
            <input
                type="text"
                value={username}
                id="Username"
                name="Username"
                onChange={({ target }) => setUsername(target.value)}
            />
            </div>
            <div>
            <label htmlFor="Password">Password: </label>
            </div>
            <div>
            <input
                type="password"
                value={password}
                id="Password"
                name="Password"
                onChange={({ target }) => setPassword(target.value)}
            />
            </div>
            <button type="submit">Login</button>
        </form>
    </div>
)}

export default LoginForm
