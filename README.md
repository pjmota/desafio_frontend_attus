# Desafio Prático

![Angular](https://img.shields.io/badge/Angular-17.3.0-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![NgRx](https://img.shields.io/badge/NgRx-17.2.0-BA2BD2?style=for-the-badge&logo=ngrx&logoColor=white)
![Angular Material](https://img.shields.io/badge/Angular_Material-17.3.10-FF5252?style=for-the-badge&logo=angular&logoColor=white)
![Nx](https://img.shields.io/badge/Nx-21.1.3-143055?style=for-the-badge&logo=nx&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-29.7.0-C21325?style=for-the-badge&logo=jest&logoColor=white)

Este é um projeto desenvolvido em **Angular 17** (com componentes standalone) para gestão e listagem de usuários. A aplicação utiliza o ecossistema **Nx** para orquestração de build, **NgRx** para controle de estado (Store, Effects, Entity e Selectors) e **Angular Material** para os componentes de interface e design system.

---

## ✨ O que foi implementado

Nesta última iteração, diversas melhorias de UI/UX e de acessibilidade foram adicionadas:

- **Expansão de Cards na Listagem:** Os cards de usuários agora mostram inicialmente apenas informações principais (nome e e-mail). Ao clicar em qualquer parte da linha (ou usando `Enter`/`Espaço`), o card expande revelando CPF e Telefone.
- **Formatação de Dados:** Criação de utils e pipes/diretivas para mascarar e formatar CPF e telefones em tempo real.
- **Máscaras de Input (Diretivas):**
  - **CPF:** Diretiva `appCpfMask` limita a 11 dígitos e aplica o formato `999.999.999-99` enquanto o usuário digita.
  - **Telefone:** Diretiva `appPhoneMask` aplica formato de Fixo ou Celular dependendo do tipo selecionado.
- **Validações de Formulário Melhoradas:** 
  - Mensagens de erro de validação (ex: "CPF inválido", "Está faltando dígito", "E-mail digitado não corresponde...") agora são renderizadas claramente abaixo de cada input no Dialog.
- **Ajustes de Layout (Header e Paginator):**
  - Campo de pesquisa global reduzido (tamanho `small`) e perfeitamente alinhado.
  - Paginação completa (`mat-paginator`) na listagem de usuários, com controle de itens por página.
  - Badge com a quantidade total de registros na listagem.
- **Tooltips (Dicas de Contexto):** Inclusão de `matTooltip` posicionados acima do badge de quantidade, do botão de editar e do botão Flutuante (FAB) de adicionar usuário.
- **Mocks Desacoplados:** Separação do array fixo de dados para um arquivo `.mock.ts`, limpando a service principal (`users-api.service.ts`).

---

## 🧪 Padrão de Testes

A aplicação utiliza o **Jest** como framework de testes e adota práticas para manter os testes focados, rápidos e eficientes:

- **Configuração:** O projeto foi configurado com `jest-preset-angular` e `@angular/core/testing` para suportar testes unitários em componentes, diretivas, reducers e utilitários.
- **Isolamento e Setup:** Em testes de UI (como em diretivas customizadas), utiliza-se componentes *Host* (Mock Components) isolados e `TestBed.configureTestingModule` focado para testar especificamente o comportamento da diretiva, isolando-a do resto da aplicação.
- **Abrangência Atual:**
  - **Reducers e Selectors:** Testes focados nas funções puras do estado (`users.reducer.spec.ts` e `users.selectors.spec.ts`), garantindo as atualizações de *loading*, *errors* e manipulações de entidades (CRUD local e paginação).
  - **Validadores Customizados:** Testes abrangentes para validar formatos de CPF e Telefone.
  - **Utilitários e Formatação:** Testes de máscara garantindo digitações parciais, limitações de tamanho e recusa de não numéricos (`cpf.spec.ts`).
  - **Interações de DOM:** Testes nas diretivas disparando eventos sintéticos (ex: `dispatchEvent(new Event('input'))`) para garantir o vínculo com `FormControl` e as mudanças visuais em tempo real (`cpf-mask.directive.spec.ts`).

### ⚙️ Execução e Cobertura de Testes

Os testes são executados através da CLI do Nx e Jest. Para rodar a suíte completa de testes e analisar a cobertura, utilize os comandos:

- **Rodar todos os testes unitários:**
  ```bash
  npm test
  ```
- **Rodar testes em modo "Watch" (desenvolvimento):**
  ```bash
  npm run test:watch
  ```
- **Gerar Relatório de Cobertura (Coverage):**
  ```bash
  npx jest --coverage
  ```

#### Detalhamento da Cobertura Atual

A execução do coverage (`npx jest --coverage`) aponta uma **cobertura geral de testes de 93%** (Statements/Lines), demonstrando alta confiabilidade nas regras de negócios, utils e diretivas. O relatório destaca:

1. **`app/features/users/store` (93.6% Lines):**
   - **`users.reducer.ts` (100%):** Testa as transições de estado (`loadUsers`, `loadUsersSuccess`, `loadUsersFailure`, `setNameFilter`, `setUsersPagination`, `upsertUser`), garantindo que o `loading`, `error` e as entidades do adapter estão corretas.
   - **`users.selectors.ts` (88%):** Testa a memoização, o filtro de texto (`nameFilter`) e a lógica de fatiamento (`slice`) na paginação.

2. **`app/shared/validators` (88% Lines):**
   - **`cpf.validator.ts`:** Cobre CPFs válidos, tamanho incorreto, bloqueio de dígitos repetidos (`00000...`) e verificação matemática (D1/D2 inválidos).
   - **`phone.validator.ts`:** Cobre limite de 10 dígitos (Fixo), 11 dígitos (Celular/WhatsApp) e rejeita celular que não inicie com `9` após o DDD.

3. **`app/shared/directives` (94.8% Lines) e `app/shared/utils` (93.7% Lines):**
   - **`cpf-mask.directive.ts` / `phone-mask.directive.ts`:** Testes exaustivos das interações de UI. Simulam digitação do usuário, eventos de `input` e `blur`, troca dinâmica de tipo de telefone (Celular para Fixo com re-formatação), verificação de não-números sendo barrados e atualização síncrona do `FormControl` e do input visual.
   - **`cpf.ts` / `phone.ts`:** Testes cobrindo 100% da formatação de telefone e grande parte do CPF. Garantem que as funções `sanitizeDigits` extraem apenas números de `string`, `number` ou `bigint`, limitam adequadamente o tamanho máximo (10 ou 11 dígitos) e asseguram a progressão parcial da máscara enquanto o usuário digita (ex: `123` -> `123.`).

Ao rodar o comando de coverage, é gerada uma pasta `coverage/` na raiz do projeto. Você pode abrir o arquivo `coverage/lcov-report/index.html` em seu navegador para visualizar de forma interativa (linha a linha) onde os testes passaram.

---

## 🚀 Funcionalidades

- **Listagem de Usuários:** Exibição de usuários com paginação e indicador de quantidade.
- **Filtro em Tempo Real:** Pesquisa reativa pelo nome do usuário, com debounce.
- **Visualização Detalhada (Expansão de Card):** Os cards são apresentados de forma compacta (nome e e-mail). Ao clicar na linha, o card expande para mostrar os detalhes adicionais (CPF e Telefone).
- **Adicionar/Editar Usuários:** Formulário via modal (Dialog) do Angular Material, reutilizado tanto para criação quanto para edição.
- **Validações Customizadas e Máscaras:**
  - Máscara e validação estrita de **CPF** (`999.999.999-99`).
  - Máscara e validação estrita de **Telefone** (suporta Celular e Fixo, validando o dígito `9` para celulares).
  - Validação de formato de e-mail.
  - Feedback visual e mensagens de erro (Tooltips e mensagens abaixo dos campos).
- **Feedback ao Usuário:** Notificações em formato de toast (usando `ngx-toastr`) para avisos de sucesso ou erro nas requisições simuladas.

---

## 🛠️ Como executar o projeto

### Pré-requisitos

Certifique-se de ter instalado em sua máquina:
- [Node.js](https://nodejs.org/) (Versão 18 ou superior recomendada)
- NPM (geralmente vem junto com o Node) ou Yarn/PNPM.

### Instalação e Execução

1. **Clone o repositório:**
   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd desafio-pratico
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm start
   ```
   > Isso rodará o comando `nx serve` por baixo dos panos.

4. **Acesse no navegador:**
   Abra [http://localhost:4200/](http://localhost:4200/) para visualizar a aplicação em funcionamento. O reload é automático em caso de alterações no código.

### Outros comandos úteis

- **Build:** `npm run build` (Gera os artefatos de produção na pasta `dist/desafio-pratico`)
- **Testes Unitários:** `npm test` (Roda a suíte de testes com Jest)

---

## 📂 Estrutura de Arquivos do Projeto

Abaixo a estrutura principal (simplificada) do monorepo Nx e do app Angular contido na pasta `src`:

```
├── 📁 .nx
├── 📁 data-access-users
│   ├── 📁 src
│   │   ├── 📁 lib
│   │   │   └── 📁 data-access-users
│   │   │       ├── 🎨 data-access-users.component.css
│   │   │       ├── 🌐 data-access-users.component.html
│   │   │       ├── 📄 data-access-users.component.spec.ts
│   │   │       └── 📄 data-access-users.component.ts
│   │   ├── 📄 index.ts
│   │   └── 📄 test-setup.ts
│   ├── 📝 README.md
│   ├── 📄 eslint.config.mjs
│   ├── 📄 jest.config.ts
│   ├── ⚙️ project.json
│   ├── ⚙️ tsconfig.json
│   ├── ⚙️ tsconfig.lib.json
│   └── ⚙️ tsconfig.spec.json
├── 📁 feature-users
│   ├── 📁 src
│   │   ├── 📁 lib
│   │   │   └── 📁 feature-users
│   │   │       ├── 🎨 feature-users.component.css
│   │   │       ├── 🌐 feature-users.component.html
│   │   │       ├── 📄 feature-users.component.spec.ts
│   │   │       └── 📄 feature-users.component.ts
│   │   ├── 📄 index.ts
│   │   └── 📄 test-setup.ts
│   ├── 📝 README.md
│   ├── 📄 eslint.config.mjs
│   ├── 📄 jest.config.ts
│   ├── ⚙️ project.json
│   ├── ⚙️ tsconfig.json
│   ├── ⚙️ tsconfig.lib.json
│   └── ⚙️ tsconfig.spec.json
├── 📁 src
│   ├── 📁 app
│   │   ├── 📁 features
│   │   │   └── 📁 users
│   │   │       ├── 📁 components
│   │   │       │   ├── 📁 user-dialog
│   │   │       │   │   ├── 🌐 user-dialog.component.html
│   │   │       │   │   ├── 🎨 user-dialog.component.scss
│   │   │       │   │   └── 📄 user-dialog.component.ts
│   │   │       │   ├── 📁 users-header
│   │   │       │   │   ├── 🌐 users-header.component.html
│   │   │       │   │   ├── 🎨 users-header.component.scss
│   │   │       │   │   └── 📄 users-header.component.ts
│   │   │       │   └── 📁 users-list
│   │   │       │       ├── 🌐 users-list.component.html
│   │   │       │       ├── 🎨 users-list.component.scss
│   │   │       │       └── 📄 users-list.component.ts
│   │   │       ├── 📁 models
│   │   │       │   └── 📄 user.model.ts
│   │   │       ├── 📁 pages
│   │   │       │   └── 📁 users-page
│   │   │       │       ├── 🌐 users-page.component.html
│   │   │       │       ├── 🎨 users-page.component.scss
│   │   │       │       └── 📄 users-page.component.ts
│   │   │       ├── 📁 services
│   │   │       │   ├── 📄 users-api.service.ts
│   │   │       │   └── 📄 users.mock.ts
│   │   │       └── 📁 store
│   │   │           ├── 📄 users.actions.ts
│   │   │           ├── 📄 users.effects.ts
│   │   │           ├── 📄 users.reducer.spec.ts
│   │   │           ├── 📄 users.reducer.ts
│   │   │           ├── 📄 users.selectors.spec.ts
│   │   │           └── 📄 users.selectors.ts
│   │   ├── 📁 shared
│   │   │   ├── 📁 directives
│   │   │   │   ├── 📄 cpf-mask.directive.spec.ts
│   │   │   │   ├── 📄 cpf-mask.directive.ts
│   │   │   │   └── 📄 phone-mask.directive.ts
│   │   │   ├── 📁 utils
│   │   │   │   ├── 📄 cpf.spec.ts
│   │   │   │   ├── 📄 cpf.ts
│   │   │   │   └── 📄 phone.ts
│   │   │   └── 📁 validators
│   │   │       ├── 📄 cpf.validator.spec.ts
│   │   │       ├── 📄 cpf.validator.ts
│   │   │       ├── 📄 phone.validator.spec.ts
│   │   │       └── 📄 phone.validator.ts
│   │   ├── 🌐 app.component.html
│   │   ├── 🎨 app.component.scss
│   │   ├── 📄 app.component.spec.ts
│   │   ├── 📄 app.component.ts
│   │   ├── 📄 app.config.ts
│   │   └── 📄 app.routes.ts
│   ├── 📁 assets
│   │   └── ⚙️ .gitkeep
│   ├── 📄 favicon.ico
│   ├── 🌐 index.html
│   ├── 📄 main.ts
│   └── 🎨 styles.scss
├── 📁 ui
│   ├── 📁 src
│   │   ├── 📁 lib
│   │   │   └── 📁 ui
│   │   │       ├── 🎨 ui.component.css
│   │   │       ├── 🌐 ui.component.html
│   │   │       ├── 📄 ui.component.spec.ts
│   │   │       └── 📄 ui.component.ts
│   │   ├── 📄 index.ts
│   │   └── 📄 test-setup.ts
│   ├── 📝 README.md
│   ├── 📄 eslint.config.mjs
│   ├── 📄 jest.config.ts
│   ├── ⚙️ project.json
│   ├── ⚙️ tsconfig.json
│   ├── ⚙️ tsconfig.lib.json
│   └── ⚙️ tsconfig.spec.json
├── ⚙️ .editorconfig
├── ⚙️ .gitignore
├── ⚙️ .prettierignore
├── ⚙️ .prettierrc
├── 📝 README.md
├── 📄 eslint.config.mjs
├── 📄 jest.config.js
├── 📄 jest.preset.js
├── ⚙️ nx.json
├── ⚙️ package-lock.json
├── ⚙️ package.json
├── ⚙️ project.json
├── 📄 setup-jest.ts
├── ⚙️ tsconfig.app.json
├── ⚙️ tsconfig.base.json
├── ⚙️ tsconfig.json
└── ⚙️ tsconfig.spec.json
```

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📞 Contato

**Paulo José Mota**  
📧 Email: [paulob1@hotmail.com](mailto:paulob1@hotmail.com)

---

<div align="center">

**Desenvolvido com ❤️ para otimizar a gestão de estacionamentos**

*Sistema SmartPark - Transformando a experiência de gestão de vagas*

</div>