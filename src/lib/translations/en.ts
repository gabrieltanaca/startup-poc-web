import { TranslateType } from './pt';

export const en: TranslateType = {
  // ------------------- GENERAL -------------------
  general: {
    portalTitle: 'Ponto Certo',
    dashboardTitle: 'Dashboard',
    loading: 'Loading...',
    loginSuccess: 'Login successful! Redirecting...',
    invalidFields: 'Please enter your email and password.',
    invalidCreds: 'Invalid credentials. Check your email and password.',
    modal_confirm_delete: 'Yes, Delete',
    modal_cancel: 'Cancel',
    searching: 'Searching...',
    moreDetails: 'More details',
  },
  table: {
    search_placeholder: 'Search by term or summary...',
    items_per_page: 'Items per page',
    pagination_info_prefix: 'Page',
    pagination_info_of: 'of',
    no_results_filtered: 'No searches found for the search term.',
    no_results_default: 'No history records found.',
    loading: 'Loading data...',
  },
  //------------------- IDIOMA -------------------
  lang: {
    label: 'Language',
    name: 'English',
  },
  // ------------------- THEME -------------------
  theme: {
    label: 'Theme',
    dark: 'Dark',
    light: 'Light',
  },
  // ------------------- AUTHENTICATION -------------------
  auth: {
    accessTitle: 'Portal Access',
    description: 'Sign in to manage location data.',
    emailLabel: 'Email',
    passwordLabel: 'Password',
    forgotPassword: 'Forgot password?',
    btnEnter: 'Login',
    btnEntering: 'Logging in...',
    placeholderEmail: 'admin@portal.com',
  },
  // ------------------- SIDEBAR -------------------
  sidebar: {
    general: 'General',
    search: 'Search Place',
    dashboard: 'Dashboard',
    history: 'History',
    config: 'Settings',
    analytics: 'Analytics',
    logout: 'Logout',
  },
  // ------------------- SEARCH PAGE -------------------
  search: {
    title: 'Search in Ponto Certo!',
    placeholder: 'Search...',
    showMe: 'Show me',
    sortBy: 'Sort by',
    filters: 'Filters',
    all: 'All',
    restaurant: 'Restaurants',
    rating: 'Rating',
    noRatings: 'No ratings',
    noPlaceFound: 'No place found.',
    moreDetails: 'More Details',
    smartSearch: 'Smart Search',
    noResults: 'No places found.',
    smartPlaceholder: 'IA Searching...',
    summary: 'Summary',
    usersRating: 'users have rated this place!',
  },
  // ------------------- DASHBOARD -------------------
  dashboard: {
    title: 'Dashboard',
    download_report: 'Download Report',

    total_searches: 'Total Searches',
    avg_response_time: 'Avg. Response Time',
    active_users: 'Active Users',
    revenue: 'Revenue (Mock)',

    description_last_month: 'from last month',
    description_last_week: 'from last week',
    description_last_24h: 'from last 24 hours',
    description_this_quarter: 'from last quarter',

    overview_chart: 'Usage Overview',
    chart_footer_tip: 'Showing the usage trend over the months.',

    recent_operations: 'Operation History',
    latest_activity_summary: 'Latest activities and actions performed in the system.',

    table_header_id: 'ID',
    table_header_type: 'Type',
    table_header_user: 'User',
    table_header_status: 'Status',
    table_header_date: 'Date',
    view_all_operations: 'View all operations',
  },
  // ------------------- ANALYTICS -------------------
  analytics: {
    page_title: 'Administrative Analytics',
    data_status: 'Data Status',
    status_updating: 'Updating...',
    status_updated: 'Updated (Real-Time)',

    total_records: 'Total Records (DB)',
    records_description: 'Total count of documents in the database.',
    recent_errors: 'Recent Errors (24h)',
    errors_description: 'Critical failures or system warnings.',
    last_update: 'Last System Update',
    last_update_description: 'Date and time of the last deploy or data sync.',
    avg_query_time: 'Avg. Query Time',
    avg_query_time_description: 'Average performance of API requests.',

    logs_title: 'Recent Operation Logs',
    logs_description: 'View the latest backend logs filtered by level and period.',
    loading_logs: 'Loading logs...',

    filters_title: 'Filters',
    filter_period_label: 'Analysis Period',
    filter_log_level_label: 'Log Level',
    filter_placeholder_period: 'Select date range',
    filter_placeholder_level: 'All Levels',
    level_all: 'All',
    apply_filters: 'Apply Filters',

    table_header_timestamp: 'Timestamp',
    table_header_level: 'Level',
    table_header_endpoint: 'Endpoint',
    table_header_duration: 'Duration',
    table_header_message: 'Message',
  },
  // ------------------- HISTORY -------------------
  history: {
    page_title: 'Search History',
    table_title: 'Recent Searches',
    delete_all_button: 'Delete All History',

    table_header_id: 'ID',
    table_header_query: 'Search Term',
    table_header_summary: 'Summary',
    table_header_created_at: 'Created At',
    table_header_actions: 'Actions',
    delete_action_tooltip: 'Delete search entry',

    modal_title_all: 'Bulk Deletion Confirmation',
    modal_title_one: 'Confirm Deletion',
    modal_desc_all:
      'Are you sure you want to delete ALL search records? This action is irreversible.',
    modal_desc_one_prefix: 'Are you sure you want to delete this search entry',
    modal_warning_all: 'The entire history will be permanently deleted.',
    modal_warning_one: 'This record will be permanently deleted.',

    toast_delete_all_success: 'History successfully deleted!',
    toast_delete_one_success: 'Search entry successfully deleted!',
  },
  // ------------------- SETTINGS -------------------
  settings: {
    page_title: 'Settings',

    password_error_all_fields: 'Please fill in all password fields.',
    password_error_mismatch: 'New passwords do not match.',
    password_error_same: 'The new password cannot be the same as the current password.',
    toast_password_success: 'Password updated successfully!',
    toast_password_generic_error: 'Error updating password. Please try again.',

    password_section_title: 'Change Password',
    password_section_desc: 'Update your password to keep your account secure.',
    label_current_password: 'Current Password',
    label_new_password: 'New Password',
    label_confirm_password: 'Confirm New Password',
    button_save_password: 'Save New Password',

    general_section_title: 'General Settings',
    general_section_desc: 'Interface, language, and notification adjustments.',

    theme_label: 'Interface Theme',
    theme_desc: 'Choose between light, dark, or system.',
    theme_placeholder: 'Select theme',
    theme_light: 'Light',
    theme_dark: 'Dark',
    theme_system: 'System',

    language_label: 'Language',
    language_desc: 'Change the application language.',
    language_placeholder: 'Select language',

    notifications_label: 'Email Notifications',
    notifications_desc: 'Receive important updates and alerts.',
  },
  // ------------------- TAGS -------------------
  tags: {
    locality: 'Locality',
    country: 'Country',
    restaurant: 'Restaurant',
    store: 'Store',
    attraction: 'Attraction',
    park: 'Park',
    station: 'Station',
  },
};
