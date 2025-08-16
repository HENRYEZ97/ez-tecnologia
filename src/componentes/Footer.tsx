import "./Footer.css";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footerez">
                <h2>EZ TECNOLOGIA</h2>
            </div>
            <div className="footer-copy">
                <small>&copy;{new Date().getFullYear()
                    } - EZ Tecnologia - Todos os direitos reservados.</small>
            </div>

            <div className="footer-contatos">
                <a href="https://whatsapp.com"
                   target="_blank" 
                   rel="noreferrer"
                   className="footer-link">
                   <FaWhatsapp className="footer-icon"/>Whatsapp</a>   
                <a href="https://instagram.com" 
                   target="_blank" 
                   rel="noreferrer" 
                   className="footer-link">
                   <FaInstagram className="footer-icon"/>Instagram</a>
            </div>
        </footer>
    );
}