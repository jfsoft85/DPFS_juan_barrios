const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.static('public'));
app.get('/', (req, res) => res.send('EcoMercado backend funcionando'));

app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));