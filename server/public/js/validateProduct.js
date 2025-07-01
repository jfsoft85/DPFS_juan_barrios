
window.addEventListener('load', () => {
  const form = document.querySelector('form');
  const name = document.querySelector('input[name="name"]');
  const price = document.querySelector('input[name="price"]');
  const description = document.querySelector('textarea[name="description"]');
  const errorDiv = document.createElement('div');
  errorDiv.style.color = 'red';
  form.appendChild(errorDiv);

  form.addEventListener('submit', (e) => {
    let errors = [];

    if (name.value.trim().length < 2) {
      errors.push('El nombre debe tener al menos 2 caracteres');
    }

    if (!price.value || isNaN(price.value) || Number(price.value) <= 0) {
      errors.push('El precio debe ser un número válido y mayor a 0');
    }

    if (description.value.trim().length < 10) {
      errors.push('La descripción debe tener al menos 10 caracteres');
    }

    if (errors.length > 0) {
      e.preventDefault();
      errorDiv.innerHTML = errors.join('<br>');
    }
  });
});
