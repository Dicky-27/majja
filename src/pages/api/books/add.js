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

    const { nama, telp, id_dokter, tanggal, jam, keluhan, catatan } = req.body;

    try {
        const pasien = await excuteQuery({
            query: `SELECT id_pasien FROM tb_pasien WHERE nama = ? LIMIT 1`,
            values: [nama],
        });
    
        if (pasien.error) {
            res.status(200).json({ msg: pasien.error.sqlMessage });
            return;
        }
    
        let id_pasien;
    
        if (pasien.length === 0) {
            const add = await excuteQuery({
                query: `INSERT INTO tb_pasien (nama, telp, id_record) VALUES (?, ?, null)`,
                values: [nama, telp],
            });
        
            if (add.error) {
                res.status(200).json({ msg: add.error.sqlMessage });
                return;
            }
        
            id_pasien = add.insertId;
        } else {
            id_pasien = pasien[0].id_pasien;
        }

        const booking = await excuteQuery({
            query: `INSERT INTO tb_booking (id_pasien, id_dokter, tanggal, jam, keluhan, status_pembayaran, status_booking, catatan)
            VALUES (${id_pasien}, ${id_dokter}, '${tanggal}', '${jam}', '${keluhan}', 0, 0, "${catatan}")`,
            values:'',
        });
        if (booking.error == null){
            res.status(200).json({ msg:"Success" })
        } else {
            res.status(200).json({ msg:booking.error.sqlMessage })
        }
        
    } catch (error) {
        res.status(404).json({ msg: error.message });
    }
}

