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

    const { id, nama, telp, record } = req.body;
    var idRecord;
    if (record !== undefined){
        idRecord = record;
    } else {
        idRecord = "null";
    }

    try {
        const pasien = await excuteQuery({
            query: `UPDATE tb_pasien SET nama = "${nama}", telp = "${telp}", id_record = ${idRecord} WHERE id_pasien = ${id}`,
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

