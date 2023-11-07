import excuteQuery from "../../../../lib/db";
import NextCors from 'nextjs-cors';

export default async function editPaymentStatus(req, res) {
    const { id_booking, action_status, catatan } = req.body;
    await NextCors(req, res, {
        // Options
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        origin: '*',
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
     });

    try {
        const result = await excuteQuery({
            query: "UPDATE booking set action_status = ?, catatan = ? WHERE id = ?",
            values:[action_status, catatan, id_booking],
        });
        res.status(200).json({ status: result })
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}