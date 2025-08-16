import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "../componentes/lande.css";
import imgSmart from "../assets/imagens/smart.jpg";
import imgTech from "../assets/imagens/tech.png";
import imgGames from "../assets/imagens/games.jpg"
import imgNote from "../assets/imagens/note.png";
import imgHeader1 from "../assets/imagens/header.jpg";
import imgHeader2 from "../assets/imagens/header3.jpg";
import imgHeader3 from "../assets/imagens/header5.jpg";
import imgHeader4 from "../assets/imagens/header4.jpg";


    type Banner = {
        titulo: string;
        descricao: string;
        imagem: string;
        classe: string;
    }

    //ARRAY PARA OS BANNERS
    const headerImages: string[] = [imgHeader1, imgHeader2, imgHeader3, imgHeader4];


    //ARRAY PARAOS BANNERS
    const banners: Banner [] = [
        
        {titulo: "Games", descricao: "Consoles, jogos, acessórios e muito mais", imagem: imgGames, classe: "neon1"},

        {titulo: "Acessórios Tech", descricao: "Tudo para o seu setup você encontra aqui", imagem: imgTech, classe: "neon2"},

        {titulo: "Smartphones", descricao: "Preços baixos, venha conferir", imagem: imgSmart, classe: "neon3"},

        {titulo: "Notebooks", descricao: "Encontre o seu Notebook barato!!!", imagem: imgNote, classe: "neon4"}, 
        
    ];

    export default function Home () {
        const [indexAtual, setIndexAtual] = useState(0);
        useEffect(() => {
            const intervalo = setInterval(() => {
                              setIndexAtual((prevIndex) => (prevIndex + 1) % banners.length);
            }, 3000);
            return () =>
                clearInterval(intervalo);
        }, [])

        return (

            <div className="lande-container">
                <header className="home-header"
                        style={{backgroundImage: `url(${headerImages[indexAtual]})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                transition: "background-image 0.3s ease-in-out",
                            }}>
                <div className="textos-home">
                <h1 className="titulo-home">Bem vindos a EZ Tecnologia🔥</h1>
                <p className="paragrafo-home">Compre e venda com facilidade!</p>
                <Link to="/produtos">
                    <button className="botao-ver-produtos">Confira os Produtos</button>
                </Link>
                </div>
                </header>
                <div className="banners-container">
                    {banners.map((banner, index) => (
                        <div className={`banner-card ${banner.classe}`} key={index}>
                            <img src={banner.imagem}
                                 alt={banner.titulo}
                                 className="banner-img"/>
                            <h3>{banner.titulo}</h3>
                            <p>{banner.descricao}</p>
                        </div>
                    ))}
                </div>
            </div>
        );
    }