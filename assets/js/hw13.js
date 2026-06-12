// [숙제13] 텍스트 분석 도구 구현
// 2025-11446 정수호

// --- 함수 정의들 ---
function extractBody(text) {
    const startMark = "*** START OF THE PROJECT GUTENBERG EBOOK";
    const endMark= "*** END OF THE PROJECT GUTENBERG EBOOK";
    const startIdx = text.indexOf(startMark);
    const endIdx = text.indexOf(endMark);
    return text.slice(startIdx, endIdx);
}


// --- 메인: 세 파일을 동시에 fetch + 고유 불용어 ---
Promise.all([
    fetch("/data/frankenstein.txt").then(r => r.text()),
    fetch("/data/dracula.txt").then(r=> r.text()),
    fetch("/data/stopwords-en.txt").then(r => r.text()),
    fetch("/data/stopwords-custom.txt").then(r=> r.text()), // 커스텀 불용어 추가
]).then(([frankText, dracText, baseStop, customStop]) => {
    
    const stopwords = (baseStop + "\n" + customStop)
        .split(/\s+/)
        .filter(w=> w.length > 0);

    function analyze(text, stopwords) {
        const body= extractBody(text);
        const words = getWords(body);
        const cleaned = removeStopwords(words, stopwords);
        const counts = countWords(cleaned);
        return topN(counts, 30);
    }

    const frankTop = analyze(frankText, stopwords);
    const dracTop= analyze(dracText, stopwords);

    drawChart("#chart-frankenstein", frankTop, "rgba(40, 167, 69, 0.6)");
    drawChart("#chart-dracula", dracTop, "rgba(220, 53, 69, 0.6)");
});