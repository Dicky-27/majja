import excuteQuery from "../../../../../lib/db";
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
        var id_dokter;
        for (const [key, value] of urlParams) {
            if(key === "id"){
                id_dokter = value;
            }   
        }
        
        const jadwal = await excuteQuery({
            query: `SELECT hari FROM tb_jadwal a NATURAL JOIN tb_dokter b WHERE b.id_dokter = ${id_dokter} `,
            values: '', 
        });
        const groupedSched = jadwal.reduce((result, item) => {
            const existingItem = result.find((d) => d.id_dokter === item.id_dokter);
            if (existingItem) {
              existingItem.hari.push(item.hari);
            } else {
              result.push({
                hari: [item.hari],
              });
            }
            return result;
          }, []);
        res.status(200).json({ jadwal:groupedSched[0] })
    } catch (error) {
        res.status(404).json({ msg: error.message });
    }
}
