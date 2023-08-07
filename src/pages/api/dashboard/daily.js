import excuteQuery from "../../../../lib/db";
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

    // const yesterday = new Date(today.getFullYear(), today.getMonth(), today.getDate()-1);
    // const tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate()+1);
    
    try {
        const data = await excuteQuery({
            query: `SELECT * FROM 
            (SELECT COUNT(*) AS curr_book, COUNT(DISTINCT(phone)) AS curr_pasien FROM booking 
            WHERE tanggal_booking <= CURDATE() AND tanggal_booking > CURDATE() + 1 AND payment_status = 'settlement') a,
            (SELECT COUNT(*) AS last_book, COUNT(DISTINCT(phone)) AS last_pasien FROM booking
            WHERE tanggal_booking <= CURDATE() - 2 AND tanggal_booking > CURDATE() - 1 AND payment_status = 'settlement') b`,
            values:'',
        });
        
        const COST = 50000;

        var book_diff = data[0] ? (data[0].curr_book - data[0].last_book) : 0;
        var book_percent = data[0] ? (book_diff / (data[0].last_book == 0 ? 1 : data[0].last_book) * 100) : 0;
        
        var pasien_diff = data[0] ? (data[0].curr_pasien - data[0].last_pasien) : 0;
        var pasien_percent = data[0] ? (pasien_diff / (data[0].last_pasien == 0 ? 1 : data[0].last_pasien) * 100) : 0;

        var earning_diff = book_diff * COST;
        var earning_percent = book_percent;
        
        var count = {
            book_diff:book_diff,
            book_percent:book_percent,
            pasien_diff:pasien_diff,
            pasien_percent:pasien_percent,
            earning_diff:earning_diff,
            earning_percent:earning_percent
        }

        res.status(200).json({ data:data[0], count, status:"Success"})
    } catch (error) {
        res.status(404).json({ msg: error.message });
    }
}

