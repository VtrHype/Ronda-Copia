// 
const mongoose = require('mongoose');
const User = require('./models/user'); // Certifique-se de que o caminho está correto
const config = require('./config');

mongoose.connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(async () => {
    console.log('Conectado ao MongoDB');
    
    try {
        const users = await User.find();
        console.log('Usuários:', users);
    } catch (err) {
        console.error('Erro ao buscar usuários:', err);
    } finally {
        mongoose.connection.close();
    }
})
.catch((err) => {
    console.error('Erro ao conectar ao MongoDB:', err.message);
});
