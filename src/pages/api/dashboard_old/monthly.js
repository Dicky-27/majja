import excuteQuery from "../../../../lib/db";
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
        const data = await excuteQuery({
            query: `SELECT * FROM 
            (SELECT COUNT(*) AS curr_book, COUNT(DISTINCT(id_pasien)) AS curr_pasien, SUM(earning) AS curr_earning FROM tb_booking 
            WHERE MONTH(tanggal) = MONTH(CURDATE()) AND YEAR(tanggal) = YEAR(CURDATE()) AND status_booking = 1) a,
            (SELECT COUNT(*) AS last_book, COUNT(DISTINCT(id_pasien)) AS last_pasien, SUM(earning) AS last_earning FROM tb_booking
            WHERE MONTH(tanggal) = MONTH(CURDATE() - INTERVAL 1 MONTH) AND YEAR(tanggal) = YEAR(CURDATE() - INTERVAL 1 MONTH) AND status_booking = 1) b`,
            values:'',
        });
        var book_diff = data[0].curr_book - data[0].last_book;
        var book_percent = book_diff / data[0].last_book * 100;
        
        var pasien_diff = data[0].curr_pasien - data[0].last_pasien;
        var pasien_percent = pasien_diff / data[0].last_pasien * 100;

        var earning_diff = data[0].curr_earning - data[0].last_earning;
        var earning_percent = earning_diff / data[0].last_earning * 100;
        
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

