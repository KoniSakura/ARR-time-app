function formatDateToDDMMM(dateObj) {
  const day = String(dateObj.getUTCDate()).padStart(2, "0");

  const months = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
  const month = months[dateObj.getUTCMonth()];

  return `${day}${month}`;
}

function convertJSTtoUTC(dateStr, timeStr) {
  if (!dateStr || !timeStr) return null;

  // JSTのDateオブジェクトを作成
  const jstDate = new Date(`${dateStr}T${timeStr}:00+09:00`);

  // UTCに変換
  const utcDate = new Date(jstDate.getTime() - 9 * 3600000);

  return utcDate;
}

function updatePreview() {
  const reg = document.getElementById("reg").value.toUpperCase();
  const arrAirport = document.getElementById("arrAirport").value.toUpperCase();
  const arrDateRaw = document.getElementById("arrDate").value;
  const arrTimeRaw = document.getElementById("arrTime").value;

  const depDateRaw = document.getElementById("depDate").value;
  const depTimeRaw = document.getElementById("depTime").value;

  const destAirport = document.getElementById("destAirport").value.toUpperCase();

  // JST → UTC 変換
  const arrUTC = convertJSTtoUTC(arrDateRaw, arrTimeRaw);
  const depUTC = convertJSTtoUTC(depDateRaw, depTimeRaw);

  // 日付（DDMMM）と時刻（HHMM）に整形
  const arrDate = arrUTC ? formatDateToDDMMM(arrUTC) : "";
  const depDate = depUTC ? formatDateToDDMMM(depUTC) : "";

  const arrTime = arrUTC ? String(arrUTC.getUTCHours()).padStart(2, "0") +
                           String(arrUTC.getUTCMinutes()).padStart(2, "0") : "";

  const depTime = depUTC ? String(depUTC.getUTCHours()).padStart(2, "0") +
                           String(depUTC.getUTCMinutes()).padStart(2, "0") : "";

  const text =
`Dear Duty Officer,

///ACFT MVT///

Ref ${reg}

ATA ${arrAirport}${arrDate} ${arrTime}UTC
ETD ${arrAirport}${depDate} ${depTime}UTC
For ${destAirport}`;

  document.getElementById("output").value = text;
}

function copyText() {
  const text = document.getElementById("output").value;

  navigator.clipboard.writeText(text).then(() => {
    alert("コピーしました！");
  }).catch(err => {
    alert("コピーに失敗しました");
  });
}
