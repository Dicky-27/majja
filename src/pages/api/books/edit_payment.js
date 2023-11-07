import excuteQuery from "../../../../lib/db";
import NextCors from 'nextjs-cors';

export default async function exportDoctor(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    await NextCors(req, res, {
        // Options
        methods: ['POST'],
        origin: '*',
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });

    const { id, status } = req.body;

    try {
        const booking = await excuteQuery({
            query: `UPDATE tb_booking SET status_pembayaran = ${status} WHERE id_booking = ${id}`,
            values: '',
        });
        if (booking.error == null){
            res.status(200).json({ msg:"Success" })
        } else {
            res.status(200).json({ msg:booking.error.sqlMessage })
        }
        
    } catch (error) {
        res.status(404).json({ msg: error.message });
    }
}

