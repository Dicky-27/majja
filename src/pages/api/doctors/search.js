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
        var nama = "", hari = "", layanan = "", urutan = "ASC";
        for (const [key, value] of urlParams) {
            if(key === "nama"){
                nama = value;
            }
            if(key === "layanan"){
                layanan = value;
            }
            if(key === "urutan"){
                urutan = value;
            }
            if(key === "hari"){
                hari = value;
            }
        }
        
        const dokter = await excuteQuery({
            query: `
                SELECT *
                    FROM (
                        SELECT *
                        FROM tb_dokter a
                        NATURAL JOIN (
                            SELECT id_dokter
                            FROM tb_jadwal
                            WHERE hari LIKE "%${hari}%"
                            GROUP BY id_dokter
                        ) b
                    ) c
                    LEFT OUTER JOIN tb_jadwal d 
                    ON c.id_dokter = d.id_dokter
                    WHERE nama LIKE "%${nama}%" 
                    AND posisi LIKE "%${layanan}%" 
                    GROUP BY c.nama, d.hari, c.posisi, c.id_dokter, d.id_jadwal
                    ORDER BY c.id_dokter ${urutan}
                `, 
            values: '', 
        });
        const groupedDokter = dokter.reduce((result, item) => {
            const existingItem = result.find((d) => d.id_dokter === item.id_dokter);
            if (existingItem) {
              existingItem.hari.push(item.hari);
            } else {
              result.push({
                id_dokter: item.id_dokter,
                nama: item.nama,
                posisi: item.posisi,
                gambar: item.gambar,
                xp: item.xp,
                hari: [item.hari],
              });
            }
            return result;
          }, []);
        res.status(200).json({ dokter:groupedDokter })
    } catch (error) {
        res.status(404).json({ msg: error.message });
    }
}
