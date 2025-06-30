const express = require('express');
const path = require('path');
const app = express();
const PORT = 5000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, '../client')));

app.get('/', (req, res) => {
  res.render('products/index');
});

app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
