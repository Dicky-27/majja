import excuteQuery from "../../../../../lib/db";
import NextCors from 'nextjs-cors';

export default async function exportJadwalKhusus(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }
    
    await NextCors(req, res, {
        // Options
        methods: ['GET'],
        origin: '*',
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });

    try {
        const jadwal = await excuteQuery({
            query: `SELECT * FROM tb_jadwal_khusus where remove = 1`,
            values:'',
        });
        res.status(200).json({ jadwal })
    } catch (error) {
        res.status(404).json({ msg: error.message });
    }
}

