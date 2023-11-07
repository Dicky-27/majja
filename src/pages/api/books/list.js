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
        const booking = await excuteQuery({
            query: `
                SELECT id_pasien, tanggal, jam, keluhan, status_pembayaran, status_booking, catatan, b.nama AS pasien, c.nama AS dokter, id_record
                FROM (tb_booking a NATURAL JOIN tb_pasien b), tb_dokter c
                WHERE a.id_dokter = c.id_dokter LIMIT 20
            `,
            values:'',
        });
        res.status(200).json({ booking })
    } catch (error) {
        res.status(404).json({ msg: error.message });
    }
}

