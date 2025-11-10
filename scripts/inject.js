const MESSAGES_DEV = [
  "Modo foco ativado. Só papo de negócio 🚀",
  "Zona segura de produtividade. Não perturbe o dev. 💻",
  "Filtrando o caos desde 2025. 🧠",
  "Foco no trampo. Se não for cliente, nem chega perto 👀",
  "Debugando a vida enquanto você lê isso 🐞",
  "Commitando produtividade antes do café ☕",
  "Código limpo, mente limpa ✨",
  "Só mensagens aprovadas pelo linter 📝",
  "Stack overflow? Só de ideias aqui 💡",
  "Compilando café e foco ☕💻",
  "Bug? Na minha maquinha funciona 😎"
];

const MESSAGES_GESTOR = [
  "Chat liberado. O resto? Silêncio administrativo. 🧘‍♂️",
  "Conversa aprovada pela auditoria da sanidade mental. ✅",
  "Aqui o zap é trabalho, não terapia de grupo. 💼😂",
  "Apenas os escolhidos aparecem aqui 😎",
  "Mensagem segura — livre de bom dias e figurinhas suspeitas ☕🌞",
  "Relatórios, decisões e café ☕📊",
  "Agenda cheia, mas espaço para você! 🗓️",
  "Supervisão ativa, mas calma 😉",
  "Avisos importantes e nada de fofoca 🙅‍♂️",
  "Trabalho em progresso, interruptions off 🔕"
];

const MESSAGES_VENDAS = [
  "Clientes acima de tudo 💰",
  "Aqui só conversa que fecha negócio 🤝",
  "Lead aprovado, papo filtrado 🔍",
  "Mensagem segura: vendas only 🏆",
  "Pipeline limpo, foco total 🚀",
  "Prospects, follow-ups e café ☕",
  "Objetivos diários: bater meta 💸",
  "Nada de memes, só contrato 😉",
  "Venda em progresso, notifications off 🔕",
  "O zap que fecha negócio 💼"
];

// Escolha aleatória de acordo com tema
function getRandomMessage(theme = 'DEV') {
  let arr;
  switch (theme.toUpperCase()) {
    case 'GESTOR': arr = MESSAGES_GESTOR; break;
    case 'VENDAS': arr = MESSAGES_VENDAS; break;
    default: arr = MESSAGES_DEV; break;
  }
  return arr[Math.floor(Math.random() * arr.length)];
}

(function interceptNotifications() {
  const allowed = /*__ALLOWED__*/;
  const OriginalNotification = window.Notification;

  window.Notification = function (title, options) {
    const allowNotifications = window.localStorage.getItem('allowNotifications') === 'true';

    if (!allowNotifications) {
      if (!allowed.some(name => title.includes(name))) {
        console.log('[WWV] Notificação bloqueada:', title);
        return null;
      }
    }

    return new OriginalNotification(title, options);
  };

  window.Notification.prototype = OriginalNotification.prototype;
  window.Notification.permission = OriginalNotification.permission;
  window.Notification.requestPermission = OriginalNotification.requestPermission.bind(OriginalNotification);
})();

(() => {
  const allowed = /*__ALLOWED__*/;
  const config = /*__CONFIG__*/;

  function updateStartPage() {
    const target = document.querySelector("[class='xktia5q x27kpxv x135pmgq x2b8uid']");

    if (!target) return;
    if (target.dataset.customized === "true") return;

    target.innerHTML = `
      <img src="${window.appAssets.doguinho}" style="border-radius: 100px" height="120px" width="120px" alt="Whatsapp Work View" title="Whatsapp Work View" />
      <h1 class="xdhfpv1 x1iikomf xx75k7l xcytdqz x9u28bd">É o zapzap, esqueça tudo. 🤫</h1>
      <div class="x14mdic9">Agora dá pra ficar de boinha com seu chat</div>
      <div style="margin-top:12px; align-items: center; justify-content: center; display: flex;">
        <button id="openRepository" style="display: flex; align-items: center; justify-content: center; background:#25D366; border:none; color:#000; font-weight: 500; border-radius:20px; padding:8px 16px; cursor:pointer;" alt="Contribua com o projeto" title="Contribua com o projeto">
          <svg height="24" aria-hidden="true" viewBox="0 0 24 24" version="1.1" width="24" data-view-component="true" class="octicon octicon-mark-github v-align-middle">
            <path d="M12 1C5.923 1 1 5.923 1 12c0 4.867 3.149 8.979 7.521 10.436.55.096.756-.233.756-.522 0-.262-.013-1.128-.013-2.049-2.764.509-3.479-.674-3.699-1.292-.124-.317-.66-1.293-1.127-1.554-.385-.207-.936-.715-.014-.729.866-.014 1.485.797 1.691 1.128.99 1.663 2.571 1.196 3.204.907.096-.715.385-1.196.701-1.471-2.448-.275-5.005-1.224-5.005-5.432 0-1.196.426-2.186 1.128-2.956-.111-.275-.496-1.402.11-2.915 0 0 .921-.288 3.024 1.128a10.193 10.193 0 0 1 2.75-.371c.936 0 1.871.123 2.75.371 2.104-1.43 3.025-1.128 3.025-1.128.605 1.513.221 2.64.111 2.915.701.77 1.127 1.747 1.127 2.956 0 4.222-2.571 5.157-5.019 5.432.399.344.743 1.004.743 2.035 0 1.471-.014 2.654-.014 3.025 0 .289.206.632.756.522C19.851 20.979 23 16.854 23 12c0-6.077-4.922-11-11-11Z"></path>
          </svg>
          &nbsp; Acessar repositório
        </button>
      </div>
    `;
    target.dataset.customized = "true";

    target.querySelector('#openRepository').addEventListener('click', () => {
      window.electronAPI.openExternal('https://github.com/erycferreira/whatsapp-work-view');
    });
  }

  function hideUnwantedChats() {
    const list = document.querySelector("[aria-label='Lista de conversas']");
    const items = list?.querySelectorAll(":scope > [role=row]");
    if (!items) return;

    let i = 0;
    items.forEach((el) => {
      const name = el.textContent.trim();
      if (!allowed.some(n => name.includes(n))) {
        el.style.display = "none";
        el.style.transform = '';
      } else {
        el.style.display = "";
        el.style.transform = `translateY(${76 * i++}px)`;
      }
    });

    if (list) {
      list.style.willChange = "transform";
      list.style.transform = "translateZ(0)";
      requestAnimationFrame(() => {
        list.style.willChange = "";
        list.style.transform = "";
      });
    }

    const ballons = document.querySelectorAll(".message-in ._amk6");
    if (!ballons || !config?.chatColor) return;

    ballons.forEach((el) => {
      el.style.backgroundColor = config.chatColor;
    });
  }

  function updateVisibleMessages() {
    if (config.showMessages) {
      document.querySelectorAll('div._ak8k').forEach(el => {
        const message = getRandomMessage();

        if (!el.dataset.modified) {
          el.innerText = message;
          el.dataset.modified = "true";
        }
      });
    }
  }

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.addedNodes.length) {
        hideUnwantedChats();
        updateVisibleMessages();

        if (document.querySelector("[class='xktia5q x27kpxv x135pmgq x2b8uid']")) {
          updateStartPage();
        }
      }
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });

  hideUnwantedChats();
  updateStartPage();
  updateVisibleMessages();
})();
