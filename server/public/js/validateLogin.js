
window.addEventListener('load', () => {
  const form = document.querySelector('form');
  const email = document.querySelector('input[name="email"]');
  const password = document.querySelector('input[name="password"]');
  const errorDiv = document.createElement('div');
  errorDiv.style.color = 'red';
  form.appendChild(errorDiv);

  form.addEventListener('submit', (e) => {
    let errors = [];

    if (!email.value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      errors.push('Email inválido');
    }

    if (!password.value) {
      errors.push('Debe ingresar la contraseña');
    }

    if (errors.length > 0) {
      e.preventDefault();
      errorDiv.innerHTML = errors.join('<br>');
    }
  });
});
