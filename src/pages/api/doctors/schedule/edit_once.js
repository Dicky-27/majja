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

    const { id_jadwal_khusus, hari, jam_mulai, jam_selesai, tanggal, hapus } = req.body;
    var mHari
    switch (hari){
        case "1": mHari = "Minggu"; break;
        case "2": mHari = "Senin"; break;
        case "3": mHari = "Selasa"; break;
        case "4": mHari = "Rabu"; break;
        case "5": mHari = "Kamis"; break;
        case "6": mHari = "Jumat"; break;
        case "7": mHari = "Sabtu"; break;
        case 1: mHari = "Minggu"; break;
        case 2: mHari = "Senin"; break;
        case 3: mHari = "Selasa"; break;
        case 4: mHari = "Rabu"; break;
        case 5: mHari = "Kamis"; break;
        case 6: mHari = "Jumat"; break;
        case 7: mHari = "Sabtu"; break;
        default: mHari = hari.charAt(0).toUpperCase() + hari.slice(1).toLowerCase(); break;
    }

    try {
        if (mHari !== "Senin" && mHari !== "Selasa" && mHari !== "Rabu" && mHari !== "Kamis" && mHari !== "Jumat" && mHari !== "Sabtu" && mHari !== "Minggu") {
            throw new Error("Invalid hari")
        }
        const jadwal = await excuteQuery({
            query: `UPDATE tb_jadwal_khusus SET hari = ?, jam_mulai = ?, jam_selesai = ?, tanggal = ?, \`remove\` = ? WHERE id_jadwal_khusus = ?`  ,
            values:[mHari, jam_mulai, jam_selesai, tanggal, hapus, id_jadwal_khusus],
        });
        if (jadwal.error == null){
            res.status(200).json({ msg:"Success" })
        } else {
            res.status(200).json({ msg:jadwal.error.sqlMessage })
        }
        
    } catch (error) {
        res.status(404).json({ msg: error.message });
    }
}

