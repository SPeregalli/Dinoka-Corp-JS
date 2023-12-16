// Obtener todos los botones de precio
const priceButtons = document.querySelectorAll('.price-button');

// Carrito de compras
const cart = [];
let userPoints = 500; // Puntos iniciales del usuario

// Elemento para mostrar la cantidad de puntos del usuario
const userPointsElement = document.getElementById('user-points');
userPointsElement.textContent = `Puntos: ${userPoints}`;

// Función para agregar un juego al carrito
function addToCart(gameName, gamePrice) {
  cart.push({ name: gameName, price: gamePrice });
  Swal.fire({
    title: '¡Añadido al carrito!',
    text: `${gameName} se ha añadido al carrito.`,
    icon: 'success',
    confirmButtonText: 'OK',
  });
  updateCartCounter();
}

// Función para mostrar el carrito detallado
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

  // Agregar botón de comprar al carrito
  cartMessage += '<button id="buy-cart" class="buy-button">Comprar</button>';

  Swal.fire({
    title: 'Carrito de compras',
    html: cartMessage,
    showCancelButton: true,
    showConfirmButton: false,
    cancelButtonText: 'Cerrar',
  });

  // Agregar evento clic al botón de comprar en el carrito
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
        // Restar puntos del usuario
        userPoints -= totalCost;
        userPointsElement.textContent = `Puntos: ${userPoints}`;
      }
    } else {
      Swal.fire('Error', 'Método de pago no válido.', 'error');
    }

    // Limpiar carrito después de la compra
    cart.length = 0;
    updateCartCounter();
  });

  // Agregar evento clic para eliminar items
  const removeButtons = document.querySelectorAll('.remove-item');
  removeButtons.forEach(button => {
    button.addEventListener('click', () => {
      const indexToRemove = button.dataset.index;
      cart.splice(indexToRemove, 1);
      showDetailedCart();
      updateCartCounter();
    });
  });
}

// Función para actualizar el contador del carrito
function updateCartCounter() {
  const cartCounter = document.getElementById('cart-counter');
  cartCounter.textContent = cart.length.toString();
}

// Botón de carrito
const cartButton = document.getElementById('cart-btn');
cartButton.addEventListener('click', () => {
  showDetailedCart();
});

// Botón de comprar
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
      // Restar puntos del usuario
      userPoints -= totalCost;
      userPointsElement.textContent = `Puntos: ${userPoints}`;
    }
  } else {
    Swal.fire('Error', 'Método de pago no válido.', 'error');
  }

  // Limpiar carrito después de la compra
  cart.length = 0;
  updateCartCounter();
});

// Agregar botón de comprar al DOM
const quoteForm = document.getElementById('quote-form');
quoteForm.appendChild(buyButton);

// Evento clic en los botones de precio
priceButtons.forEach(button => {
  button.addEventListener('click', () => {
    const gameCard = button.closest('.card');
    const gameName = gameCard.querySelector('.card-text').textContent;
    const gamePrice = parseFloat(button.textContent.slice(1)); // Obtener el precio del botón

    addToCart(gameName, gamePrice);
  });
});
