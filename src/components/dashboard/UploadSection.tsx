import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Upload, File, X, CheckCircle2, Loader2, AlertCircle, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/Card';

interface UploadSectionProps {
  onUploadComplete: (paper: any) => void;
}

export default function UploadSection({ onUploadComplete }: UploadSectionProps) {
  const [isDragging, setIsDragging] = React.useState(false);
  const [file, setFile] = React.useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = React.useState<'idle' | 'uploading' | 'analyzing' | 'completed'>('idle');
  const [progress, setProgress] = React.useState(0);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === 'application/pdf') {
      startUpload(droppedFile);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      startUpload(selectedFile);
    }
  };

  const startUpload = (file: File) => {
    setFile(file);
    setUploadStatus('uploading');
    
    // Simulate upload progress
    let p = 0;
    const interval = setInterval(() => {
      p += 5;
      setProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        setUploadStatus('analyzing');
        simulateAnalysis();
      }
    }, 100);
  };

  const simulateAnalysis = () => {
    setTimeout(() => {
      setUploadStatus('completed');
      setTimeout(() => {
        onUploadComplete({
          id: Math.random().toString(36).substr(2, 9),
          title: file?.name.replace('.pdf', '') || 'Untitled Paper',
          uploadDate: new Date().toLocaleDateString(),
          status: 'completed',
          summary: 'This research paper investigates the impact of large language models on academic writing and research methodologies. It explores how AI-driven tools can enhance literature reviews, data analysis, and the drafting process while addressing ethical concerns and potential biases.',
          insights: [
            'AI tools significantly reduce the time required for initial literature screening.',
            'LLMs can identify cross-disciplinary connections that human researchers might miss.',
            'Ethical frameworks for AI use in research are still in their infancy.',
            'Data privacy remains a top concern for researchers using cloud-based AI services.'
          ],
          gaps: [
            'Lack of long-term studies on the quality of AI-assisted research.',
            'Insufficient exploration of AI impact on qualitative research methods.',
            'Need for standardized reporting guidelines for AI-assisted papers.'
          ],
          futureIdeas: [
            'Develop domain-specific LLMs for niche scientific fields.',
            'Create decentralized AI platforms for secure research data processing.',
            'Implement blockchain-based verification for AI-generated research outputs.'
          ]
        });
      }, 1000);
    }, 3000);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col items-center text-center space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Upload Research Paper</h2>
        <p className="text-secondary-text max-w-lg">
          Upload your PDF research paper and let our AI extract key insights, summaries, and future research directions in seconds.
        </p>
      </div>

      <Card className={cn(
        "relative border-2 border-dashed transition-all duration-300 overflow-hidden",
        isDragging ? "border-primary bg-primary/5 scale-[1.01]" : "border-[#CBD5E1] bg-[#F1F5F9]",
        uploadStatus !== 'idle' ? "pointer-events-none" : "cursor-pointer"
      )}>
        <CardContent className="p-12">
          <AnimatePresence mode="wait">
            {uploadStatus === 'idle' ? (
              <motion.div
                key="idle"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col items-center space-y-4"
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => document.getElementById('file-upload')?.click()}
              >
                <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mb-2 shadow-lg shadow-primary/20">
                  <Upload className="w-8 h-8 text-white" />
                </div>
                <div className="space-y-1 text-center">
                  <p className="text-lg font-semibold text-text-primary">Drag & Drop PDF or</p>
                  <Button className="bg-primary hover:bg-primary/90 text-white font-semibold px-6">Browse Files</Button>
                </div>
                <input 
                  id="file-upload" 
                  type="file" 
                  className="hidden" 
                  accept=".pdf" 
                  onChange={handleFileSelect}
                />
              </motion.div>
            ) : (
              <motion.div
                key="active"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center space-y-6 max-w-md mx-auto"
              >
                <div className="w-full flex items-center gap-4 p-4 bg-secondary/30 rounded-xl border border-border/50">
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                    <File className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{file?.name}</p>
                    <p className="text-xs text-secondary-text">{(file?.size || 0) / 1024 / 1024 < 1 ? `${((file?.size || 0) / 1024).toFixed(1)} KB` : `${((file?.size || 0) / 1024 / 1024).toFixed(1)} MB`}</p>
                  </div>
                  {uploadStatus === 'uploading' && (
                    <Button variant="ghost" size="icon" onClick={() => setUploadStatus('idle')}>
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>

                <div className="w-full space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">
                      {uploadStatus === 'uploading' ? 'Uploading...' : uploadStatus === 'analyzing' ? 'AI Analyzing...' : 'Completed'}
                    </span>
                    <span className="text-secondary-text">{uploadStatus === 'uploading' ? `${progress}%` : uploadStatus === 'analyzing' ? 'Processing' : 'Done'}</span>
                  </div>
                  <Progress value={uploadStatus === 'uploading' ? progress : uploadStatus === 'analyzing' ? 90 : 100} className="h-2" />
                </div>

                <div className="flex items-center gap-3 text-sm">
                  {uploadStatus === 'uploading' ? (
                    <Loader2 className="w-4 h-4 text-primary animate-spin" />
                  ) : uploadStatus === 'analyzing' ? (
                    <Loader2 className="w-4 h-4 text-accent-green animate-spin" />
                  ) : (
                    <CheckCircle2 className="w-4 h-4 text-accent-green" />
                  )}
                  <p className="text-secondary-text">
                    {uploadStatus === 'uploading' ? 'Sending file to secure servers...' : uploadStatus === 'analyzing' ? 'Extracting text and generating insights...' : 'Analysis complete! Redirecting...'}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { icon: AlertCircle, title: 'PDF Only', desc: 'Currently we only support PDF research papers.' },
          { icon: CheckCircle2, title: 'Fast Analysis', desc: 'Get results in under 30 seconds.' },
          { icon: Loader2, title: 'AI Powered', desc: 'Powered by advanced Gemini LLM.' },
        ].map((item, i) => (
          <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-card/30 border border-border/50">
            <item.icon className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-sm">{item.title}</p>
              <p className="text-xs text-secondary-text">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
