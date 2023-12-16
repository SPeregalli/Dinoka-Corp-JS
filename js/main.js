
  function login() {
    const username = prompt('Nombre de usuario:');
    const password = prompt('Contraseña:');
    if (username === 'Pepe' && password === 'Pepe123') {
      Swal.fire('Inicio de sesión exitoso', '', 'success');

      const loginBtn = document.getElementById('login-btn');
      if (loginBtn) {
        loginBtn.innerHTML = 'Pepe';
      }
      
      const pointsContainer = document.getElementById('user-points');
      if (pointsContainer) {
        pointsContainer.innerHTML = `Puntos: ${userPoints}`;
      }
    } else {
      Swal.fire('Credenciales incorrectas', '', 'error');
    }
  }
    
    document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('quote-form');
  
    if (form) {
      
      const fictitiousData = {
        fullName: 'John Doe',
        email: 'john.doe@example.com',
      };
  
      
      Object.keys(fictitiousData).forEach((key) => {
        const input = form.querySelector(`[name="${key}"]`);
        if (input) {
          input.value = fictitiousData[key];
        }
      });
    }
  });
  
  
  
  
  document.getElementById('login-btn').addEventListener('click', login);
  
  