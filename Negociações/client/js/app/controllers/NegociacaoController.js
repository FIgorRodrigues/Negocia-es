class NegociacaoController{

	constructor(){

		let $ = document.querySelector.bind(document);
		this._inputData = $('#data');
		this._inputQuantidade = $('#quantidade');
		this._inputValor = $('#valor');


		this._listaNegociacoes = new Bind(
			new ListaNegociacoes(), 
			new NegociacaoView($('#negociacaoView')),
		    'addNegociacao', 'esvaziaLista');

		this._mensagem = new Bind(
			new Mensagem(),
			new MensagemView($('#mensagemView')),
			'texto' ); 
	}

	adiciona(event){
		
		event.preventDefault();
		this._listaNegociacoes.addNegociacao(this._criaNegociacao());
		this._mensagem.texto = "Negociação adicionada com sucesso!";
		this._limpaFormulario();		
	}

	apaga(){

		this._listaNegociacoes.esvaziaLista();
		this._mensagem.texto = "Negociação removida com sucesso!";
		this._limpaFormulario();		
	}

	_criaNegociacao(){
		
		return new Negociacao(
			DateHelper.textoParaData(
			this._inputData.value),
			this._inputQuantidade.value, 
			this._inputValor.value
		);	
	}

	_limpaFormulario(){
		
		this._inputData.value = '';
		this._inputQuantidade.value = 1;
		this._inputValor.value = 0.0;
		this._inputData.focus();
	}

	importaNegociacoes(){

		let negociacaoService = new NegociacaoService();
		negociacaoService.obterNegociacoesDaSemana((error, negociacoes) => {

			if(error){
				this._mensagem.texto = error;
				this._mensagem.texto = 'Não foi possivel importar as negociações';
				return;
			}
				negociacoes.forEach(negociacao => this._listaNegociacoes.addNegociacao(negociacao));
				this._mensagem.texto = "Negociações importadas com Sucesso!";
		});
	}
}