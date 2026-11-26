
/* ==================================================
   沿線キャリア 自己分析ラボ
   メインシステム v1.0.0
================================================== */

(() => {
  "use strict";

  const C = window.ENSEN_CONFIG;
  const Q = window.ENSEN_QUESTIONS;
  const R = window.ENSEN_RESULTS;
  const $ = id => document.getElementById(id);

  if (!C || !Q || !R || !$("homeView")) {
    alert("診断システムの読み込みに失敗しました。");
    return;
  }

  const tests = Q.tests;
  const KEY = C.diagnosis.storageKey;
  const icons = {
    strength: "✦",
    difficulty: "◇",
    workstyle: "◎",
    values: "♡"
  };

  const emptyState = () => ({
    version: C.diagnosis.version,
    progress: {},
    results: {},
    profile: {}
  });

  let state = emptyState();
  let storageAvailable = true;
  let activeTest = null;
  let step = 0;
  let answers = {};
  let priorities = [];
  let toastTimer;

  try {
    const saved = JSON.parse(localStorage.getItem(KEY));
    if (saved && saved.version === C.diagnosis.version) {
      state = {
        ...emptyState(),
        ...saved
      };
    }
  } catch (e) {
    console.warn(e);
  }

  function save() {
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
      return true;
    } catch (e) {
      storageAvailable = false;
      toast("端末への保存ができません。ページを閉じると回答が失われる場合があります。");
      return false;
    }
  }

  function esc(value) {
    return String(value ?? "").replace(/[&<>"']/g, c => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    })[c]);
  }

  function toast(message) {
    const el = $("toast");
    if (!el) return;
    clearTimeout(toastTimer);
    el.textContent = message;
    el.hidden = false;
    toastTimer = setTimeout(() => {
      el.hidden = true;
    }, 3500);
  }

  function getTest(id) {
    return tests.find(t => t.id === id);
  }

  function go(hash) {
    if (location.hash === hash) {
      route();
    } else {
      location.hash = hash;
    }
  }

  function showView(id) {
    [
      "homeView",
      "introView",
      "quizView",
      "resultView",
      "profileView"
    ].forEach(name => {
      $(name).hidden = name !== id;
    });
    window.scrollTo(0, 0);
  }

  function list(items) {
    if (!Array.isArray(items) || !items.length) return "";
    return `<ul>${items.map(x => `<li>${esc(x)}</li>`).join("")}</ul>`;
  }

  function section(title, body) {
    if (!body) return "";
    return `
      <section class="result-section">
        <h2>${esc(title)}</h2>
        ${body}
      </section>
    `;
  }

  function button(label, action, id = "", cls = "btn-primary") {
    return `
      <button type="button"
        class="btn ${cls}"
        data-action="${esc(action)}"
        data-id="${esc(id)}">
        ${esc(label)}
      </button>
    `;
  }

  function hasAnswer(obj, id) {
    return Object.prototype.hasOwnProperty.call(obj, id);
  }

  function answerCount(test, obj) {
    return test.questions.filter(q => hasAnswer(obj, q.id)).length;
  }

  /* =========================================
     HOME
  ========================================= */

  function statusOf(test) {
    if (state.results[test.id]) return "診断済み";
    const p = state.progress[test.id];
    if (p && answerCount(test, p.answers || {})) {
      return `${answerCount(test, p.answers)} / ${test.questions.length}問`;
    }
    return "未診断";
  }

  function renderHome() {
    const completed = tests.filter(t => state.results[t.id]).length;

    $("testGrid").innerHTML = tests.map(t => {
      const done = !!state.results[t.id];
      const progress = state.progress[t.id];
      const started = progress && answerCount(t, progress.answers || {}) > 0;

      return `
        <article class="test-card" data-test="${esc(t.id)}">
          <div class="test-card-top">
            <div class="test-icon">${icons[t.id]}</div>
            <span class="test-number">TEST ${esc(t.number)}</span>
          </div>
          ${done ? '<span class="completed-label">診断済み</span>' : ""}
          <h3>${esc(t.title)}</h3>
          <p><strong>${esc(t.subtitle)}</strong></p>
          <p>${esc(t.description)}</p>
          <div class="test-meta">
            <span>全${t.questions.length}問</span>
            <span>約${esc(t.minutes)}分</span>
            <span>無料</span>
          </div>
          <div class="test-card-footer">
            <a class="btn" href="#${done ? "result" : "test"}/${t.id}">
              ${done ? "診断結果を見る" : started ? "診断を再開する" : "診断を始める"} →
            </a>
          </div>
        </article>
      `;
    }).join("");

    $("homeProgress").innerHTML = `
      <div class="progress-header">
        <span>診断完了数</span>
        <span>${completed} / ${tests.length}</span>
      </div>
      <div class="progress-track">
        <div class="progress-fill" style="width:${completed / tests.length * 100}%"></div>
      </div>
      ${renderSummary()}
    `;
  }

  function renderSummary() {
    return tests.map(t => `
      <a class="karte-item" href="#${state.results[t.id] ? "result" : "test"}/${t.id}" data-test="${t.id}">
        <div class="test-icon">${icons[t.id]}</div>
        <div class="karte-item-content">
          <h3>${esc(t.title)}</h3>
          <p>${esc(resultHeadline(t.id))}</p>
        </div>
        <span class="karte-status ${state.results[t.id] ? "done" : ""}">
          ${esc(statusOf(t))}
        </span>
      </a>
    `).join("");
  }

  /* =========================================
     INTRO
  ========================================= */

  function renderIntro(id) {
    const t = getTest(id);
    if (!t) return go("#tests");

    showView("introView");
    $("introView").dataset.test = id;

    const p = state.progress[id];
    const count = p ? answerCount(t, p.answers || {}) : 0;

    $("introContent").innerHTML = `
      <a href="#tests" class="back-link">← 診断一覧へ</a>
      <div class="result-hero">
        <div class="result-kicker">TEST ${esc(t.number)}</div>
        <div class="test-icon">${icons[id]}</div>
        <h1 style="margin-top:16px">${esc(t.title)}</h1>
        <p class="result-description">${esc(t.subtitle)}</p>
      </div>

      <div class="result-section">
        <h2>この診断について</h2>
        <p>${esc(t.description)}</p>
        <div class="chips" style="margin-top:18px">
          <span class="chip">全${t.questions.length}問</span>
          <span class="chip">約${esc(t.minutes)}分</span>
          <span class="chip">登録不要</span>
        </div>
      </div>

      <div class="result-section">
        <h2>回答するときのポイント</h2>
        <p>${esc(t.instruction)}</p>
        <ul>
          <li>正解・不正解はありません。</li>
          <li>仕事以外の日常生活の経験も参考にしてください。</li>
          <li>判断できない場合は、無理に回答する必要はありません。</li>
        </ul>
        <div class="notice">
          回答はこのブラウザ内に保存されます。
          診断内容が運営会社へ自動送信されることはありません。
        </div>
      </div>

      <div class="stack">
        ${button(count ? `途中から再開する（${count}問回答済み）` : "診断を始める →", "start", id, "btn-primary btn-block btn-lg")}
        ${count ? button("最初から回答する", "restart", id, "btn-secondary btn-block") : ""}
        ${state.results[id] ? button("保存済みの結果を見る", "result", id, "btn-ghost btn-block") : ""}
      </div>
    `;
  }

  /* =========================================
     QUIZ
  ========================================= */

  function startTest(id, reset = false) {
    activeTest = getTest(id);
    if (!activeTest) return;

    if (reset) {
      delete state.progress[id];
    }

    const p = state.progress[id] || {};
    answers = { ...(p.answers || {}) };
    priorities = Array.isArray(p.priorities) ? [...p.priorities] : [];
    step = Number.isInteger(p.step) ? p.step : 0;
    step = Math.max(0, Math.min(step, activeTest.questions.length - 1));

    saveProgress();
    go(`#quiz/${id}`);
  }

  function saveProgress() {
    if (!activeTest) return;

    state.progress[activeTest.id] = {
      answers: { ...answers },
      priorities: [...priorities],
      step,
      updatedAt: new Date().toISOString()
    };
    save();
  }

  function renderQuiz() {
    if (!activeTest) return go("#tests");

    showView("quizView");
    $("quizView").dataset.test = activeTest.id;
    $("quizTitle").textContent = activeTest.title;

    const t = activeTest;
    const q = t.questions[step];
    const count = answerCount(t, answers);
    const percent = Math.round(count / t.questions.length * 100);

    $("progressText").textContent = `${count} / ${t.questions.length}問 回答済み`;
    $("progressPercent").textContent = `${percent}%`;
    $("progressFill").style.width = `${percent}%`;
    $("questionNumber").textContent = `QUESTION ${String(step + 1).padStart(2, "0")}`;
    $("questionText").textContent = q.text || "";

    let comparison = "";

    if (q.a && q.b) {
      comparison = `
        <div class="grid-2" style="margin-bottom:20px">
          <div class="result-card" style="background:#F3F8FA">
            <strong>A</strong>
            <p>${esc(q.a)}</p>
          </div>
          <div class="result-card" style="background:#F3F8FA;margin-top:0">
            <strong>B</strong>
            <p>${esc(q.b)}</p>
          </div>
        </div>
      `;
    }

    if (q.detail) {
      comparison += `<p class="question-note">${esc(q.detail)}</p>`;
    }

    $("questionComparison").innerHTML = comparison;

    const scale = Q.scales[t.scale];

    $("answerOptions").innerHTML = scale.map((option, index) => {
      const selected = hasAnswer(answers, q.id) && answers[q.id] === option.value;

      return `
        <button type="button"
          class="answer-option ${selected ? "selected" : ""} ${option.value === null ? "unknown-option" : ""}"
          aria-pressed="${selected}"
          data-action="answer"
          data-id="${index}">
          <span class="option-circle"></span>
          <span>${esc(option.label)}</span>
        </button>
      `;
    }).join("");

    $("prevQuestion").textContent = step === 0 ? "← 説明へ" : "← 前へ";

    $("nextQuestion").textContent =
      step === t.questions.length - 1
        ? t.id === "values" ? "優先順位を選ぶ →" : "結果を見る →"
        : "次へ →";

    $("nextQuestion").disabled = !hasAnswer(answers, q.id);

    const footer = document.querySelector(".quiz-footer");
    if (footer) {
      footer.textContent = storageAvailable
        ? "回答はこのブラウザに保存されます。"
        : "端末への保存ができない状態です。";
    }
  }

  function selectAnswer(index) {
    const q = activeTest.questions[step];
    const option = Q.scales[activeTest.scale][index];
    if (!option) return;

    answers[q.id] = option.value;
    saveProgress();

    document.querySelectorAll("#answerOptions .answer-option").forEach((el, i) => {
      el.classList.toggle("selected", i === index);
      el.setAttribute("aria-pressed", String(i === index));
    });

    const count = answerCount(activeTest, answers);
    const percent = Math.round(count / activeTest.questions.length * 100);

    $("progressText").textContent = `${count} / ${activeTest.questions.length}問 回答済み`;
    $("progressPercent").textContent = `${percent}%`;
    $("progressFill").style.width = `${percent}%`;
    $("nextQuestion").disabled = false;
  }

  $("prevQuestion").addEventListener("click", () => {
    if (!activeTest) return;

    if (step === 0) {
      saveProgress();
      go(`#test/${activeTest.id}`);
      return;
    }

    step--;
    saveProgress();
    renderQuiz();
  });

  $("nextQuestion").addEventListener("click", () => {
    if (!activeTest) return;

    const q = activeTest.questions[step];
    if (!hasAnswer(answers, q.id)) return;

    if (step < activeTest.questions.length - 1) {
      step++;
      saveProgress();
      renderQuiz();
      return;
    }

    if (activeTest.id === "values") {
      renderPriorities();
    } else {
      finishTest();
    }
  });

  /* =========================================
     VALUES PRIORITIES
  ========================================= */

  function renderPriorities() {
    const t = activeTest;
    if (!t || t.id !== "values") return;

    showView("introView");
    $("introView").dataset.test = "values";

    const max = t.priorityCount || 5;
    const scores = calculateScores(t, answers);

    $("introContent").innerHTML = `
      <div class="result-hero">
        <div class="result-kicker">FINAL STEP</div>
        <h1>大切にしたいことを選ぶ</h1>
        <p class="result-description">
          ${esc(t.priorityInstruction || "特に大切にしたい価値観を最大5つ選んでください。")}
        </p>
      </div>

      <div class="result-section">
        <h2>あなたの優先順位</h2>
        <p>選んだ順番が優先順位になります。もう一度押すと選択を解除できます。</p>
        <div class="notice" style="margin:16px 0">
          ${priorities.length} / ${max}項目 選択中
        </div>
        <div class="stack">
          ${scores.map(a => {
            const rank = priorities.indexOf(a.id);
            return `
              <button type="button"
                class="answer-option ${rank >= 0 ? "selected" : ""}"
                aria-pressed="${rank >= 0}"
                data-action="priority"
                data-id="${a.id}">
                <span class="option-circle"></span>
                <span>
                  ${rank >= 0 ? `<strong>${rank + 1}位　</strong>` : ""}
                  ${esc(a.name)}
                  <span class="small muted">
                    ${a.average === null ? "未判断" : `（重要度 ${a.average}/4）`}
                  </span>
                </span>
              </button>
            `;
          }).join("")}
        </div>
      </div>

      <div class="stack">
        ${button("診断結果を見る →", "finish", "", "btn-primary btn-block btn-lg")}
        ${button("設問に戻る", "back-quiz", "", "btn-secondary btn-block")}
      </div>
      <p class="small muted center" style="margin-top:16px">
        優先順位がまだ決まっていない場合は、選択せずに進めます。
      </p>
    `;
  }

  function togglePriority(id) {
    const max = activeTest.priorityCount || 5;

    if (priorities.includes(id)) {
      priorities = priorities.filter(x => x !== id);
    } else {
      if (priorities.length >= max) {
        toast(`最大${max}項目まで選択できます。`);
        return;
      }
      priorities.push(id);
    }

    saveProgress();
    renderPriorities();
  }

  /* =========================================
     SCORING
  ========================================= */

  function calculateScores(test, data) {
    return test.axes.map(axis => {
      const questions = test.questions.filter(q => q.axis === axis.id);

      const valid = questions
        .map(q => data[q.id])
        .filter(v => typeof v === "number" && Number.isFinite(v) && v >= 0 && v <= 4);

      const minimum = test.id === "values" ? 1 : 2;

      const average = valid.length >= minimum
        ? valid.reduce((a, b) => a + b, 0) / valid.length
        : null;

      return {
        ...axis,
        average,
        score: average === null ? null : Math.round(average * 25),
        valid: valid.length,
        total: questions.length,
        mixed: valid.some(v => v <= 1) && valid.some(v => v >= 3)
      };
    });
  }

  function ranked(scores) {
    return scores
      .filter(a => a.average !== null)
      .slice()
      .sort((a, b) => b.average - a.average);
  }

  function topAxes(scores, limit = 3, minimum = 3) {
    const eligible = ranked(scores).filter(a => a.average >= minimum);
    if (eligible.length <= limit) return eligible;
    const cutoff = eligible[limit - 1].average;
    return eligible.filter(a => a.average >= cutoff);
  }

  function finishTest() {
    if (!activeTest) return;

    const t = activeTest;

    if (answerCount(t, answers) !== t.questions.length) {
      toast("未回答の設問があります。");
      step = t.questions.findIndex(q => !hasAnswer(answers, q.id));
      renderQuiz();
      return;
    }

    const scores = calculateScores(t, answers);

    state.results[t.id] = {
      id: t.id,
      scores,
      answers: { ...answers },
      priorities: [...priorities],
      completedAt: new Date().toISOString()
    };

    delete state.progress[t.id];
    save();
    go(`#result/${t.id}`);
  }

  function strengthCombination(result) {
    if (!result) return null;

    const top = topAxes(result.scores, 2, 3);

    if (top.length !== 2) return null;

    return (R.combinations || []).find(c =>
      Array.isArray(c.axes) &&
      c.axes.length === 2 &&
      c.axes.every(id => top.some(a => a.id === id))
    ) || null;
  }

  function resultHeadline(id) {
    const result = state.results[id];
    if (!result) return "まだ診断していません";

    if (id === "strength") {
      const combo = strengthCombination(result);
      if (combo) return combo.title;

      const top = topAxes(result.scores, 3);
      return top.length
        ? top.map(a => a.short || a.name).join("・")
        : "強みの傾向を整理しました";
    }

    if (id === "difficulty") {
      const top = topAxes(result.scores, 3);
      return top.length
        ? top.map(a => a.short || a.name).join("・")
        : "負担を感じる場面を整理しました";
    }

    if (id === "workstyle") {
      const selected = result.scores
        .filter(a => a.average !== null && !a.mixed && Math.abs(a.average - 2) >= 1)
        .map(a => a.average < 2 ? a.left : a.right)
        .filter(Boolean);

      return selected.length
        ? selected.slice(0, 3).join("・")
        : "働き方の好みを整理しました";
    }

    if (id === "values") {
      const names = result.priorities.map(key =>
        result.scores.find(a => a.id === key)?.name
      ).filter(Boolean);

      return names.length
        ? names.join("・")
        : "仕事の価値観を整理しました";
    }

    return "診断済み";
  }

  /* =========================================
     RESULT CHARTS
  ========================================= */

  function scoreBars(scores, id) {
    return `
      <div class="score-list">
        ${scores.map(a => `
          <div class="score-row">
            <div class="score-head">
              <span>${esc(a.name)}</span>
              <span class="score-value">
                ${a.score === null ? "―" : a.score}
              </span>
            </div>
            ${a.score === null ? "" : `
              <div class="score-track">
                <div class="score-fill" style="width:${a.score}%"></div>
              </div>
            `}
            <div class="score-caption">
              ${a.score === null ? "判断に必要な回答が不足しています" : `有効回答 ${a.valid}/${a.total}問`}
            </div>
          </div>
        `).join("")}
      </div>
      <p class="chart-note">
        ${id === "difficulty"
          ? "数値が高いほど、本人が負担を感じやすいと回答した傾向です。"
          : id === "values"
            ? "数値が高いほど、本人が大切にしていると回答した項目です。"
            : "数値が高いほど、自分に当てはまると回答した傾向です。"}
        0〜100に換算した自己評価であり、他者との比較や能力の証明ではありません。
      </p>
    `;
  }

  function radar(scores) {
    if (scores.some(a => a.score === null)) {
      return '<p class="notice">未判断の項目があるため、レーダーチャートは省略しています。</p>';
    }

    const n = scores.length;
    const cx = 200;
    const cy = 190;
    const radius = 120;

    function point(i, ratio) {
      const angle = -Math.PI / 2 + i * Math.PI * 2 / n;
      return [
        cx + Math.cos(angle) * radius * ratio,
        cy + Math.sin(angle) * radius * ratio
      ];
    }

    const polygon = ratio => scores.map((_, i) => point(i, ratio).join(",")).join(" ");

    return `
      <div class="radar-wrap">
        <svg viewBox="0 0 400 380" role="img" aria-label="診断スコアのレーダーチャート">
          ${[0.25, 0.5, 0.75, 1].map(r => `
            <polygon points="${polygon(r)}"
              fill="none" stroke="#DCE5EA" stroke-width="1"/>
          `).join("")}

          ${scores.map((a, i) => {
            const [x, y] = point(i, 1);
            const [lx, ly] = point(i, 1.27);
            return `
              <line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" stroke="#DCE5EA"/>
              <text x="${lx}" y="${ly}" text-anchor="middle" dominant-baseline="middle"
                font-size="11" fill="#526673">${esc(a.short || a.name)}</text>
            `;
          }).join("")}

          <polygon
            points="${scores.map((a, i) => point(i, a.score / 100).join(",")).join(" ")}"
            fill="var(--accent-light)"
            fill-opacity=".8"
            stroke="var(--accent)"
            stroke-width="2.5"/>

          ${scores.map((a, i) => {
            const [x, y] = point(i, a.score / 100);
            return `<circle cx="${x}" cy="${y}" r="4" fill="var(--accent)"/>`;
          }).join("")}
        </svg>
      </div>
    `;
  }

  /* =========================================
     RESULT MASTER DISPLAY
  ========================================= */

  function textBlock(title, value) {
    if (!value) return "";

    return `
      <div style="margin-top:16px">
        <h3>${esc(title)}</h3>
        ${Array.isArray(value) ? list(value) : `<p>${esc(value)}</p>`}
      </div>
    `;
  }

  function masterCard(name, data) {
    if (!data) return "";

    return `
      <article class="result-card">
        <span class="badge">${esc(name)}</span>
        <h3>${esc(data.title || data.name || name)}</h3>
        ${data.catchcopy ? `<p><strong>${esc(data.catchcopy)}</strong></p>` : ""}
        ${data.description ? `<p>${esc(data.description)}</p>` : ""}
        ${textBlock("発揮しやすい持ち味", data.strengths)}
        ${textBlock("力を活かせそうな環境", data.environments)}
        ${textBlock("確認しておきたいポイント", data.caution)}
        ${textBlock("仕事選びの確認項目", data.check)}
        ${textBlock("振り返りのヒント", data.interview || data.question)}
      </article>
    `;
  }

  function renderStrength(result) {
    const top = topAxes(result.scores, 3);
    const combo = strengthCombination(result);

    const lower = result.scores
      .filter(a => a.average !== null && a.average <= 1.5);

    return `
      ${section("あなたの強みバランス",
        radar(result.scores) + scoreBars(result.scores, "strength")
      )}

      ${section("あなたが自覚している強み",
        top.length
          ? top.map(a => masterCard(a.name, R.strength[a.id])).join("")
          : '<p>今回は突出した高い自己評価が見られませんでした。具体的な経験を振り返ることで、新たな強みが見つかることもあります。</p>'
      )}

      ${combo ? section("強みの組み合わせ", `
        <div class="insight">
          <h3>${esc(combo.title)}</h3>
          <p>${esc(combo.description)}</p>
        </div>
      `) : ""}

      ${section("これから確認したいこと", `
        ${lower.length
          ? `<p>今回、比較的低く自己評価した項目は次のとおりです。</p>${list(lower.map(a => a.name))}`
          : "<p>低く自己評価した項目は目立ちませんでした。</p>"}
        <p>自己評価が低いことは、能力がないことを意味しません。経験や環境、得意な方法によっても変わります。</p>
      `)}

      ${renderOccupations(result)}
    `;
  }

  /* =========================================
     DIFFICULTY
  ========================================= */

  const difficultyTips = {
    conflict: "相談先やクレーム対応の分担が明確な職場か確認しましょう。",
    ambiguity: "指示や業務手順、完了基準が明確な環境を確認しましょう。",
    change: "予定変更の頻度や、事前共有の仕組みを確認しましょう。",
    multitask: "一度に担当する業務量や、優先順位の決め方を確認しましょう。",
    routine: "業務の変化や工夫できる範囲、成果の見え方を確認しましょう。",
    pressure: "締切や目標設定、人員配置に無理がないか確認しましょう。",
    detail: "確認作業の量や、ダブルチェックの仕組みを確認しましょう。",
    decision: "相談できる上司や、判断基準が用意されているか確認しましょう。"
  };

  function renderDifficulty(result) {
    const top = topAxes(result.scores, 3);
    const low = result.scores.filter(a => a.average !== null && a.average <= 1);

    return `
      ${section("負担を感じやすい場面",
        scoreBars(result.scores, "difficulty")
      )}

      ${section("特に確認しておきたい負担要因",
        top.length
          ? top.map(a => {
            const d = R.difficulty?.[a.id] || {};
            return `
              <article class="result-card">
                <span class="badge">${esc(a.name)}</span>
                <h3>${esc(d.title || d.name || a.name)}</h3>
                <p>${esc(d.description || "この場面では負担を感じやすいと回答しています。")}</p>
                ${textBlock("負担が生じやすい場面", d.situations || d.examples || d.triggers)}
                ${textBlock("環境選びのヒント", d.environments || d.support || d.adjustments || difficultyTips[a.id])}
                ${textBlock("振り返りのヒント", d.interview || d.question)}
              </article>
            `;
          }).join("")
          : "<p>今回の回答では、特に強い負担傾向は見られませんでした。ただし、実際の業務量や職場環境によって感じ方は変わります。</p>"
      )}

      ${low.length ? section("比較的負担が少ないと感じる場面",
        list(low.map(a => a.name))
      ) : ""}

      ${section("苦手との付き合い方", `
        <div class="insight">
          <p>すべての苦手を克服する必要はありません。自分の希望する働き方に影響するものから、環境の工夫やサポートの活用を考えてみましょう。</p>
        </div>
      `)}
    `;
  }

  /* =========================================
     WORKSTYLE
  ========================================= */

  function workstyleLabel(a) {
    if (a.average === null) return "まだ判断できない";
    if (a.mixed) return "場面によって好みが異なる";
    if (a.average <= 1) return a.left;
    if (a.average >= 3) return a.right;
    if (a.average < 1.75) return `やや${a.left}寄り`;
    if (a.average > 2.25) return `やや${a.right}寄り`;
    return "どちらも大切にする傾向";
  }

  function renderWorkstyle(result) {
    return `
      ${section("あなたの働き方バランス", `
        ${result.scores.map(a => `
          <div class="scale-row">
            <div class="scale-title">${esc(a.name)}</div>
            <div class="scale-labels">
              <span>${esc(a.left)}</span>
              <span>${esc(a.right)}</span>
            </div>
            ${a.score === null ? "" : `
              <div class="scale-track">
                <span class="scale-marker" style="left:${a.score}%"></span>
              </div>
            `}
            <p class="small"><strong>${esc(workstyleLabel(a))}</strong></p>
          </div>
        `).join("")}
        <p class="chart-note">左右に優劣はありません。回答の平均位置を表示しています。</p>
      `)}

      ${section("職場環境を選ぶヒント",
        result.scores.map(a => {
          const data = R.workstyle?.[a.id] || {};
          const side = a.average === null || a.mixed
            ? null
            : a.average < 1.75
              ? data.left
              : a.average > 2.25
                ? data.right
                : data.middle || data.center;

          return `
            <article class="result-card">
              <h3>${esc(a.name)}</h3>
              <span class="badge">${esc(workstyleLabel(a))}</span>
              ${typeof side === "string" ? `<p>${esc(side)}</p>` : ""}
              ${side && typeof side === "object"
                ? `
                  ${side.description ? `<p>${esc(side.description)}</p>` : ""}
                  ${textBlock("環境のヒント", side.environments || side.environment)}
                  ${textBlock("確認ポイント", side.check || side.caution)}
                `
                : `<p>${esc(a.average === null
                  ? "実際の経験を通じて、自分に合う環境を探してみましょう。"
                  : "求人情報や面接では、どちらの働き方が中心となる職場か確認してみましょう。")}</p>`
              }
            </article>
          `;
        }).join("")
      )}
    `;
  }

  /* =========================================
     VALUES
  ========================================= */

  function renderValues(result) {
    const selected = result.priorities
      .map(id => result.scores.find(a => a.id === id))
      .filter(Boolean);

    return `
      ${section("あなたが大切にしたいこと",
        selected.length
          ? selected.map((a, i) => {
            const d = R.values?.[a.id] || {};
            return `
              <article class="result-card">
                <span class="badge">優先順位 ${i + 1}位</span>
                <h3>${esc(a.name)}</h3>
                <p>${esc(d.description || "")}</p>
                ${textBlock("仕事選びで確認したいこと", d.check)}
                ${textBlock("自分への問いかけ", d.question)}
              </article>
            `;
          }).join("")
          : "<p>優先順位はまだ選択されていません。今すぐ決める必要はありません。</p>"
      )}

      ${section("12項目の価値観バランス",
        scoreBars(result.scores, "values")
      )}

      ${section("価値観から仕事を考える", `
        <div class="insight">
          <p>すべての条件を満たす仕事が見つからないとき、何を優先し、何なら調整できるのかを考えてみましょう。価値観はライフステージによって変わることもあります。</p>
        </div>
      `)}
    `;
  }

  /* =========================================
     OCCUPATION SUGGESTIONS
  ========================================= */

  function getOccupations(strengthResult) {
    if (!strengthResult) return [];

    const map = Object.fromEntries(
      strengthResult.scores.map(a => [a.id, a.average])
    );

    const difficulty = state.results.difficulty?.scores || [];
    const highBurden = difficulty.filter(a => a.average !== null && a.average >= 3);

    return (R.occupations || []).map(job => {
      const weights = Object.entries(job.weights || {});
      const totalWeight = weights.reduce((s, [, w]) => s + w, 0);
      const valid = weights.filter(([id]) => typeof map[id] === "number");
      const validWeight = valid.reduce((s, [, w]) => s + w, 0);

      if (!totalWeight || validWeight / totalWeight < 0.75 || valid.length < 2) {
        return null;
      }

      const related = valid
        .filter(([id]) => map[id] >= 3)
        .map(([id]) => strengthResult.scores.find(a => a.id === id));

      if (!related.length) return null;

      const score = valid.reduce((s, [id, w]) => s + map[id] * w, 0) / validWeight;

      const risks = highBurden.filter(a => (job.risks || []).includes(a.id));

      return { ...job, score, related, matchedRisks: risks };
    })
      .filter(Boolean)
      .filter(job => job.score >= 2.75)
      .sort((a, b) => b.score - a.score)
      .slice(0, 6);
  }

  function renderOccupations(result) {
    if (!C.diagnosis.showOccupationSuggestions) return "";

    const jobs = getOccupations(result);

    if (!jobs.length) {
      return section("仕事の可能性を考える", `
        <p>今回の回答だけでは、職種を絞り込むための情報が十分ではありません。興味のある仕事内容や経験も合わせて考えてみましょう。</p>
      `);
    }

    return section("あなたの強みを活かせそうな仕事の例", `
      <p style="margin-bottom:20px">
        強みの自己評価と仕事内容との関連性から、検討候補を表示しています。
        適職の判定や求人の紹介を保証するものではありません。
      </p>

      <div class="occupation-grid">
        ${jobs.map(job => `
          <article class="occupation-card">
            <span class="occupation-category">${esc(job.category)}</span>
            <h3>${esc(job.name)}</h3>
            <p>${esc(job.description)}</p>

            <div class="occupation-detail">
              <strong>関連する強み</strong>
              <p>${esc(job.related.map(a => a.short || a.name).join("・"))}</p>
            </div>

            ${job.entry ? `
              <div class="occupation-detail">
                <strong>応募条件の目安</strong>
                <p>${esc(job.entry)}</p>
              </div>
            ` : ""}

            <div class="occupation-detail">
              <strong>求人選びの確認ポイント</strong>
              <p>${esc(job.check || "具体的な業務内容や職場環境")}</p>
            </div>

            ${job.matchedRisks.length ? `
              <div class="caution-box" style="margin-top:14px">
                <strong>負担との相性も確認</strong>
                <p>${esc(job.matchedRisks.map(a => a.name).join("・"))}</p>
              </div>
            ` : ""}
          </article>
        `).join("")}
      </div>

      <p class="chart-note">
        表示順は強みとの関連度を参考にしたもので、本人の希望や実際の能力、採用可能性の順位ではありません。
      </p>

      <div class="button-row" style="margin-top:20px">
        <a class="btn btn-secondary" href="${esc(C.jobsUrl)}">求人サイトを見る →</a>
      </div>
    `);
  }

  /* =========================================
     RESULT PAGE
  ========================================= */

  function renderResult(id) {
    const t = getTest(id);
    const result = state.results[id];

    if (!t) return go("#tests");
    if (!result) return go(`#test/${id}`);

    showView("resultView");
    $("resultView").dataset.test = id;

    const combo = id === "strength" ? strengthCombination(result) : null;

    const titles = {
      strength: combo?.title || "あなたの強みの傾向",
      difficulty: "あなたが負担を感じやすい場面",
      workstyle: "あなたらしく働ける環境",
      values: "あなたが仕事で大切にしたいこと"
    };

    const renderers = {
      strength: renderStrength,
      difficulty: renderDifficulty,
      workstyle: renderWorkstyle,
      values: renderValues
    };

    $("resultContent").innerHTML = `
      <a href="#tests" class="back-link">← 診断一覧へ</a>

      <div class="result-hero">
        <div class="result-kicker">YOUR RESULT / TEST ${esc(t.number)}</div>
        <div class="test-icon">${icons[id]}</div>
        <h1 style="margin-top:18px">${esc(titles[id])}</h1>
        <p class="result-description">
          ${esc(combo?.description || t.description)}
        </p>
        <div class="chips" style="margin-top:18px">
          <span class="chip">診断完了</span>
          <span class="chip">${esc(new Date(result.completedAt).toLocaleDateString("ja-JP"))}</span>
        </div>
      </div>

      ${renderers[id](result)}

      <div class="notice" style="margin-bottom:20px">
        ${esc(C.disclaimer)}
      </div>

      <div class="result-section">
        <h2>診断結果を活用する</h2>
        <div class="button-row">
          ${button("結果をコピー", "copy-result", id, "btn-secondary")}
          ${button("印刷・PDF保存", "print", "", "btn-ghost")}
          ${button("もう一度診断する", "restart", id, "btn-ghost")}
        </div>
      </div>

      <div class="consultation">
        <h2>診断結果を、これからの働き方に。</h2>
        <p>マイカルテに結果をまとめて、今後のキャリアを考えてみましょう。</p>
        <div class="button-row">
          <a href="#profile" class="btn btn-primary">マイカルテを見る →</a>
          <a href="#tests" class="btn btn-secondary">他の診断を受ける</a>
        </div>
      </div>
    `;
  }

  /* =========================================
     CAREER PROFILE
  ========================================= */

  const profileFields = [
    {
      key: "age",
      label: "年代",
      options: ["10代", "20代前半", "20代後半", "30代", "40代", "50代", "60代以上"]
    },
    {
      key: "employment",
      label: "現在の就業状況",
      options: ["学生", "正社員", "契約社員", "派遣社員", "アルバイト・パート", "業務委託・自営業", "離職中", "その他"]
    },
    {
      key: "goals",
      label: "これから実現したいこと",
      multiple: true,
      options: [
        "収入を増やしたい",
        "専門的なスキルを身につけたい",
        "将来独立・起業したい",
        "好きなことを仕事にしたい",
        "生活とのバランスを大切にしたい",
        "自宅の近くで穏やかに働きたい",
        "人や地域の役に立ちたい",
        "自分に自信を持ちたい",
        "新しいことに挑戦したい",
        "まだ決まっていない"
      ]
    },
    {
      key: "goalDetail",
      label: "理想の生活・将来像",
      textarea: true,
      placeholder: "どんな毎日を過ごしたいか、自由に書いてみましょう。"
    },
    {
      key: "concerns",
      label: "現在の悩み・不安",
      textarea: true,
      placeholder: "仕事選び、人間関係、収入、将来への不安など"
    },
    {
      key: "area",
      label: "希望する勤務地",
      multiple: true,
      options: [
        "東西線沿線で働きたい",
        "条件次第で沿線外も検討したい",
        "勤務地より仕事内容を重視したい",
        "在宅勤務・リモートワークを希望",
        "まだ決まっていない"
      ]
    },
    {
      key: "desiredEmployment",
      label: "希望する雇用形態",
      multiple: true,
      options: ["正社員", "契約社員", "派遣社員", "アルバイト・パート", "業務委託", "こだわらない", "未定"]
    },
    {
      key: "salary",
      label: "希望する収入・待遇",
      placeholder: "例：月給25万円以上、時給1,500円以上など"
    },
    {
      key: "timing",
      label: "就職・転職の希望時期",
      options: ["すぐに", "3か月以内", "6か月以内", "1年以内", "良い仕事があれば", "情報収集中", "転職予定なし", "未定"]
    },
    {
      key: "consultation",
      label: "相談したいこと",
      textarea: true,
      placeholder: "キャリア相談で聞いてみたいことなど"
    }
  ];

  function renderField(f) {
    const value = state.profile[f.key] ?? "";

    let control = "";

    if (f.multiple) {
      const selected = Array.isArray(value) ? value : [];

      control = `
        <div class="checkbox-grid">
          ${f.options.map(option => `
            <label class="check-option">
              <input type="checkbox"
                data-profile="${esc(f.key)}"
                value="${esc(option)}"
                ${selected.includes(option) ? "checked" : ""}>
              <span>${esc(option)}</span>
            </label>
          `).join("")}
        </div>
      `;
    } else if (f.options) {
      control = `
        <select id="profile-${f.key}" data-profile="${esc(f.key)}">
          <option value="">選択しない</option>
          ${f.options.map(option => `
            <option value="${esc(option)}" ${value === option ? "selected" : ""}>
              ${esc(option)}
            </option>
          `).join("")}
        </select>
      `;
    } else if (f.textarea) {
      control = `
        <textarea id="profile-${f.key}"
          data-profile="${esc(f.key)}"
          maxlength="1000"
          placeholder="${esc(f.placeholder)}">${esc(value)}</textarea>
      `;
    } else {
      control = `
        <input type="text"
          id="profile-${f.key}"
          data-profile="${esc(f.key)}"
          maxlength="200"
          value="${esc(value)}"
          placeholder="${esc(f.placeholder)}">
      `;
    }

    return `
      <div class="form-group">
        <label class="field-label" ${f.multiple ? "" : `for="profile-${f.key}"`}>
          ${esc(f.label)}
          <span class="small muted">（任意）</span>
        </label>
        ${control}
      </div>
    `;
  }

  function renderProfile() {
    showView("profileView");

    const completed = tests.filter(t => state.results[t.id]).length;

    $("profileContent").innerHTML = `
      <a href="#home" class="back-link">← ホームへ</a>

      <div class="result-hero theme-strength">
        <div class="result-kicker">MY CAREER PROFILE</div>
        <h1>マイキャリアカルテ</h1>
        <p class="result-description">
          診断結果と、これからの希望をひとつにまとめる、あなた専用のキャリアカルテです。
        </p>
        <div class="chips" style="margin-top:18px">
          <span class="chip">${completed} / 4診断 完了</span>
          <span class="chip">入力内容は端末内に保存</span>
        </div>
      </div>

      ${section("自己分析の結果", `
        <div class="karte-summary">${renderSummary()}</div>
      `)}

      ${renderIntegratedSummary()}

      <div class="result-section">
        <h2>これからのキャリアについて</h2>
        <p class="muted small" style="margin-bottom:24px">
          すべて任意です。まだ分からない項目は空欄のままで大丈夫です。
          氏名・住所などの個人情報は入力しないでください。
        </p>
        ${profileFields.map(renderField).join("")}
        <div class="notice" id="profileSaveStatus">
          入力内容は変更するたびに保存されます。
        </div>
      </div>

      ${state.results.strength
        ? renderOccupations(state.results.strength)
        : ""}

      <div class="result-section">
        <h2>カルテを保存・共有する</h2>
        <p style="margin-bottom:18px">
          内容を確認してからコピーできます。運営会社へ自動送信されることはありません。
        </p>

        <textarea id="sharePreview"
          class="share-preview"
          aria-label="共有するカルテの内容"
          style="min-height:280px">${esc(profileText())}</textarea>

        <div class="button-row" style="margin-top:20px">
          ${button("カルテをコピー", "copy-profile", "", "btn-primary")}
          ${button("印刷・PDF保存", "print", "", "btn-secondary")}
        </div>
      </div>

      <div class="consultation">
        <h2>あなたのこれからを、一緒に考える。</h2>
        <p>
          沿線キャリアでは、転職予定がない方も無料でご相談いただけます。
          診断結果や将来の希望をもとに、仕事の選択肢を一緒に考えます。
        </p>

        <label class="check-option" style="margin-top:20px;background:#fff">
          <input type="checkbox" id="shareConsent">
          <span>共有する内容を確認しました。自分の意思でLINEに送信します。</span>
        </label>

        <div class="button-row">
          ${button("カルテをコピーしてLINEを開く", "share-line", "", "btn-line btn-block")}
        </div>

        <p class="small" style="margin-top:12px">
          LINEを開いた後、トーク画面にコピーした内容を貼り付けて送信してください。
        </p>
      </div>

      <div class="result-section" style="margin-top:24px">
        <h2>データの取り扱い</h2>
        <p>
          診断結果やカルテは、このブラウザ内に保存されます。
          共有操作をしない限り、診断内容は運営会社に自動送信されません。
          共用端末をご利用の場合は、利用後に保存データを削除してください。
        </p>
        <p class="small muted" style="margin-top:12px">
          ${esc(C.disclaimer)}
        </p>
        <div class="button-row" style="margin-top:18px">
          ${button("保存データをすべて削除する", "delete-all", "", "btn-ghost")}
        </div>
      </div>
    `;
  }

  function renderIntegratedSummary() {
    const strength = state.results.strength;
    const difficulty = state.results.difficulty;
    const workstyle = state.results.workstyle;
    const values = state.results.values;

    if (!strength && !difficulty && !workstyle && !values) {
      return section("あなたの特徴", `
        <p>診断を受けると、ここに結果が集約されます。すべての診断を受ける必要はありません。</p>
      `);
    }

    let html = "";

    if (strength) {
      const top = topAxes(strength.scores, 3);
      html += textBlock("自覚している強み",
        top.length ? top.map(a => a.name) : "突出した高い自己評価は見られませんでした。"
      );
    }

    if (difficulty) {
      const top = topAxes(difficulty.scores, 3);
      html += textBlock("負担を感じやすい場面",
        top.length ? top.map(a => a.name) : "特に強い負担傾向は見られませんでした。"
      );
    }

    if (workstyle) {
      html += textBlock("働き方の好み",
        workstyle.scores.map(a => `${a.name}：${workstyleLabel(a)}`)
      );
    }

    if (values) {
      html += textBlock("大切にしたい価値観",
        values.priorities.length
          ? values.priorities.map((id, i) => {
            const a = values.scores.find(x => x.id === id);
            return `${i + 1}位：${a?.name || id}`;
          })
          : "優先順位は未設定です。"
      );
    }

    html += `
      <div class="insight" style="margin-top:20px">
        <p>
          得意なことと、好きなことは必ずしも一致しません。
          強みを活かせることに加え、負担や価値観との相性も考えて仕事を選びましょう。
        </p>
      </div>
    `;

    return section("4つの視点から見たあなた", html);
  }

  /* =========================================
     TEXT EXPORT
  ========================================= */

  function resultText(id) {
    const t = getTest(id);
    const r = state.results[id];

    if (!t || !r) return "";

    const lines = [
      `【${t.title}】`,
      resultHeadline(id),
      ""
    ];

    r.scores.forEach(a => {
      if (id === "workstyle") {
        lines.push(`・${a.name}：${workstyleLabel(a)}`);
      } else {
        lines.push(`・${a.name}：${a.score === null ? "未判断" : `${a.score}/100`}`);
      }
    });

    if (id === "values" && r.priorities.length) {
      lines.push("", "〈優先順位〉");
      r.priorities.forEach((key, i) => {
        const a = r.scores.find(x => x.id === key);
        if (a) lines.push(`${i + 1}位：${a.name}`);
      });
    }

    return lines.join("\n");
  }

  function profileText() {
    const lines = [
      "【沿線キャリア マイキャリアカルテ】",
      "",
      "■自己分析結果"
    ];

    tests.forEach(t => {
      lines.push("");
      lines.push(state.results[t.id] ? resultText(t.id) : `【${t.title}】未診断`);
    });

    lines.push("", "■これからのキャリアについて");

    profileFields.forEach(f => {
      const v = state.profile[f.key];

      if (Array.isArray(v) && v.length) {
        lines.push("", `【${f.label}】`, v.join("、"));
      } else if (typeof v === "string" && v.trim()) {
        lines.push("", `【${f.label}】`, v.trim());
      }
    });

    lines.push(
      "",
      "※自己分析結果は本人の回答に基づく参考情報です。",
      "",
      C.siteName,
      C.siteUrl
    );

    return lines.join("\n");
  }

  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (e) {
      const area = document.createElement("textarea");
      area.value = text;
      area.style.position = "fixed";
      area.style.opacity = "0";
      document.body.appendChild(area);
      area.select();

      let success = false;

      try {
        success = document.execCommand("copy");
      } catch (err) {
        success = false;
      }

      area.remove();
      return success;
    }
  }

  async function copyProfile() {
    const preview = $("sharePreview");
    const text = preview ? preview.value : profileText();
    const success = await copyText(text);

    if (success) {
      toast("カルテをコピーしました。");
    } else {
      if (preview) {
        preview.focus();
        preview.select();
      }
      toast("自動コピーできませんでした。内容を手動でコピーしてください。");
    }

    return success;
  }

  async function shareLine() {
    if (!$("shareConsent")?.checked) {
      toast("共有内容を確認し、チェックを入れてください。");
      return;
    }

    const success = await copyProfile();

    if (success) {
      location.href = C.lineOfficialUrl;
    }
  }

  /* =========================================
     PROFILE AUTO SAVE
  ========================================= */

  document.addEventListener("input", event => {
    const el = event.target;
    const key = el.dataset.profile;

    if (!key) return;

    if (el.type === "checkbox") {
      const values = Array.from(
        document.querySelectorAll(`[data-profile="${key}"]:checked`)
      ).map(input => input.value);

      state.profile[key] = values;
    } else {
      state.profile[key] = el.value;
    }

    const saved = save();

    if ($("profileSaveStatus")) {
      $("profileSaveStatus").textContent = saved
        ? "入力内容を保存しました。"
        : "端末への保存ができませんでした。";
    }

    if ($("sharePreview")) {
      $("sharePreview").value = profileText();
    }

    if ($("shareConsent")) {
      $("shareConsent").checked = false;
    }
  });

  /* =========================================
     ACTION HANDLER
  ========================================= */

  document.addEventListener("click", async event => {
    const el = event.target.closest("[data-action]");
    if (!el) return;

    const action = el.dataset.action;
    const id = el.dataset.id;

    switch (action) {
      case "start":
        startTest(id);
        break;

      case "restart":
        if (confirm("最初から回答しますか？ 保存済みの診断結果は、新しい診断が完了するまで残ります。")) {
          startTest(id, true);
        }
        break;

      case "answer":
        selectAnswer(Number(id));
        break;

      case "priority":
        togglePriority(id);
        break;

      case "finish":
        finishTest();
        break;

      case "back-quiz":
        renderQuiz();
        break;

      case "result":
        go(`#result/${id}`);
        break;

      case "copy-result": {
        const success = await copyText(
          resultText(id) + "\n\n" + C.disclaimer + "\n" + C.siteUrl
        );

        toast(success
          ? "診断結果をコピーしました。"
          : "コピーできませんでした。画面上の文章を手動でコピーしてください。");
        break;
      }

      case "copy-profile":
        await copyProfile();
        break;

      case "share-line":
        await shareLine();
        break;

      case "print":
        window.print();
        break;

      case "delete-all":
        if (confirm("すべての診断結果・回答・カルテを削除します。この操作は元に戻せません。よろしいですか？")) {
          try {
            localStorage.removeItem(KEY);
            state = emptyState();
            activeTest = null;
            answers = {};
            priorities = [];
            step = 0;
            renderProfile();
            toast("保存データを削除しました。");
          } catch (e) {
            toast("保存データを削除できませんでした。");
          }
        }
        break;
    }
  });

  /* =========================================
     ROUTING
  ========================================= */

  function route() {
    const hash = location.hash.replace(/^#/, "") || "home";
    const [page, id] = hash.split("/");

    document.querySelectorAll(".mobile-nav a").forEach(a => {
      const href = a.getAttribute("href");
      a.classList.toggle("active",
        href === `#${page}` ||
        (href === "#tests" && ["test", "quiz", "result"].includes(page))
      );
    });

    switch (page) {
      case "test":
        renderIntro(id);
        break;

      case "quiz": {
        const t = getTest(id);
        if (!t) return go("#tests");

        activeTest = t;

        const p = state.progress[id] || {};
        answers = { ...(p.answers || {}) };
        priorities = [...(p.priorities || [])];
        step = Math.max(0, Math.min(
          Number.isInteger(p.step) ? p.step : 0,
          t.questions.length - 1
        ));

        renderQuiz();
        break;
      }

      case "result":
        renderResult(id);
        break;

      case "profile":
        renderProfile();
        break;

      case "home":
      case "tests":
      case "about":
      default:
        showView("homeView");
        renderHome();

        if (page === "tests" || page === "about") {
          requestAnimationFrame(() => {
            $(page)?.scrollIntoView({ behavior: "smooth" });
          });
        }
        break;
    }
  }

  window.addEventListener("hashchange", route);

  route();

})();
