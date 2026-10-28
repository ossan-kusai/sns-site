const questions = [
  {
    prompt: "大事な予定が急にキャンセルされて、友達が『しっかりして』って言ってきたら？",
    options: [
      { label: "『わかった、じゃあ別の計画を考える』とちゃんと対応する", score: { ego: 1, rule: 1, chaos: 1 } },
      { label: "一瞬だけ落ち込んだけど、すぐに『まあ、いっか』と切り替える", score: { ego: 2, rule: 2, chaos: 2 } },
      { label: "『なんで急に』って本音で思いながら、無表情で話す", score: { ego: 3, rule: 3, chaos: 1 } },
      { label: "『また別の人に頼めばいい』と、現実的な解決策を考える", score: { ego: 1, rule: 2, chaos: 3 } }
    ]
  },
  {
    prompt: "会議で自分の案が採用されなかった時、まず頭に浮かぶのは？",
    options: [
      { label: "『いや、なんで自分じゃないの』と一瞬思う", score: { ego: 3, rule: 3, chaos: 1 } },
      { label: "『次はもっとわかりやすく���えばいい』と反省する", score: { ego: 1, rule: 2, chaos: 2 } },
      { label: "『他の人の方が良いなら、それでもいい』と置く", score: { ego: 1, rule: 1, chaos: 3 } },
      { label: "『次こそ自分のタイミングで言う』とメモする", score: { ego: 2, rule: 2, chaos: 2 } }
    ]
  },
  {
    prompt: "友達が『ちょっと待って』と言って、帰り道に何かを見つけたとき、あなたは？",
    options: [
      { label: "その場で『持ってこい』と勝手に決める", score: { ego: 3, rule: 3, chaos: 2 } },
      { label: "『いいね、でもちょっと待って』と、前科のある優しさで言う", score: { ego: 1, rule: 2, chaos: 3 } },
      { label: "見逃すけど、あとでふと気になってしまう", score: { ego: 2, rule: 1, chaos: 2 } },
      { label: "『一人で持って帰ればいい』と自分の都合を考える", score: { ego: 2, rule: 3, chaos: 1 } }
    ]
  },
  {
    prompt: "SNSで自分の投稿が反応薄かった時、どういう感情が先に来る？",
    options: [
      { label: "『せっかく考えたのに』と少しだけ腹が立つ", score: { ego: 3, rule: 2, chaos: 1 } },
      { label: "『私の才能が理解されてないだけ』と自分を正当化する", score: { ego: 2, rule: 3, chaos: 1 } },
      { label: "『次はこういう角度でやろう』と改善する", score: { ego: 1, rule: 2, chaos: 3 } },
      { label: "『まあ、反応なんて気にしない』と真顔で言う", score: { ego: 1, rule: 1, chaos: 2 } }
    ]
  },
  {
    prompt: "あえて自分が損をしても、気分が悪くなるならどうする？",
    options: [
      { label: "『あとで言い返せばいい』と、心の中でずっと覚えている", score: { ego: 3, rule: 3, chaos: 1 } },
      { label: "『やらない方がよかった』とちゃんと学ぶ", score: { ego: 1, rule: 2, chaos: 3 } },
      { label: "『まあ、気にしない気にしない』と緩い反応で切り抜ける", score: { ego: 1, rule: 1, chaos: 2 } },
      { label: "自分の中で『ルール』を作って次から防ぐ", score: { ego: 2, rule: 3, chaos: 2 } }
    ]
  },
  {
    prompt: "「人に聞かれたらいいこと言ってるつもり」な時、あなたは？",
    options: [
      { label: "『聞きたくないのに、聞かれたから答える』とやる", score: { ego: 2, rule: 2, chaos: 3 } },
      { label: "その場で『自分はこう思う』を言うと、後で自己嫌悪する", score: { ego: 2, rule: 3, chaos: 2 } },
      { label: "『いいこと言ったつもり』で満足して終わる", score: { ego: 3, rule: 2, chaos: 1 } },
      { label: "言葉を選びすぎて、結局何も言わない", score: { ego: 1, rule: 1, chaos: 3 } }
    ]
  },
  {
    prompt: "自分の中で最も大切にしているのは？",
    options: [
      { label: "自分の気持ちがちゃんと整っていること", score: { ego: 3, rule: 3, chaos: 1 } },
      { label: "みんなが気持ちよく過ごせること", score: { ego: 1, rule: 1, chaos: 3 } },
      { label: "自分が納得したやり方で、他人に迷惑をかけないこと", score: { ego: 2, rule: 2, chaos: 2 } },
      { label: "誰にも言えない、けどちゃんと守る自分ルール", score: { ego: 3, rule: 3, chaos: 1 } }
    ]
  }
];

const questionContainer = document.getElementById("questions");
const quizForm = document.getElementById("quiz-form");
const resultPanel = document.getElementById("result");
const resetButton = document.getElementById("reset-button");

const egoScoreElement = document.getElementById("ego-score");
const meterFill = document.getElementById("meter-fill");
const egoLabel = document.getElementById("ego-label");
const ruleName = document.getElementById("rule-name");
const ruleText = document.getElementById("rule-text");
const summaryText = document.getElementById("summary-text");
const adviceText = document.getElementById("advice-text");

