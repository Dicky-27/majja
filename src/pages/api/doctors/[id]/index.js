import excuteQuery from "../../../../../lib/db";
import NextCors from 'nextjs-cors';

export default async function exportDoctor(req, res) {
    await NextCors(req, res, {
        // Options
        methods: ['GET'],
        origin: '*',
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });

    const {id} = req.query;
    
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    try {
        const dokter = await excuteQuery({
            query: `SELECT * FROM tb_dokter where id_dokter = ?`,
            values:[id],
        });
        res.status(200).json({ dokter })
    } catch (error) {
        res.status(404).json( error.toString() );
    }
}

