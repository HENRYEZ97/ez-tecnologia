import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import { estourarConfete } from "../utils/confetti";
import "../componentes/Login.css";


interface Usuario {
    nome: string;
    email: string;
    senha: string;
}

export default function Login () {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const navigate = useNavigate();
    const { login } = useAuth();


    const handleSubmit = (e:
        React.FormEvent) => {
            e.preventDefault();
    const usuariosSalvos = JSON.parse(localStorage.getItem("usuarios") || "[]");
    const usuarioEncontrado = usuariosSalvos.find(
        (u:Usuario) => u.email === email && u.senha === senha);
    
        if(usuarioEncontrado) {
            localStorage.setItem("usuarioLogado", "true");
            localStorage.setItem("dadosUsuarioLogado", JSON.stringify({ email: usuarioEncontrado.email }));       // salvando email no localStorage para funcionar no componente CadastrarProduto.tsx.
                login();
                estourarConfete();
                navigate("/");
        } else {
            alert ("Email ou Senha inválidos !!!");
        }
        };

        return (
            <div className="container">
            <div className="centralizar">
            <div className="login-container">
                <h2>Login</h2>
                <form onSubmit={handleSubmit} className="login-form">
                    <div className="form-group">
                        <label>Email:</label>
                        <div className="input-icon">
                            <Mail />
                        <input type="email" className="form-input" value={email} onChange={(e) => 
                            setEmail(e.target.value)} required />
                    </div>
                    </div>

                    <div className="form-group">
                        <label>Senha:</label>
                        <div className="input-icon">
                            <Lock/>
                        <input type="password" className="form-input" value={senha} onChange={(e) =>
                            setSenha(e.target.value)} required />
                    </div>
                    </div>
                    <div className="form-actions">
                        <button type="submit">Entrar</button>
                        <button type="button" onClick={() => navigate("/")}>Voltar</button>
                    </div>
                </form>
                <p className="login-bottom-text">
                    Não tem uma conta? <Link to="/cadastro"><span>Crie uma aqui</span></Link>
                </p>
            </div>
            </div>
            </div>
        );
    }