import React from 'react';
import { motion } from 'motion/react';
import { 
  LayoutDashboard, 
  FileUp, 
  History, 
  Settings, 
  LogOut, 
  Search, 
  Bell, 
  User,
  Menu,
  X,
  FileText,
  BarChart3
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

interface DashboardLayoutProps {
  children: React.ReactNode;
  activePage: string;
  setActivePage: (page: any) => void;
  onLogout: () => void;
}

export default function DashboardLayout({ children, activePage, setActivePage, onLogout }: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'upload', label: 'Upload Paper', icon: FileUp },
    { id: 'analysis', label: 'Analysis', icon: BarChart3 },
    { id: 'history', label: 'History', icon: History },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-[220px] bg-[#0F172A] border-r border-border/10 transition-transform duration-300 lg:relative lg:translate-x-0",
          !isSidebarOpen && "-translate-x-full lg:w-20"
        )}
      >
        <div className="flex flex-col h-full py-6">
          {/* Sidebar Header */}
          <div className="px-6 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center font-bold text-lg text-white">
                A
              </div>
              {isSidebarOpen && (
                <span className="font-bold text-lg tracking-tight whitespace-nowrap text-white">ResearchAI</span>
              )}
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 space-y-1">
            <TooltipProvider delay={0}>
              {menuItems.map((item) => (
                <React.Fragment key={item.id}>
                  <Tooltip>
                    <TooltipTrigger
                      onClick={() => setActivePage(item.id)}
                      className={cn(
                        "w-full flex items-center gap-3 px-6 py-3 transition-all duration-200 group text-sm",
                        activePage === item.id 
                          ? "bg-primary/15 text-white border-r-3 border-primary" 
                          : "text-[#94A3B8] hover:bg-white/5 hover:text-white"
                      )}
                    >
                      <item.icon className={cn("w-4 h-4", activePage === item.id ? "text-white" : "group-hover:text-white")} />
                      {isSidebarOpen && <span className="font-medium">{item.label}</span>}
                    </TooltipTrigger>
                    {!isSidebarOpen && <TooltipContent side="right">{item.label}</TooltipContent>}
                  </Tooltip>
                </React.Fragment>
              ))}
            </TooltipProvider>
          </nav>

          {/* Sidebar Footer */}
          <div className="px-6 pt-4 border-t border-white/10">
            <button
              onClick={onLogout}
              className="w-full flex items-center gap-3 py-2 text-[#94A3B8] hover:text-destructive transition-all duration-200 text-sm"
            >
              <LogOut className="w-4 h-4" />
              {isSidebarOpen && <span className="font-medium">Logout</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navigation */}
        <header className="h-16 border-b border-border bg-white flex items-center justify-between px-8 sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden"
            >
              <Menu className="w-5 h-5" />
            </Button>
            <div className="font-semibold text-lg">AI Research Analyzer</div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center bg-secondary rounded-full px-4 py-1.5 border border-border w-64">
              <Search className="w-4 h-4 text-secondary-text mr-2" />
              <input 
                type="text" 
                placeholder="Search papers..." 
                className="bg-transparent border-none focus:outline-none text-sm w-full placeholder:text-secondary-text"
              />
            </div>
            <div className="flex items-center gap-3 pl-4 border-l border-border">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium">Dr. Sarah Jenkins</p>
              </div>
              <div className="h-9 w-9 rounded-full bg-[#E2E8F0] border border-border" />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
