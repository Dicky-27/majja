import excuteQuery from "../../../../../lib/db";
import NextCors from 'nextjs-cors';

export default async function exportDoctor(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }
    
    await NextCors(req, res, {
        // Options
        methods: ['GET'],
        origin: '*',
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });

    const {id} = req.query;

    try {
        const jadwaldokter = await excuteQuery({
            query: `SELECT * from tb_jadwal where id_dokter = ?`,
            values:[id],
        });
        res.status(200).json({ jadwaldokter })
    } catch (error) {
        res.status(404).json( error.toString() );
    }
}

