import excuteQuery from "../../../../lib/db";
import NextCors from 'nextjs-cors';

export default async function exportDoctor(req, res) {
    await NextCors(req, res, {
        // Options
        methods: ['POST'],
        origin: '*',
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });
    
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { id_dokter } = req.body;

    try {
        const dokter = await excuteQuery({
            query: `DELETE FROM tb_dokter WHERE id_dokter = ?`,
            values:[id_dokter],
        });
        if (dokter.error == null){
            res.status(200).json({ msg:"Success" })
        } else {
            res.status(200).json({ msg:dokter.error.sqlMessage })
        }
    } catch (error) {
        res.status(404).json({ msg: error.message });
    }
}

