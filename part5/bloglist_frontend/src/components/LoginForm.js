
const LoginForm = ({
    handleLogin, 
    username, 
    setUsername, 
    password, 
    setPassword
   }) => {
   return (
     <div>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
            <div>
            username
            <input
                value={username}
                onChange={({ target }) => setUsername(target.value)}
            />
            </div>
            <div>
            password
            <input
                type="password"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
            />
            </div>
            <button type="submit">login</button>
        </form>
     </div>
   )
  }
  
  export default LoginForm