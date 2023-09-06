// Variáveis globais
let carrinho = [];  // Define uma lista vazia que servirá como carrinho de compras.
let total = 0;  // Inicializa uma variável 'total' com valor 0, que armazenará o valor total dos produtos no carrinho.

// Função para atualizar LocalStorage
function atualizarLocalStorage() {
    localStorage.setItem('carrinho', JSON.stringify(carrinho)); // Converte o array 'carrinho' para uma string JSON e armazena no LocalStorage com a chave 'carrinho'.
    localStorage.setItem('total', total.toString()); // Converte o valor total para string e armazena no LocalStorage com a chave 'total'.
}

// Função para adicionar um item ao carrinho
function adicionarAoCarrinho(nome, preco) {
    carrinho.push({ nome, preco }); // Adiciona um novo item com 'nome' e 'preco' ao array 'carrinho'.
    total += preco; // Atualiza o valor total somando o preço do novo item.
    exibirCarrinho();  // Chama a função para atualizar a exibição do carrinho na tela.
    atualizarLocalStorage(); // Atualiza os dados no LocalStorage após adicionar o item.
}

// Exemplo:
// Se chamarmos adicionarAoCarrinho("Camiseta", 50), 
// o carrinho terá: [{ nome: "Camiseta", preco: 50 }]
// e o total será atualizado para: total = 50

// Função para remover um item do carrinho
function removerDoCarrinho(index) {
    total -= carrinho[index].preco; // Diminui o valor total subtraindo o preço do item a ser removido.
    carrinho.splice(index, 1);  // Remove o item do carrinho usando seu índice.
    exibirCarrinho();  // Atualiza a exibição do carrinho na tela.
    atualizarLocalStorage(); // Atualiza os dados no LocalStorage após remover o item.
}

// Função para exibir o carrinho na página
function exibirCarrinho() {
    const listaCarrinho = document.getElementById('lista-carrinho'); // Obtém o elemento da página onde o carrinho será exibido.
    listaCarrinho.innerHTML = ''; // Limpa o conteúdo existente.

    if (carrinho.length === 0) { 
        listaCarrinho.innerHTML = '<li>Nenhum item no carrinho</li>'; // Se o carrinho estiver vazio, mostra uma mensagem informando isso.
    } else {
        carrinho.forEach((item, index) => {  // Para cada item no carrinho...
            const li = document.createElement('li');  // Cria um novo elemento de lista.
            li.innerHTML = `${item.nome} - R$ ${item.preco.toFixed(2)} <button onclick="removerDoCarrinho(${index})">Remover</button>`;  // Define o conteúdo da lista com o nome e preço do item, e um botão para remover.
            listaCarrinho.appendChild(li);  // Adiciona o elemento criado ao elemento de lista do carrinho.
        });
    }

    const totalCarrinho = document.getElementById('total-carrinho');  // Obtém o elemento da página onde o total será exibido.
    totalCarrinho.innerHTML = `Total: R$ ${total.toFixed(2)}`;  // Define o conteúdo desse elemento com o valor total do carrinho.
}

// Função para abrir o modal e finalizar a compra
function finalizarCompra() {
    if (total <= 0) {  // Verifica se o valor total é 0 ou negativo.
        alert("Adicione itens ao carrinho antes de finalizar a compra.");  // Se for, exibe uma mensagem pedindo para adicionar itens.
        return;  // Finaliza a execução da função.
    }

    // Limpa os campos do modal para a próxima compra.
    document.getElementById('nomeClienteModal').value = "";
    document.getElementById('emailClienteModal').value = "";
    document.getElementById('dataNascimento').value = "";

    // Exibe o modal para o usuário inserir seus dados e finalizar a compra.
    const modal = document.getElementById('modal-compra');
    modal.style.display = 'block';
}

// Função para fechar o modal de finalização da compra
function fecharModal() {
    const modal = document.getElementById('modal-compra');  // Obtém o elemento do modal.
    modal.style.display = 'none';  // Define sua propriedade de exibição para "none", ocultando-o.
}

// Função para validar o formato do e-mail inserido pelo usuário
function validarEmail(email) {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;  // Define uma expressão regular para validar o formato do e-mail.
    if (!re.test(email)) {  // Testa se o e-mail fornecido não corresponde ao formato esperado.
        alert('Email inválido.');  // Se não for válido, exibe uma mensagem de erro.
        return false;  // Retorna "false", indicando que a validação falhou.
    }
    return true;  // Se tudo estiver correto, retorna "true", indicando que a validação foi bem-sucedida.
}

// Exemplo:
// Se chamarmos validarEmail("joao"), receberemos "false" e uma mensagem de erro.
// Se chamarmos validarEmail("joao@example.com"), receberemos "true".

// Função para validar se o usuário tem pelo menos 18 anos
function validarIdade(data) {
    const hoje = new Date();  // Obtém a data atual.
    const dataNascimento = new Date(data);  // Converte a data fornecida para um objeto Date.
    const diferencaTempo = Math.abs(hoje - dataNascimento);  // Calcula a diferença em milissegundos entre as duas datas.
    
    // Converte essa diferença em anos.
    const diferencaAnos = Math.floor(diferencaTempo / (365.25 * 24 * 60 * 60 * 1000));  
    
    if (diferencaAnos < 18) {  // Verifica se a diferença é menor que 18 anos.
        alert("Você deve ter pelo menos 18 anos para realizar a compra.");  // Se for, exibe uma mensagem de erro.
        document.getElementById('dataNascimento').value = "";  // Limpa o campo de data de nascimento.
    }
}

// Função para confirmar a compra
function confirmarCompra() {
    const nome = document.getElementById('nomeClienteModal').value;  // Obtém o valor do campo nome do modal.
    const email = document.getElementById('emailClienteModal').value;  // Obtém o valor do campo e-mail do modal.
    const dataNascimento = document.getElementById('dataNascimento').value;  // Obtém o valor do campo data de nascimento do modal.

    // Verifica se algum dos campos está vazio.
    if (!nome.trim() || !email.trim() || !dataNascimento.trim()) {
        alert("Por favor, preencha todos os campos antes de confirmar a compra.");  // Se estiver, exibe uma mensagem de erro.
        return;  // Finaliza a execução da função.
    }

    // Armazena os dados do cliente no Local Storage para serem usados depois.
    localStorage.setItem('nomeCliente', nome);
    localStorage.setItem('emailCliente', email);

    // Fecha o modal.
    const modal = document.getElementById('modal-compra');
    modal.style.display = 'none';

    // Redireciona o usuário para a página de confirmação de compra.
    window.location.href = 'confirmacao.html';
}

// Função para cancelar a compra
function cancelarCompra() {
    // Limpa todos os dados relacionados à compra no Local Storage.
    localStorage.removeItem('nomeCliente');
    localStorage.removeItem('emailCliente');
    localStorage.removeItem('carrinho');
    localStorage.removeItem('total');

    // Limpa o carrinho e o total.
    carrinho = [];
    total = 0;
    exibirCarrinho();  // Atualiza a exibição do carrinho na tela.

    // Fecha o modal.
    fecharModal();
}
