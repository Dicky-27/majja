// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import excuteQuery from "../../../../lib/db";
import NextCors from 'nextjs-cors';

export default async function checkPaymentStatus(req, res) {
    const { id_booking } = req.body;

    await NextCors(req, res, {
        methods: ['POST'],
        origin: '*',
        optionsSuccessStatus: 200,
     });

    try {
        const result = await excuteQuery({
            query: "SELECT payment_status FROM booking WHERE id = ?",
            values:[id_booking],
        });
        res.status(200).json({ result })
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


