import React from 'react';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card';
import { Github, Mail, Lock, Chrome, FileText } from 'lucide-react';

interface LoginPageProps {
  onLogin: () => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  return (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent-green/10 rounded-full blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <Card className="border-none shadow-2xl bg-white rounded-2xl overflow-hidden">
          <CardHeader className="space-y-4 pt-10 pb-6 text-center">
            <div className="mx-auto w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
              <FileText className="text-white w-6 h-6" />
            </div>
            <div className="space-y-1">
              <CardTitle className="text-2xl font-bold tracking-tight text-[#1E293B]">Welcome Back</CardTitle>
              <CardDescription className="text-[#64748B]">
                Enter your credentials to access your research dashboard
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="px-8 pb-10">
            <form onSubmit={(e) => { e.preventDefault(); onLogin(); }} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-semibold text-[#1E293B]">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="sarah.jenkins@university.edu"
                  required
                  className="h-11 bg-[#F8FAFC] border-[#E2E8F0] focus:ring-primary/20"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-sm font-semibold text-[#1E293B]">Password</Label>
                  <a href="#" className="text-xs font-medium text-primary hover:underline">Forgot password?</a>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  className="h-11 bg-[#F8FAFC] border-[#E2E8F0] focus:ring-primary/20"
                />
              </div>
              <div className="flex items-center space-x-2 py-2">
                <Checkbox id="remember" />
                <label
                  htmlFor="remember"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-[#64748B]"
                >
                  Remember me for 30 days
                </label>
              </div>
              <Button type="submit" className="w-full h-11 bg-primary hover:bg-primary/90 text-white font-bold rounded-lg transition-all shadow-lg shadow-primary/20">
                Sign In to Dashboard
              </Button>
            </form>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-[#E2E8F0]" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-4 text-[#64748B] font-bold tracking-wider">Or continue with</span>
              </div>
            </div>

            <Button variant="outline" className="w-full h-11 border-[#E2E8F0] hover:bg-[#F8FAFC] text-[#1E293B] font-semibold">
              <Chrome className="mr-2 h-4 w-4" />
              Google Account
            </Button>
          </CardContent>
          <CardFooter className="bg-[#F8FAFC] border-t border-[#E2E8F0] py-4 flex justify-center">
            <p className="text-sm text-[#64748B]">
              New researcher? <a href="#" className="text-primary font-bold hover:underline">Create an account</a>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
