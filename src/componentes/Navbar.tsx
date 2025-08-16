import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { FaHome, FaBox, FaSignInAlt, FaUserPlus, FaPlusSquare, FaSignOutAlt, FaBars } from "react-icons/fa";
import "./Navbar.css";


export default function Navbar () {
    const { usuarioLogado, logout } = useAuth();
    const navigate = useNavigate();
    const [menuAberto, setMenuAberto] = useState(false);


    const handleLogout = () => {
        logout();
        alert("Usuário deslogado");
        navigate("/");
    };

    const toggleMenu = () => {
        setMenuAberto(!menuAberto);
    };


    return (
        <nav className="navbar">
            <h2>EZ TECNOLOGIA</h2>

            <div className="hamburguer" onClick={toggleMenu}>
                <FaBars/>
            </div>

            <div className={`navbar-links ${menuAberto ? "ativo" : ""}`}>
                <Link to="/"><button className="btn-icon"><FaHome className="icon"/>Home</button></Link>
                <Link to="/produtos"><button className="btn-icon"><FaBox className="icon"/>Produtos</button></Link>
                {usuarioLogado ? (
            <>
                <Link to="/cadastrar"><button className="btn-icon"><FaPlusSquare className="icon"/>Cadastrar Produto</button></Link>
                <button className="btn-icon" onClick={handleLogout}><FaSignOutAlt className="icon"/>Logout</button>
            </>
            
                ):(
            <>
            <Link to="/login"><button className="btn-icon"><FaSignInAlt className="icon"/>Login</button></Link>
            <Link to="/cadastro"><button className="btn-icon"><FaUserPlus className="icon"/>Criar Conta</button>
            </Link>
            </>
        )}       
            </div>     
        </nav>
    );
}