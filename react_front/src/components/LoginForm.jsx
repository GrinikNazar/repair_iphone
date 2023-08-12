import React, { useState } from 'react';
import "../styles/StyleLogin.css"

function LoginForm({ handleLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    handleLogin(username, password);
  }

  return (
    <div className="wrapper">
        <div className="form-box">
            <div className="form-wrapper">
                <div class="img-phone"></div>
                
                <form onSubmit={handleSubmit}>
                  <div>
                    <input
                      className="input"
                      type="text"
                      id="username"
                      value={username}
                      onChange={(event) => setUsername(event.target.value)}
                      placeholder='Логін'
                    />
                  </div>

                  <div>
                    <input
                      className="input"
                      type="password"
                      id="password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      placeholder='Пароль'
                    />
                  </div>
                  <button className="submit" type="submit">Авторизація</button>
                </form>

              </div>
          </div>
      </div>
  )
}

export default LoginForm;