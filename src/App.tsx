import React from 'react';
import { Page, Paper } from './types';
import LoginPage from './components/auth/LoginPage';
import DashboardLayout from './components/layout/DashboardLayout';
import UploadSection from './components/dashboard/UploadSection';
import AnalysisResults from './components/dashboard/AnalysisResults';
import WorkflowVisualization from './components/dashboard/WorkflowVisualization';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { FileText, Clock, ChevronRight, Search, Menu, LogOut, Bell, ArrowLeft, Download, Bookmark, Share2, Lightbulb, Target, Compass, Upload, Cpu, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function App() {
  const [currentPage, setCurrentPage] = React.useState<Page>('login');
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [selectedPaper, setSelectedPaper] = React.useState<Paper | null>(null);
  const [history, setHistory] = React.useState<Paper[]>([
    {
      id: '1',
      title: 'Attention Is All You Need',
      uploadDate: '2026-04-10',
      status: 'completed',
      summary: 'The dominant sequence transduction models are based on complex recurrent or convolutional neural networks that include an encoder and a decoder. The best performing models also connect the encoder and decoder through an attention mechanism. We propose a new simple network architecture, the Transformer, based solely on attention mechanisms, dispensing with recurrence and convolutions entirely.',
      insights: ['Self-attention mechanism', 'Parallelization of training', 'Positional encoding'],
      gaps: ['Computational cost for long sequences', 'Interpretability of attention weights'],
      futureIdeas: ['Sparse attention mechanisms', 'Efficient Transformers']
    },
    {
      id: '2',
      title: 'Generative Adversarial Nets',
      uploadDate: '2026-04-12',
      status: 'completed',
      summary: 'We propose a new framework for estimating generative models via an adversarial process, in which we simultaneously train two models: a generative model G that captures the data distribution, and a discriminative model D that estimates the probability that a sample came from the training data rather than G.',
      insights: ['Minimax game formulation', 'Non-parametric density estimation', 'Backpropagation training'],
      gaps: ['Mode collapse', 'Training instability'],
      futureIdeas: ['Wasserstein GANs', 'Conditional GANs']
    }
  ]);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage('login');
  };

  const handleUploadComplete = (paper: Paper) => {
    setHistory([paper, ...history]);
    setSelectedPaper(paper);
    setCurrentPage('analysis');
  };

  const handleViewPaper = (paper: Paper) => {
    setSelectedPaper(paper);
    setCurrentPage('analysis');
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <DashboardLayout 
      activePage={currentPage} 
      setActivePage={setCurrentPage} 
      onLogout={handleLogout}
    >
      {currentPage === 'dashboard' && (
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">
          {/* Sidebar Widgets */}
          <div className="space-y-6">
            <Card className="border-border shadow-sm">
              <CardHeader className="pb-3">
                <span className="text-[11px] uppercase tracking-wider font-bold text-secondary-text">Upload Center</span>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-[#CBD5E1] bg-[#F1F5F9] rounded-xl p-6 text-center space-y-3">
                  <p className="text-xs text-secondary-text">Drag & Drop PDF or</p>
                  <Button 
                    size="sm" 
                    className="bg-primary hover:bg-primary/90 text-white font-semibold w-full"
                    onClick={() => setCurrentPage('upload')}
                  >
                    Browse Files
                  </Button>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-[11px] font-medium">
                    <span className="truncate max-w-[180px]">attention_is_all.pdf</span>
                    <span className="text-primary">75%</span>
                  </div>
                  <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
                    <div className="w-[75%] h-full bg-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border shadow-sm">
              <CardHeader className="pb-3">
                <span className="text-[11px] uppercase tracking-wider font-bold text-secondary-text">System Workflow</span>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { label: 'User Upload', status: 'completed' },
                    { label: 'PDF Text Extraction', status: 'completed' },
                    { label: 'AI Neural Processing', status: 'active' },
                    { label: 'Insight Generation', status: 'pending' },
                  ].map((step, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className={cn(
                        "w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold",
                        step.status === 'completed' ? "bg-accent-green text-white" : 
                        step.status === 'active' ? "bg-primary text-white" : "bg-[#CBD5E1] text-white"
                      )}>
                        {step.status === 'completed' ? '✓' : i + 1}
                      </div>
                      <span className={cn(
                        "text-xs font-medium",
                        step.status === 'completed' ? "text-accent-green" : 
                        step.status === 'active' ? "text-foreground" : "text-secondary-text"
                      )}>
                        {step.label}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Area */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Recent Research Papers</h1>
                <p className="text-sm text-secondary-text">Manage and analyze your uploaded documents.</p>
              </div>
              <Button onClick={() => setCurrentPage('upload')} className="bg-primary text-white">
                Upload New
              </Button>
            </div>

            <Card className="border-border shadow-sm overflow-hidden">
              <div className="divide-y divide-border">
                {history.map((paper) => (
                  <button
                    key={paper.id}
                    onClick={() => handleViewPaper(paper)}
                    className="w-full flex items-center justify-between p-5 hover:bg-secondary transition-colors text-left group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                        <FileText className="w-5 h-5 text-secondary-text group-hover:text-primary transition-colors" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{paper.title}</p>
                        <div className="flex gap-3 mt-1">
                          <span className="text-[11px] text-secondary-text">Vaswani et al.</span>
                          <span className="text-[11px] text-secondary-text">•</span>
                          <span className="text-[11px] text-secondary-text">{paper.uploadDate}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="bg-[#EFF6FF] text-primary rounded-md px-2 py-1 text-[10px] font-bold uppercase tracking-wider">
                        {paper.status}
                      </span>
                      <ChevronRight className="w-4 h-4 text-secondary-text group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </div>
                  </button>
                ))}
              </div>
            </Card>
          </div>
        </div>
      )}

      {currentPage === 'upload' && (
        <UploadSection onUploadComplete={handleUploadComplete} />
      )}

      {currentPage === 'analysis' && selectedPaper && (
        <AnalysisResults paper={selectedPaper} onBack={() => setCurrentPage('dashboard')} />
      )}

      {(currentPage === 'history' || currentPage === 'settings') && (
        <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
          <div className="w-16 h-16 bg-secondary/50 rounded-full flex items-center justify-center">
            <Clock className="w-8 h-8 text-secondary-text" />
          </div>
          <h2 className="text-2xl font-bold">Under Construction</h2>
          <p className="text-secondary-text max-w-md">
            The {currentPage} page is currently being developed. Check back soon for more features!
          </p>
          <button 
            onClick={() => setCurrentPage('dashboard')}
            className="text-primary font-medium hover:underline"
          >
            Go back to Dashboard
          </button>
        </div>
      )}
    </DashboardLayout>
  );
}
