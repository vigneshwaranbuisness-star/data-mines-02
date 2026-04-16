import React from 'react';
import { motion } from 'motion/react';
import { Upload, FileText, Cpu, Lightbulb, LayoutDashboard, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function WorkflowVisualization() {
  const steps = [
    { icon: Upload, label: 'User Upload', status: 'completed' },
    { icon: FileText, label: 'PDF Extraction', status: 'completed' },
    { icon: Cpu, label: 'AI Processing', status: 'active' },
    { icon: Lightbulb, label: 'Insight Generation', status: 'pending' },
    { icon: LayoutDashboard, label: 'Results Dashboard', status: 'pending' },
  ];

  return (
    <div className="py-8">
      <div className="mb-8">
        <span className="text-[11px] uppercase tracking-wider font-bold text-secondary-text mb-2 block">System Workflow</span>
        <h3 className="text-xl font-bold">Automated Analysis Pipeline</h3>
      </div>

      <div className="relative flex flex-col md:flex-row items-center justify-between max-w-5xl mx-auto gap-8 md:gap-4">
        {/* Connecting Line (Desktop) */}
        <div className="absolute top-8 left-0 w-full h-0.5 bg-border hidden md:block" />

        {steps.map((step, i) => (
          <div key={i} className="relative z-10 flex flex-col items-center group flex-1">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={cn(
                "w-16 h-16 rounded-xl flex items-center justify-center shadow-lg transition-all duration-300",
                step.status === 'completed' ? "bg-accent-green text-white" : 
                step.status === 'active' ? "bg-primary text-white scale-110 ring-4 ring-primary/20" : 
                "bg-white border border-border text-secondary-text"
              )}
            >
              <step.icon className="w-7 h-7" />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 + 0.2 }}
              className="mt-4 text-center"
            >
              <p className={cn(
                "font-bold text-xs uppercase tracking-tight",
                step.status === 'pending' ? "text-secondary-text" : "text-foreground"
              )}>
                {step.label}
              </p>
              <p className="text-[10px] text-secondary-text mt-1">
                {step.status === 'completed' ? 'Success' : step.status === 'active' ? 'Processing...' : 'Waiting'}
              </p>
            </motion.div>

            {i < steps.length - 1 && (
              <div className="md:hidden my-4">
                <ArrowRight className="w-5 h-5 text-secondary-text rotate-90" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
