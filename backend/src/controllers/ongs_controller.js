const connection = require('../database/connect');
const crypto = require('crypto');

module.exports = {
    async index(req, res) {
        const ongs = await connection('ongs').select('*');
        return res.send(ongs);
    },

    async store(req, res) {
        const id = crypto.randomBytes(4).toString('HEX');
        const { name, email, whatsapp, city, uf } = req.body;

        const ong = await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf
        }).first();

        return res.send(ong);
    },

    async delete(req, res) {
        const id = req.headers.id;

        const ong = await connection('ongs')
            .where('id', id)
            .del();

        return res.send('deletou');
    }
}