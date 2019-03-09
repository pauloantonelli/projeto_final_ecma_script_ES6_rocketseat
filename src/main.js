import api from './api';

class App {
    constructor(){
        this.consultas = [];
        this.formElement = document.querySelector("form#cep-form");
        this.inputElement = document.querySelector("input[name=entraCep]");
        this.ulElement = document.querySelector("ul#cep-list");
        this.registerHandlers();
    }

    registerHandlers( event ) {
        this.formElement.onsubmit = event => this.addRepositories(event);
    }

    loading( loading = true ) {
        if( loading === true ) {
            let loadingElement = document.createElement('span');
            loadingElement.appendChild(document.createTextNode('Buscando...'));
            loadingElement.setAttribute( 'id', 'loading' );
            this.formElement.appendChild(loadingElement);
        } else {
            document.querySelector('span#loading').remove();
        }
    }

    async addRepositories( event ) {
        event.preventDefault();

        const cepInput = this.inputElement.value;
        if( cepInput.length === 0 ) {
            return;
        }

        this.loading();

        try {

            const response = await api.get(`/ws/${cepInput}/json`);
            console.log(response.data);

            const { cep, logradouro, complemento, bairro, localidade, uf, unidade, ibge, gia } = response.data;
            this.consultas.push( { cep, logradouro, complemento, bairro, localidade, uf, unidade, ibge, gia } );

            this.inputElement.value = '';

            this.render();

        } catch(erro) {

            alert( `O CEP ${ this.inputElement.value } não existe. Tente novamente: ${ erro }` );

        }
        this.loading(false);
    }

    render() {

        this.ulElement.innerHTML = '';

        this.consultas.forEach( cep => {

            let consultaCep = document.createElement( "strong" );
            consultaCep.appendChild(document.createTextNode( cep.cep ));

            let consultaLog = document.createElement( "strong" );
            consultaLog.appendChild(document.createTextNode( cep.logradouro ));

            let consultaCompl = document.createElement( "strong" );
            consultaCompl.appendChild(document.createTextNode( cep.complemento ));

            let consultaBairro = document.createElement( "strong" );
            consultaBairro.appendChild(document.createTextNode( cep.bairro ));

            let consultaLocalidade = document.createElement( "strong" );
            consultaLocalidade.appendChild(document.createTextNode( cep.localidade ));

            let consultaUf = document.createElement( "strong" );
            consultaUf.appendChild(document.createTextNode( cep.uf ));

            let consultaUnidade = document.createElement( "strong" );
            consultaUnidade.appendChild(document.createTextNode( cep.unidade ));

            let consultaIbge = document.createElement( "strong" );
            consultaIbge.appendChild(document.createTextNode( cep.ibge ));

            let consultaGia = document.createElement( "strong" );
            consultaGia.appendChild(document.createTextNode( cep.gia ));

            let liElement = document.createElement( 'li' );
            liElement.appendChild(consultaCep);
            liElement.appendChild(document.createElement('br'));
            liElement.appendChild(consultaLog);
            liElement.appendChild(document.createElement('br'));
            liElement.appendChild(consultaCompl);
            liElement.appendChild(document.createElement('br'));
            liElement.appendChild(consultaBairro);
            liElement.appendChild(document.createElement('br'));
            liElement.appendChild(consultaLocalidade);
            liElement.appendChild(document.createElement('br'));
            liElement.appendChild(consultaUf);
            liElement.appendChild(document.createElement('br'));
            liElement.appendChild(consultaUnidade);
            liElement.appendChild(document.createElement('br'));
            liElement.appendChild(consultaIbge);
            liElement.appendChild(document.createElement('br'));
            liElement.appendChild(consultaGia);

            this.ulElement.appendChild(liElement);
        });

    }
}

new App();