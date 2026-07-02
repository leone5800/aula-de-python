/* ============================================================
   Estado global
============================================================ */
let pyodide = null;
let pyReady = false;
let currentIndex = 0;
const completed = new Set(); // ids de módulos concluídos

/* ============================================================
   Carregamento do Pyodide (Python no navegador)
============================================================ */
async function initPyodide() {
  const dot = document.getElementById("pyDot");
  const text = document.getElementById("pyStatusText");
  try {
    pyodide = await loadPyodide();
    pyReady = true;
    dot.classList.add("ready");
    text.textContent = "Python pronto";
    // habilita todos os botões de executar
    document.querySelectorAll(".btn-run").forEach((b) => (b.disabled = false));
  } catch (e) {
    dot.classList.add("error");
    text.textContent = "Erro ao carregar Python";
    console.error("[v0] Falha ao carregar Pyodide:", e);
  }
}

/* Executa código Python capturando stdout e erros.
   Retorna { output, isError }. */
async function runPython(code) {
  if (!pyReady) return { output: "Python ainda está carregando, aguarde...", isError: true };
  try {
    // Redireciona stdout/stderr para capturar prints
    pyodide.runPython(`
import sys, io
sys.stdout = io.StringIO()
sys.stderr = io.StringIO()
`);
    await pyodide.runPythonAsync(code);
    const out = pyodide.runPython("sys.stdout.getvalue()");
    return { output: out, isError: false };
  } catch (err) {
    // Extrai a mensagem de erro mais relevante
    const msg = String(err.message || err);
    const lines = msg.trim().split("\n");
    const relevant = lines.slice(-3).join("\n");
    return { output: relevant, isError: true };
  }
}

