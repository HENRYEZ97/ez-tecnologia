import { BrowserRouter } from "react-router-dom";
import { RouterApp } from "./routes/Router";
import Navbar from "./componentes/Navbar";
import Footer from "./componentes/Footer";

function App () {
    return (
        <BrowserRouter>
        <Navbar />
        <RouterApp />
        <Footer />
        </BrowserRouter>
    );
}
export default App;