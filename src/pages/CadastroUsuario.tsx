import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, Lock } from "lucide-react";
import { estourarConfete } from "../utils/confetti";
import "../componentes/CadastroUsuario.css";

interface Usuario {
    nome: string;
    email: string;
    senha: string;
}

export default function CadastroUsuario () {
    const [usuario, setUsuario] = useState<Usuario>({
        nome: "",
        email: "",
        senha: "",
    });

    const navigate = useNavigate();
    const handleChange = (e:
        React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.target;
            setUsuario({...usuario, [name]: value });
        };

        const handleSubmit = (e:
        React.FormEvent) => {
            e.preventDefault();

            const usuariosSalvos = JSON.parse(localStorage.getItem("usuarios") || "[]");
            const emailExiste = usuariosSalvos.find(
                (u: Usuario) => u.email === usuario.email);

                if (emailExiste) {
                    alert("Este email já está cadastrado. ");
                    return;
                }

                const novaLista = [...usuariosSalvos, usuario];
                localStorage.setItem("usuarios", JSON.stringify(novaLista));

                alert("Usuário cadastrado com sucesso !");
                estourarConfete();
                navigate("/Login");
            };

            return (
                <div className="container">
                <div className="centralizar">
                <div className="cadastro-container">
                    <h2>Cadastro de Usuário</h2>
                    <form onSubmit={handleSubmit} className="cadastro-form">
                        <div className="form-group">
                            <label>Nome:</label>
                            <div className="input-icon">
                                <User/>
                            <input type="text" name="nome" className="form-input" value={usuario.nome} onChange={handleChange} required />
                        </div>
                        </div>

                        <div className="form-group">
                            <label>Email:</label>
                            <div className="input-icon">
                                <Mail/>
                            <input type="email" name="email" className="form-input" value={usuario.email} onChange={handleChange} required />
                        </div>
                        </div>

                        <div className="form-group">
                            <label>Senha:</label>
                            <div className="input-icon">
                                <Lock/>
                            <input type="password" name="senha" className="form-input" value={usuario.senha} onChange={handleChange} required />
                        </div>
                        </div>

                        <div className="form-actions">
                            <button type="submit">Cadastrar</button>
                            <button type="button" onClick={() => navigate("/")}>Voltar</button>
                        </div>
                    </form>
                </div>
                </div>
                </div>
            );
        }