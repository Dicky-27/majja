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

    const { id } = req.body;
    
    try {
        const pasien = await excuteQuery({
            query: `DELETE FROM tb_pasien WHERE id_pasien = ${id}`,
            values:'',
        });
        if (pasien.error == null){
            res.status(200).json({ msg:"Success" })
        } else {
            res.status(200).json({ msg:pasien.error.sqlMessage })
        }
        
    } catch (error) {
        res.status(404).json({ msg: error.message });
    }
}

