import excuteQuery from "../../../../lib/db";
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

    try {
        const pasien = await excuteQuery({
            // query: `SELECT * FROM tb_pasien LIMIT 100`,
            query:'SELECT DISTINCT b.nama, b.phone, b.kategori, (SELECT no_rekam_medis FROM tb_pasien p WHERE b.phone= p.telp) AS no_rekam_medis FROM booking b',
            values:'',
        });
        res.status(200).json({ pasien })
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

