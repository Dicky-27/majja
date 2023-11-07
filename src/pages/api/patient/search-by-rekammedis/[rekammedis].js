import excuteQuery from "../../../../../lib/db";
import NextCors from 'nextjs-cors';

export default async function exportDoctor(req, res) {  
    await NextCors(req, res, {
        // Options
        methods: ['GET'],
        origin: '*',
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });

    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const {rekammedis} = req.query;

    try {
        const pasien = await excuteQuery({
            // query: `SELECT * FROM tb_pasien LIMIT 100`,
            query:'SELECT no_rekam_medis FROM tb_pasien where no_rekam_medis = ?',
            values:[rekammedis],
        });
        if(pasien.length > 0){
            res.status(200).json({ message:'OK' })
        }
        else{
            res.status(400).json({ message: 'Pasien Belum Terdaftar'});
        }
        
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

