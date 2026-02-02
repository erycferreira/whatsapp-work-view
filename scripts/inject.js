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

const css = `
  .blur-overlay::before {
    content: "";
    position: absolute;
    inset: 0;
    backdrop-filter: blur(9px);
    background: rgba(255,255,255,0.02);
    pointer-events: none;
    transition: backdrop-filter .15s linear;
    z-index: 500;
    border-radius: 8px;
  }

  .blur-overlay:hover::before {
    backdrop-filter: blur(0px);
  }
`;

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
    if (!document.getElementById('blur-style')) {
      const style = document.createElement('style');
      style.id = 'blur-style';
      style.textContent = css;
      document.head.appendChild(style);
    }

    const target = document.querySelector("[class='x1rjt51p x16w0wmm x1g83kfv x3qq2k7 x2x8art x1qor8vf xl7twdi xyo0t3i xvg22vi xb0esv5 x98l61r xviac27 x1ua1l7f xlese2p x1j3ira4 xrdqr27 x9f619 xg7h5cd x78zum5 xdt5ytf x6s0dn4']");

    if (!target) return;
    if (target.dataset.customized === "true") return;

    const homeTitles = config?.homeTitles?.split('|');

    target.innerHTML = `
      <img src="${window.appAssets.doguinho}" style="border-radius: 100px" height="120px" width="120px" alt="Whatsapp Work View" title="Whatsapp Work View" />
      <div class="x78zum5 xdt5ytf x1qvou4u x1s70e7g">
        <span
          class="x140p0ai x1gufx9m x1s928wv xhkezso x1gmr53x x1cpjm7i x1fgarty x1943h6x x193iq5w xeuugli x13faqbe x1vvkbs x1lliihq x1fj9vlw x14ug900 x1hx0egp x1aueamr xjb2p0i xo1l8bm xladpa3 x1ic7a3i"
          style="--x-fontSize: 22px; --x-lineHeight: 15.6406px; --x-8dd7yt: -0.0137em; --x-hxtmnb: 0.0137em;">
          ${homeTitles[0] || 'WWV Para Windows'}
        </span>
        <span
          class="x140p0ai x1gufx9m x1s928wv xhkezso x1gmr53x x1cpjm7i x1fgarty x1943h6x x193iq5w xeuugli x13faqbe x1vvkbs x1lliihq x1fj9vlw xhslqc4 x1hx0egp x1f6kntn xjb2p0i x8r4c90 xo1l8bm x1ic7a3i x12xpedu"
          style="--x-fontSize: 14px; --x-lineHeight: 9.9531px; --x-8dd7yt: -0.0137em; --x-hxtmnb: 0.0137em;">
          ${homeTitles[1] || 'Whatsapp Work View, você mantem a privacidade dos seus chat.'}
        </span>
      </div>
      <div style="margin-top:12px; align-items: center; justify-content: center; display: flex;">
        <button id="openRepository" 
         style="display: flex; align-items: center; justify-content: center;"
         class="html-button xdj266r x14z9mp xat24cr x1lziwak xexx8yu x18d9i69 x178xt8z x1lun4ml xso031l xpilrb4 x1n2onr6 x1ejq31n x18oe1m7 x1sy0etr xstzfhl x1so62im x1ja2u2z x1ypdohk x1s928wv x1j6awrg x4eaejv x1wsn0xg x1r0yslu x2q1x1w xapdjt xr6f91l x5rv0tg x1akc3lz xikp0eg x1xl5mkn x1mfml39 x1l5mzlr xgmdoj8 x1f1wgk5 x1x3ic1u x1abdmlv xk4n5i7 x1wjp2x xtnn1bt x9v5kkp xmw7ebm xrdum7p x3oybdh x6nhntm x2lah0s xeq5yr9 x1lliihq xk8lq53 x9f619 xt8t1vi x1xc408v x129tdwq x15urzxu x10w6t97 xdx6fka xvtqlqk"
         alt="Contribua com o projeto" title="Contribua com o projeto">
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

    items.forEach((el) => {
      const name = el.textContent.trim();
      if (!allowed.some(n => name.includes(n))) {
        if (!el.classList.contains('blur-overlay')) {
          el.classList.add('blur-overlay');
        }
      }
    });

    const ballons = document.querySelectorAll(".message-in ._amk6");
    const optBallons = document.querySelectorAll(".message-in .x1n92vqa");
    if (!ballons || !config?.chatColor) return;

    const chatColor = config.chatColor.split('|');
    if (chatColor?.length >= 2) {
      ballons.forEach((el) => {
        el.style.backgroundColor = chatColor[0];
        el.style.color = chatColor[1];
      });

      optBallons.forEach((el) => {
        el.style.background = `radial-gradient(at top right, rgba(${chatColor[0]}, 1) 60%, rgba(var(--WDS-systems-bubble-surface-incoming-RGB), 0) 80%)`
      });
    }
  }

  function updateVisibleMessages() {
    if (config.showMessages) {
      document.querySelectorAll('div._ak72 false false false _ak73 _asiw _ap1- _ap1_').forEach(el => {
        const message = getRandomMessage();

        if (!el.dataset.modified) {
          el.innerText = message;
          el.dataset.modified = "true";
        }
      });
    }
  }

  function blurMessages() {
    const main = document.querySelector('#main');
    const header = main?.querySelector('header');

    if (!main || !header) return;

    const headerName = header.textContent.trim();
    const shouldBlur = !allowed.some(n => headerName.includes(n));

    if (shouldBlur) {
      main.querySelectorAll('[role="row"] .focusable-list-item ._amk4').forEach((el) => {
        el.classList.add('blur-overlay');
      });
    }
  }

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.addedNodes.length) {
        hideUnwantedChats();
        updateVisibleMessages();
        blurMessages();

        if (document.querySelector("[class='x1rjt51p x16w0wmm x1g83kfv x3qq2k7 x2x8art x1qor8vf xl7twdi xyo0t3i xvg22vi xb0esv5 x98l61r xviac27 x1ua1l7f xlese2p x1j3ira4 xrdqr27 x9f619 xg7h5cd x78zum5 xdt5ytf x6s0dn4']")) {
          setTimeout(() => updateStartPage(), 50);
        }
      }
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });

  hideUnwantedChats();
  updateStartPage();
  updateVisibleMessages();
  blurMessages();
})();
