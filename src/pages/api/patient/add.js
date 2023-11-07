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

    const { nama, telp } = req.body;
    
    try {
        if (nama !== undefined && telp !== undefined){

            const rekamMedis = Math.floor(100000 + Math.random() * 900000);
            const cek = await excuteQuery({
                query:'SELECT no_rekam_medis FROM tb_pasien where no_rekam_medis = ?',
                values:[rekamMedis],
            });
            if(cek.length > 0){
                return
            }
            else{
                const cekpasien = await excuteQuery({
                    // query: `SELECT * FROM tb_pasien LIMIT 100`,
                    query:'SELECT * FROM tb_pasien where telp = ?',
                    values:[telp],
                });
                if(cekpasien.length > 0){
                    res.status(400).json({ msg:'Pasien Sudah Terdaftar! Silahkan Pilih Kategori Pasien Lama!' })
                }
                else{
                    const pasien = await excuteQuery({
                        query: `INSERT INTO tb_pasien (nama, telp, no_rekam_medis) VALUES(?, ?, ?)`,
                        values:[nama, telp, rekamMedis],
                    });
                    if (pasien.error == null){
                        res.status(200).json({ id_pasien:pasien.insertId, mgs:"Success" });
                    } else {
                        res.status(400).json({ msg:pasien.error.sqlMessage })
                    }
                }
            }            
        } else {
            throw Error("Data not complete")
        }
    } catch (error) {
        res.status(404).json({ msg: error.message });
    }
}