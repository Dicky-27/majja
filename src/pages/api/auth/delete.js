import excuteQuery from "../../../../lib/db";
import NextCors from 'nextjs-cors';

var md5 = require("blueimp-md5");

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    await NextCors(req, res, {
        // Options
        methods: ['POST'],
        origin: '*',
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });

    const { email, password } = req.body;
    
    const encr_pass = md5(password);

    try {
        const user = await excuteQuery({
            query: `DELETE FROM tb_user WHERE email = "${email.toLowerCase()}" AND pass = "${encr_pass}"`,
            values:'',
        });
        if (user.error == null){
            if ( user.affectedRows == 0){
                throw new Error('User Not Found');
            } else {
                res.status(200).json({ msg:"Success" })
            }
        } else {
            res.status(200).json({ msg:user.error.sqlMessage })
        }
        
    } catch (error) {
        res.status(404).json({ msg: error.message });
    }
}

