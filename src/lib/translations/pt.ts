export const pt = {
  // ------------------- GERAL -------------------
  general: {
    portalTitle: 'Ponto Certo',
    dashboardTitle: 'Dashboard',
    loading: 'Carregando...',
    loginSuccess: 'Login bem-sucedido! Redirecionando...',
    invalidFields: 'Por favor, preencha o e-mail e a senha.',
    invalidCreds: 'Credenciais inválidas. Verifique seu e-mail e senha.',
    modal_confirm_delete: 'Sim, Excluir',
    modal_cancel: 'Cancelar',
    searching: 'Buscando...',
  },
  //------------------- TABELA -------------------
  table: {
    search_placeholder: 'Buscar por termo ou resumo...',
    items_per_page: 'Itens por página',
    pagination_info_prefix: 'Página',
    pagination_info_of: 'de',
    no_results_filtered: 'Nenhuma pesquisa encontrada para o termo de busca.',
    no_results_default: 'Nenhum registro de histórico encontrado.',
    loading: 'Carregando dados...',
  },
  //------------------- IDIOMA -------------------
  lang: {
    label: 'Idioma',
    name: 'Português',
  },
  //------------------- TEMA -------------------
  theme: {
    label: 'Tema',
    dark: 'Dark',
    light: 'Light',
  },
  // ------------------- AUTENTICAÇÃO -------------------
  auth: {
    accessTitle: 'Acesso ao Portal',
    description: 'Faça login para gerenciar os dados de localização.',
    emailLabel: 'E-mail',
    passwordLabel: 'Senha',
    forgotPassword: 'Esqueci a senha?',
    btnEnter: 'Entrar',
    btnEntering: 'Entrando...',
    placeholderEmail: 'admin@portal.com',
  },
  // ------------------- SIDEBAR -------------------
  sidebar: {
    general: 'Geral',
    search: 'Pesquisar ponto',
    dashboard: 'Dashboard',
    history: 'Histórico',
    config: 'Configurações',
    analytics: 'Estatísticas',
    logout: 'Sair',
  },
  // ------------------- PÁGINA DE BUSCA -------------------
  search: {
    title: 'Pesquise o Ponto Certo!',
    placeholder: 'Buscar...',
    smartPlaceholder: 'Buscar com IA...',
    showMe: 'Mostrar',
    sortBy: 'Ordenar por',
    filters: 'Filtros',
    all: 'Todos',
    restaurant: 'Restaurantes',
    rating: 'Avaliação',
    noRatings: 'Sem avaliações',
    noPlaceFound: 'Nenhum lugar encontrado.',
    moreDetails: 'Mais Detalhes',
    smartSearch: 'Pesquisa Inteligente',
    noResults: 'Nenhum lugar encontrado.',
    summary: 'Resumo',
  },
  // ------------------- DASHBOARD -------------------
  dashboard: {
    title: 'Dashboard',
    download_report: 'Baixar Relatório',

    total_searches: 'Total de Buscas',
    avg_response_time: 'Tempo Médio de Resposta',
    active_users: 'Usuários Ativos',
    revenue: 'Faturamento (Mock)',

    description_last_month: 'em relação ao mês passado',
    description_last_week: 'em relação à semana passada',
    description_last_24h: 'em relação às últimas 24h',
    description_this_quarter: 'em relação ao último trimestre',

    overview_chart: 'Visão Geral de Uso',
    chart_footer_tip: 'Exibindo a tendência de uso ao longo dos meses.',

    recent_operations: 'Histórico de Operações',
    latest_activity_summary: 'Últimas atividades e ações realizadas no sistema.',

    table_header_id: 'ID',
    table_header_type: 'Tipo',
    table_header_user: 'Usuário',
    table_header_status: 'Status',
    table_header_date: 'Data',
    view_all_operations: 'Ver todas as operações',
  },
  // ------------------- ESTATÍSTICAS -------------------
  analytics: {
    page_title: 'Estatísticas Administrativas',
    data_status: 'Status dos Dados',
    status_updating: 'Atualizando...',
    status_updated: 'Atualizado (Tempo Real)',

    total_records: 'Total de Registros (BD)',
    records_description: 'Contagem total de documentos na base de dados.',
    recent_errors: 'Erros Recentes (24h)',
    errors_description: 'Falhas críticas ou warnings do sistema.',
    last_update: 'Última Atualização (Sistema)',
    last_update_description: 'Data e hora do último deploy ou sync de dados.',
    avg_query_time: 'Tempo Médio de Consulta',
    avg_query_time_description: 'Performance média das requisições de API.',

    logs_title: 'Logs de Operação Recentes',
    logs_description: 'Visualização dos últimos logs do backend filtrados por nível e período.',
    loading_logs: 'Carregando logs...',

    filters_title: 'Filtros',
    filter_period_label: 'Período de Análise',
    filter_log_level_label: 'Nível do Log',
    filter_placeholder_period: 'Selecione o intervalo de datas',
    filter_placeholder_level: 'Todos os Níveis',
    level_all: 'Todos',
    apply_filters: 'Aplicar Filtros',

    table_header_timestamp: 'Timestamp',
    table_header_level: 'Nível',
    table_header_endpoint: 'Endpoint',
    table_header_duration: 'Duração',
    table_header_message: 'Mensagem',
  },
  // ------------------- HISTÓRICO -------------------
  history: {
    page_title: 'Histórico de Pesquisas',
    table_title: 'Pesquisas Recentes',
    delete_all_button: 'Excluir Todo o Histórico',

    table_header_id: 'ID',
    table_header_query: 'Termo de Pesquisa',
    table_header_summary: 'Resumo',
    table_header_created_at: 'Criação',
    table_header_actions: 'Ações',
    delete_action_tooltip: 'Excluir pesquisa',

    modal_title_all: 'Confirmação de Exclusão em Massa',
    modal_title_one: 'Confirmar Exclusão',
    modal_desc_all:
      'Tem certeza que quer excluir TODOS os registros de pesquisa? Esta ação é irreversível.',
    modal_desc_one_prefix: 'Tem certeza que quer excluir este registro de pesquisa',
    modal_warning_all: 'O histórico completo será permanentemente apagado.',
    modal_warning_one: 'Este registro será permanentemente apagado.',

    toast_delete_all_success: 'Histórico excluído com sucesso!',
    toast_delete_one_success: 'Pesquisa excluída com sucesso!',
  },
};

export type TranslateType = typeof pt;
