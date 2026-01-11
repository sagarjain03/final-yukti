import { motion, LazyMotion, domAnimation } from 'framer-motion';
import { Trophy, Clock, Target, Zap, Activity, Brain } from 'lucide-react';
import { Footer } from '@/components/layout/Footer';
import { useAuth } from '@/hooks';
import { Spotlight } from '@/components/ui/spotlight-new';
import { GlobalNavigation } from '@/components/layout/GlobalNavigation';
import { AnimatedCounter } from '@/components/profile/AnimatedCounter';
import {
    QuickActionsStrip,
    StatCard,
    MomentumBar,
    MatchRow
} from '@/components/dashboard';
import { Link } from 'react-router-dom';

// Mock data - In a real app, this would come from an API
const recentMatches = [
    { id: '1', opponent: 'CodeMaster', result: 'win' as const, eloChange: 25, date: '2h ago' },
    { id: '2', opponent: 'AlgoKing', result: 'loss' as const, eloChange: -18, date: '5h ago' },
    { id: '3', opponent: 'ByteNinja', result: 'win' as const, eloChange: 22, date: '1d ago' },
    { id: '4', opponent: 'DevWizard', result: 'win' as const, eloChange: 15, date: '2d ago' },
    { id: '5', opponent: 'SystemArch', result: 'loss' as const, eloChange: -12, date: '3d ago' },
];

const stats = [
    // Row 1: High Priority
    {
        title: "ELO Rating",
        value: "1,450",
        trend: "+52 this week",
        isPositive: true,
        variant: 'primary' as const,
        icon: <Trophy className="w-4 h-4" />
    },
    {
        title: "Win Rate",
        value: "68%",
        trend: "+3%",
        isPositive: true,
        variant: 'primary' as const,
        icon: <Zap className="w-4 h-4" />
    },
    {
        title: "Elo Momentum",
        value: "+52",
        trend: "Rising",
        isPositive: true,
        variant: 'primary' as const,
        icon: <Activity className="w-4 h-4" />
    },
    // Row 2: Secondary
    {
        title: "Matches Played",
        value: "47",
        subtext: "12 this week",
        variant: 'secondary' as const,
        icon: <Target className="w-4 h-4" />
    },
    {
        title: "Avg Solve Time",
        value: "3m 42s",
        subtext: "Top 15% globally",
        variant: 'secondary' as const,
        icon: <Clock className="w-4 h-4" />
    },
    {
        title: "Consistency",
        value: "Stable",
        subtext: "Last 20 matches",
        variant: 'secondary' as const,
        icon: <Brain className="w-4 h-4" />
    },
];

export function Dashboard() {
    const { user } = useAuth();
    const currentElo = user?.elo || 1200;
    const targetElo = Math.ceil((currentElo + 100) / 100) * 100; // Next round hundred

    return (
        <div className="min-h-screen bg-background relative overflow-hidden">
            <GlobalNavigation />

            <div className="absolute inset-0 z-0 pointer-events-none">
                <Spotlight />
            </div>

            <main className="container mx-auto max-w-5xl px-4 py-12 relative z-10">
                {/* 1. Spotlight Hero */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="mb-10 text-center"
                >
                    <p className="mb-2 text-sm font-space text-muted-foreground">Welcome back,</p>
                    <h1 className="mb-6 text-2xl font-medium font-space text-foreground">
                        {user?.username || 'Player'}
                    </h1>

                    {/* ELO Display */}
                    <div className="flex flex-col items-center justify-center">
                        <div className="flex items-start gap-2">
                            <span className="text-6xl font-bold font-space tracking-tight text-foreground md:text-7xl">
                                <AnimatedCounter value={currentElo} duration={1.5} />
                            </span>
                            <span className="mt-2 flex items-center text-xs font-bold text-green-500 bg-green-500/10 px-1.5 py-0.5 rounded">
                                <Trophy className="w-3 h-3 mr-1" />
                                #234
                            </span>
                        </div>
                        <p className="mb-1 text-sm font-space text-muted-foreground">Global Rank</p>
                    </div>
                </motion.div>

                {/* 2. Quick Actions Strip */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.3 }}
                    className="mb-12"
                >
                    <QuickActionsStrip />
                </motion.div>

                {/* 3. Performance Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
                    {stats.map((stat, index) => (
                        <StatCard
                            key={stat.title}
                            {...stat}
                            delay={index + 2} 
                        />
                    ))}
                </div>

                <LazyMotion features={domAnimation}>
                    {/* 4. Momentum Section */}
                    <div className="mb-12">
                        <MomentumBar
                            current={currentElo}
                            target={targetElo}
                            milestoneName="Gold League"
                        />
                    </div>

                    {/* 5. Recent Activity Feed */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                    >
                        <div className="mb-4 flex items-center justify-between px-1">
                            <h2 className="text-sm font-medium font-space text-muted-foreground">Recent Activity</h2>
                            <Link to="/profile" className="text-xs font-space text-muted-foreground hover:text-foreground transition-colors">
                                View all →
                            </Link>
                        </div>
                        <div className="space-y-2">
                            {recentMatches.map((match, index) => (
                                <MatchRow
                                    key={match.id}
                                    {...match}
                                    index={index}
                                />
                            ))}
                        </div>
                    </motion.div>
                </LazyMotion>
            </main>

            <Footer />
        </div>
    );
}
