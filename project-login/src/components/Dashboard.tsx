import React from 'react';
import { useLocation } from 'react-router-dom';
import { FaHome, FaArrowLeft, FaChartBar, FaUser } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

const Dashboard: React.FC = () => {
    const location = useLocation();
    const userName = location.state?.userName || 'Usuário';

    return (
        <div className="d-flex vh-100">
            {/* Sidebar */}
            <div className="bg-dark text-white p-3 d-flex flex-column" style={{ width: '250px' }}>
                <h4 className="text-center">Painel</h4>
                <ul className="nav flex-column">
                    <li className="nav-item mb-2">
                        <a href="/" className="nav-link text-white">
                            <FaHome className="me-2" /> Home
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="/" className="nav-link text-white">
                            <FaArrowLeft className="me-2" /> Sair
                        </a>
                    </li>
                </ul>
            </div>

            {/* Main Content */}
            <div className="flex-grow-1 p-4 bg-light">
                <header className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-2">
                    <h2>Seja bem-vindo, {userName}!</h2>
                </header>

                {/* Dashboard Cards */}
                <div className="row g-4">
                    <div className="col-md-4">
                        <div className="card shadow-sm border-0">
                            <div className="card-body text-center">
                                <FaUser size={40} className="text-primary mb-2" />
                                <h5 className="card-title">Perfil</h5>
                                <p className="card-text">Gerencie suas informações pessoais.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card shadow-sm border-0">
                            <div className="card-body text-center">
                                <FaChartBar size={40} className="text-success mb-2" />
                                <h5 className="card-title">Estatísticas</h5>
                                <p className="card-text">Veja seu progresso e desempenho.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card shadow-sm border-0">
                            <div className="card-body text-center">
                                <FaHome size={40} className="text-danger mb-2" />
                                <h5 className="card-title">Início</h5>
                                <p className="card-text">Voltar para a página principal.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
