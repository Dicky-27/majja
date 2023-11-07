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

    const urlParams = new URLSearchParams(req.query);
    var id;
    for (const [key, value] of urlParams) {
        if(key === "id"){
            id = value;
        }   
    }

    try {
        const jadwal = await excuteQuery({
            query: `SELECT id_jadwal, id_jadwal_khusus, nama, hari, jam_mulai, jam_selesai, tanggal, \`remove\`, \`repeat\` FROM (
                SELECT jk.id_jadwal_khusus, NULL AS id_jadwal, jk.id_dokter, jk.hari, jk.jam_mulai, jk.jam_selesai, jk.tanggal, jk.\`remove\`, NULL AS \`repeat\`
                FROM tb_jadwal_khusus jk
                UNION ALL
                SELECT NULL, j.id_jadwal, j.id_dokter, j.hari, j.jam_mulai, j.jam_selesai, NULL, NULL, j.\`repeat\`
                FROM tb_jadwal j) a LEFT OUTER JOIN tb_dokter b ON a.id_dokter = b.id_dokter
                WHERE b.id_dokter = ? AND (a.tanggal > CURDATE() OR a.tanggal IS NULL) ORDER BY tanggal ASC LIMIT 100;
                `,
            values: [id],
        });
        if (jadwal.error == null){
            res.status(200).json({ jadwal, msg:"Success" });
        } else {
            res.status(200).json({ msg:jadwal.error.sqlMessage });
        }        
    } catch (error) {
        res.status(404).json({ msg: error.message });
    }
}

