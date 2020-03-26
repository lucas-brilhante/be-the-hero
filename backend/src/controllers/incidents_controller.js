const connection = require('../database/connect');

module.exports = {
    async index(req, res) {

        const incidents = await connection('incidents').select('*');

        return res.send(incidents);
    },

    async store(req, res) {
        const { title, description, value, ong_id } = req.body;

        const incident = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id
        });

        return res.send(incident);
    },

    async delete(req, res) {
        const { id } = req.params;
        const { ong_id } = req.headers;

        const incident = await connection('incidents')
            .where('id', id)
            .first();

        if (incident.ong_id !== ong_id)
            return res.send('Esse incidente não é da sua ong.');

        await connection('incidents')
            .where('id', id)
            .delete();

        return res.send(incident);
    }
}