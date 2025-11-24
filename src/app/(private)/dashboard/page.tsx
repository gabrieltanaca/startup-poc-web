import { LayoutDashboard } from 'lucide-react';

const DashboardPage = () => {
  return (
    <div className="space-y-6 p-8">
      <header className="flex items-center space-x-4 border-b border-gray-200 pb-4">
        <LayoutDashboard className="h-8 w-8 text-indigo-600" />
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Principal</h1>
      </header>

      <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-lg">
          <h2 className="text-xl font-semibold text-gray-700">Visão Geral</h2>
          <p className="mt-2 text-gray-500">Dados resumidos de hoje.</p>
        </div>
        <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-lg">
          <h2 className="text-xl font-semibold text-gray-700">Relatórios</h2>
          <p className="mt-2 text-gray-500">Acesse relatórios detalhados.</p>
        </div>
        <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-lg">
          <h2 className="text-xl font-semibold text-gray-700">Configurações</h2>
          <p className="mt-2 text-gray-500">Gerencie as configurações da sua conta.</p>
        </div>
      </section>

      <footer className="pt-8 text-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()} Startup POC Web.
      </footer>
    </div>
  );
};

export default DashboardPage;
