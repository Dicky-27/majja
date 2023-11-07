import excuteQuery from "../../../../lib/db";
import NextCors from 'nextjs-cors';

export default async function createnewcustomer(req, res) {
    const { nama, tanggal_booking, jam_booking, kategori, no_rekam_medis, keluhan, id_dokter, phone, action_status } = req.body;
    // const tgllahir = new Date(tgl_lahir)

    await NextCors(req, res, {
        // Options
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        origin: '*',
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
     });

    try {
        const result = await excuteQuery({
            query: 'INSERT INTO booking (nama, tanggal_booking, jam_booking, kategori, no_rekam_medis, keluhan, id_dokter, phone, action_status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            values:[nama, tanggal_booking, jam_booking, kategori, no_rekam_medis, keluhan, id_dokter, phone, action_status],
        });
        res.status(200).json({ result })
    } catch (error) {
        res.status(404).json({ error });
    }
}