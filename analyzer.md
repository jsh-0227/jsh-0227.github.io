---
layout: page
title: "텍스트 분석기"
permalink: /analyzer/
---
<h2>영문 텍스트 단어 빈도 분석기</h2>
<p>아래 칸에 영어 텍스트를 붙여 넣고 ``분석'' 버튼을 누르세요. 상위 20개 단어가 표시됩니다.</p>

<textarea id="input-text" rows="10" style="width: 100%;"
          placeholder="여기에 영어 텍스트를 붙여 넣으세요..."></textarea>
<button id="analyze-btn" style="margin: 0.5em 0; padding: 0.4em 1em;">
    분석
</button>

<div style="height: 600px;">
    <canvas id="result-chart"></canvas>
</div>

{% include chartjs.html %}
<script src="/assets/js/analysis.js"></script>
<script src="/assets/js/analyzer.js"></script>