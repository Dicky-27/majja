import excuteQuery from "../../../../lib/db";
import NextCors from 'nextjs-cors';

export default async function exportDoctor(req, res) {
    await NextCors(req, res, {
        // Options
        methods: ['POST'],
        origin: '*',
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });

    const {email} = req.body;
    
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    try {
        const dokter = await excuteQuery({
            query: `SELECT * FROM tb_dokter where email = ?`,
            values:[email],
        });
        res.status(200).json({ dokter })
    } catch (error) {
        res.status(404).json( error.toString() );
    }
}

