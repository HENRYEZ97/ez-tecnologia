import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import CadastrarProduto from '../pages/CadastrarProduto';
import CadastroUsuario from '../pages/CadastroUsuario';
import DetalheProduto from '../componentes/DetalheProduto';
import Produtos from '../pages/Produtos';

export function RouterApp (){
    return (
        
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/cadastrar' element={<CadastrarProduto />} />
                <Route path="/cadastro" element={<CadastroUsuario />} />
                <Route path="/login" element={<Login />} />
                <Route path="/detalhes/:id" element={<DetalheProduto />} />
                <Route path="/produtos" element={<Produtos />} />
            </Routes>
        
    );
};