import { Produto } from "../types/Produto";
import "./CardProduto.css";
import { Link, useNavigate } from "react-router-dom";
import padraoImg from "../assets/imagens/ps5.jpg";


interface Props {
    produto: Produto;
    index: number;
}

export default function CardProduto({ produto, index }: Props) {



        const navigate = useNavigate();

        const dadosUsuario = localStorage.getItem("dadosUsuarioLogado"); // função já depurada, estava buscando email (null)
        
        const emailUsuarioLogado = dadosUsuario ? JSON.parse(dadosUsuario).email : null;  //função corrigida

        const ehDono = emailUsuarioLogado && produto.criadoPor === emailUsuarioLogado;   //  salva email do usuário corretamente

        const handleExcluir = (id: number) => {                                     //indica que para excluir o item o dono do login precisa estar logado
                if (!ehDono) {
                    alert("você não tem permissão para excluir este item !")
                    return;
                    }
                
        const confirmar = confirm ("tem certeza que deseja exluir este item ?");
                if (!confirmar) return;

        const produtosSalvos = JSON.parse(localStorage.getItem("produtos") || "[]");
            
        const produtosAtualizados = produtosSalvos.filter((p: Produto) => p.id !== id);

                                        localStorage.setItem("produtos", JSON.stringify(produtosAtualizados));

                                        alert("Item excluído com sucesso !");

                                        navigate("/");  //recarrega a página para Home.tsx
    };

//função importante para se não houver imagem, nada aparecer. Vou aletar uma linha do IMG SRC para alterar para uma imagem estática
    return (
        <div className="card-produto">
            <Link to={`/detalhes/${produto.id}`} className="link-card">
            <img src={produto.imagem && produto.imagem.trim() !== "" ? produto.imagem : padraoImg} //É PRECISO VOLTAR PARAO CÓDIGO ANTERIOR NOVAMENTE APÓS ESSA ALTERAÇÃO PARA IMAGEM ESTÁTICA
                 alt={produto.titulo}
                 className="produto-img"
                 onError={(e) =>
                 {e.currentTarget.src = padraoImg;}}/>                       
                <h2>{produto.titulo}</h2>
                <p>{produto.descricao}</p>

                        <strong>

                            {Number(produto.preco).toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",

                        })}

                        </strong>
                    
                    
            </Link>
                {ehDono && (
                    <button className="btn-excluir" onClick={() =>
                            handleExcluir(produto.id)}>Excluir</button>
            )}
        </div>
    );
}