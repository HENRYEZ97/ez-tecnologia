import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../componentes/CadastrarProduto.css";
import { NumericFormat } from "react-number-format";
import { uploadImagem } from "../utils/uploadImagem";
import { Tag, StickyNote, DollarSign, Image, List } from "lucide-react";
import { estourarConfete } from "../utils/confetti";
import { Produto } from "../types/Produto"




export default function CadastrarProduto () {

    const navigate = useNavigate();
    const [produto, setProduto] = useState<Produto> ({
        id: 0,
        titulo: '',
        descricao: '',
        preco: '',
        imagem: '',
        categoria: '',
        criadoPor: ''
    });

    const [imagemSelecionada, setImagemSelecionada] = useState<File | null>(null);

    const handleImagemChange = (e:
        React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0];
        if (file) {
            setImagemSelecionada(file);
        }
    };

    const handleChange = (e:
        React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setProduto({ ...produto, [name]: value});
        };

        const handleSubmit = async (e:
            React.FormEvent) => {
                e.preventDefault();

                let urlImagem = "";

                if (imagemSelecionada) {
                    try {
                        urlImagem = await uploadImagem(imagemSelecionada);
                    } catch (error) {
                        alert("Erro ao fazer upload de imagem !");
                        return;
                    }
                }


                const produtosSalvos = JSON.parse(localStorage.getItem("produtos") || "[]");
                const id = Date.now();
                const usuario = JSON.parse(localStorage.getItem("dadosUsuarioLogado") || "{}");    //função adicionada !!! funcionando com Login.tsx em usuarioEncontrado.
                const email = usuario.email;        
                if (!email) {
                            alert("Usuário não logado, faça login para anunciar.");
                            navigate("/login");
                        return;
                        }

                const novoProduto: Produto = {...produto, id, imagem: urlImagem, criadoPor: email};                          //carrega produtos salvos no storage
                const novosProdutos = [...produtosSalvos, novoProduto];                                                     // adiciona o novo produto à lista

                localStorage.setItem("produtos", JSON.stringify(novosProdutos));                                                // salva de volta no storage  
                alert("Produto carregado com sucesso !");
                estourarConfete();
                setProduto({ id: 0, titulo: "", descricao: "", preco: "", imagem: "", categoria: "", criadoPor: ""}); //campo criadoPor adicionado !!!
                setImagemSelecionada(null);
                navigate("/produtos"); //redirecionamento para página de produtos
            };
        
            return (
                <div className="centralizar">
                <div className="cadastro-produto-container">
                    <h2>Cadastre seus Produtos</h2>
                    <form onSubmit={handleSubmit} className="produto-form">


                        <div className="form-group">
                            <label>Título:</label>
                            <div className="input-icon">
                                <Tag/>
                            <input type="text"
                            name="titulo"
                            value={produto.titulo}
                            onChange={handleChange} required
                            className="form-input" />
                        </div>
                        </div>


                        <div className="form-group">
                            <label>Descrição:</label>
                            <div className="input-icon">
                                <StickyNote/>
                            <input type="text"
                            name="descricao"
                            value={produto.descricao}
                            onChange={handleChange} required
                            className="form-input" />    
                        </div>
                        </div>

                    <div className="form-group">
                        <label>Categoria:</label>
                            <div className="input-icon">
                                <List />
                                <select name="categoria"
                                        value={produto.categoria}
                                        onChange={handleChange}
                                        required
                                        className="form-input">
                                        <option value="">Selecione:</option>
                                        <option value="informática">Informática</option>
                                        <option value="eletrodomésticos">Eletrodomésticos</option>
                                        <option value="games">Games</option>
                                        <option value="celulares">Celulares</option>
                                        <option value="outros">Outros</option>
                                </select>
                            </div>
                        </div>

                        
                        <div className="form-group">
                            <label>Preço:</label>
                            <div className="input-icon">
                                <DollarSign/>
                                <NumericFormat
                                    thousandSeparator="."
                                        decimalSeparator=","
                                            prefix="R$"
                                                value={produto.preco}
                                            onValueChange={(val) =>
                                        setProduto({...produto, preco: val.value })}
                                    className="form-input" placeholder="R$ 0,00" required/>
                            </div>
                        </div>
                                                      
                        <div className="form-group">
                            <label>Imagem:</label>
                            <div className="input-icon">
                                    <Image/>
                                    <input type="file"
                                            accept="image/*"
                                            onChange={handleImagemChange}
                                            className="form-input" />    
                                </div>
                        </div>

                        <div className="form-actions">
                        <button type="submit">Cadastrar</button>
                            <button type="button" onClick={() => navigate("/produtos")}>Voltar</button>    
                        </div>        
                    </form>
                </div>
            </div>
        );
    };