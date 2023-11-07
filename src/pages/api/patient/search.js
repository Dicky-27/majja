import excuteQuery from "../../../../lib/db";
import NextCors from 'nextjs-cors';

export default async function exportDoctor(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }
    
    await NextCors(req, res, {
        // Options
        methods: ['GET'],
        origin: '*',
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });

    try {
        const urlParams = new URLSearchParams(req.query);
        var nama = "";
        for (const [key, value] of urlParams) {
            if(key === "nama"){
                nama = value;
            }
        }
        
        const pasien = await excuteQuery({
            query: `SELECT * FROM tb_pasien WHERE nama LIKE "%${nama}%" LIMIT 5`, 
            values: '', 
        });
        res.status(200).json({ pasien:pasien[0] });
    } catch (error) {
        res.status(404).json({ msg: error.message });
    }
}
