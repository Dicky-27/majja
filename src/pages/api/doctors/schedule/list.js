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

    try {
        const jadwal = await excuteQuery({
            query: `SELECT * FROM tb_jadwal a NATURAL JOIN tb_dokter b`,
            values:'',
        });
        // const groupedSched = jadwal.reduce((result, item) => {
        //     const existingItem = result.find((d) => d.id_dokter === item.id_dokter);
        //     if (existingItem) {
        //       existingItem.hari.push(item.hari);
        //     } else {
        //       result.push({
        //         id: item.id_dokter,
        //         name: item.nama,
        //         position: item.posisi,
        //         image: item.gambar,
        //         xp: item.xp,
        //         status: item.status,
        //         hari: [item.hari],
        //       });
        //     }
        //     return result;
        //   }, []);
        res.status(200).json({ jadwal })
    } catch (error) {
        res.status(404).json({ msg: error.message });
    }
}

