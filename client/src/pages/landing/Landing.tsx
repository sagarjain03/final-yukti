import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Swords, Users, Trophy, Zap, Shield, Code } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Footer } from '@/components/layout/Footer';
import { SparklesCore } from '@/components/ui/sparkles';
import { HoverEffect } from '@/components/ui/card-hover-effect';
import { EncryptedText } from '@/components/ui/encrypted-text';
import { GlobalNavigation } from '@/components/layout/GlobalNavigation';

const features = [
    { icon: Swords, title: '1v1 Duels', description: 'Real-time battles with ELO-based matchmaking.' },
    { icon: Users, title: 'Squad Wars', description: 'Team up with friends for group competitions.' },
    { icon: Trophy, title: 'Global Rankings', description: 'Compete for the top spot on the leaderboard.' },
    { icon: Zap, title: 'Performance Scoring', description: 'Points for speed and code optimization.' },
    { icon: Shield, title: 'Secure Execution', description: 'Code runs in isolated containers.' },
    { icon: Code, title: 'Multi-Language', description: 'Python, JavaScript, C++, Java, and more.' },
];

export function Landing() {
    return (
        <div className="min-h-screen bg-background relative overflow-hidden">
            <GlobalNavigation />

            <div className="absolute inset-0 z-0">
                <SparklesCore
                    id="tsparticlesfullpage"
                    background="transparent"
                    minSize={0.6}
                    maxSize={1.4}
                    particleDensity={100}
                    className="w-full h-full"
                    particleColor="#FFFFFF"
                />
            </div>

            {/* Hero */}
            <section className="px-4 py-24 md:py-32 relative z-10">
                <div className="container mx-auto max-w-4xl text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="mb-6 text-5xl font-bold tracking-tight text-foreground md:text-7xl">
                            <EncryptedText text="Competitive Coding," />
                            <br />
                            <span className="text-muted-foreground"><EncryptedText text="Simplified." revealDelayMs={70} /></span>
                        </h1>
                        <p className="mx-auto mb-12 max-w-lg text-lg text-muted-foreground">
                            Real-time head-to-head coding battles. Climb the ranks. Prove your skills.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.4 }}
                        className="flex flex-col items-center justify-center gap-3 sm:flex-row"
                    >
                        <Link to="/signup">
                            <Button size="lg" className="min-w-[160px]">
                                Get Started
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                        <Link to="/leaderboard">
                            <Button variant="outline" size="lg" className="min-w-[160px]">
                                View Leaderboard
                            </Button>
                        </Link>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.4 }}
                        className="mt-24 grid grid-cols-3 gap-8"
                    >
                        {[
                            { value: '10K+', label: 'Players' },
                            { value: '50K+', label: 'Matches' },
                            { value: '100K+', label: 'Problems Solved' },
                        ].map((stat) => (
                            <div key={stat.label}>
                                <p className="text-3xl font-bold tabular-nums text-foreground md:text-4xl">{stat.value}</p>
                                <p className="text-sm text-muted-foreground">{stat.label}</p>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Features */}
            <section className="border-t border-border px-4 py-20">
                <div className="container mx-auto max-w-5xl">
                    <motion.h2
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="mb-8 text-center text-xl font-semibold text-foreground relative z-10"
                    >
                        Built for competitive programmers
                    </motion.h2>

                    <div className="relative z-10">
                        <HoverEffect
                            items={features.map(f => ({
                                title: f.title,
                                description: f.description,
                                link: "#"
                            }))}
                        />
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="border-t border-border px-4 py-20">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="container mx-auto max-w-2xl text-center"
                >
                    <h2 className="mb-4 text-2xl font-semibold text-foreground">
                        Ready to compete?
                    </h2>
                    <p className="mb-8 text-muted-foreground">
                        Join thousands of developers challenging each other daily.
                    </p>
                    <Link to="/signup">
                        <Button size="lg">
                            Create Account
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </Link>
                </motion.div>
            </section>

            <Footer />
        </div>
    );
}
