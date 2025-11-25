# 📍 Ponto Certo - Portal de Buscas

Este projeto é uma POC construída com Next.js, focado em gerenciamento de buscas e histórico de localização, com algumas telas com visualização de dados e monitoramento de desempenho.

# 🛠️ Tecnologias Utilizadas

O projeto utiliza um stack moderno e robusto:

- Framework: Next.js (App Router)
- Linguagem: TypeScript
- Estilização: TailwindCSS
- Componentes UI: RadixUI + Shadcn/UI
- Formulários: React Hook Form e Zod
- Banco de Dados/Autenticação: Supabase (opcional, configurado via ENVs)

# 💻 Estrutura das Páginas e Funcionalidades

O portal é composto por seis páginas principais, cada uma com um propósito distinto:

#### 1. Acesso ao Portal (login.tsx)

**Utilização:**

- Tela de autenticação (Login). Valida credenciais (e-mail e senha) para dar acesso ao sistema.

**Chamadas:**

- **SUPABASE auth signInWithPassword:** Verificação de senha e email e criação de token
- **SUPABASE auth signOut:** Método para remoção do token válido no Supabase

#### 2. Dashboard (dashboard.tsx)

**Utilização:**

- **Visão Geral:** Exibe as principais métricas de negócio (Total de Buscas, Tempo Médio de Resposta, Usuários Ativos, Faturamento) em um carrossel responsivo.
- **Monitoramento:** Apresenta um gráfico de área (Visão Geral de Uso) e um painel de Histórico de Operações recentes.

**Chamadas:**

- Nenhuma chamada de API direta neste componente.

#### 3. Histórico de Pesquisas (history.tsx)

**Utilização:**

- **Visualização:** Tabela paginada e pesquisável que lista o histórico completo de buscas do usuário.
- **Gerenciamento:** Permite a exclusão de registros individuais ou a exclusão em massa de todo o histórico (requer confirmação via modal).

**Chamadas:**

- **DELETE /api/history/{id}:** Exclui um registro específico.
- **GET /api/history:** Busca todos os registros do histórico.

#### 4. Pesquisa de Locais (search.tsx)

**Utilização:**

- **Busca:** Interface para pesquisar locais (pontos de interesse) com filtros dinâmicos de exibição e ordenação.
- **Busca Inteligente:** Alterna para um modo de busca que utiliza IA.
- **Visualização:** Apresenta resultados em uma lista lateral e em um mapa dinâmico (componente DynamicMapComponent).

**Chamadas:**

- **GET /api/search:**Executa a busca padrão de locais.
- **GET /api/smart-search:** Executa a busca aprimorada por IA.

#### 5. Estatísticas Administrativas (analytics.tsx)

**Utilização:**

- **Painel Admin:** Exibe métricas de infraestrutura (Total de Registros BD, Erros Recentes, Tempo Médio de Consulta).
- **Logs:** Tabela de logs de operação recentes, filtráveis por Período e Nível (INFO, WARN, ERROR).

**Chamadas:**

- **MOCKUP:** Simula a busca de dados ao aplicar filtros de data e nível de log.

#### 6. Configurações (settings.tsx)

**Utilização:**

- Segurança: Formulário para alteração de senha (ChangePasswordForm).
- Gerais: Opções para ajustar o Tema (Light, Dark, System), o Idioma da aplicação e o status de Notificações por Email.

**Chamadas:**

- **MockUpPassword:** Simula a mudança de senha no supabase. (Não é feito a mudança por medidas de segurança)

# 🚀 Instruções de Instalação

Siga os passos abaixo para configurar e executar o projeto em seu ambiente de desenvolvimento local.

**Pré-requisitos:**

- **Node.js** (versão **18.x** ou superior)
- npm ou yarn

## 1. Clonar o Repositório

```
git clone https://github.com/gabrieltanaca/startup-poc-web.git
cd ponto-certo
```

## 2. Instalar Dependências

```
npm install
# or
yarn install
```

## 3. Configurar Variáveis de Ambiente

Crie um arquivo chamado .env na raiz do projeto e adicione as variáveis de ambiente.

Variáveis de Ambiente (.env.local)

```
NEXT_PUBLIC_API_BASE_URL="http://localhost:5000/api"
APP_ENV="development"
SESSION_SECRET="base64"
NEXT_PUBLIC_SUPABASE_URL="supabase_url"
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY="supabase_key"
```

| Variável                             | Uso                                                                                  |
| ------------------------------------ | ------------------------------------------------------------------------------------ |
| NEXT_PUBLIC_API_BASE_URL             | Obrigatório. Define o endereço base da sua API de backend para requisições.          |
| APP_ENV                              | Geral. Define o ambiente de execução da aplicação.                                   |
| SESSION_SECRET                       | Segurança. Chave secreta usada para criptografia de sessões. Deve ser forte e única. |
| NEXT_PUBLIC_SUPABASE_URL             | URL do seu projeto Supabase, se utilizado para persistência de dados ou Auth.        |
| NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY | Chave pública (anon key) do Supabase para acesso do lado do cliente.                 |

## 4. Rodar o Projeto

Inicie o servidor de desenvolvimento:

```
npm run dev
#or
yarn dev
```

O aplicativo estará disponível em http://localhost:3000.

# ℹ️ Informações Adicionais

Configuração de Rotas: Este projeto Next.js utiliza o App Router. Certifique-se de que a sua estrutura de pastas (/app) e o arquivo next.config.js estejam configurados corretamente para o roteamento de cada página (/login, /dashboard, etc.).
