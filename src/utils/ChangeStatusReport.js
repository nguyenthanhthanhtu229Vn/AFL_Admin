import { putStatusReportAPI } from "../api/ReportAPI";
export async function changStatusReport(data) {
  console.log(data);
  try {
    for (const item of data) {
      const myData = {
        ...item,
        status: "Đã duyệt",
      };
      const response = await putStatusReportAPI(myData);
    }
  } catch (err) {
    console.error(err);
  }
}
