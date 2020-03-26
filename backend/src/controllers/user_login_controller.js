const connection = require('../database/connect');

module.exports = {
    async index(req, res) {
        const { page = 1 } = req.params;

        const [page_count] = await connection('incidents').count();

        const incidents = await connection('incidents')
            .leftJoin('ongs', 'ongs.id', 'incidents.ong_id')
            .offset((page-1) * 5)
            .limit(5)
            .select([
                'incidents.*',
                'ongs.name',
                'ongs.whatsapp',
                'ongs.email',
                'ongs.city',
                'ongs.uf']);
        
        res.header({"X-Incidents-Count":page_count['count(*)']})

        return res.json(incidents);
    }
}