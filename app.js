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
