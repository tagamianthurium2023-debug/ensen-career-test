
/* ==================================================
   沿線キャリア 自己分析ラボ
   メインシステム UI v1.1
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

  function recommended() {
    const remaining = tests.filter(t => !state.results[t.id]);
    return remaining.find(t =>
      answerCount(t, state.progress[t.id]?.answers || {}) > 0
    ) || remaining[0];
  }

  function nextLink() {
    const t = recommended();
    return t ? `#test/${t.id}` : "#profile";
  }

  function nextLabel() {
    const t = recommended();
    if (!t) return "マイキャリアカルテを完成させる →";
    return `${answerCount(t, state.progress[t.id]?.answers || {}) ? "再開" : "次の診断"}：${t.title} →`;
  }

  function journey() {
    const next = recommended();
    const names = {
      strength: "強み",
      difficulty: "苦手",
      workstyle: "働き方",
      values: "価値観"
    };

    return `
      <div class="journey-panel">
        <div class="journey-header">
          <h2>自己分析の進捗</h2>
          <span class="journey-count">
            ${tests.filter(t => state.results[t.id]).length} / ${tests.length}
          </span>
        </div>
        <div class="journey-steps">
          ${tests.map(t => `
            <a class="journey-step ${state.results[t.id] ? "is-done" : next?.id === t.id ? "is-next" : ""}"
               data-test="${esc(t.id)}"
               href="#${state.results[t.id] ? "result" : "test"}/${esc(t.id)}">
              <span class="journey-station">
                ${state.results[t.id] ? "✓" : esc(t.number)}
              </span>
              <strong>${names[t.id]}</strong>
              <span class="journey-status">
                ${state.results[t.id] ? "完了" : next?.id === t.id ? "おすすめ" : esc(statusOf(t))}
              </span>
            </a>
          `).join("")}
        </div>
        <a class="btn btn-primary" href="${nextLink()}">
          ${esc(nextLabel())}
        </a>
        <p class="small muted" style="margin-top:12px">
          好きな診断から始めてもOK！
        </p>
      </div>
    `;
  }

  function nextPanel() {
    return `
      <div class="result-next">
        <h2>${recommended() ? "次の診断へ進もう！" : "4つの診断が完了しました！"}</h2>
        <p>診断結果はマイカルテに保存されます。</p>
        ${journey()}
        <a class="btn btn-secondary" href="#profile">
          マイカルテを見る
        </a>
      </div>
    `;
  }

  function renderHome() {
    const visual = document.querySelector(".hero-visual");
    if (visual) visual.innerHTML = journey();

    const cta = document.querySelector(".hero-copy .btn-primary");

    if (cta) {
      cta.href = nextLink();
      cta.textContent = tests.some(t =>
        state.results[t.id] ||
        answerCount(t, state.progress[t.id]?.answers || {})
      ) ? nextLabel() : "無料で自己分析を始める →";
    }

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
      ${journey()}
      ${renderKarteSummary()}
    `;
  }

  /* =========================================
     KARTE SUMMARY
  ========================================= */

  function renderKarteSummary() {
    return tests.map(t => `
      <a class="karte-item"
         data-test="${esc(t.id)}"
         href="#${state.results[t.id] ? "result" : "test"}/${esc(t.id)}">
        <div class="test-icon">${icons[t.id]}</div>
        <div class="karte-item-content">
          <h3>${esc(t.title)}</h3>
          <p>${esc(t.subtitle)}</p>
        </div>
        <span class="karte-status ${state.results[t.id] ? "done" : ""}">
          ${esc(statusOf(t))}
        </span>
      </a>
    `).join("");
  }

  /* =========================================
     TEST INTRODUCTION
  ========================================= */

  function renderIntro(id) {
    const t = getTest(id);

    if (!t) {
      go("#tests");
      return;
    }

    showView("introView");
    $("introView").dataset.test = id;

    const p = state.progress[id];
    const done = state.results[id];
    const count = answerCount(t, p?.answers || {});

    $("introContent").innerHTML = `
      <a class="back-link" href="#tests">
        ← 診断一覧に戻る
      </a>

      <div class="result-hero">
        <div class="result-kicker">
          TEST ${esc(t.number)} / SELF ANALYSIS
        </div>
        <div class="test-icon">${icons[id]}</div>
        <h1 style="margin-top:18px">
          ${esc(t.title)}
        </h1>
        <p class="result-description">
          ${esc(t.subtitle)}
        </p>
        <p class="result-description">
          ${esc(t.description)}
        </p>
        <div class="chips" style="margin-top:20px">
          <span class="chip">全${t.questions.length}問</span>
          <span class="chip">約${esc(t.minutes)}分</span>
          <span class="chip">完全無料</span>
          <span class="chip">途中保存OK</span>
        </div>
      </div>

      ${section("この診断で分かること", `
        <div class="chips">
          ${t.axes.map(a => `
            <span class="chip">${esc(a.name)}</span>
          `).join("")}
        </div>
      `)}

      ${section("回答する前に", `
        <p>${esc(t.instruction)}</p>
        <div class="notice">
          正解・不正解はありません。
          理想の自分ではなく、普段の自分に近い回答を選んでください。
          判断が難しい質問は「分からない」を選択できます。
        </div>
      `)}

      ${count && !done ? `
        <div class="result-section">
          <h2>途中から再開できます</h2>
          <div class="progress-header">
            <span>${count} / ${t.questions.length}問 回答済み</span>
            <span>${Math.round(count / t.questions.length * 100)}%</span>
          </div>
          <div class="progress-track" style="margin-top:10px">
            <div class="progress-fill"
                 style="width:${count / t.questions.length * 100}%">
            </div>
          </div>
        </div>
      ` : ""}

      <div class="stack">
        ${done ? `
          ${button("診断結果を見る →", "result", id, "btn-primary btn-block btn-lg")}
          ${button("もう一度診断する", "restart", id, "btn-secondary btn-block")}
        ` : `
          ${button(
            count ? "診断を再開する →" : "診断を始める →",
            "start",
            id,
            "btn-primary btn-block btn-lg"
          )}
          ${count ? button("最初からやり直す", "restart", id, "btn-ghost btn-block") : ""}
        `}
        <a class="btn btn-ghost btn-block" href="#tests">
          他の診断を見る
        </a>
      </div>
    `;
  }

  /* =========================================
     QUIZ
  ========================================= */

  function startTest(id, reset = false) {
    const t = getTest(id);
    if (!t) return;

    if (reset) {
      if (!confirm("この診断を最初からやり直しますか？")) return;

      delete state.progress[id];
      delete state.results[id];
      save();
    }

    go(`#quiz/${id}`);
  }

  function loadQuiz(id) {
    const t = getTest(id);

    if (!t) {
      go("#tests");
      return;
    }

    activeTest = t;

    const p = state.progress[id] || {};

    answers = { ...(p.answers || {}) };
    priorities = [...(p.priorities || [])];

    const firstUnanswered = t.questions.findIndex(
      q => !hasAnswer(answers, q.id)
    );

    step = Number.isInteger(p.step)
      ? p.step
      : Math.max(0, firstUnanswered);

    step = Math.max(
      0,
      Math.min(step, t.questions.length - 1)
    );

    renderQuiz();
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
    if (!activeTest) return;

    const t = activeTest;
    const q = t.questions[step];

    showView("quizView");
    $("quizView").dataset.test = t.id;

    $("quizTitle").textContent = t.title;
    $("questionNumber").textContent =
      `QUESTION ${String(step + 1).padStart(2, "0")}`;

    $("questionText").textContent = q.text;

    const comparison = $("questionComparison");

    if (t.scale === "workstyle") {
      comparison.innerHTML = `
        <div class="grid-2" style="margin-bottom:18px">
          <div class="result-card">
            <strong>A</strong>
            <p>${esc(q.a)}</p>
          </div>
          <div class="result-card">
            <strong>B</strong>
            <p>${esc(q.b)}</p>
          </div>
        </div>
        ${q.detail ? `
          <p class="question-note">${esc(q.detail)}</p>
        ` : ""}
      `;

      renderWorkstyleSlider();

    } else {
      comparison.innerHTML = q.detail
        ? `<p class="question-note">${esc(q.detail)}</p>`
        : "";

      renderAnswerOptions();
    }

    $("prevQuestion").disabled = step === 0;

    $("nextQuestion").textContent =
      step === t.questions.length - 1
        ? t.scoring === "priority"
          ? "優先順位を選ぶ →"
          : "診断結果を見る →"
        : "次へ →";

    updateQuizProgress();
  }

  function renderAnswerOptions() {
    const t = activeTest;
    const q = t.questions[step];
    const scale = Q.scales[t.scale];

    $("answerOptions").innerHTML = scale.map((item, index) => {
      const selected =
        hasAnswer(answers, q.id) &&
        answers[q.id] === item.value;

      return `
        <button type="button"
                class="answer-option
                       ${selected ? "selected" : ""}
                       ${item.value === null ? "unknown-option" : ""}"
                data-action="answer"
                data-id="${index}"
                aria-pressed="${selected}">
          <span class="option-circle"></span>
          <span>${esc(item.label)}</span>
        </button>
      `;
    }).join("");
  }

  /* =========================================
     WORKSTYLE SLIDER
  ========================================= */

  function renderWorkstyleSlider() {
    const q = activeTest.questions[step];
    const answered = hasAnswer(answers, q.id);
    const current = answered ? answers[q.id] : undefined;

    const value = typeof current === "number"
      ? current
      : 2;

    const labels = [
      "Aの方が自分に合う",
      "どちらかといえばA",
      "どちらも同じくらい",
      "どちらかといえばB",
      "Bの方が自分に合う"
    ];

    $("answerOptions").innerHTML = `
      <div class="workstyle-slider">
        <div class="slider-labels">
          <span>Aに近い</span>
          <span>Bに近い</span>
        </div>

        <input type="range"
               id="workstyleRange"
               min="0"
               max="4"
               step="1"
               value="${value}"
               aria-label="AとBのどちらに近いか"
               aria-valuetext="${esc(labels[value])}">

        <div class="slider-ticks">
          ${["A", "ややA", "中間", "ややB", "B"].map((label, i) => `
            <button type="button"
                    class="slider-tick ${current === i ? "selected" : ""}"
                    data-action="slider-answer"
                    data-id="${i}"
                    aria-pressed="${current === i}">
              ${label}
            </button>
          `).join("")}
        </div>

        <div id="sliderValue" class="slider-value" aria-live="polite">
          ${typeof current === "number"
            ? esc(labels[current])
            : current === null
              ? "まだ分からない"
              : "スライダーを動かすか、位置を選んでください"}
        </div>

        <button type="button"
                class="answer-option unknown-option slider-unknown ${current === null ? "selected" : ""}"
                data-action="slider-unknown"
                aria-pressed="${current === null}">
          <span class="option-circle"></span>
          <span>まだ分からない</span>
        </button>
      </div>
    `;

    const range = $("workstyleRange");

    range.addEventListener("input", () => {
      setSliderAnswer(Number(range.value));
    });

    range.addEventListener("change", () => {
      setSliderAnswer(Number(range.value));
    });
  }

  function setSliderAnswer(value) {
    if (!activeTest || activeTest.scale !== "workstyle") return;

    if (value !== null &&
        (!Number.isInteger(value) || value < 0 || value > 4)) {
      return;
    }

    const q = activeTest.questions[step];

    answers[q.id] = value;

    const labels = [
      "Aの方が自分に合う",
      "どちらかといえばA",
      "どちらも同じくらい",
      "どちらかといえばB",
      "Bの方が自分に合う"
    ];

    const range = $("workstyleRange");

    if (range && value !== null) {
      range.value = value;
      range.setAttribute("aria-valuetext", labels[value]);
    }

    $("sliderValue").textContent =
      value === null ? "まだ分からない" : labels[value];

    document.querySelectorAll(".slider-tick").forEach(el => {
      const selected = value !== null &&
        Number(el.dataset.id) === value;

      el.classList.toggle("selected", selected);
      el.setAttribute("aria-pressed", String(selected));
    });

    const unknown = document.querySelector(".slider-unknown");

    if (unknown) {
      unknown.classList.toggle("selected", value === null);
      unknown.setAttribute("aria-pressed", String(value === null));
    }

    saveProgress();
    updateQuizProgress();
  }

  function selectAnswer(index) {
    if (!activeTest) return;

    const q = activeTest.questions[step];
    const item = Q.scales[activeTest.scale][index];

    if (!item) return;

    answers[q.id] = item.value;

    renderAnswerOptions();
    saveProgress();
    updateQuizProgress();
  }

  function updateQuizProgress() {
    if (!activeTest) return;

    const total = activeTest.questions.length;
    const count = answerCount(activeTest, answers);
    const percent = Math.round(count / total * 100);
    const q = activeTest.questions[step];

    $("progressText").textContent =
      `${step + 1} / ${total}問`;

    $("progressPercent").textContent =
      `${percent}% 回答済み`;

    $("progressFill").style.width = `${percent}%`;

    $("nextQuestion").disabled =
      !hasAnswer(answers, q.id);
  }

  function nextQuestion() {
    if (!activeTest) return;

    const q = activeTest.questions[step];

    if (!hasAnswer(answers, q.id)) return;

    if (step < activeTest.questions.length - 1) {
      step++;
      saveProgress();
      renderQuiz();
      return;
    }

    const unanswered = activeTest.questions.findIndex(
      item => !hasAnswer(answers, item.id)
    );

    if (unanswered >= 0) {
      step = unanswered;
      saveProgress();
      renderQuiz();
      return;
    }

    if (activeTest.scoring === "priority") {
      renderPriorities();
    } else {
      finishTest();
    }
  }

  function prevQuestion() {
    if (!activeTest || step === 0) return;

    step--;
    saveProgress();
    renderQuiz();
  }

  /* =========================================
     VALUES PRIORITY
  ========================================= */

  function renderPriorities() {
    const t = activeTest;
    if (!t) return;

    showView("introView");
    $("introView").dataset.test = t.id;

    const max = t.priorityCount || 5;

    $("introContent").innerHTML = `
      <div class="result-hero">
        <div class="result-kicker">
          TEST ${esc(t.number)} / FINAL STEP
        </div>
        <h1>大切にしたいことを選ぼう。</h1>
        <p class="result-description">
          ${esc(t.priorityInstruction || "")}
        </p>
      </div>

      <div class="result-section">
        <div class="progress-header">
          <span>選択した価値観</span>
          <span>${priorities.length} / ${max}</span>
        </div>

        <div class="notice" style="margin-bottom:20px">
          選択した順番が優先順位になります。
          選び直す場合は、もう一度押して解除してください。
          無理に${max}つ選ぶ必要はありません。
        </div>

        <div class="answer-options">
          ${t.axes.map(a => {
            const rank = priorities.indexOf(a.id);

            return `
              <button type="button"
                      class="answer-option ${rank >= 0 ? "selected" : ""}"
                      data-action="priority"
                      data-id="${esc(a.id)}"
                      aria-pressed="${rank >= 0}">
                <span class="option-circle"></span>
                <span>
                  ${rank >= 0 ? `${rank + 1}位　` : ""}
                  ${esc(a.name)}
                </span>
              </button>
            `;
          }).join("")}
        </div>
      </div>

      <div class="stack">
        ${button(
          priorities.length ? "診断結果を見る →" : "優先順位を選ばず結果を見る →",
          "finish",
          t.id,
          "btn-primary btn-block btn-lg"
        )}

        ${button(
          "← 回答に戻る",
          "back-quiz",
          t.id,
          "btn-ghost btn-block"
        )}
      </div>
    `;
  }

  function togglePriority(id) {
    if (!activeTest) return;

    if (!activeTest.axes.some(a => a.id === id)) return;

    const index = priorities.indexOf(id);

    if (index >= 0) {
      priorities.splice(index, 1);
    } else {
      if (priorities.length >= (activeTest.priorityCount || 5)) {
        toast("選択できるのは最大5つです。");
        return;
      }

      priorities.push(id);
    }

    const scroll = window.scrollY;

    saveProgress();
    renderPriorities();
    window.scrollTo(0, scroll);
  }

  /* =========================================
     SCORING
  ========================================= */

  function calculateScores(test, source) {
    return test.axes.map(axis => {
      const questions = test.questions.filter(
        q => q.axis === axis.id
      );

      const values = questions
        .map(q => source[q.id])
        .filter(v =>
          typeof v === "number" &&
          Number.isFinite(v) &&
          v >= 0 &&
          v <= 4
        );

      const minimum = test.scoring === "priority" ? 1 : 2;

      const average = values.length >= minimum
        ? values.reduce((sum, value) => sum + value, 0) / values.length
        : null;

      return {
        ...axis,
        average,
        score: average === null
          ? null
          : Math.round(average * 25),
        valid: values.length,
        total: questions.length,
        mixed: values.some(v => v <= 1) &&
               values.some(v => v >= 3)
      };
    });
  }

  function finishTest() {
    if (!activeTest) return;

    const t = activeTest;

    if (answerCount(t, answers) < t.questions.length) {
      toast("未回答の質問があります。");
      return;
    }

    state.results[t.id] = {
      id: t.id,
      scores: calculateScores(t, answers),
      answers: { ...answers },
      priorities: [...priorities],
      completedAt: new Date().toISOString()
    };

    delete state.progress[t.id];

    save();

    go(`#result/${t.id}`);
  }

  function topAxes(scores, limit = 3, minimum = 3) {
    const valid = scores
      .filter(a =>
        typeof a.average === "number" &&
        a.average >= minimum
      )
      .sort((a, b) => b.average - a.average);

    if (valid.length <= limit) return valid;

    const cutoff = valid[limit - 1].average;

    return valid.filter(a => a.average >= cutoff);
  }

  /* =========================================
     RESULT CHARTS
  ========================================= */

  function renderScoreList(scores) {
    return `
      <div class="score-list">
        ${scores.map(a => `
          <div class="score-row">
            <div class="score-head">
              <span>${esc(a.name)}</span>
              <span class="score-value">
                ${a.score === null ? "—" : a.score}
              </span>
            </div>

            <div class="score-track">
              <div class="score-fill"
                   style="width:${a.score === null ? 0 : a.score}%">
              </div>
            </div>

            <div class="score-caption">
              ${a.score === null
                ? "判断に必要な回答数が不足しています"
                : `有効回答 ${a.valid} / ${a.total}問`}
            </div>
          </div>
        `).join("")}
      </div>
    `;
  }

  function radar(scores) {
    if (!scores.length ||
        scores.some(a => a.score === null)) {
      return `
        <p class="chart-note">
          判断できない項目があるため、
          レーダーチャートの代わりに項目別スコアを表示します。
        </p>
      `;
    }

    const cx = 180;
    const cy = 180;
    const radius = 105;
    const count = scores.length;

    const point = (i, ratio) => {
      const angle = -Math.PI / 2 + Math.PI * 2 * i / count;

      return [
        cx + Math.cos(angle) * radius * ratio,
        cy + Math.sin(angle) * radius * ratio
      ];
    };

    const polygon = ratio => scores.map((a, i) =>
      point(i, ratio).join(",")
    ).join(" ");

    const result = scores.map((a, i) =>
      point(i, a.score / 100).join(",")
    ).join(" ");

    return `
      <div class="radar-wrap">
        <svg viewBox="0 0 360 360"
             role="img"
             aria-label="診断結果のレーダーチャート">

          ${[.25, .5, .75, 1].map(r => `
            <polygon points="${polygon(r)}"
                     fill="none"
                     stroke="#DCE6EB"
                     stroke-width="1"/>
          `).join("")}

          ${scores.map((a, i) => {
            const [x, y] = point(i, 1);

            return `
              <line x1="${cx}" y1="${cy}"
                    x2="${x}" y2="${y}"
                    stroke="#DCE6EB"/>
            `;
          }).join("")}

          <polygon points="${result}"
                   fill="var(--accent-light)"
                   stroke="var(--accent)"
                   stroke-width="2.5"/>

          ${scores.map((a, i) => {
            const [x, y] = point(i, a.score / 100);
            const [lx, ly] = point(i, 1.35);

            return `
              <circle cx="${x}" cy="${y}" r="4"
                      fill="var(--accent)"/>

              <text x="${lx}" y="${ly}"
                    font-size="11"
                    font-weight="700"
                    text-anchor="middle"
                    dominant-baseline="middle"
                    fill="#202B34">
                ${esc(a.short || a.name)}
              </text>
            `;
          }).join("")}
        </svg>
      </div>
    `;
  }

  function workstyleDirection(axis) {
    if (axis.average === null) {
      return {
        key: "unknown",
        label: "判断保留"
      };
    }

    if (axis.average <= 1) {
      return { key: "left", label: axis.left };
    }

    if (axis.average >= 3) {
      return { key: "right", label: axis.right };
    }

    if (axis.mixed) {
      return {
        key: "middle",
        label: "場面によって異なる傾向"
      };
    }

    if (axis.average < 1.75) {
      return {
        key: "left",
        label: `やや${axis.left}寄り`
      };
    }

    if (axis.average > 2.25) {
      return {
        key: "right",
        label: `やや${axis.right}寄り`
      };
    }

    return {
      key: "middle",
      label: "どちらも同じくらい"
    };
  }

  function renderWorkstyleScale(scores) {
    return scores.map(a => {
      const direction = workstyleDirection(a);

      return `
        <div class="scale-row">
          <div class="scale-title">
            ${esc(a.name)}
          </div>

          <div class="scale-labels">
            <span>${esc(a.left)}</span>
            <span>${esc(a.right)}</span>
          </div>

          <div class="scale-track">
            ${a.score === null ? "" : `
              <span class="scale-marker"
                    style="left:${a.score}%">
              </span>
            `}
          </div>

          <div class="slider-value">
            ${esc(direction.label)}
          </div>
        </div>
      `;
    }).join("");
  }

  /* =========================================
     RESULT DATA HELPERS
  ========================================= */

  function textBlock(value) {
    if (!value) return "";

    if (Array.isArray(value)) {
      return list(value);
    }

    if (typeof value === "string") {
      return `<p>${esc(value)}</p>`;
    }

    return "";
  }

  function detailBlock(title, value) {
    if (!value) return "";

    return `
      <div class="occupation-detail">
        <strong>${esc(title)}</strong>
        ${textBlock(value)}
      </div>
    `;
  }

  function strengthCombination(top) {
    if (top.length !== 2) return null;

    const ids = top.map(a => a.id);

    const combinations = Array.isArray(R.combinations)
      ? R.combinations
      : [];

    return combinations.find(c =>
      Array.isArray(c.axes) &&
      c.axes.length === 2 &&
      c.axes.every(id => ids.includes(id))
    ) || null;
  }

  /* =========================================
     STRENGTH RESULT
  ========================================= */

  function renderStrength(result) {
    const scores = result.scores;
    const top = topAxes(scores);
    const lower = scores.filter(a =>
      a.average !== null &&
      a.average <= 1.5
    );

    const combination = strengthCombination(top);

    let html = section("あなたの強みの傾向", `
      ${radar(scores)}
      ${renderScoreList(scores)}
      <p class="chart-note">
        スコアは自己回答をもとにした傾向であり、
        他の人との能力比較を示すものではありません。
      </p>
    `);

    html += section("あなたが活かせそうな強み", `
      ${top.length ? top.map(a => {
        const d = R.strength?.[a.id] || {};

        return `
          <article class="result-card">
            <span class="badge">スコア ${a.score}</span>
            <h3>${esc(d.title || d.name || a.name)}</h3>
            ${textBlock(d.catchcopy)}
            ${textBlock(d.description)}
            ${detailBlock("活かせそうな強み", d.strengths)}
            ${detailBlock("力を発揮しやすい環境", d.environments)}
            ${detailBlock("意識しておきたいこと", d.caution)}
            ${detailBlock("振り返りのヒント", d.check)}
            ${detailBlock("さらに考えてみたいこと", d.interview || d.question)}
          </article>
        `;
      }).join("") : `
        <p>
          今回の回答では、強く当てはまる項目が
          明確には見つかりませんでした。
          経験や環境によって強みの感じ方は変わります。
        </p>
      `}
    `);

    if (combination) {
      html += section("強みの組み合わせ", `
        <div class="insight">
          <h3>${esc(combination.title)}</h3>
          ${textBlock(combination.description)}
        </div>
      `);
    }

    if (lower.length) {
      html += section("まだ自信を持ちにくいこと", `
        <div class="chips">
          ${lower.map(a => `
            <span class="chip">${esc(a.name)}</span>
          `).join("")}
        </div>
        <p style="margin-top:16px">
          回答が低いことは、能力がないことを意味しません。
          経験や環境によって変化する可能性があります。
        </p>
      `);
    }

    return html;
  }

  /* =========================================
     DIFFICULTY RESULT
  ========================================= */

  function renderDifficulty(result) {
    const scores = result.scores;
    const high = topAxes(scores, 3, 3);

    const low = scores.filter(a =>
      a.average !== null &&
      a.average <= 1
    );

    let html = section("負担を感じやすい場面", `
      ${radar(scores)}
      ${renderScoreList(scores)}
      <p class="chart-note">
        数値が高いほど、今回の回答では
        負担を感じやすい傾向があることを示しています。
      </p>
    `);

    html += section("特に意識しておきたいこと", `
      ${high.length ? high.map(a => {
        const d = R.difficulty?.[a.id] || {};

        return `
          <article class="result-card">
            <span class="badge">スコア ${a.score}</span>
            <h3>${esc(d.title || d.name || a.name)}</h3>
            ${textBlock(d.description)}
            ${detailBlock(
              "負担を感じやすい場面",
              d.situations || d.examples || d.triggers
            )}
            ${detailBlock(
              "働きやすくするための環境",
              d.environments || d.support || d.adjustments
            )}
            ${detailBlock(
              "振り返りのヒント",
              d.interview || d.question
            )}
          </article>
        `;
      }).join("") : `
        <p>
          今回の回答では、特に負担が大きい項目は
          明確には見つかりませんでした。
          判断保留の項目については、今後の経験も踏まえて
          考えていきましょう。
        </p>
      `}
    `);

    if (low.length) {
      html += section("比較的負担を感じにくい場面", `
        <div class="chips">
          ${low.map(a => `
            <span class="chip">${esc(a.name)}</span>
          `).join("")}
        </div>
        <p style="margin-top:16px">
          負担を感じにくいことと、得意であることは
          必ずしも同じではありません。
          強みの診断結果とあわせて考えてみましょう。
        </p>
      `);
    }

    return html;
  }

  /* =========================================
     WORKSTYLE RESULT
  ========================================= */

  function renderWorkstyle(result) {
    let html = section("あなたの働き方タイプ", `
      ${renderWorkstyleScale(result.scores)}
      <p class="chart-note">
        左右に優劣はありません。
        自分が力を発揮しやすい働き方を考えるための結果です。
      </p>
    `);

    html += section("自分に合う環境を考える", `
      ${result.scores.map(a => {
        const direction = workstyleDirection(a);

        if (direction.key === "unknown") return "";

        const data = R.workstyle?.[a.id] || {};

        const d = data[direction.key] ||
          (direction.key === "middle" ? data.center : null) ||
          {};

        return `
          <article class="result-card">
            <span class="badge">${esc(direction.label)}</span>
            <h3>${esc(a.name)}</h3>
            ${typeof d === "string"
              ? textBlock(d)
              : `
                ${textBlock(d.description)}
                ${detailBlock(
                  "合いそうな環境",
                  d.environments || d.environment
                )}
                ${detailBlock(
                  "確認しておきたいこと",
                  d.check || d.caution
                )}
              `}
          </article>
        `;
      }).join("") || "<p>判断に必要な回答数が不足しています。</p>"}
    `);

    return html;
  }

  /* =========================================
     VALUES RESULT
  ========================================= */

  function renderValues(result) {
    const selected = (result.priorities || [])
      .map(id => result.scores.find(a => a.id === id))
      .filter(Boolean);

    let html = section("あなたが大切にしたい価値観", `
      ${selected.length ? selected.map((a, i) => {
        const d = R.values?.[a.id] || {};

        return `
          <article class="result-card">
            <span class="badge">優先順位 ${i + 1}位</span>
            <h3>${esc(a.name)}</h3>
            ${textBlock(d.description)}
            ${detailBlock("仕事選びで確認したいこと", d.check)}
            ${detailBlock("自分への問いかけ", d.question)}
          </article>
        `;
      }).join("") : `
        <p>
          今回は優先順位を設定していません。
          項目別の回答を参考に、大切にしたいことを
          考えてみましょう。
        </p>
      `}
    `);

    html += section("価値観ごとの重視度", `
      ${renderScoreList(result.scores)}
      <p class="chart-note">
        優先順位はご自身が選んだ順番を表示しています。
        重視度のスコアとは別のものです。
      </p>
    `);

    return html;
  }


  /* =========================================
     OCCUPATION SUGGESTIONS
  ========================================= */

  function getOccupationSuggestions(result) {
    if (!result || !Array.isArray(R.occupations)) {
      return [];
    }

    const strength = Object.fromEntries(
      result.scores.map(a => [a.id, a.average])
    );

    const difficulty = Object.fromEntries(
      (state.results.difficulty?.scores || [])
        .map(a => [a.id, a.average])
    );

    return R.occupations.map(job => {
      const weights = Object.entries(job.weights || {});

      let totalWeight = 0;
      let validWeight = 0;
      let weightedScore = 0;
      let validCount = 0;
      let highCount = 0;

      weights.forEach(([id, weight]) => {
        if (typeof weight !== "number" || weight <= 0) return;

        totalWeight += weight;

        const value = strength[id];

        if (typeof value !== "number") return;

        validWeight += weight;
        weightedScore += value * weight;
        validCount++;

        if (value >= 3) highCount++;
      });

      const coverage = totalWeight
        ? validWeight / totalWeight
        : 0;

      const average = validWeight
        ? weightedScore / validWeight
        : 0;

      const risks = (Array.isArray(job.risks) ? job.risks : [])
        .filter(id =>
          typeof difficulty[id] === "number" &&
          difficulty[id] >= 3
        )
        .map(id => {
          const axis = getTest("difficulty")?.axes.find(
            a => a.id === id
          );

          return axis?.name || id;
        });

      return {
        ...job,
        average,
        coverage,
        validCount,
        highCount,
        matchedRisks: risks
      };

    }).filter(job =>
      job.coverage >= .75 &&
      job.validCount >= 2 &&
      job.highCount >= 1 &&
      job.average >= 2.75

    ).sort((a, b) =>
      b.average - a.average

    ).slice(0, 6);
  }

  function renderOccupations(result) {
    if (!C.diagnosis.showOccupationSuggestions) return "";

    const jobs = getOccupationSuggestions(result);

    if (!jobs.length) {
      return section("これからの仕事の選択肢", `
        <p>
          今回の回答だけでは、具体的な職種の候補を
          十分に絞り込めませんでした。
        </p>
        <p>
          これまでの経験や興味、働き方の希望も
          あわせて考えてみましょう。
        </p>
        <div class="button-row" style="margin-top:20px">
          <a href="${esc(C.jobsUrl)}"
             class="btn btn-secondary">
            求人サイトを見る →
          </a>
        </div>
      `);
    }

    return section("あなたの強みを活かせそうな仕事", `
      <p style="margin-bottom:22px">
        今回の回答から、強みを活かせる可能性のある
        仕事をピックアップしました。
        今まで考えたことのなかった仕事も、
        選択肢のひとつとして見てみましょう。
      </p>

      <div class="occupation-grid">
        ${jobs.map(job => `
          <article class="occupation-card">

            <div class="occupation-category">
              ${esc(job.category || "仕事の選択肢")}
            </div>

            <h3>${esc(job.name)}</h3>

            ${textBlock(job.description)}

            ${detailBlock(
              "仕事への入り口",
              job.entry
            )}

            ${detailBlock(
              "求人を見るときのポイント",
              job.check
            )}

            ${job.matchedRisks.length ? `
              <div class="caution-box"
                   style="margin-top:16px">

                <strong>確認しておきたいこと</strong>

                <p style="margin-top:8px">
                  苦手の傾向診断では、
                  ${esc(job.matchedRisks.join("・"))}
                  に負担を感じやすい傾向があります。
                  実際の業務内容や職場環境も
                  確認してみましょう。
                </p>

              </div>
            ` : ""}

          </article>
        `).join("")}
      </div>

      <div class="notice">
        ここで紹介する職種は、
        回答内容から考えられる選択肢の一例です。
        職業適性や採用可能性を保証するものではなく、
        現在募集中の求人を示すものでもありません。
      </div>

      <div class="button-row" style="margin-top:24px">
        <a href="${esc(C.jobsUrl)}"
           class="btn btn-secondary">
          沿線キャリアで求人を探す →
        </a>
      </div>
    `);
  }

  /* =========================================
     RESULT PAGE
  ========================================= */

  function renderResult(id) {
    const t = getTest(id);
    const result = state.results[id];

    if (!t) {
      go("#tests");
      return;
    }

    if (!result) {
      go(`#test/${id}`);
      return;
    }

    showView("resultView");

    $("resultView").dataset.test = id;

    let content = "";

    switch (id) {
      case "strength":
        content = renderStrength(result);
        content += renderOccupations(result);
        break;

      case "difficulty":
        content = renderDifficulty(result);
        break;

      case "workstyle":
        content = renderWorkstyle(result);
        break;

      case "values":
        content = renderValues(result);
        break;
    }

    const completed = tests.filter(
      item => state.results[item.id]
    ).length;

    $("resultContent").innerHTML = `
      <a href="#tests" class="back-link">
        ← 診断一覧に戻る
      </a>

      <div class="result-hero">

        <div class="result-kicker">
          TEST ${esc(t.number)} / DIAGNOSIS RESULT
        </div>

        <div class="test-icon">
          ${icons[id]}
        </div>

        <h1 style="margin-top:18px">
          ${esc(t.title)}の結果
        </h1>

        <p class="result-description">
          お疲れさまでした！
          自分について、ひとつ新しい発見ができました。
        </p>

        <div class="chips" style="margin-top:18px">
          <span class="chip">診断完了 ✓</span>
          <span class="chip">
            ${completed} / ${tests.length} 診断完了
          </span>
        </div>

      </div>

      <div class="next-action">

        <h3>
          ${recommended()
            ? "次の診断も受けてみよう！"
            : "すべての診断が完了しました！"}
        </h3>

        <p>
          ${recommended()
            ? "結果は保存されています。あとからいつでも見返せます。"
            : "4つの診断結果をまとめて、自分だけのマイカルテを作りましょう。"}
        </p>

        <a href="${nextLink()}"
           class="btn btn-primary">
          ${esc(nextLabel())}
        </a>

      </div>

      ${content}

      <div class="notice">
        ${esc(C.disclaimer)}
      </div>

      ${nextPanel()}

      <div class="result-section">

        <h2>診断結果を保存する</h2>

        <p>
          診断結果は、このブラウザに保存されています。
          テキストでコピーしたり、
          印刷して残したりすることもできます。
        </p>

        <div class="button-row" style="margin-top:20px">

          ${button(
            "結果をコピーする",
            "copy-result",
            id,
            "btn-secondary"
          )}

          ${button(
            "印刷・PDF保存",
            "print",
            id,
            "btn-secondary"
          )}

          ${button(
            "もう一度診断する",
            "restart",
            id,
            "btn-ghost"
          )}

        </div>

      </div>

      <div class="consultation">

        <h2>
          診断結果を、これからのキャリアに。
        </h2>

        <p>
          自分に合う仕事が分からない。
          今の仕事を続けるか迷っている。
          そんな段階からでもご相談いただけます。
        </p>

        <div class="button-row">

          <a href="#profile" class="btn btn-line">
            マイカルテを使って相談する →
          </a>

          <a href="${esc(C.lineOfficialUrl)}"
             class="btn btn-secondary"
             target="_blank"
             rel="noopener noreferrer">
            カルテを共有せずに相談する
          </a>

        </div>

      </div>
    `;

    updateStickyNext();
  }

  /* =========================================
     PROFILE OPTIONS
  ========================================= */

  const PROFILE_OPTIONS = {

    age: [
      "18歳未満",
      "18〜19歳",
      "20〜24歳",
      "25〜29歳",
      "30〜34歳",
      "35〜39歳",
      "40〜49歳",
      "50〜59歳",
      "60歳以上",
      "回答しない"
    ],

    employment: [
      "学生",
      "正社員",
      "契約社員",
      "派遣社員",
      "パート・アルバイト",
      "業務委託・フリーランス",
      "自営業・経営者",
      "現在は働いていない",
      "その他",
      "回答しない"
    ],

    goals: [
      "収入を増やしたい",
      "スキルや経験を身につけたい",
      "将来は独立・起業したい",
      "好きなことを仕事にしたい",
      "仕事と生活を両立したい",
      "自宅の近くで穏やかに働きたい",
      "人の役に立つ仕事がしたい",
      "自分に自信を持ちたい",
      "長く続けられる仕事を見つけたい",
      "まだ決まっていない"
    ],

    area: [
      "東西線沿線で働きたい",
      "条件が合えば他のエリアでも働きたい",
      "勤務地にはあまりこだわらない",
      "在宅・リモート勤務を希望",
      "まだ決まっていない"
    ],

    desiredEmployment: [
      "正社員",
      "契約社員",
      "派遣社員",
      "パート・アルバイト",
      "業務委託",
      "こだわらない",
      "まだ決まっていない"
    ],

    salary: [
      "特に希望なし",
      "月収20万円未満",
      "月収20〜25万円",
      "月収25〜30万円",
      "月収30〜35万円",
      "月収35〜40万円",
      "月収40万円以上",
      "時給・日給で考えたい",
      "まだ決まっていない"
    ],

    timing: [
      "すぐにでも働きたい・転職したい",
      "3か月以内",
      "半年以内",
      "半年〜1年以内",
      "良い仕事があれば考えたい",
      "今は情報収集したい",
      "転職予定はない",
      "まだ決まっていない"
    ],

    consultation: [
      "自分に合う仕事を知りたい",
      "求人を紹介してほしい",
      "キャリアについて相談したい",
      "今の仕事を続けるか相談したい",
      "診断結果について相談したい",
      "まだ相談内容が決まっていない",
      "今は相談を希望しない"
    ]

  };

  /* =========================================
     PROFILE FORM HELPERS
  ========================================= */

  function selectField(key, label, options) {
    const value = state.profile[key] || "";

    const choices = [...options];

    if (value && !choices.includes(value)) {
      choices.push(value);
    }

    return `
      <div class="form-group">

        <label class="field-label"
               for="profile-${esc(key)}">
          ${esc(label)}
          <span class="small muted">（任意）</span>
        </label>

        <select id="profile-${esc(key)}"
                data-profile="${esc(key)}">

          <option value="">選択してください</option>

          ${choices.map(item => `
            <option value="${esc(item)}"
                    ${item === value ? "selected" : ""}>
              ${esc(item)}
            </option>
          `).join("")}

        </select>

      </div>
    `;
  }

  function checkboxField(key, label, options) {
    const selected = Array.isArray(state.profile[key])
      ? state.profile[key]
      : [];

    const choices = [...new Set([
      ...options,
      ...selected
    ])];

    return `
      <div class="form-group">

        <div class="field-label">
          ${esc(label)}
          <span class="small muted">
            （任意・複数選択可）
          </span>
        </div>

        <div class="checkbox-grid">

          ${choices.map(item => `
            <label class="check-option">

              <input type="checkbox"
                     data-profile="${esc(key)}"
                     value="${esc(item)}"
                     ${selected.includes(item)
                       ? "checked"
                       : ""}>

              <span>${esc(item)}</span>

            </label>
          `).join("")}

        </div>

      </div>
    `;
  }

  function textareaField(key, label, placeholder = "") {
    return `
      <div class="form-group">

        <label class="field-label"
               for="profile-${esc(key)}">
          ${esc(label)}
          <span class="small muted">（任意）</span>
        </label>

        <textarea id="profile-${esc(key)}"
                  data-profile="${esc(key)}"
                  placeholder="${esc(placeholder)}">${esc(state.profile[key] || "")}</textarea>

      </div>
    `;
  }

  /* =========================================
     RESULT TEXT
  ========================================= */

  function resultText(id) {
    const t = getTest(id);
    const result = state.results[id];

    if (!t || !result) {
      return `${t?.title || id}：未診断`;
    }

    const lines = [
      `【${t.title}】`
    ];

    if (id === "strength") {

      const top = topAxes(result.scores);

      lines.push(
        "強みの傾向：" +
        (top.length
          ? top.map(a => a.name).join("、")
          : "明確な上位項目なし・判断保留を含む")
      );

    }

    if (id === "difficulty") {

      const high = topAxes(result.scores, 3, 3);

      lines.push(
        "負担を感じやすい場面：" +
        (high.length
          ? high.map(a => a.name).join("、")
          : "明確な上位項目なし・判断保留を含む")
      );

    }

    if (id === "values") {

      const priorities = (result.priorities || [])
        .map(axisId =>
          result.scores.find(a => a.id === axisId)
        )
        .filter(Boolean);

      lines.push("大切にしたい価値観：");

      if (priorities.length) {

        priorities.forEach((a, i) => {
          lines.push(`${i + 1}位：${a.name}`);
        });

      } else {

        lines.push("優先順位は未設定");

      }

    }

    lines.push("");

    result.scores.forEach(a => {

      if (id === "workstyle") {

        lines.push(
          `・${a.name}：${workstyleDirection(a).label}`
        );

      } else {

        lines.push(
          `・${a.name}：${
            a.score === null
              ? "判断保留"
              : `${a.score}/100`
          }`
        );

      }

    });

    if (id === "strength") {

      const jobs = getOccupationSuggestions(result);

      if (jobs.length) {

        lines.push("");
        lines.push(
          "仕事の選択肢：" +
          jobs.map(job => job.name).join("、")
        );

      }

    }

    return lines.join("\n");
  }

  /* =========================================
     CAREER PROFILE TEXT
  ========================================= */

  function profileText() {
    const p = state.profile;

    const format = value => {

      if (Array.isArray(value)) {
        return value.length
          ? value.join("、")
          : "未入力";
      }

      return value || "未入力";

    };

    const lines = [
      "【沿線キャリア マイキャリアカルテ】",
      "",
      "■ 基本情報",
      `年齢層：${format(p.age)}`,
      `現在の就業状況：${format(p.employment)}`,
      "",
      "■ 自己分析の結果",
      ""
    ];

    tests.forEach(t => {
      lines.push(resultText(t.id));
      lines.push("");
    });

    lines.push(
      "■ これからのキャリア",
      `将来の希望：${format(p.goals)}`,
      `詳しい希望：${format(p.goalDetail)}`,
      `現在の悩み：${format(p.concerns)}`,
      "",
      "■ 希望条件",
      `希望エリア：${format(p.area)}`,
      `希望雇用形態：${format(p.desiredEmployment)}`,
      `希望給与：${format(p.salary)}`,
      `希望時期：${format(p.timing)}`,
      "",
      "■ 相談したいこと",
      format(p.consultation),
      "",
      "※自己回答に基づく診断結果です。",
      C.disclaimer || "",
      "",
      C.siteUrl
    );

    return lines.join("\n");
  }

  /* =========================================
     PROFILE PAGE
  ========================================= */

  function renderProfile() {
    showView("profileView");

    $("profileView").dataset.test = "strength";

    const completed = tests.filter(
      t => state.results[t.id]
    ).length;

    $("profileContent").innerHTML = `
      <a href="#home" class="back-link">
        ← ホームに戻る
      </a>

      <div class="result-hero theme-strength">

        <div class="result-kicker">
          MY CAREER PROFILE
        </div>

        <h1>マイキャリアカルテ</h1>

        <p class="result-description">
          自分の強み、苦手なこと、働き方、
          大切にしたい価値観。
          これからのキャリアを考えるための
          あなただけのカルテです。
        </p>

        <div class="chips" style="margin-top:18px">
          <span class="chip">
            ${completed} / ${tests.length} 診断完了
          </span>
          <span class="chip">登録不要</span>
          <span class="chip">端末内に保存</span>
        </div>

      </div>

      ${journey()}

      <div class="result-section">

        <h2>あなたの自己分析結果</h2>

        <div class="karte-summary">
          ${renderKarteSummary()}
        </div>

        <p class="small muted" style="margin-top:18px">
          診断名を選ぶと、詳しい結果を確認できます。
          すべての診断を受けていなくても、
          カルテの作成や相談が可能です。
        </p>

      </div>

      <div class="result-section">

        <h2>あなたについて</h2>

        <p style="margin-bottom:24px">
          回答できる項目だけ入力してください。
          すべて任意です。
        </p>

        ${selectField(
          "age",
          "年齢層",
          PROFILE_OPTIONS.age
        )}

        ${selectField(
          "employment",
          "現在の就業状況",
          PROFILE_OPTIONS.employment
        )}

      </div>

      <div class="result-section">

        <h2>どんな自分になりたい？</h2>

        <p style="margin-bottom:24px">
          仕事を通じて実現したいことや、
          これからの生活について考えてみましょう。
          まだ決まっていなくても大丈夫です。
        </p>

        ${checkboxField(
          "goals",
          "これから実現したいこと",
          PROFILE_OPTIONS.goals
        )}

        ${textareaField(
          "goalDetail",
          "将来の希望・なりたい自分",
          "例：自宅の近くで働きながら、趣味や家族との時間も大切にしたい。"
        )}

        ${textareaField(
          "concerns",
          "現在の悩みや不安",
          "例：今の仕事が自分に合っているか分からない。"
        )}

      </div>

      <div class="result-section">

        <h2>希望する働き方・条件</h2>

        <p style="margin-bottom:24px">
          現時点での希望を教えてください。
          あとから変更することもできます。
        </p>

        ${checkboxField(
          "area",
          "希望する勤務地・エリア",
          PROFILE_OPTIONS.area
        )}

        ${checkboxField(
          "desiredEmployment",
          "希望する雇用形態",
          PROFILE_OPTIONS.desiredEmployment
        )}

        ${selectField(
          "salary",
          "希望する給与",
          PROFILE_OPTIONS.salary
        )}

        ${selectField(
          "timing",
          "就職・転職の希望時期",
          PROFILE_OPTIONS.timing
        )}

      </div>

      <div class="result-section">

        <h2>相談したいこと</h2>

        ${selectField(
          "consultation",
          "現在のご希望",
          PROFILE_OPTIONS.consultation
        )}

        <p id="profileSaveStatus"
           role="status">
          ${storageAvailable
            ? "入力内容はこのブラウザに保存されます。"
            : "端末への保存ができない状態です。"}
        </p>

      </div>

      <div class="result-section">

        <h2>マイカルテの内容を確認する</h2>

        <p style="margin-bottom:18px">
          診断結果と入力内容をまとめました。
          必要に応じて文章を編集できます。
        </p>

        <textarea id="sharePreview"
                  class="share-preview"
                  aria-label="マイカルテの共有内容">${esc(profileText())}</textarea>

        <div class="button-row"
             style="margin-top:20px">

          ${button(
            "カルテをコピーする",
            "copy-profile",
            "",
            "btn-secondary"
          )}

          ${button(
            "印刷・PDF保存",
            "print",
            "",
            "btn-secondary"
          )}

        </div>

      </div>

      <div class="consultation">

        <h2>マイカルテを使って無料相談</h2>

        <p>
          自己分析の結果をもとに、
          あなたに合った仕事や
          これからのキャリアを一緒に考えます。
          転職予定がなくてもご相談いただけます。
        </p>

        <div class="notice"
             style="background:#FFFFFF;margin-bottom:20px">

          <strong>LINEでの相談方法</strong>

          <ol style="padding-left:22px">

            <li>
              上のマイカルテの内容を確認してください。
            </li>

            <li>
              下のボタンからカルテをコピーして、
              LINEを開きます。
            </li>

            <li>
              LINEのトーク画面に貼り付けて
              送信してください。
            </li>

          </ol>

          <p class="small muted" style="margin:0">
            カルテが自動で送信されることはありません。
            共有したくない情報は、
            事前に削除・編集できます。
          </p>

        </div>

        <label class="check-option"
               style="margin-bottom:18px">

          <input type="checkbox"
                 id="shareConsent">

          <span>
            カルテの共有内容を確認しました
          </span>

        </label>

        <div class="stack">

          <button type="button"
                  id="shareLineButton"
                  class="btn btn-line btn-block btn-lg"
                  data-action="share-line"
                  disabled>
            カルテをコピーしてLINEで相談する →
          </button>

          <a href="${esc(C.lineOfficialUrl)}"
             class="btn btn-secondary btn-block"
             target="_blank"
             rel="noopener noreferrer">
            カルテを共有せずに相談する
          </a>

        </div>

        <p class="small muted"
           style="margin:18px 0 0">
          相談は無料です。
          求人への応募や転職を強制することはありません。
        </p>

      </div>

      <div class="result-section"
           style="margin-top:24px">

        <h2>データの保存について</h2>

        <p>
          診断結果とカルテの入力内容は、
          ご利用中のブラウザに保存されます。
          このサイトから運営者へ自動送信することはありません。
        </p>

        <p>
          ブラウザのデータを削除した場合や、
          別の端末・ブラウザを利用した場合は、
          保存内容を引き継げないことがあります。
          共用端末での利用にもご注意ください。
        </p>

        <div class="danger-zone"
             style="margin-top:20px">

          <strong>保存データの削除</strong>

          <p style="margin:10px 0 16px">
            すべての診断結果・途中回答・カルテの
            入力内容を、このブラウザから削除できます。
            削除後は元に戻せません。
          </p>

          ${button(
            "保存データをすべて削除する",
            "delete-all",
            "",
            "btn-ghost"
          )}

        </div>

      </div>

      <div class="notice">
        ${esc(C.disclaimer)}
      </div>
    `;

    updateStickyNext();
  }

  /* =========================================
     PROFILE SAVE
  ========================================= */

  function resetShareConsent() {
    const consent = $("shareConsent");
    const shareButton = $("shareLineButton");

    if (consent) consent.checked = false;
    if (shareButton) shareButton.disabled = true;
  }

  function updateProfileField(el) {
    const key = el.dataset.profile;

    if (!key) return;

    if (el.type === "checkbox") {

      const selected = [
        ...document.querySelectorAll(
          "[data-profile]"
        )
      ].filter(item =>
        item.dataset.profile === key &&
        item.type === "checkbox" &&
        item.checked
      ).map(item => item.value);

      state.profile[key] = selected;

    } else {

      state.profile[key] = el.value;

    }

    const saved = save();

    const status = $("profileSaveStatus");

    if (status) {

      status.textContent = saved
        ? "✓ 入力内容を保存しました"
        : "端末への保存ができませんでした";

    }

    const preview = $("sharePreview");

    if (preview) {
      preview.value = profileText();
    }

    resetShareConsent();
  }

  /* =========================================
     COPY
  ========================================= */

  async function copyText(value) {
    const text = String(value || "");

    if (!text.trim()) {
      toast("コピーする内容がありません。");
      return false;
    }

    try {

      if (navigator.clipboard &&
          window.isSecureContext) {

        await navigator.clipboard.writeText(text);

        return true;

      }

    } catch (e) {
      console.warn(e);
    }

    const textarea = document.createElement("textarea");

    textarea.value = text;

    textarea.setAttribute("readonly", "");

    textarea.style.position = "fixed";
    textarea.style.top = "0";
    textarea.style.left = "0";
    textarea.style.opacity = "0";
    textarea.style.pointerEvents = "none";

    document.body.appendChild(textarea);

    textarea.focus();
    textarea.select();

    textarea.setSelectionRange(
      0,
      textarea.value.length
    );

    let success = false;

    try {

      success = document.execCommand("copy");

    } catch (e) {

      console.warn(e);

    } finally {

      textarea.remove();

    }

    return success;
  }

  async function copyResult(id) {
    if (!state.results[id]) return;

    const text = [
      "【沿線キャリア 自己分析ラボ】",
      "",
      resultText(id),
      "",
      C.disclaimer || "",
      "",
      C.siteUrl
    ].join("\n");

    const copied = await copyText(text);

    toast(
      copied
        ? "診断結果をコピーしました！"
        : "コピーできませんでした。ブラウザの設定をご確認ください。"
    );
  }

  async function copyProfile() {
    const preview = $("sharePreview");

    const text = preview
      ? preview.value
      : profileText();

    const copied = await copyText(text);

    if (copied) {

      toast("マイカルテをコピーしました！");

    } else {

      if (preview) {

        preview.focus();
        preview.select();

      }

      toast(
        "自動コピーできませんでした。文章を選択してコピーしてください。"
      );

    }

    return copied;
  }

  async function shareLine() {
    const consent = $("shareConsent");
    const shareButton = $("shareLineButton");
    const preview = $("sharePreview");

    if (!consent?.checked) {

      toast("カルテの共有内容をご確認ください。");
      return;

    }

    const text = preview
      ? preview.value
      : profileText();

    if (!text.trim()) {

      toast("共有するカルテの内容がありません。");
      return;

    }

    if (shareButton) shareButton.disabled = true;

    const copied = await copyText(text);

    if (!copied) {

      if (preview) {

        preview.focus();
        preview.select();

      }

      toast(
        "コピーできませんでした。文章を手動でコピーしてください。"
      );

      if (shareButton) {

        shareButton.disabled = !consent.checked;

      }

      return;

    }

    if (!consent.checked ||
        (preview && preview.value !== text)) {

      toast("共有内容をもう一度ご確認ください。");

      resetShareConsent();

      return;

    }

    toast(
      "カルテをコピーしました。LINEのトーク画面に貼り付けてください。"
    );

    window.location.href = C.lineOfficialUrl;
  }

  /* =========================================
     DELETE DATA
  ========================================= */

  function deleteAllData() {
    const confirmed = confirm(
      "すべての診断結果・途中回答・マイカルテの入力内容を削除しますか？\n\n削除したデータは元に戻せません。"
    );

    if (!confirmed) return;

    try {

      localStorage.removeItem(KEY);

    } catch (e) {

      toast(
        "保存データを削除できませんでした。ブラウザの設定をご確認ください。"
      );

      return;

    }

    state = emptyState();

    activeTest = null;
    answers = {};
    priorities = [];
    step = 0;

    renderProfile();

    toast("保存データを削除しました。");
  }

  /* =========================================
     STICKY NEXT ACTION
  ========================================= */

  function updateStickyNext() {
    let el = $("stickyNext");

    if (!el) {

      el = document.createElement("div");

      el.id = "stickyNext";
      el.className = "sticky-next";
      el.hidden = true;

      document.body.appendChild(el);

    }

    const hash = location.hash || "#home";

    const isResult = hash.startsWith("#result/");

    const visible = isResult &&
      !$("resultView").hidden;

    el.hidden = !visible;

    document.body.classList.toggle(
      "has-sticky-next",
      visible
    );

    if (visible) {

      el.innerHTML = `
        <a class="btn btn-primary"
           href="${nextLink()}">
          ${esc(nextLabel())}
        </a>
      `;

    } else {

      el.innerHTML = "";

    }
  }

  /* =========================================
     ACTIVE NAVIGATION
  ========================================= */

  function updateNavigation() {
    const hash = location.hash || "#home";

    let current = "#home";

    if (hash === "#profile") {

      current = "#profile";

    } else if (
      hash === "#tests" ||
      hash.startsWith("#test/") ||
      hash.startsWith("#quiz/") ||
      hash.startsWith("#result/")
    ) {

      current = "#tests";

    } else if (hash === "#about") {

      current = "#about";

    }

    document.querySelectorAll(
      ".header-nav a, .mobile-nav a"
    ).forEach(link => {

      const active =
        link.getAttribute("href") === current;

      link.classList.toggle("active", active);

      if (active) {

        link.setAttribute("aria-current", "page");

      } else {

        link.removeAttribute("aria-current");

      }

    });
  }

  /* =========================================
     ROUTING
  ========================================= */

  function route() {
    const hash = location.hash || "#home";

    const parts = hash.slice(1).split("/");

    const page = parts[0];
    const id = parts[1];

    switch (page) {

      case "home":
      case "tests":
      case "about":

        showView("homeView");

        renderHome();

        if (page !== "home") {

          requestAnimationFrame(() => {

            const target = $(page);

            if (target &&
                location.hash === hash) {

              target.scrollIntoView({
                behavior: "auto",
                block: "start"
              });

            }

          });

        }

        break;

      case "test":

        renderIntro(id);
        break;

      case "quiz":

        loadQuiz(id);
        break;

      case "result":

        renderResult(id);
        break;

      case "profile":

        renderProfile();
        break;

      default:

        go("#home");
        return;

    }

    updateNavigation();
    updateStickyNext();
  }

  /* =========================================
     EVENT DELEGATION
  ========================================= */

  document.addEventListener("click", event => {

    const el = event.target.closest("[data-action]");

    if (!el || el.disabled) return;

    const action = el.dataset.action;
    const id = el.dataset.id || "";

    switch (action) {

      case "start":

        startTest(id);
        break;

      case "restart":

        startTest(id, true);
        break;

      case "answer":

        selectAnswer(Number(id));
        break;

      case "slider-answer":

        setSliderAnswer(Number(id));
        break;

      case "slider-unknown":

        setSliderAnswer(null);
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

      case "copy-result":

        copyResult(id);
        break;

      case "copy-profile":

        copyProfile();
        break;

      case "share-line":

        shareLine();
        break;

      case "print":

        window.print();
        break;

      case "delete-all":

        deleteAllData();
        break;

      case "recommended":

        go(nextLink());
        break;

    }

  });

  document.addEventListener("input", event => {

    const el = event.target;

    if (el.id === "sharePreview") {

      resetShareConsent();
      return;

    }

    if (
      el.dataset.profile &&
      el.type !== "checkbox" &&
      el.tagName !== "SELECT"
    ) {

      updateProfileField(el);

    }

  });

  document.addEventListener("change", event => {

    const el = event.target;

    if (el.id === "shareConsent") {

      const shareButton = $("shareLineButton");

      if (shareButton) {

        shareButton.disabled = !el.checked;

      }

      return;

    }

    if (
      el.dataset.profile &&
      (
        el.type === "checkbox" ||
        el.tagName === "SELECT"
      )
    ) {

      updateProfileField(el);

    }

  });

  $("nextQuestion")?.addEventListener(
    "click",
    nextQuestion
  );

  $("prevQuestion")?.addEventListener(
    "click",
    prevQuestion
  );

  window.addEventListener(
    "hashchange",
    route
  );

  /* =========================================
     INITIALIZE
  ========================================= */

  route();

})();
