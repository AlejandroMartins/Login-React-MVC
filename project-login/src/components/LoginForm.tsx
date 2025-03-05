import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import { FaUser, FaEye, FaEyeSlash } from 'react-icons/fa'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 

const LoginForm: React.FC = () => {
    // Define os estados para username, password, controle da exibição da senha, e mensagens de alerta
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('');

    const navigate = useNavigate(); // Hook para navegação entre rotas

    // Função para lidar com o login ao submeter o formulário
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault(); // Previne o comportamento padrão de envio do formulário
        setAlertMessage(''); // Limpa mensagens de alerta anteriores

        try {
            // Faz uma requisição POST para o endpoint de login
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }), // Envia username e password no corpo da requisição
            });

            const data = await response.json(); // Converte a resposta em JSON

            // Se a resposta não for bem-sucedida, lança um erro
            if (!response.ok) {
                throw new Error(data.error || 'Erro desconhecido!');
            }

            // Se o login for bem-sucedido, atualiza o estado da mensagem de alerta
            setAlertType('success');
            setAlertMessage('Logado com sucesso!');

            // Redireciona para o dashboard após um curto atraso
            setTimeout(() => {
                setAlertMessage(''); // Limpa a mensagem de alerta
                navigate('/dashboard', { state: { userName: username } }); // Navega para o dashboard, passando o nome de usuário
            }, 1500);
        } catch (error) {
            // Se ocorrer um erro, atualiza o estado da mensagem de alerta com o erro
            setAlertType('danger');
            setAlertMessage((error as Error).message);

            // Limpa a mensagem de alerta após um curto atraso
            setTimeout(() => {
                setAlertMessage('');
            }, 3000);
        }
    };

    return (
        <div className="container-fluid fullscreen-center">
            {alertMessage && ( // Exibe a mensagem de alerta se existir
                <div className={`alert alert-${alertType} position-fixed top-0 start-50 translate-middle-x mt-3`} role="alert">
                    {alertMessage}
                </div>
            )}

            <form
                onSubmit={handleLogin} // Define a função de envio do formulário
                className="p-4 border rounded shadow bg-white w-100"
                style={{ maxWidth: "350px" }} // Define a largura máxima do formulário
            >
                <h2 className="text-center mb-4">Login</h2> // Título do formulário

                {/* Campo Usuário */}
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Usuário</label>
                    <div className="input-group">
                        <span className="input-group-text"><FaUser /></span> {/* Ícone do usuário */}
                        <input
                            type="text"
                            id="username"
                            name="username"
                            className="form-control"
                            placeholder="Digite seu nome de usuário"
                            value={username} // Controla o valor do input
                            onChange={(e) => setUsername(e.target.value)} // Atualiza o estado com o valor do input
                            required // Campo obrigatório
                        />
                    </div>
                </div>

                {/* Campo Senha */}
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Senha</label>
                    <div className="input-group">
                        <span className="input-group-text" onClick={() => setShowPassword(!showPassword)} style={{ cursor: "pointer" }}>
                            {showPassword ? <FaEyeSlash /> : <FaEye />} {/* Ícone para mostrar/ocultar a senha */}
                        </span>
                        <input
                            type={showPassword ? "text" : "password"} // Altera o tipo do input com base no estado
                            id="password"
                            name="password"
                            className="form-control"
                            placeholder="Digite sua senha"
                            value={password} // Controla o valor do input
                            onChange={(e) => setPassword(e.target.value)} // Atualiza o estado com o valor do input
                            required // Campo obrigatório
                        />
                    </div>
                </div>

                {/* Botão de Login */}
                <button type="submit" className="btn btn-primary w-100">Entrar</button> {/* Botão para enviar o formulário */}
            </form>
        </div>
    );
};

export default LoginForm; // Exporta o componente para uso em outras partes da aplicação
