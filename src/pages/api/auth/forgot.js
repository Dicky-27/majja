import excuteQuery from "../../../../lib/db";
import NextCors from 'nextjs-cors';

var md5 = require("blueimp-md5");

export default async function handler(req, res) {

    await NextCors(req, res, {
        // Options
        methods: ['POST'],
        origin: '*',
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });

    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { email, password, oldPass } = req.body;
    
    const encr_pass = md5(password);

    try {

        const finduser = await excuteQuery({
            query: `SELECT * from tb_user WHERE email = ?`,
            values:[email],
        });

        if(finduser.length !=0){
            const checkpassword = await excuteQuery({
                query: `SELECT * from tb_user WHERE email = ? and pass = ?`,
                values:[email, oldPass],
            });
            if (checkpassword.length != 0){
                const updateuser = await excuteQuery({
                    query: `UPDATE tb_user SET pass = ? WHERE email = ?`,
                    values:[password, email],
                });
                if (updateuser.affectedRows == 0){
                    throw new Error('User Not Found');
                } else {
                    res.status(200).json({ msg:"Success" })
                }
            } else {
                res.status(404).json({ msg:"Cek Kembali Password lama Anda!" })
            }
        }
        else{
            res.status(405).json({ msg:"User Tidak Ditemukan!" })
        }
    } catch (error) {
        res.status(404).json({ msg: error.message });
    }
}

