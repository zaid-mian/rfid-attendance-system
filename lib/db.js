let attendance = [];

export function addAttendance(record) {
  const existing = attendance.find(
    r => r.uid === record.uid &&
    r.date === new Date().toLocaleDateString()
  );

  if (existing) {
    return { success: false, message: "Already marked today!" };
  }

  const newRecord = {
    uid: record.uid,
    name: record.name,
    rollNo: record.rollNo,
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString(),
    timestamp: new Date().toISOString()
  };

  attendance.push(newRecord);
  return { success: true, record: newRecord };
}

export function getAttendance() {
  return attendance;
}

export function resetAttendance() {
  attendance = [];
}

export function getStats() {
  const students = [
    { uid: "A87F25D5", name: "M. Zaid Tahir",      rollNo: "2023-AG-10127" },
    { uid: "38C91DD5", name: "M. Huzaifa Khalid",  rollNo: "2023-AG-10112" },
    { uid: "B8953AD5", name: "Fatima Shahzad",     rollNo: "2023-AG-10057" },
    { uid: "3A0A72B4", name: "Shahreen Shahid",    rollNo: "2023-AG-10144" },
    { uid: "B49
