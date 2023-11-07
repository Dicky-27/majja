// // api/booking/getBookedTimes.js

// const express = require("express");
// const router = express.Router();
// import excuteQuery from "../../../../lib/db";

// // Endpoint untuk mengambil data jam_booking yang telah dipesan untuk dokter dan tanggal tertentu
// router.post("/", async (req, res) => {
//   const { id_dokter, tanggal_booking } = req.body;

//   try {
//     // Lakukan query ke database untuk mengambil data jam_booking yang telah dipesan
//     const result = await excuteQuery.query(
//       "SELECT jam_booking FROM booking WHERE id_dokter = ? AND tanggal_booking = ?",
//       [id_dokter, tanggal_booking]
//     );

//     // Ambil data jam_booking dari hasil query
//     const bookedTimes = result.map((item) => item.jam_booking);

//     // Kirim response dengan data jam_booking
//     res.json({ bookedTimes });
//   } catch (error) {
//     console.error("Error fetching booked times: ", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// module.exports = router;

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import excuteQuery from "../../../../lib/db";
import NextCors from 'nextjs-cors';

export default async function exportCustomer(req, res) {
  const { id_dokter, tanggal_booking } = req.body;
    
  await NextCors(req, res, {
      // Options
      methods: ['POST'],
      origin: '*',
      optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
   });
     
    try {
        const result = await excuteQuery({
            query: "SELECT jam_booking FROM booking WHERE id_dokter = ? AND tanggal_booking = ?",
            values: [id_dokter, tanggal_booking],
        });
        const bookedTimes = result.map((item) => item.jam_booking);
        res.status(200).json({ bookedTimes })
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


