// Obtenção de dados do cliente armazenados no Local Storage
const nomeCliente = localStorage.getItem('nomeCliente');  // Recupera o nome do cliente do Local Storage.
const emailCliente = localStorage.getItem('emailCliente');  // Recupera o e-mail do cliente do Local Storage.
const carrinho = JSON.parse(localStorage.getItem('carrinho'));  // Recupera a lista de itens no carrinho do Local Storage e converte de JSON para um array.
const total = parseFloat(localStorage.getItem('total'));  // Recupera o valor total dos itens do Local Storage e garante que ele seja tratado como um número (float).

// Preencher os dados do cliente na página de confirmação
document.getElementById('nomeCliente').textContent = nomeCliente;  // Insere o nome do cliente recuperado na página na posição correspondente.
document.getElementById('emailCliente').textContent = emailCliente;  // Faz o mesmo com o e-mail do cliente.

// Preencher os itens da compra na página de confirmação
const itensCompra = document.getElementById('itensCompra');  // Obtém o elemento HTML onde a lista de itens comprados será exibida.
carrinho.forEach((item) => {  // Itera sobre cada item no carrinho.
    const li = document.createElement('li');  // Cria um novo elemento de lista (li) para exibir o item.
    li.textContent = `${item.nome} - R$ ${item.preco.toFixed(2)}`;  // Define o conteúdo do elemento para mostrar o nome e o preço do item.
    itensCompra.appendChild(li);  // Adiciona o novo elemento à lista de itens na página.
});

// Exibir o valor total da compra na página de confirmação
document.getElementById('totalCompra').textContent = `R$ ${total.toFixed(2)}`;  // Exibe o valor total da compra, formatado com duas casas decimais.

// Função para imprimir a tela atual
function imprimirTela() {
    window.print();  // Usa o método print() do objeto window para acionar a janela de impressão do navegador.
}

// Função para voltar às compras
function voltarCompras() {
    // Limpar o Local Storage
    localStorage.removeItem('nomeCliente');  // Remove o nome do cliente do Local Storage.
    localStorage.removeItem('emailCliente');  // Remove o e-mail do cliente.
    localStorage.removeItem('carrinho');  // Limpa a lista de itens do carrinho.
    localStorage.removeItem('total');  // Limpa o valor total.

    // Redirecionar de volta para a página inicial
    window.location.href = 'index.html';  // Redireciona o usuário para a página inicial (index.html).
}
