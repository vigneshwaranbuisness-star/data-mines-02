import React from 'react';
import { motion } from 'motion/react';
import { 
  FileText, 
  Lightbulb, 
  Target, 
  Compass, 
  Download, 
  Share2, 
  ArrowLeft,
  CheckCircle2,
  Bookmark
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Paper } from '@/types';

interface AnalysisResultsProps {
  paper: Paper;
  onBack: () => void;
}

export default function AnalysisResults({ paper, onBack }: AnalysisResultsProps) {
  return (
    <div className="space-y-6 pb-12">
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack} className="w-fit -ml-2 text-secondary-text hover:text-foreground">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="border-border">
            <Bookmark className="w-4 h-4 mr-2" />
            Save
          </Button>
          <Button size="sm" className="bg-primary hover:bg-primary/90 text-white">
            <Download className="w-4 h-4 mr-2" />
            Export PDF
          </Button>
        </div>
      </div>

      {/* Paper Header Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-primary text-white p-6 rounded-xl shadow-lg"
      >
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-white/20 text-white border-none text-[10px] uppercase tracking-wider">AI Research</Badge>
            <Badge variant="secondary" className="bg-accent-green/20 text-white border-none text-[10px] uppercase tracking-wider">Verified</Badge>
          </div>
          <h1 className="text-2xl font-bold">{paper.title}</h1>
          <div className="flex gap-6 text-sm opacity-90">
            <span>Authors: Vaswani et al.</span>
            <span>Date: June 2017</span>
            <span>Field: NLP / Deep Learning</span>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Summary Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="border-border shadow-sm h-full">
            <CardHeader className="pb-3">
              <span className="text-[11px] uppercase tracking-wider font-bold text-secondary-text">Executive Summary</span>
            </CardHeader>
            <CardContent>
              <p className="text-foreground leading-relaxed text-sm">
                {paper.summary}
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Key Insights Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="border-border shadow-sm h-full">
            <CardHeader className="pb-3">
              <span className="text-[11px] uppercase tracking-wider font-bold text-secondary-text">Key Insights</span>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {paper.insights?.map((insight, i) => (
                  <li key={i} className="flex gap-3 text-sm pb-3 border-b border-secondary/50 last:border-0">
                    <span className="text-accent-green font-bold">•</span>
                    <p className="text-foreground">{insight}</p>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>

        {/* Research Gaps Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="border-border shadow-sm h-full">
            <CardHeader className="pb-3">
              <span className="text-[11px] uppercase tracking-wider font-bold text-secondary-text">Research Gaps</span>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-4">
                {paper.gaps?.slice(0, 2).map((gap, i) => (
                  <span key={i} className="bg-[#EFF6FF] text-primary rounded-md px-2 py-1 text-[11px] font-semibold">
                    {gap.split(' ').slice(0, 2).join(' ')}
                  </span>
                ))}
              </div>
              <ul className="space-y-3">
                {paper.gaps?.map((gap, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <div className="mt-1.5 w-1 h-1 rounded-full bg-destructive shrink-0" />
                    <p className="text-xs text-secondary-text leading-relaxed">{gap}</p>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>

        {/* Future Directions Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="border-border shadow-sm h-full">
            <CardHeader className="pb-3">
              <span className="text-[11px] uppercase tracking-wider font-bold text-secondary-text">Future Directions</span>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {paper.futureIdeas?.map((idea, i) => (
                  <div key={i} className="p-3 rounded-lg bg-secondary/30 border border-border">
                    <p className="text-sm text-primary font-medium">{idea}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
