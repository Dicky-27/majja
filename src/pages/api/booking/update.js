import excuteQuery from "../../../../lib/db";
import NextCors from 'nextjs-cors';

export default async function editPaymentStatus(req, res) {
    const { id_booking, payment_status } = req.body;
    await NextCors(req, res, {
        // Options
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        origin: '*',
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
     });
     
    try {
        const result = await excuteQuery({
            query: 'UPDATE booking set payment_status = ? WHERE id = ?',
            values:[payment_status, id_booking],
        });
        res.status(200).json({ status: true })
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}