import React, { useEffect, useState } from "react";
import './PermissaoLista.css';
import { useNavigate } from "react-router-dom";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from "primereact/button";
import { ConfirmDialog } from 'primereact/confirmdialog';
import { PermissaoService } from "../../../services/PermissaoService";

const PermissaoLista = () => {
	const navigate = useNavigate();
	const [permissao, setPermissao] = useState([]);
	const permissaoService = new PermissaoService;
	const [idExcluir, setIdExcluir] = useState(null);
	const [dialogExcluir, setDialogExcluir] = useState(false);

	useEffect(() => {
		buscarPermissao();
	}, []);

	const buscarPermissao = () => {
		permissaoService.listar().then(data => {
			setPermissao(data.data);
		})
	}

	const formulario = () => {
		navigate("/permissao-formulario");
	}

	const alterar = (rowData) => {
		//console.log(rowData);
		navigate("/permissao-formulario", { state: { permissaoAlterar: rowData } })
	}

	const excluir = () => {
		permissaoService.excluir(idExcluir).then(data=>{
			buscarPermissao();
		});
	}

	const optionColumn = (rowData) => {
		return (
			<>
				<Button label="Alterar" severity="warning" onClick={() => alterar(rowData)} />

				<Button label="Excluir" severity="dander" onClick={() => { setIdExcluir(rowData.id); setDialogExcluir(true) }} />
			</>
		)
	}

	return (
		<div className="container">
			<h2>Lista de Permissões</h2>
			<button onClick={formulario}>Nova Permisão</button>
			<br /><br />
			<DataTable value={permissao} tableStyle={{ minWidth: '50rem' }}>
				<Column field="id" header="Id"></Column>
				<Column field="descricao" header="Descrição"></Column>
				<Column header="Opções" body={optionColumn}></Column>
			</DataTable>

			<ConfirmDialog visible={dialogExcluir} onHide={() => setDialogExcluir(false)} message="Deseja excluir?"
				header="Confirmação" icon="pi pi-exclamation-triangle" accept={excluir} reject={() => setIdExcluir(null)} acceptLabel="Sim" rejectLabel="Não"/>


		</div>
	);
}

export default PermissaoLista;