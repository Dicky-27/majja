import excuteQuery from "../../../../lib/db";
import NextCors from 'nextjs-cors';

export default async function exportDoctor(req, res) {
    const { nama, posisi, gambar, xp, status, phone, email } = req.body;

    await NextCors(req, res, {
        // Options
        methods: ['POST'],
        origin: '*',
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });
    
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }
    
    try {
        const dokter = await excuteQuery({
            query: `INSERT INTO tb_dokter(nama, posisi, gambar, xp, status, phone, email) VALUE(?, ?, ?, ?, ?, ?, ?)`,
            values:[nama, posisi, gambar, xp, status, phone, email],
        });
        if (dokter.error == null){
            res.status(200).json({ doctor:dokter.insertId, msg:"Success" })
        } else {
            res.status(200).json({ msg:dokter.error.sqlMessage })
        }
        
    } catch (error) {
        res.status(404).json({ msg: error.message });
    }
}

