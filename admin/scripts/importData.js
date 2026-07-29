const readXlsxFile = require('read-excel-file/node');
const path = require('path');
require('dotenv').config();

const connectDB = require('../config/db');
const CallRecord = require('../CallRecord');

const importData = async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    const excelPath = path.join(__dirname, '../mock_call_records_10000.xlsx');
    const parsed = await readXlsxFile(excelPath);
    const rows = Array.isArray(parsed)
      && parsed.length === 1
      && parsed[0]
      && Array.isArray(parsed[0].data)
      ? parsed[0].data
      : parsed;

    if (!Array.isArray(rows) || rows.length < 2) {
      throw new Error('Excel file is empty');
    }

    // Use first row as headers and map subsequent rows to objects.
    const [rawHeaders, ...records] = rows;
    const headers = rawHeaders.map((header) => String(header ?? '').trim());
    const data = records
      .filter((row) => row.some((cell) => cell !== null && cell !== undefined && cell !== ''))
      .map((row) => {
        const rowData = {};
        headers.forEach((header, index) => {
          if (header) {
            rowData[header] = row[index];
          }
        });
        return {
          caller_number: rowData.caller_number ?? rowData.callerNumber,
          receiver_number: rowData.receiver_number ?? rowData.receiverNumber,
          duration: Number(rowData.duration ?? rowData.callDuration ?? 0),
          call_type: (rowData.call_type ?? rowData.callDirection) ? 'outgoing' : 'incoming',
          city: rowData.city,
          timestamp: new Date(rowData.timestamp ?? rowData.callStartTime)
        };
      });

    const validData = data.filter(
      (item) => item.caller_number && item.receiver_number && item.city && !Number.isNaN(item.timestamp.getTime())
    );

    console.log(`📄 Rows found: ${validData.length}`);

    // Clear old data (optional)
    await CallRecord.deleteMany();

    // Insert new data
    await CallRecord.insertMany(validData);

    console.log('✅ Data imported successfully!');
    process.exit();

  } catch (error) {
    console.error('❌ Import failed');
    console.error(error);
    process.exit(1);
  }
};

importData();