function renderQuestions() {
  questionContainer.innerHTML = questions
    .map(
      (question, index) => `
        <div class="question-block">
          <p class="question">Q${index + 1}. ${question.prompt}</p>
          <div class="options">
            ${question.options
              .map(
                (option, optionIndex) => `
                  <div class="option">
                    <input
                      type="radio"
                      name="q${index}"
                      id="q${index}-o${optionIndex}"
                      value="${optionIndex}"
                      required
                    />
                    <label for="q${index}-o${optionIndex}">${option.label}</label>
                  </div>
                `
              )
              .join("")}
          </div>
        </div>
      `
    )
    .join("");
}

function getDiagnosis(scores) {
  const egoPercent = Math.min(100, Math.round((scores.ego / 21) * 100));
  const mysteryPercent = Math.min(100, Math.round((scores.rule / 21) * 100));
  const chaosPercent = Math.min(100, Math.round((scores.chaos / 21) * 100));

  let title = "「自分の考えは、勝手に正解」型";
  let rule = "自分の感情が優先される、でも言葉にしないタイプ";
  let summary = "人には『普通に冷静』に見えるけど、心の中ではかなり厳密にルールを作っています。";
  let advice = "たまに『自分の理由』を一度だけちゃんと伝えてみると、関係が楽になります。";

  if (egoPercent >= 75) {
    title = "「勝手にルールを作って、正義気取りする」型";
    rule = "自分のペースを最優先し、そのルールを周りにも無意識に押し付ける";
    summary = "あなたは、気づかないうちに自分のルールを『常識』に変えてしまうタイプです。";
    advice = "『自分の都合』をぶちまける前に、まず『相手の都合』を1つだけ聞いてみてください。";
  } else if (egoPercent >= 55) {
    title = "「私は人よりちょっとだけ自己中」型";
    rule = "行動は穏やかでも、内側ではちょっとだけ自己中心です";
    summary = "ちゃんと配慮していても、自分の感情を深く抱え込みやすいタイプです。";
    advice = "思ったことを全部飲み込むより、迷った時は『私的には』を少しだけ伝えると楽です。";
  } else if (egoPercent >= 35) {
    title = "「自分の気持ちをちゃんと守る」型";
    rule = "人に合わせるのが上手だけど、時々自分の感情が爆発する";
    summary = "バランス型で、理解の速さと自己管理の両方を持っています。";
    advice = "自分の意見を伝えるのが苦手なら、短い一言から始めると自然です。";
  } else {
    title = "「他人に合わせるのが上手」型";
    rule = "人に優しく見えて、自分の正しさをあまり主張しない";
    summary = "優しさが強い一方で、時々『一番いいのは自分の気持ち』に気づくことがあります。";
    advice = "自分の感情を我慢しすぎると、あとで無言になりがちです。少しだけ主張してみましょう。";
  }

  if (mysteryPercent >= 75 && chaosPercent >= 50) {
    rule = "自分の中に『こうしたい』があるが、それを説明するときはかなり曖昧";
    summary = "あなたのルールは、言葉にするとやや不思議で、現実的にはかなり強烈なものです。";
    advice = "決めたことを一度だけ言語化すると、周りも理解しやすくなります。";
  }

  return {
    egoPercent,
    title,
    rule,
    summary,
    advice
  };
}

function scoreQuiz(formData) {
  const score = { ego: 0, rule: 0, chaos: 0 };

  questions.forEach((question, index) => {
    const selected = Number(formData.get(`q${index}`));
    if (Number.isInteger(selected)) {
      const selectedOption = question.options[selected];
      if (selectedOption) {
        score.ego += selectedOption.score.ego;
        score.rule += selectedOption.score.rule;
        score.chaos += selectedOption.score.chaos;
      }
    }
  });

  return score;
}

function updateMeter(percentage) {
  const normalized = Math.max(0, Math.min(100, percentage));
  meterFill.style.width = `${normalized}%`;
  const ring = document.querySelector(".score-ring");
  ring.style.background = `conic-gradient(#1d1d1d 0deg, #1d1d1d ${normalized * 3.6}deg, #eae5e1 ${normalized * 3.6}deg 360deg)`;
}

function showResult() {
  const formData = new FormData(quizForm);
  const scores = scoreQuiz(formData);
  const diagnosis = getDiagnosis(scores);

  emotionLabel = (value) => {
    if (value >= 75) return "かなり自己中心的なクセがあります。けど、面白いほど自分に正直です。";
    if (value >= 55) return "中〜高め。自分のペースを守るタイプです。";
    if (value >= 35) return "やや自分軸がある。バランス感覚もあります。";
    return "かなり控えめ。自分が後ろに隠れているだけの可能性があります。";
  };

  egoScoreElement.textContent = diagnosis.egoPercent;
  egoLabel.textContent = emotionLabel(diagnosis.egoPercent);
  ruleName.textContent = diagnosis.title;
  ruleText.textContent = diagnosis.rule;
  summaryText.textContent = diagnosis.summary;
  adviceText.textContent = diagnosis.advice;
  updateMeter(diagnosis.egoPercent);

  resultPanel.classList.remove("hidden");
  resultPanel.scrollIntoView({ behavior: "smooth", block: "start" });
}

quizForm.addEventListener("submit", (event) => {
  event.preventDefault();
  showResult();
});

resetButton.addEventListener("click", () => {
  quizForm.reset();
  resultPanel.classList.add("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
});

renderQuestions();
