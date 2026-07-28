function formatDateToDDMMM(dateStr) {
  if (!dateStr) return "";

  const date = new Date(dateStr);
  const day = String(date.getUTCDate()).padStart(2, "0");

  const months = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
  const month = months[date.getUTCMonth()];

  return `${day}${month}`;
}

function formatTimeToHHMM(timeStr) {
  if (!timeStr) return "";
  return timeStr.replace(":", "");
}

function updatePreview() {
  const reg = document.getElementById("reg").value.toUpperCase();
  const arrAirport = document.getElementById("arrAirport").value.toUpperCase();
  const arrDateRaw = document.getElementById("arrDate").value;
  const arrTimeRaw = document.getElementById("arrTime").value;

  const depDateRaw = document.getElementById("depDate").value;
  const depTimeRaw = document.getElementById("depTime").value;

  const destAirport = document.getElementById("destAirport").value.toUpperCase();

  // 日付変換（28JUL）
  const arrDate = formatDateToDDMMM(arrDateRaw);
  const depDate = formatDateToDDMMM(depDateRaw);

  // 時刻変換（1345）
  const arrTime = formatTimeToHHMM(arrTimeRaw);
  const depTime = formatTimeToHHMM(depTimeRaw);

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

