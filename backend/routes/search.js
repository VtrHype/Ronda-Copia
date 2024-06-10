// search.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); // Certifique-se de que o caminho está correto

// Rota de busca
router.get('/', async (req, res) => {
    try {
        const query = req.query.query;
        const results = await userController.searchUsers(query);
        console.log('Resultados da pesquisa:', results);
        res.json(results);
    } catch (error) {
        console.error('Erro na rota de pesquisa:', error);
        res.status(500).json({ message: 'Erro na pesquisa', error });
    }
});

module.exports = router;
