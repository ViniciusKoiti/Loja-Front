import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import './PermissaoFormulario.css';
import { PermissaoService } from "../../../services/PermissaoService";

const PermissaoFormulario = (props) => {
	//const navigate = useNavigate();
	//const location = useLocation();
	///const { id } = location.state || {};
	//const { ii } = useParams();
	const navigate = useNavigate();
	const permissaoNovo = { descricao: '', valor: 0, valorPromocional: 0 };
	const location = useLocation();
	const { permissaoAlterar } = location.state || {};

	const [permissao, setPermissao] = useState(permissaoNovo);
	const permissaoService = new PermissaoService();

	useEffect(() => {
		if(permissaoAlterar){
			setPermissao(permissaoAlterar);
		}else{
			setPermissao(permissaoNovo);
		}		
	}, []);

	const listaPermissao = () =>{
		navigate("/permissao")
	}

	const alterarValor = (event) => {
		setPermissao({ ...permissao, [event.target.name]: event.target.value });
	}

	const salvar = () => {
		if (permissao.id) {
			permissaoService.alterar(permissao).then(data => {
				console.log(data);
				setPermissao(permissaoNovo);
			});
		} else {
			permissaoService.inserir(permissao).then(data => {
				console.log(data);
				setPermissao(permissaoNovo);
			});
		}
	}

	return (
		<div style={{ padding: '10px' }}>
			<h2>Inserir ou Alterar um Permissao</h2>
			<input type="text" name="descricao" value={permissao.nome} onChange={alterarValor} /><br /><br />
			<button onClick={salvar}>Salvar</button>
			<button onClick={listaPermissao}>Lista Permissao</button>
		</div>
	);
}

export default PermissaoFormulario;