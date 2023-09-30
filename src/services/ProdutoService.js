import axios from 'axios';

export class ProdutoService{
	URL = "http://localhost:8080/produtos";

	inserir(produto){
		return axios.post(this.URL, produto);
	}

	alterar(produto){
		return axios.put(this.URL, produto);
	}

	excluir(id){
		return axios.delete(this.URL+"/"+id);
	}

	listar(){
		return axios.get(this.URL);
	}
}