/* ============================================================
   Utilidades
============================================================ */
function esc(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function normalize(str) {
  return String(str).replace(/\r\n/g, "\n").replace(/[ \t]+$/gm, "").trim();
}

let uid = 0;
function nextId() {
  uid += 1;
  return "el" + uid;
}

/* ============================================================
   Renderização da navegação lateral
============================================================ */
function renderNav() {
  const nav = document.getElementById("moduleNav");
  nav.innerHTML = "";
  window.CURSO.forEach((mod, i) => {
    const btn = document.createElement("button");
    btn.className = "nav-item" + (i === currentIndex ? " active" : "") + (completed.has(mod.id) ? " done" : "");
    btn.innerHTML = `
      <span class="nav-num">${completed.has(mod.id) ? "✓" : i + 1}</span>
      <span class="nav-text">${mod.titulo}</span>
      <span class="nav-level">${mod.nivel}</span>`;
    btn.addEventListener("click", () => {
      currentIndex = i;
      renderNav();
      renderLesson();
      closeSidebar();
      document.getElementById("content").focus();
    });
    nav.appendChild(btn);
  });
  updateProgress();
}

function updateProgress() {
  const pct = Math.round((completed.size / window.CURSO.length) * 100);
  document.getElementById("progressFill").style.width = pct + "%";
  document.getElementById("progressPct").textContent = pct + "%";
}

/* ============================================================
   Componentes de bloco (exemplo, quiz, complete, desafio)
============================================================ */

// Bloco de exemplo: código somente leitura + botão executar
function buildExemplo(bloco) {
  const card = document.createElement("div");
  card.className = "card";
  const outId = nextId();
  card.innerHTML = `
    <h3><span class="tag info">Exemplo</span> ${bloco.titulo}</h3>
    <div class="runner">
      <div class="runner-bar">
        <div class="dots"><span></span><span></span><span></span></div>
        <span class="file">exemplo.py</span>
      </div>
      <pre class="code-view">${esc(bloco.codigo)}</pre>
      <div class="runner-actions">
        <button class="btn btn-run" ${pyReady ? "" : "disabled"}>▶ Executar</button>
      </div>
      <div class="output" id="${outId}"></div>
    </div>
    <p style="margin-top:14px">${bloco.explicacao}</p>`;
  const runBtn = card.querySelector(".btn-run");
  runBtn.addEventListener("click", () => execute(bloco.codigo, outId, runBtn));
  return card;
}

// Bloco quiz de múltipla escolha
function buildQuiz(bloco) {
  const card = document.createElement("div");
  card.className = "card";
  const name = nextId();
  const optionsHtml = bloco.opcoes
    .map(
      (op, idx) => `
      <label class="quiz-opt" data-idx="${idx}">
        <input type="radio" name="${name}" value="${idx}" />
        <span>${op}</span>
      </label>`
    )
    .join("");
  card.innerHTML = `
    <h3><span class="tag quiz">Quiz</span> Teste seu conhecimento</h3>
    <p class="quiz-q">${bloco.pergunta}</p>
    <div class="quiz-options">${optionsHtml}</div>
    <div class="quiz-feedback"></div>`;

  const feedback = card.querySelector(".quiz-feedback");
  const opts = card.querySelectorAll(".quiz-opt");
  let answered = false;

  opts.forEach((opt) => {
    opt.addEventListener("click", () => {
      if (answered) return;
      answered = true;
      const chosen = Number(opt.dataset.idx);
      opts.forEach((o) => {
        const i = Number(o.dataset.idx);
        if (i === bloco.correta) o.classList.add("correct");
        if (i === chosen && chosen !== bloco.correta) o.classList.add("wrong");
      });
      if (chosen === bloco.correta) {
        feedback.className = "quiz-feedback correct";
        feedback.innerHTML = "✓ Correto! " + bloco.explicacao;
      } else {
        feedback.className = "quiz-feedback wrong";
        feedback.innerHTML = "✗ Não foi dessa vez. " + bloco.explicacao;
      }
    });
  });
  return card;
}

// Bloco "complete o código" e "desafio" compartilham o editor
function buildEditavel(bloco, tipo) {
  const card = document.createElement("div");
  card.className = "card";
  const outId = nextId();
  const solId = nextId();
  const fbId = nextId();
  const isDesafio = tipo === "desafio";
  const tagClass = isDesafio ? "challenge" : "fill";
  const tagLabel = isDesafio ? "Desafio" : "Complete o código";

  card.innerHTML = `
    <h3><span class="tag ${tagClass}">${tagLabel}</span></h3>
    <p>${bloco.enunciado}</p>
    ${bloco.dica ? `<p class="fill-hint">💡 Dica: ${bloco.dica}</p>` : ""}
    <div class="runner">
      <div class="runner-bar">
        <div class="dots"><span></span><span></span><span></span></div>
        <span class="file">${isDesafio ? "desafio" : "exercicio"}.py</span>
      </div>
      <textarea class="code-area" spellcheck="false" rows="6"></textarea>
      <div class="runner-actions">
        <button class="btn btn-run" ${pyReady ? "" : "disabled"}>▶ Executar</button>
        <button class="btn btn-primary btn-check">Verificar</button>
        <button class="btn btn-ghost btn-reset">↺ Resetar</button>
        <button class="btn btn-ghost btn-sol">Ver solução</button>
      </div>
      <div class="output" id="${outId}"></div>
    </div>
    <div class="feedback-line" id="${fbId}"></div>
    <div class="solution" id="${solId}">
      <h4>Solução sugerida</h4>
      <pre class="code-view">${esc(bloco.solucao)}</pre>
    </div>`;

  const textarea = card.querySelector(".code-area");
  textarea.value = bloco.codigoInicial || "";

  // Tab insere indentação em vez de mudar de foco
  textarea.addEventListener("keydown", (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      textarea.value = textarea.value.slice(0, start) + "    " + textarea.value.slice(end);
      textarea.selectionStart = textarea.selectionEnd = start + 4;
    }
  });

  const runBtn = card.querySelector(".btn-run");
  const checkBtn = card.querySelector(".btn-check");
  const resetBtn = card.querySelector(".btn-reset");
  const solBtn = card.querySelector(".btn-sol");
  const fb = card.querySelector("#" + fbId);
  const sol = card.querySelector("#" + solId);

  runBtn.addEventListener("click", () => execute(textarea.value, outId, runBtn));

  checkBtn.addEventListener("click", async () => {
    const result = await execute(textarea.value, outId, checkBtn);
    if (result.isError) {
      fb.className = "feedback-line err";
      fb.textContent = "Seu código gerou um erro. Corrija e tente de novo.";
      return;
    }
    // Se há saída esperada, compara. Senão, apenas confirma execução.
    if (bloco.saidaEsperada != null) {
      if (normalize(result.output) === normalize(bloco.saidaEsperada)) {
        fb.className = "feedback-line ok";
        fb.textContent = "✓ Perfeito! A saída está exatamente como o esperado.";
        markCompleted();
      } else {
        fb.className = "feedback-line err";
        fb.innerHTML = `✗ Ainda não. Esperado:<br><code class="inline">${esc(normalize(bloco.saidaEsperada)).replace(/\n/g, "<br>")}</code>`;
      }
    } else {
      fb.className = "feedback-line ok";
      fb.textContent = "✓ Código executado! (Desafio livre — confira se a saída faz sentido.)";
      markCompleted();
    }
  });

  resetBtn.addEventListener("click", () => {
    textarea.value = bloco.codigoInicial || "";
    document.getElementById(outId).innerHTML = "";
    fb.textContent = "";
    fb.className = "feedback-line";
  });

  solBtn.addEventListener("click", () => {
    sol.classList.toggle("show");
    solBtn.textContent = sol.classList.contains("show") ? "Ocultar solução" : "Ver solução";
  });

  return card;
}

