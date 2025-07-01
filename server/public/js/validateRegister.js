
window.addEventListener('load', () => {
  const form = document.querySelector('form');
  const name = document.querySelector('input[name="name"]');
  const email = document.querySelector('input[name="email"]');
  const password = document.querySelector('input[name="password"]');
  const errorDiv = document.createElement('div');
  errorDiv.style.color = 'red';
  form.appendChild(errorDiv);

  form.addEventListener('submit', (e) => {
    let errors = [];

    if (name.value.trim().length < 2) {
      errors.push('El nombre debe tener al menos 2 caracteres');
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      errors.push('Email no válido');
    }

    if (password.value.length < 8) {
      errors.push('La contraseña debe tener al menos 8 caracteres');
    }

    if (errors.length > 0) {
      e.preventDefault();
      errorDiv.innerHTML = errors.join('<br>');
    }
  });
});
