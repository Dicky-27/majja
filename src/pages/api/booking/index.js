// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import excuteQuery from "../../../../lib/db";
import NextCors from 'nextjs-cors';

export default async function exportCustomer(req, res) {
    await NextCors(req, res, {
        // Options
        methods: ['GET'],
        origin: '*',
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
     });
     
    try {
        const result = await excuteQuery({
            query: "SELECT a.id, a.nama, a.tanggal_booking, a.jam_booking, a.kategori, a.no_rekam_medis, a.keluhan, a.phone, a.payment_status, a.action_status, a.catatan, b.nama as nama_dokter FROM `booking` a, tb_dokter b where a.id_dokter = b.id_dokter and a.payment_status = 'settlement'",
            values:'',
        });
        res.status(200).json({ result })
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


