import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Produto } from "../types/Produto";
import "./DetalheProduto.css";
import padraoImg from "../assets/imagens/ps5.jpg";

export default function DetalheProduto () {
    
    
    const { id } = useParams();
    const idNumerico = Number(id);
    const [produto, setProduto] = useState<Produto | null>(null);
    const navigate = useNavigate();


        useEffect(() => {
            const produtosSalvos: Produto[] = JSON.parse(localStorage.getItem("produtos") || "[]");
            const produtoSelecionado = produtosSalvos.find(p => p.id === idNumerico);
                    
    if(produtoSelecionado) {
        setProduto(produtoSelecionado);

} else {
        navigate("/produtos");
}
    }, [id, navigate]);

    
        if (!produto) return <p>Carregando...</p>;

            return (
                <div className="detalhe-container">
                    <div className="img-container">
                        <img src={produto.imagem && produto.imagem.trim() !== "" ? produto.imagem : padraoImg} //AQUI EU FIZ UMA ALTERAÇÃO PARA IMAGEM PADRAO PARA EXIBIR DE FORMA ESTÁTICA
                             alt={produto.titulo}                                                               //DEPOIS PRECISA VOLTAR PARA O CÓDIGO ANTERIOR 
                             onError={(e) => {e.currentTarget.src = padraoImg}}/>
                    </div>
                    
                    <div className="info-container">
                        <h1 className="titulo-produto">{produto.titulo}</h1>
                            <p className="preco">
                                    {Number(produto.preco).toLocaleString("pt-BR", {
                                    style: "currency",
                                    currency: "BRL",
                            })}
                            </p>
                            <p className="descricao">{produto.descricao}</p>
                            <a href={`https://wa.me/5592999999999? text="Olá, tenho interesse no produto: ${produto.titulo}`}
                            target="_blank"
                            rel="noreferrer"
                            className="whatsapp-btn">Falar com o vendedor no whatsapp</a><br />
                        <button onClick={() =>
                                navigate("/produtos")}
                                className="voltar-btn">Voltar
                        </button>
                    </div>
                </div>
        );
}