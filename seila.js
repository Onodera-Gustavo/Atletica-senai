function alterarQuantidade(button, acao) {
    const productDiv = button.closest(".product");
    const quantidadeElement = productDiv.querySelector(".quantidade-valor");
    const precoElement = productDiv.querySelector(".preco");
    const totalElement = productDiv.querySelector(".total");
  
    const precoTexto = precoElement.textContent.replace("PREÇO: R$", "").replace(",", ".");
    const preco = parseFloat(precoTexto);
    let quantidadeAtual = parseInt(quantidadeElement.textContent, 10);
  
    if (acao === "add") {
      quantidadeAtual++;
    } else if (acao === "remove" && quantidadeAtual > 1) {
      quantidadeAtual--;
    }
  
    quantidadeElement.textContent = quantidadeAtual;
    atualizarValorTotal(productDiv, preco);
    atualizarValorTotalCompra();
  }
  
  // function atualizarValorTotal(productDiv, preco) {
  //   const quantidadeElement = productDiv.querySelector(".quantidade-valor");
  //   const totalElement = productDiv.querySelector(".total");
  //   const quantidade = parseInt(quantidadeElement.textContent, 10);
  //   const valorTotal = (quantidade * preco).toFixed(2);
  //   totalElement.textContent = `TOTAL: R$${valorTotal}`;
  // }
  
  // function atualizarValorTotalCompra() {
  //   const totalCompraElement = document.getElementById("valor-da-compra");
  //   let valorTotalCompra = 0;
  
  //   const totalProdutos = document.querySelectorAll(".product .total");
  //   totalProdutos.forEach(function (totalElement) {
  //     const valorTexto = totalElement.textContent.replace("TOTAL: R$", "").replace(",", ".");
  //     valorTotalCompra += parseFloat(valorTexto);
  //   });
  
  //   totalCompraElement.textContent = valorTotalCompra.toFixed(2);
  // }
  
  document.addEventListener("DOMContentLoaded", function () {
    const removerProdutos = document.getElementsByClassName("remover-produto");
    for (let i = 0; i < removerProdutos.length; i++) {
      removerProdutos[i].addEventListener("click", function () {
        removerProdutoCompleto(this);
      });
    }
  
    atualizarValorTotalCompra();
  });
  
  function removerProdutoCompleto(button) {
    const productDiv = button.closest(".product");
    const tituloProduto = productDiv.querySelector(".title").textContent;
    productDiv.remove();
  
    const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    const novoCarrinho = carrinho.filter(produto => produto.titulo !== tituloProduto);
  
    localStorage.setItem("carrinho", JSON.stringify(novoCarrinho));
    atualizarValorTotalCompra();
  }
  
  function compra() {
    alert("Compra realizada");
    window.location.reload();
  }
  window.onload = function () {
    const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    const carrinhoContainer = document.getElementById("carrinho");
  
    if (carrinho.length === 0) {
      carrinhoContainer.innerHTML = "<p>O carrinho está vazio.</p>";
      return;
    }
  
    carrinho.forEach((produto) => {
      const produtoDiv = document.createElement("div");
      produtoDiv.className = "product";
      produtoDiv.innerHTML = `
             <img src="${produto.imagem}"class="produto-imagem">
              <p class="title">${produto.titulo}</p>
              <p class="preco">PREÇO: R$${produto.preco.toFixed(2)}</p>
              <div class="icones-adicionar-remover">
                  <input type="button" value="+" class="btn" onclick="alterarQuantidade(this, 'add')">
                  <span class="quantidade-valor">${produto.quantidade}</span>
                  <input type="button" value="-" class="btn" onclick="alterarQuantidade(this, 'remove')">
                  <input type="button" value="Remover Produto" class="remover-produto" onclick="removerProdutoCompleto(this)">
              </div>
              <p class="total">TOTAL: R$${(produto.preco * produto.quantidade).toFixed(2)}</p>
          `;
      carrinhoContainer.appendChild(produtoDiv);
    });
  
    // Atualiza o valor total da compra ao carregar
    atualizarValorTotalCompra();
  };
  
  function adicionarAoCarrinho(titulo, preco, imagem) {
    const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    
    // Verifica se o produto já existe no carrinho
    const produtoExistente = carrinho.find(produto => produto.titulo === titulo);
  
    if (produtoExistente) {
      // Se o produto já existir, aumente a quantidade
      produtoExistente.quantidade += 1;
    } else {
      // Caso contrário, adicione um novo produto com quantidade inicial de 1
      const produto = {
        imagem: imagem,
        titulo: titulo,
        preco: preco,
        quantidade: 1
      };
      carrinho.push(produto);
    }
  
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    alert(`adicionado!`);
  }
  
  
  
  function atualizarValorTotal(productDiv, preco) {
    const quantidadeElement = productDiv.querySelector(".quantidade-valor");
    const totalElement = productDiv.querySelector(".total");
    const quantidade = parseInt(quantidadeElement.textContent, 10);
    const valorTotal = (quantidade * preco).toFixed(2);
    totalElement.textContent = `TOTAL: R$${valorTotal}`;
  }
  
  function atualizarValorTotalCompra() {
    const totalCompraElement = document.getElementById("valor-da-compra");
    let valorTotalCompra = 0;
  
    const totalProdutos = document.querySelectorAll(".product .total");
    totalProdutos.forEach(function (totalElement) {
      const valorTexto = totalElement.textContent.replace("TOTAL: R$", "").replace(",", ".");
      valorTotalCompra += parseFloat(valorTexto);
    });
  
    totalCompraElement.textContent = valorTotalCompra.toFixed(2);
  }
  
  document.addEventListener("DOMContentLoaded", function () {
    const removerProdutos = document.getElementsByClassName("remover-produto");
    for (let i = 0; i < removerProdutos.length; i++) {
      removerProdutos[i].addEventListener("click", function () {
        removerProdutoCompleto(this);
      });
    }
  
    atualizarValorTotalCompra();
  });
  
  function removerProdutoCompleto(button) {
    const productDiv = button.closest(".product");
    const tituloProduto = productDiv.querySelector(".title").textContent;
    productDiv.remove();
  
    const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    const novoCarrinho = carrinho.filter(produto => produto.titulo !== tituloProduto);
  
    localStorage.setItem("carrinho", JSON.stringify(novoCarrinho));
    atualizarValorTotalCompra();
  }
  
  function compra() {
    alert("Compra realizada");
    window.location.reload();
  }
  