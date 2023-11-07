// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import excuteQuery from "../../../../../lib/db";
import NextCors from 'nextjs-cors';

export default async function exportBookingEmail(req, res) {
    await NextCors(req, res, {
        // Options
        methods: ['POST'],
        origin: '*',
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
     });

     const {email} = req.body
     
    try {
        const result = await excuteQuery({
            query: "SELECT a.id_jadwal, a.id_dokter, a.hari, a.jam_mulai, a.jam_selesai, a.recurring, a.repeat,  a.berakhir_pada, a.berakhir_setelah, b.nama, b.posisi, b.email from tb_jadwal a, tb_dokter b, tb_user c WHERE a.id_dokter = b.id_dokter AND b.email = c.email AND c.email = ?",
            values:[email],
        });
        res.status(200).json({ result })
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


