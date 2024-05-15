import excuteQuery from "../../../../lib/db";
import NextCors from "nextjs-cors";

export default async function GET(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  await NextCors(req, res, {
    methods: ["GET"],
    origin: "*",
    optionsSuccessStatus: 200,
  });

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 100;
  const offset = (page - 1) * limit;
  const search = req.query.search ? `%${req.query.search}%` : null;

  try {
    // Base query with optional search
    let baseQuery = `FROM tb_pasien`;
    let values = [];
    if (search) {
      baseQuery += ` WHERE nama LIKE ?`;
      values.push(search);
    }

    baseQuery += ` ORDER BY created_at DESC`;

    // Query to get paginated records
    const queryData = {
      query: `SELECT * ${baseQuery} LIMIT ?, ?`,
      values: [...values, offset, limit],
    };

    // Query to get total count of records
    const countData = {
      query: `SELECT COUNT(*) AS total ${baseQuery}`,
      values: [...values],
    };

    // Execute both queries
    const result = await Promise.all([
      excuteQuery(queryData),
      excuteQuery(countData),
    ]);

    const pasien = result[0];
    const total = result[1][0].total;

    res.status(200).json({ pasien, total });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}
