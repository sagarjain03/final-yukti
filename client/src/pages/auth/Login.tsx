import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Swords, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAuth } from '@/hooks';

import { SparklesCore } from '@/components/ui/sparkles';
import { GlobalNavigation } from '@/components/layout/GlobalNavigation';

export function Login() {
    const navigate = useNavigate();
    const location = useLocation();
    const { login, isLoading, error } = useAuth();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [showPassword, setShowPassword] = useState(false);

    const from = location.state?.from?.pathname || '/dashboard';

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = await login(formData);
        if (result.meta.requestStatus === 'fulfilled') {
            navigate(from, { replace: true });
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12 relative overflow-hidden">
            <GlobalNavigation />
            <div className="absolute inset-0 z-0">
                <SparklesCore
                    id="tsparticleslogin"
                    background="transparent"
                    minSize={0.6}
                    maxSize={1.4}
                    particleDensity={100}
                    className="w-full h-full"
                    particleColor="#FFFFFF"
                />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-sm relative z-10"
            >
                {/* Logo */}
                <Link to="/" className="mb-8 flex items-center justify-center gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary">
                        <Swords className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <span className="text-xl font-semibold text-foreground">CodeBattle</span>
                </Link>

                {/* Form */}
                <div className="rounded-md border border-border bg-card p-6">
                    <div className="mb-6 text-center">
                        <h1 className="text-lg font-semibold text-foreground">Sign in</h1>
                        <p className="text-sm text-muted-foreground">Enter your credentials to continue</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {error && (
                            <div className="rounded-md border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
                                {error}
                            </div>
                        )}

                        <div className="relative">
                            <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="pl-9"
                                required
                            />
                        </div>

                        <div className="relative">
                            <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                className="pl-9 pr-9"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground"
                            >
                                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                        </div>

                        <Button type="submit" className="w-full" isLoading={isLoading}>
                            Sign in
                        </Button>
                    </form>

                    <p className="mt-6 text-center text-sm text-muted-foreground">
                        Don't have an account?{' '}
                        <Link to="/signup" className="text-primary hover:underline">
                            Sign up
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
