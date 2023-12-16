// main.js
  function login() {
    const username = prompt('Nombre de usuario:');
    const password = prompt('Contraseña:');
    if (username === 'Pepe' && password === 'Pepe123') {
      Swal.fire('Inicio de sesión exitoso', '', 'success');
      // Cambiar el texto del botón al nombre del usuario
      const loginBtn = document.getElementById('login-btn');
      if (loginBtn) {
        loginBtn.innerHTML = 'Pepe';
      }
      // Mostrar puntos del usuario
      const pointsContainer = document.getElementById('user-points');
      if (pointsContainer) {
        pointsContainer.innerHTML = `Puntos: ${userPoints}`;
      }
    } else {
      Swal.fire('Credenciales incorrectas', '', 'error');
    }
  }
    // Rellenar automáticamente el formulario con información ficticia
    document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('quote-form');
  
    if (form) {
      // Información ficticia
      const fictitiousData = {
        fullName: 'John Doe',
        email: 'john.doe@example.com',
      };
  
      // Rellenar los campos del formulario con la información ficticia
      Object.keys(fictitiousData).forEach((key) => {
        const input = form.querySelector(`[name="${key}"]`);
        if (input) {
          input.value = fictitiousData[key];
        }
      });
    }
  });
  
  
  
  // Evento al hacer clic en el botón de inicio de sesión
  document.getElementById('login-btn').addEventListener('click', login);
  
  