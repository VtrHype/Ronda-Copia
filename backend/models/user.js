// models/users.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    nome: String,
    matricula: String,
    placa: String,
    cliente: String,
    hChegada: String,
    hSaida: String,
    contatoLocal: String,
    motivoDisparo: String,
    descricao: String,
    data: Date
 });

  
 userSchema.index({
    nome: 'text',
    matricula: 'text',
    placa: 'text',
    cliente: 'text',
    hChegada: 'text',
    hSaida: 'text',
    contatoLocal: 'text',
    motivoDisparo: 'text',
    descricao: 'text',
    data: 'text'
 });

module.exports = mongoose.model('rondas', userSchema);
