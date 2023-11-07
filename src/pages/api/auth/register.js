import excuteQuery from "../../../../lib/db";
import NextCors from 'nextjs-cors';
import jwt from "jsonwebtoken";
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
    
    const { nama, email, password, is_admin } = req.body;
    
    // const encr_pass = md5(password);
    // const rand = () => {
    //     const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    //     let result = '';
    //     const charactersLength = characters.length;
      
    //     for (let i = 0; i < 127; i++) { // Generate a 10-character string, adjust as needed
    //       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    //     }
      
    //     return result;
    //   };
    // const token = rand()

    const secret = "majja123"

    const token = jwt.sign({ email }, secret, {});

    try {
        const user = await excuteQuery({
            query: `INSERT INTO tb_user (token, nama, email, pass, is_admin) VALUE (?, ?, ?, ?, ?)`,
            values:[token, nama, email, password, is_admin],
        });
        if (user.error == null){
            if ( user.affectedRows == 0){
                throw new Error('User Not Found');
            } else {
                res.status(200).json({ token:token, msg:"Success" })
            }
        } else {
            res.status(200).json({ msg:user.error.sqlMessage })
        }
        
    } catch (error) {
        res.status(404).json({ msg: error.message });
    }
}

