const priceButtons = document.querySelectorAll('.price-button');


let cart = JSON.parse(localStorage.getItem('cart')) || [];
let userPoints = JSON.parse(localStorage.getItem('userPoints')) || 500;

const userPointsElement = document.getElementById('user-points');
userPointsElement.textContent = `Puntos: ${userPoints}`;

function saveDataToLocalStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
  localStorage.setItem('userPoints', JSON.stringify(userPoints));
}

function addToCart(gameName, gamePrice) {
  cart.push({ name: gameName, price: gamePrice });
  Swal.fire({
    title: '¡Añadido al carrito!',
    text: `${gameName} se ha añadido al carrito.`,
    icon: 'success',
    confirmButtonText: 'OK',
  });
  updateCartCounter();
  saveDataToLocalStorage(); 
}

function showDetailedCart() {
  let totalPrice = 0;
  let cartMessage = '<ul>';

  for (const [index, item] of cart.entries()) {
    cartMessage += `<li>${item.name} - $${item.price.toFixed(2)}` +
                   `<button class="remove-item" data-index="${index}">Eliminar</button></li>`;
    totalPrice += item.price;
  }

  cartMessage += '</ul>';
  cartMessage += `<p>Total: $${totalPrice.toFixed(2)}</p>`;
  cartMessage += '<button id="buy-cart" class="buy-button">Comprar</button>';

  Swal.fire({
    title: 'Carrito de compras',
    html: cartMessage,
    showCancelButton: true,
    showConfirmButton: false,
    cancelButtonText: 'Cerrar',
  });

  const buyCartButton = document.getElementById('buy-cart');
  buyCartButton.addEventListener('click', () => {
    const paymentMethod = prompt('¿Cómo deseas pagar? (paypal/puntos)');

    if (paymentMethod === 'paypal') {
      const fullName = prompt('Ingresa tu nombre completo:');
      Swal.fire('¡Compra realizada!', `Gracias por tu compra, ${fullName}!`, 'success');
    } else if (paymentMethod === 'puntos') {
      const totalCost = cart.reduce((total, item) => total + item.price, 0);

      if (totalCost > userPoints) {
        Swal.fire('Error', 'No tienes suficientes puntos para realizar esta compra.', 'error');
      } else {
        Swal.fire('¡Compra realizada!', `Gracias por tu compra con puntos.`, 'success');
        userPoints -= totalCost;
        userPointsElement.textContent = `Puntos: ${userPoints}`;
        saveDataToLocalStorage(); 
      }
    } else {
      Swal.fire('Error', 'Método de pago no válido.', 'error');
    }

    cart.length = 0;
    updateCartCounter();
    saveDataToLocalStorage(); 
  });

  const removeButtons = document.querySelectorAll('.remove-item');
  removeButtons.forEach(button => {
    button.addEventListener('click', () => {
      const indexToRemove = button.dataset.index;
      cart.splice(indexToRemove, 1);
      showDetailedCart();
      updateCartCounter();
      saveDataToLocalStorage(); 
    });
  });
}

function updateCartCounter() {
  const cartCounter = document.getElementById('cart-counter');
  cartCounter.textContent = cart.length.toString();
}

const cartButton = document.getElementById('cart-btn');
cartButton.addEventListener('click', () => {
  showDetailedCart();
});

const buyButton = document.createElement('button');
buyButton.textContent = 'Comprar';
buyButton.addEventListener('click', () => {
  const paymentMethod = prompt('¿Cómo deseas pagar? (paypal/puntos)');

  if (paymentMethod === 'paypal') {
    const fullName = prompt('Ingresa tu nombre completo:');
    Swal.fire('¡Compra realizada!', `Gracias por tu compra, ${fullName}!`, 'success');
  } else if (paymentMethod === 'puntos') {
    const totalCost = cart.reduce((total, item) => total + item.price, 0);

    if (totalCost > userPoints) {
      Swal.fire('Error', 'No tienes suficientes puntos para realizar esta compra.', 'error');
    } else {
      Swal.fire('¡Compra realizada!', `Gracias por tu compra con puntos.`, 'success');
      userPoints -= totalCost;
      userPointsElement.textContent = `Puntos: ${userPoints}`;
      saveDataToLocalStorage(); 
    }
  } else {
    Swal.fire('Error', 'Método de pago no válido.', 'error');
  }

  cart.length = 0;
  updateCartCounter();
  saveDataToLocalStorage(); 
});

const quoteForm = document.getElementById('quote-form');
quoteForm.appendChild(buyButton);

priceButtons.forEach(button => {
  button.addEventListener('click', () => {
    const gameCard = button.closest('.card');
    const gameName = gameCard.querySelector('.card-text').textContent;
    const gamePrice = parseFloat(button.textContent.slice(1));

    addToCart(gameName, gamePrice);
  });
});
