import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { TranslateType } from '@/lib/translations/pt';
import {
  ChartColumnIncreasing,
  HistoryIcon,
  LayoutDashboardIcon,
  SearchIcon,
  Settings2Icon,
} from 'lucide-react';

const Content = ({ translation: t }: { translation: TranslateType }) => {
  const routes = [
    {
      label: t.sidebar.dashboard,
      href: '/dashboard',
      icon: <LayoutDashboardIcon className="h-5 w-5" />,
    },
    { label: t.sidebar.search, href: '/search', icon: <SearchIcon className="h-5 w-5" /> },
    { label: t.sidebar.history, href: '/history', icon: <HistoryIcon className="h-5 w-5" /> },
    {
      label: t.sidebar.analytics,
      href: '/analytics',
      icon: <ChartColumnIncreasing className="h-5 w-5" />,
    },
    { label: t.sidebar.config, href: '/settings', icon: <Settings2Icon className="h-5 w-5" /> },
  ];

  return (
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>{t.sidebar.general}</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {routes.map((item) => (
              <SidebarMenuItem key={item.label}>
                <SidebarMenuButton asChild>
                  <a href={item.href}>
                    {item.icon}
                    <span>{item.label}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  );
};

export default Content;
