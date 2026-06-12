//1. 가져온 본문에서 단어의 배열 얻음
function getWords(text) {
    return text
        .toLowerCase()
        .replace(/[.,!?;:'"‘’“”()\[\]_*-]/g, " ")
        .split(/\s+/)
        .filter(w => w.length > 0);
}

//2. 단어들의 배열에서 불용어 제거한 배열 얻기
function removeStopwords(words, stopwords) {
    return words.filter(w => !stopwords.includes(w));
}

//3. 단어의 배열을 {단어: 빈도} 꼴의 객체로 변환
function countWords(words) {
    const counts = {}; //빈 배열 초기화
    for (const word of words) {
        counts[word] = (counts[word] || 0) + 1;
    }
    return counts;
}

//4. {단어: 빈도} 객체에서 상위 N개의 배열을 얻음
function topN(counts, n) {
    return Object.entries(counts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, n);
}

//5. top: 상위 n개의 배열
function drawChart(selector, top, color) {
    const canvas = document.querySelector(selector);
    return new Chart(canvas, {
        type: "bar",
        data: {
            labels: top.map(item => item[0]),
            datasets: [{
                label: "빈도", data: top.map(item => item[1]),
                backgroundColor: color,
            }],
        },
        options: {
            indexAxis: "y",
            maintainAspectRatio: false,
            scales: {
                x: { beginAtZero: true },
                y: { ticks: { autoSkip: false } },
            },
        },
    });
}