// Marca o módulo atual como concluído
function markCompleted() {
  const mod = window.CURSO[currentIndex];
  if (!completed.has(mod.id)) {
    completed.add(mod.id);
    renderNav();
  }
}

/* Executa código e mostra o resultado numa área de saída */
async function execute(code, outId, btn) {
  const out = document.getElementById(outId);
  const original = btn.textContent;
  btn.disabled = true;
  btn.textContent = "Executando...";
  out.innerHTML = "";
  const result = await runPython(code);
  btn.disabled = false;
  btn.textContent = original;
  if (result.isError) {
    out.innerHTML = `<span class="err">${esc(result.output)}</span>`;
  } else {
    out.innerHTML = result.output
      ? `<span class="ok">${esc(result.output)}</span>`
      : `<span style="color:var(--muted)">(sem saída — talvez falte um print?)</span>`;
  }
  return result;
}

/* ============================================================
   Renderização da aula atual
============================================================ */
function renderLesson() {
  const mod = window.CURSO[currentIndex];
  const content = document.getElementById("content");
  content.innerHTML = "";

  const head = document.createElement("div");
  head.className = "lesson-head";
  head.innerHTML = `
    <div class="lesson-eyebrow">Aula ${currentIndex + 1} · ${mod.nivel}</div>
    <h2 class="lesson-title">${mod.titulo}</h2>
    <p class="lesson-intro">${mod.intro}</p>`;
  content.appendChild(head);

  mod.blocos.forEach((bloco) => {
    if (bloco.tipo === "texto") {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `<h3><span class="tag info">Explicação</span> Conceito</h3>${bloco.html}`;
      content.appendChild(card);
    } else if (bloco.tipo === "exemplo") {
      content.appendChild(buildExemplo(bloco));
    } else if (bloco.tipo === "quiz") {
      content.appendChild(buildQuiz(bloco));
    } else if (bloco.tipo === "complete") {
      content.appendChild(buildEditavel(bloco, "complete"));
    } else if (bloco.tipo === "desafio") {
      content.appendChild(buildEditavel(bloco, "desafio"));
    }
  });

  // Navegação anterior/próxima
  const footer = document.createElement("div");
  footer.className = "lesson-footer";
  const prevBtn = document.createElement("button");
  prevBtn.className = "btn";
  prevBtn.innerHTML = "← Anterior";
  prevBtn.disabled = currentIndex === 0;
  prevBtn.addEventListener("click", () => goTo(currentIndex - 1));

  const nextBtn = document.createElement("button");
  nextBtn.className = "btn btn-primary";
  nextBtn.innerHTML = currentIndex === window.CURSO.length - 1 ? "Concluir ✓" : "Próxima →";
  nextBtn.addEventListener("click", () => {
    markCompleted();
    if (currentIndex < window.CURSO.length - 1) goTo(currentIndex + 1);
    else renderNav();
  });

  footer.appendChild(prevBtn);
  footer.appendChild(nextBtn);
  content.appendChild(footer);

  content.scrollTop = 0;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function goTo(i) {
  currentIndex = Math.max(0, Math.min(window.CURSO.length - 1, i));
  renderNav();
  renderLesson();
}

/* ============================================================
   Menu mobile
============================================================ */
function openSidebar() {
  document.getElementById("sidebar").classList.add("open");
  document.getElementById("sidebarOverlay").hidden = false;
  document.getElementById("menuToggle").setAttribute("aria-expanded", "true");
}
function closeSidebar() {
  document.getElementById("sidebar").classList.remove("open");
  document.getElementById("sidebarOverlay").hidden = true;
  document.getElementById("menuToggle").setAttribute("aria-expanded", "false");
}

/* ============================================================
   Inicialização
============================================================ */
function init() {
  renderNav();
  renderLesson();

  const toggle = document.getElementById("menuToggle");
  toggle.addEventListener("click", () => {
    const isOpen = document.getElementById("sidebar").classList.contains("open");
    if (isOpen) closeSidebar();
    else openSidebar();
  });
  document.getElementById("sidebarOverlay").addEventListener("click", closeSidebar);

  initPyodide();
}

document.addEventListener("DOMContentLoaded", init);
