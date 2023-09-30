import React, { useEffect, useState } from "react";
import './EstadoLista.css';
import { useNavigate } from "react-router-dom";
import { EstadoService } from "../../../services/EstadoService";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputSwitch } from 'primereact/inputswitch';
import { Button } from "primereact/button";
import { ConfirmDialog } from 'primereact/confirmdialog';

const EstadoLista = () => {
	const navigate = useNavigate();
	const [estados, setEstados] = useState([]);
	const estadoService = new EstadoService();
	const [idExcluir, setIdExcluir] = useState(null);
	const [dialogExcluir, setDialogExcluir] = useState(false);

	useEffect(() => {
		buscarEstados();
	}, []);

	const buscarEstados = () => {
		estadoService.listar().then(data => {
			setEstados(data.data);
		})
	}

	const formulario = () => {
		navigate("/estado-formulario");
	}

	const alterar = (rowData) => {
		//console.log(rowData);
		navigate("/estado-formulario", { state: { estadoAlterar: rowData } })
	}

	const excluir = () => {
		estadoService.excluir(idExcluir).then(data=>{
			buscarEstados();
		});
	}

	const optionColumn = (rowData) => {
		return (
			<div className="options">
			
				<Button  icon="pi pi-penil" severity="warning" onClick={() => alterar(rowData)} />

				<Button  icon="pi pi-trash" severity="dander" onClick={() => { setIdExcluir(rowData.id); setDialogExcluir(true) }} />
			</div>
		)
	}

	return (
		<div className="container">
			<h2>Lista de Estados</h2>
			<div>
				<button onClick={formulario}>Novo Estado</button>

			</div>
		
			<br /><br />
			<DataTable value={estados} tableStyle={{ minWidth: '50rem' }}>
				<Column field="id" header="Id"></Column>
				<Column field="nome" header="Nome"></Column>
				<Column field="sigla" header="Sigla"></Column>
				<Column header="Opções" class="options" body={optionColumn}></Column>
			</DataTable>

			<ConfirmDialog visible={dialogExcluir} onHide={() => setDialogExcluir(false)} message="Deseja excluir?"
				header="Confirmação" icon="pi pi-exclamation-triangle" accept={excluir} reject={() => setIdExcluir(null)} acceptLabel="Sim" rejectLabel="Não"/>


		</div>
	);
}

export default EstadoLista;