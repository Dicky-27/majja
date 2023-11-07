import excuteQuery from "../../../../../lib/db";
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

    const { id_dokter, hari, jam_mulai, jam_selesai, recurring, repeat, berakhir_pada, berakhir_setelah, tidak_diulang } = req.body;
    var mHari
    switch (hari){
        case "0": mHari = "Minggu"; break;
        case "1": mHari = "Senin"; break;
        case "2": mHari = "Selasa"; break;
        case "3": mHari = "Rabu"; break;
        case "4": mHari = "Kamis"; break;
        case "5": mHari = "Jumat"; break;
        case "6": mHari = "Sabtu"; break;
        case 0: mHari = "Minggu"; break;
        case 1: mHari = "Senin"; break;
        case 2: mHari = "Selasa"; break;
        case 3: mHari = "Rabu"; break;
        case 4: mHari = "Kamis"; break;
        case 5: mHari = "Jumat"; break;
        case 6: mHari = "Sabtu"; break;
        default: mHari = hari.charAt(0).toUpperCase() + hari.slice(1).toLowerCase(); break;
    }

    try {
        // if (repeat < 1){
        //     throw new Error("Repeat harus lebih dari sama dengan 1");
        // }
        // if (mHari !== "Senin" && mHari !== "Selasa" && mHari !== "Rabu" && mHari !== "Kamis" && mHari !== "Jumat" && mHari !== "Sabtu" && mHari !== "Minggu") {
        //     throw new Error("Invalid hari")
        // }
        const jadwal = await excuteQuery({
            query: `INSERT INTO tb_jadwal (id_dokter, hari, jam_mulai, jam_selesai, recurring, \`repeat\`, berakhir_pada, berakhir_setelah, tidak_diulang) VALUES
            (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            values:[id_dokter, mHari, jam_mulai, jam_selesai, recurring, repeat, berakhir_pada, berakhir_setelah, tidak_diulang],
        });
        if (jadwal.error == null){
            res.status(200).json({ jadwal:jadwal.insertId, msg:"Success" })
        } else {
            res.status(400).json({ msg:jadwal.error.sqlMessage })
        }
        
    } catch (error) {
        res.status(404).json({ msg: error.message });
    }
}

