const connection = require('../database/connect');

module.exports = {
    async index(req, res) {
        const { ong_id } = req.params;

        const ong_name = await connection('ongs')
        .where('id',ong_id)
        .select('name')
        .first();

        const incidents = await connection('incidents')
            .where('ong_id', ong_id)
            .select('*');

        return res.send({...ong_name, incidents});
    },
}