import excuteQuery from "../../../../lib/db";
import NextCors from "nextjs-cors";

export default async function POST(req, res) {
  await NextCors(req, res, {
    methods: ["POST"],
    origin: "*",
    optionsSuccessStatus: 200,
  });

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { email } = req.body;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 100;
  const offset = (page - 1) * limit;
  const search = req.query.search ? `%${req.query.search}%` : null;

  try {
    // Base query with optional search
    let baseQuery = `
      FROM booking a
      JOIN tb_dokter b ON a.id_dokter = b.id_dokter
      JOIN tb_user c ON b.email = c.email
      WHERE a.payment_status = 'settlement' AND c.email = ?`;

    let values = [email];

    if (search) {
      baseQuery += ` AND (a.nama LIKE ? OR b.nama LIKE ?)`;
      values.push(search, search);
    }

    baseQuery += ` ORDER BY a.tanggal_booking DESC`;

    // Query to get paginated records
    const queryData = {
      query: `SELECT a.id, a.nama, a.jam_booking, a.tanggal_booking, a.no_rekam_medis, a.keluhan, a.phone, a.action_status, a.catatan, b.nama as nama_dokter 
              ${baseQuery} 
              LIMIT ?, ?`,
      values: [...values, offset, limit],
    };

    // Query to get the total count of records
    const countData = {
      query: `SELECT COUNT(*) AS total ${baseQuery}`,
      values: values,
    };

    // Execute both queries
    const result = await Promise.all([
      excuteQuery(queryData),
      excuteQuery(countData),
    ]);

    const bookings = result[0];
    const total = result[1][0].total;

    res.status(200).json({ bookings, total, page, limit });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}
