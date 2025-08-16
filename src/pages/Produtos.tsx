import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Produto } from "../types/Produto";
import { FaSearch } from "react-icons/fa";
import CardProduto from "../componentes/CardProduto";



function Home () {
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [usuarioLogado, setUsuarioLogado] = useState(false);
    const [busca, setBusca] = useState("");
    const [categoriaSelecionada, setCategoriaSelecionada] = useState("todas")
    const navigate = useNavigate();

            useEffect(() => {
                const dados = localStorage.getItem("produtos");
        if (dados) {
            setProdutos(JSON.parse(dados));
        }

    const usuario = (localStorage.getItem("usuarioLogado") || "false");
        setUsuarioLogado(usuario === "true");    
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("usuarioLogado");
        setUsuarioLogado(false);
        navigate("/");
    }

    const produtosFiltrados = produtos.filter((produto) =>
          (categoriaSelecionada === "todas" ||
          produto.categoria === categoriaSelecionada) &&
         (produto.titulo.toLowerCase().includes(busca.toLowerCase()) ||
          produto.descricao.toLowerCase().includes(busca.toLowerCase()))) 

    

    return (
    <>
    <div className="barra-busca">
        <div className="campo-busca-wrapper">
            <FaSearch className="icone-lupa" />
        <input type="text" placeholder="Buscar produto..." value={busca} onChange={(e) =>
            setBusca(e.target.value)}
            className="campo-busca"/>
        </div>
    </div>

    <div className="filtro-categoria-wrapper">
            <select className="filtro-categoria" value={categoriaSelecionada}
                onChange={(e) =>
                    setCategoriaSelecionada(e.target.value)}>
                        <option value="todas">Todas as categorias</option>
                            <option value="informática">Informática</option>
                                <option value="eletrodomésticos">Eletrodomésticos</option>
                            <option value="games">Games</option>
                        <option value="celulares">Celulares</option>
                    <option value="outros">Outros</option>
            </select>    
    </div>
        <h1 className="titulo-home">Produtos Disponíveis🔥</h1>
        <div className="container-home">
            <div className="produtos-grid">
                {produtosFiltrados.map((produto) => (
                    <CardProduto key={produto.id} produto={produto} index={produto.id} />
                ))}
            </div>
        </div>
    </>
);
}
export default Home;