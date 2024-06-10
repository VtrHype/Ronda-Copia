//app.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config');
const searchRoutes = require('./routes/search');

const app = express();
const PORT = process.env.PORT || 3001; 


app.use(cors());
app.use(express.json());

mongoose.connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Conectado ao MongoDB');
})
.catch((err) => {
    console.error('Erro ao conectar ao MongoDB:', err.message);
});

app.use('/api/search', searchRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
