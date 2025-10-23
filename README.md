# 💬 WhatsApp Work View (WWV)

Um aplicativo **Electron** que permite visualizar **apenas conversas de trabalho** no **WhatsApp Web**, com recursos extras como mensagens personalizadas, foco automático e bloqueio de distrações.

Desenvolvido para profissionais que usam o WhatsApp no ambiente de trabalho e desejam manter **foco e privacidade**, sem misturar chats pessoais.

---

## 🚀 Recursos

✅ **Filtro de conversas**
- Exibe apenas os contatos configurados como permitidos.  
- Oculta completamente todos os outros chats da lista.

✅ **Mensagens personalizadas**
- Substitui mensagens visíveis por textos neutros ou motivacionais.
- Pode ser ativado ou desativado via configurações.

✅ **Notificações controladas**
- Possibilidade de habilitar ou desabilitar notificações nativas.

✅ **Persistência com SQLite**
- Todas as configurações são armazenadas localmente em banco SQLite,  
  garantindo segurança e funcionamento offline.

---

## 🧱 Arquitetura

```
📦 projeto
├── main.js               # Processo principal do Electron
├── preload.js            # Ponte segura entre o front e o main
├── scripts/
│   └── inject.js         # Script injetado no WhatsApp Web
├── src/
│   └── db.js             # Inicialização e conexão SQLite
├── ui/
│   └── settings.html     # Tela de configuração do usuário
├── assets/
│   └── doguinho.gif      # Arquivo  de asset atualmente exibido na tela inicial
└── package.json
```

---

## ⚙️ Tecnologias

- [Electron](https://www.electronjs.org/)
- [Better-SQLite3](https://github.com/WiseLibs/better-sqlite3)
- [Node.js](https://nodejs.org/)
- [WhatsApp Web](https://web.whatsapp.com) (carregado em modo isolado)

---

## 🧩 Configuração do Ambiente

### 1️⃣ Instalar dependências
```bash
npm install
```

### 2️⃣ Corrigir dependências nativas (se necessário)
Em alguns ambientes, é preciso recompilar módulos nativos para Electron:
```bash
npx electron-rebuild
```

### 3️⃣ Executar o app
```bash
npm start
```

---

## 💾 Estrutura de Configuração

Os dados são salvos no banco `config.db`.

#### Tabela de contatos permitidos `allowed_chats`:

| Campo       | Tipo      | Descrição |
|-------------|-----------|------------|
| `id`        | INTEGER | Identificador unico do contato |
| `name`      | TEXT    | Nomes de contatos permitidos   |

#### Tabela de configurações `app_config`:

| Campo       | Tipo  | Descrição |
|-------------|-------|------------|
| `key`       | TEXT  | Identificador da configuração |
| `value`     | TEXT  | Valor ativo para configuração |

---

## 🧠 Como funciona a injeção

O arquivo `scripts/inject.js` é executado dentro do contexto do WhatsApp Web e:
- Observa mudanças na árvore DOM (`MutationObserver`).
- Esconde automaticamente contatos não permitidos.
- Substitui textos das mensagens se a opção estiver ativada.
- Atualiza dinamicamente conforme o usuário alterna telas.

---

## 🧰 API interna (preload.js)

O preload expõe três objetos seguros ao front-end:

| Objeto | Função |
|--------|--------|
| `window.appAssets` | Carrega imagens locais (ex: `doguinho.gif`) |
| `window.electronAPI` | Comunicação IPC com o processo principal |
| `window.electronConfig` | Manipulação de configurações via `localStorage` |

---

## 🧠 Segurança

O projeto usa:
- **Context Isolation** (`contextIsolation: true`)
- **Sandbox** desativado apenas para acesso controlado do preload
- Nenhum `nodeIntegration` no front-end
- Comunicação controlada via IPC

---

## 💬 Nota

> O *WhatsApp Work View* **não altera o funcionamento oficial do WhatsApp**, apenas cria uma camada de visualização personalizada e privada para uso profissional no WhatsApp Web.
