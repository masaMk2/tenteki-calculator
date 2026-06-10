const calculateButton = document.getElementById("calculateButton");
const errorMessage = document.getElementById("errorMessage");
const resultArea = document.getElementById("resultArea");

const hourlyRateElement = document.getElementById("hourlyRate");
const dropsPerMinuteElement = document.getElementById("dropsPerMinute");
const roundedDropsPerMinuteElement = document.getElementById("roundedDropsPerMinute");
const dropsPer10SecondsElement = document.getElementById("dropsPer10Seconds");
const roundedDropsPer10SecondsElement = document.getElementById("roundedDropsPer10Seconds");
const formulaDetailElement = document.getElementById("formulaDetail");

calculateButton.addEventListener("click", calculateDrops);

function calculateDrops() {
  hideMessages();

  const selectedVolume = document.querySelector("input[name='volume']:checked");
  const selectedDropFactor = document.querySelector("input[name='dropFactor']:checked");
  const hoursText = document.getElementById("hours").value.trim();
  const minutesText = document.getElementById("minutes").value.trim();

  if (!selectedVolume) {
    showError("点滴量を選択してください。");
    return;
  }

  if (hoursText === "" && minutesText === "") {
    showError("投与時間を入力してください。");
    return;
  }

  if (!isValidNumberText(hoursText) || !isValidNumberText(minutesText)) {
    showError("投与時間は数値で入力してください。");
    return;
  }

  const volumeMl = Number(selectedVolume.value);
  const dropFactor = Number(selectedDropFactor.value);
  const hours = hoursText === "" ? 0 : Number(hoursText);
  const minutes = minutesText === "" ? 0 : Number(minutesText);

  // 計算式: 投与時間（分） = 入力された時間 × 60 + 入力された分
  const totalMinutes = hours * 60 + minutes;

  if (totalMinutes <= 0) {
    showError("投与時間は1分以上で入力してください。");
    return;
  }

  // 計算式: 投与時間（時間） = 投与時間（分） ÷ 60
  const totalHours = totalMinutes / 60;

  // 計算式: 1時間あたりの輸液量（mL/h） = 輸液量 ÷ 投与時間（時間）
  const hourlyRate = volumeMl / totalHours;

  // 計算式: 1分あたりの滴下数 = 輸液量 × 滴下係数 ÷ 投与時間（分）
  const dropsPerMinute = (volumeMl * dropFactor) / totalMinutes;

  // 計算式: 10秒あたりの滴下数 = 1分あたりの滴下数 ÷ 6
  const dropsPer10Seconds = dropsPerMinute / 6;

  const roundedDropsPerMinute = Math.round(dropsPerMinute);
  const roundedDropsPer10Seconds = Math.round(dropsPer10Seconds);

  hourlyRateElement.textContent = `${hourlyRate.toFixed(1)}mL/h`;
  dropsPerMinuteElement.textContent = `${dropsPerMinute.toFixed(1)}滴/分`;
  roundedDropsPerMinuteElement.textContent = `${roundedDropsPerMinute}滴/分`;
  dropsPer10SecondsElement.textContent = `${dropsPer10Seconds.toFixed(1)}滴/10秒`;
  roundedDropsPer10SecondsElement.textContent = `${roundedDropsPer10Seconds}滴/10秒`;

  formulaDetailElement.textContent =
    `投与時間: ${hours}時間 × 60 + ${minutes}分 = ${totalMinutes}分。` +
    ` 輸液速度: ${volumeMl}mL ÷ ${totalHours.toFixed(2)}時間 = ${hourlyRate.toFixed(1)}mL/h。` +
    ` 1分あたり: ${volumeMl}mL × ${dropFactor}滴/mL ÷ ${totalMinutes}分 = ${dropsPerMinute.toFixed(1)}滴/分。` +
    ` 10秒あたり: ${dropsPerMinute.toFixed(1)}滴/分 ÷ 6 = ${dropsPer10Seconds.toFixed(1)}滴/10秒。`;

  resultArea.hidden = false;
}

function isValidNumberText(text) {
  if (text === "") {
    return true;
  }

  return Number.isFinite(Number(text));
}

function showError(message) {
  errorMessage.textContent = message;
  errorMessage.hidden = false;
  resultArea.hidden = true;
}

function hideMessages() {
  errorMessage.hidden = true;
  resultArea.hidden = true;
}

// PWA用: 対応ブラウザではService Workerを登録して、最低限のオフライン起動に備えます。
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js");
  });
}
