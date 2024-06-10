// controllers/userController.js
const User = require('../models/user'); 
const { format } = require('date-fns');

exports.searchUsers = async (query) => {
    try {
        console.log(`Buscando usuários com query: ${query}`);
        
        // Converta a data da query para o formato ISO 8601, se aplicável
        let dateISO = null;
        if (/\d{2}\/\d{2}\/\d{4}/.test(query)) {
            const dateParts = query.split('/');
            dateISO = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
            dateISO = dateISO.toISOString();
            console.log('Data convertida para ISO 8601:', dateISO);
        }

        // Crie a regex para a pesquisa textual
        const regex = new RegExp(query, 'i');

        // Construa a consulta para o MongoDB
        const queryConditions = [
            { nome: regex },
            { matricula: regex },
            { placa: regex },
            { cliente: regex },
            { motivoDisparo: regex }, 
            { contatoLocal: regex }
        ];

        if (dateISO) {
            queryConditions.push({
                data: { 
                    $gte: new Date(dateISO), 
                    $lt: new Date(new Date(dateISO).getTime() + 24 * 60 * 60 * 1000)
                }
            });
        }

        const users = await User.find({ $or: queryConditions });

        // Formatar a data dos usuários encontrados
        users.forEach(user => {
            if (user.data) {
                user.data = format(new Date(user.data), 'dd/MM/yyyy');
            }
        });

        console.log('Usuários encontrados:', users);
        return users;
    } catch (err) {
        console.error('Erro ao buscar usuários:', err);
        throw new Error(err.message);
    }
};
