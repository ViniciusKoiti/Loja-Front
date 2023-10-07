import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import './EstadoFormulario.css';
import { EstadoService } from "../../../services/EstadoService";

const EstadoFormulario = (props) => {
	const navigate = useNavigate();
	const estadoNovo = { nome: '', sigla: ''};
	const location = useLocation();
	const { estadoAlterar } = location.state || {};

	const [estado, setEstado] = useState(estadoNovo);
	const [first, setFirst] = useState(0);
	const estadoService = new EstadoService();

	useEffect(() => {
		if(estadoAlterar){
			setEstado(estadoAlterar);
		}else{
			setEstado(estadoNovo);
		}		
	}, []);

	const listaEstados = () =>{
		navigate("/estados")
	}

	const alterarValor = (event) => {
		setEstado({ ...estado, [event.target.name]: event.target.value });
	}

	const salvar = () => {
		if (estado.id) {
			estadoService.alterar(estado).then(data => {
				setEstado(estadoNovo);
			});
		} else {
			estadoService.inserir(estado).then(data => {
				setEstado(estadoNovo);
			});
		}
	}

	return (
		<div className="container">
			<h2>Inserir ou Alterar um Estado</h2>
			<div className="row">
				<div>
					<label htmlFor="nome">Nome:</label>
					<input type="text" name="nome" value={estado.nome} onChange={alterarValor} />
				</div>
				<div>
					<label htmlFor="sigla">Sigla:</label>
					<input type="text" name="sigla" value={estado.sigla} onChange={alterarValor} />
				</div>
			</div>
			
			<button onClick={salvar}>Salvar</button>
			<button onClick={listaEstados}>Lista Estados</button>
		</div>
	);
}

export default EstadoFormulario;