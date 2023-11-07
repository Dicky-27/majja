// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import excuteQuery from "../../../../lib/db";
import NextCors from 'nextjs-cors';

export default async function bookingCheck(req, res) {
    const { today, id_dokter} = req.body;
    
    await NextCors(req, res, {
        // Options
        methods: ['POST'],
        origin: '*',
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
     });
     
    try {
        const result = await excuteQuery({
            query: "SELECT a.id, a.tanggal_booking, a.jam_booking, a.id_dokter FROM booking a where a.payment_status = 'settlement' and a.tanggal_booking > ? and a.id_dokter = ?",
            values:[today, id_dokter],
        });
        res.status(200).json({ result })
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


