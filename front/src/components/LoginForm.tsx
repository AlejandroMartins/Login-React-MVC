import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEye, FaEyeSlash } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import { loginUser } from '../service/authService';


const LoginForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAlertMessage('');

    try {
      const data = await loginUser(username, password); // Chama o loginUser

      setAlertType('success');
      setAlertMessage('Logado com sucesso!');
      localStorage.setItem('token', data.token); // Salva o token no localStorage

      setTimeout(() => {
        setAlertMessage('');
        navigate('/dashboard', { state: { userName: username } });
      }, 1500);
    } catch (error) {
      setAlertType('danger');
      setAlertMessage((error as Error).message);

      setTimeout(() => {
        setAlertMessage('');
      }, 3000);
    }
  };

  return (
    <div className="container-fluid fullscreen-center">
      {alertMessage && (
        <div className={`alert alert-${alertType} position-fixed top-0 start-50 translate-middle-x mt-3`} role="alert">
          {alertMessage}
        </div>
      )}

      <form onSubmit={handleLogin} className="p-4 border rounded shadow bg-white w-100" style={{ maxWidth: "350px" }}>
        <h2 className="text-center mb-4">Login</h2>

        <div className="mb-3">
          <label htmlFor="username" className="form-label">Usuário</label>
          <div className="input-group">
            <span className="input-group-text"><FaUser /></span>
            <input
              type="text"
              id="username"
              name="username"
              className="form-control"
              placeholder="Digite seu nome de usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Senha</label>
          <div className="input-group">
            <span className="input-group-text" onClick={() => setShowPassword(!showPassword)} style={{ cursor: "pointer" }}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              className="form-control"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary w-100">Entrar</button>
      </form>
    </div>
  );
};

export default LoginForm;
