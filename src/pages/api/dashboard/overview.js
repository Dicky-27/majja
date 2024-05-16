import excuteQuery from "../../../../lib/db";
import NextCors from "nextjs-cors";

export default async function GET(req, res) {
  await NextCors(req, res, {
    methods: ["GET"],
    origin: "*",
    optionsSuccessStatus: 200,
  });

  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { period } = req.query;
  let dateCondition;

  switch (period) {
    case "7_days":
      dateCondition = "BETWEEN CURDATE() - INTERVAL 7 DAY AND CURDATE()";
      break;
    case "30_days":
      dateCondition = "BETWEEN CURDATE() - INTERVAL 30 DAY AND CURDATE()";
      break;
    case "1_year":
      dateCondition = "BETWEEN CURDATE() - INTERVAL 1 YEAR AND CURDATE()";
      break;
    case "all_time":
      dateCondition = "";
      break;
    case "today":
      dateCondition = "= CURDATE()";
      break;
    default:
      return res.status(400).json({ message: "Invalid period specified" });
  }

  try {
    let query;
    if (period === "all_time") {
      query = `
        SELECT 
          (SELECT COUNT(*) FROM booking WHERE payment_status = 'settlement' AND creator = 'user') AS curr_book,
          (SELECT COUNT(DISTINCT(phone)) FROM booking WHERE payment_status = 'settlement' AND creator = 'user') AS curr_pasien,
          (SELECT COUNT(*) FROM booking WHERE tanggal_booking = CURDATE() - INTERVAL 1 DAY AND payment_status = 'settlement' AND creator = 'user') AS last_book,
          (SELECT COUNT(DISTINCT(phone)) FROM booking WHERE tanggal_booking = CURDATE() - INTERVAL 1 DAY AND payment_status = 'settlement' AND creator = 'user') AS last_pasien
      `;
    } else {
      query = `
        SELECT 
          (SELECT COUNT(*) FROM booking WHERE tanggal_booking ${dateCondition} AND payment_status = 'settlement' AND creator = 'user') AS curr_book,
          (SELECT COUNT(DISTINCT(phone)) FROM booking WHERE tanggal_booking ${dateCondition} AND payment_status = 'settlement' AND creator = 'user') AS curr_pasien,
          (SELECT COUNT(*) FROM booking WHERE tanggal_booking = CURDATE() - INTERVAL 1 DAY AND payment_status = 'settlement' AND creator = 'user') AS last_book,
          (SELECT COUNT(DISTINCT(phone)) FROM booking WHERE tanggal_booking = CURDATE() - INTERVAL 1 DAY AND payment_status = 'settlement' AND creator = 'user') AS last_pasien
      `;
    }

    const data = await excuteQuery({ query, values: [] });

    const COST = 50000;

    const book_diff = (data[0]?.curr_book || 0) - (data[0]?.last_book || 0);
    const book_percent =
      data[0]?.last_book || 0 ? (book_diff / data[0]?.last_book) * 100 : 0;

    const pasien_diff =
      (data[0]?.curr_pasien || 0) - (data[0]?.last_pasien || 0);
    const pasien_percent =
      data[0]?.last_pasien || 0
        ? (pasien_diff / data[0]?.last_pasien) * 100
        : 0;

    const earning_diff = book_diff * COST;
    const earning_percent = book_percent;

    const count = {
      book_diff,
      book_percent,
      pasien_diff,
      pasien_percent,
      earning_diff,
      earning_percent,
    };

    res.status(200).json({ data: data[0], count, status: "Success" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
}
