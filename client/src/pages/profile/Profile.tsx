import { memo, useRef, useEffect, useState } from 'react';
import { Edit2, Github, Linkedin, Swords, ArrowRight } from 'lucide-react';
import { Footer } from '@/components/layout/Footer';
import { GlobalNavigation } from '@/components/layout/GlobalNavigation';
import { Button } from '@/components/ui/Button';
import {
    GlowAvatar,
    RankBadge,
    Timeline,
    ProgressBar,
    AnimatedCounter,
    BattleCard,
    AchievementBadge,
} from '@/components/profile';
import { useAuth } from '@/hooks';

// Optimized section wrapper with IntersectionObserver
const AnimatedSection = memo(({ children, className = '', delay = 0 }: {
    children: React.ReactNode;
    className?: string;
    delay?: number;
}) => {
    const ref = useRef<HTMLElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTimeout(() => setIsVisible(true), delay * 100);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [delay]);

    return (
        <section
            ref={ref}
            className={`${className} transition-all duration-500 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                }`}
        >
            {children}
        </section>
    );
});

// Memoized circular progress to avoid re-renders
const CircularProgress = memo(({ value }: { value: number }) => {
    const ref = useRef<SVGPathElement>(null);
    const [animatedValue, setAnimatedValue] = useState(0);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    // Animate to target value
                    let current = 0;
                    const step = value / 60; // 60 frames
                    const animate = () => {
                        current += step;
                        if (current < value) {
                            setAnimatedValue(current);
                            requestAnimationFrame(animate);
                        } else {
                            setAnimatedValue(value);
                        }
                    };
                    requestAnimationFrame(animate);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [value]);

    return (
        <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36">
            <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-red-500/30"
            />
            <path
                ref={ref}
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray={`${animatedValue}, 100`}
                className="text-green-500 transition-all duration-100"
            />
        </svg>
    );
});

// Mock data for fields not yet available from backend
const mockAchievements = [
    { id: '1', name: 'First Victory', icon: '🏆', description: 'Win your first match', unlocked: true, requirement: 'Win 1 match' },
    { id: '2', name: 'Streak Master', icon: '🔥', description: 'Win 5 matches in a row', unlocked: true, requirement: 'Win 5 ranked matches in a row' },
    { id: '3', name: 'Speed Demon', icon: '⚡', description: 'Solve a problem in under 5 minutes', unlocked: false, requirement: 'Complete any problem under 5 minutes' },
    { id: '4', name: 'Perfectionist', icon: '💯', description: 'Get a perfect score', unlocked: false, requirement: 'Pass all test cases on first submission' },
];

const mockMatchHistory = [
    { id: '1', opponent: 'AlgoKing', result: 'win' as const, eloChange: 25, date: '2 hours ago', matchType: 'ranked' as const },
    { id: '2', opponent: 'ByteNinja', result: 'loss' as const, eloChange: -18, date: '5 hours ago', matchType: 'ranked' as const },
    { id: '3', opponent: 'CodeMaster', result: 'win' as const, eloChange: 22, date: '1 day ago', matchType: 'ranked' as const },
];

export function Profile() {
    const { user } = useAuth();

    // Derive profile data from authenticated user with fallbacks
    const profile = {
        username: user?.username || 'Player',
        email: user?.email || '',
        tagline: user?.college ? `${user.college} · Competitive Programmer` : 'Competitive Programmer',
        elo: user?.elo || 1200,
        rank: 999, // TODO: Fetch from leaderboard API
        wins: user?.wins || 0,
        losses: user?.losses || 0,
        totalMatches: user?.totalMatches || 0,
        winRate: user?.totalMatches ? Math.round((user.wins / user.totalMatches) * 100) : 0,
        joinDate: user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'New',
        status: 'online' as const,
        rankTier: (user?.elo || 1200) >= 1500 ? 'gold' as const : (user?.elo || 1200) >= 1300 ? 'silver' as const : 'bronze' as const,
        // Performance metrics (mock until backend supports)
        speed: 75,
        accuracy: 82,
        optimization: 70,
        peakElo: user?.elo || 1200,
        nextGoal: {
            title: `Reach ${Math.ceil(((user?.elo || 1200) + 100) / 100) * 100} ELO`,
            current: user?.elo || 1200,
            target: Math.ceil(((user?.elo || 1200) + 100) / 100) * 100,
        },
    };

    const careerMilestones = [
        { id: '1', icon: '🕒', label: 'Joined', value: profile.joinDate },
        { id: '2', icon: '🏆', label: 'First Win', value: profile.wins > 0 ? `+${Math.round(profile.elo * 0.015)} ELO` : 'Pending' },
        { id: '3', icon: '🔥', label: 'Peak ELO', value: String(profile.peakElo) },
        { id: '4', icon: '⚔️', label: 'Current Rank', value: `#${profile.rank}`, isCurrent: true },
    ];

    const goalProgress = ((profile.nextGoal.current / profile.nextGoal.target) * 100);

    return (
        <div className="min-h-screen bg-background relative">
            <GlobalNavigation />

            {/* Removed BackgroundBeams for performance - using subtle CSS gradient instead */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-purple-900/5 via-transparent to-blue-900/5" />

            <main className="container relative z-10 mx-auto px-4 py-8">
                {/* ========== SECTION 1: Player Identity Hero ========== */}
                <section className="relative mb-12 overflow-hidden rounded-2xl border border-border bg-card/30 backdrop-blur-sm animate-fade-in-up">
                    {/* Animated gradient header - CSS only */}
                    <div className="absolute inset-0 h-40 bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-purple-600/20 animate-gradient-flow" />

                    <div className="relative px-6 py-8 pt-20">
                        <div className="flex flex-col items-center gap-8 md:flex-row md:items-start md:justify-between">
                            {/* Left: Avatar + Name + Tagline */}
                            <div className="flex flex-col items-center gap-4 md:flex-row md:items-start md:gap-6">
                                <GlowAvatar
                                    initial={profile.username}
                                    name={profile.username}
                                    rank={profile.rankTier}
                                    status={profile.status}
                                    size="lg"
                                />

                                <div className="text-center md:text-left">
                                    <div className="flex items-center justify-center gap-3 md:justify-start">
                                        <h1 className="text-3xl font-bold font-space text-foreground">
                                            {profile.username}
                                        </h1>
                                        <Button variant="outline" size="sm" className="h-8 font-space">
                                            <Edit2 className="mr-1 h-3 w-3" />
                                            Edit
                                        </Button>
                                    </div>

                                    <p className="mt-2 text-muted-foreground font-space">
                                        {profile.tagline} · <span className="text-purple-400">Rank #{profile.rank}</span>
                                    </p>

                                    <div className="mt-3 flex items-center justify-center gap-4 md:justify-start">
                                        <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                                            <Github className="h-5 w-5" />
                                        </a>
                                        <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                                            <Linkedin className="h-5 w-5" />
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Right: Rank stats as badges */}
                            <div className="flex gap-4">
                                <RankBadge label="ELO" value={profile.elo} variant="elo" />
                                <RankBadge label="Rank" value={`#${profile.rank}`} variant="rank" />
                                <RankBadge label="Win %" value={`${profile.winRate}%`} variant="winrate" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* ========== SECTION 2: Career Snapshot Timeline ========== */}
                <AnimatedSection className="mb-12" delay={1}>
                    <h2 className="mb-6 text-xl font-semibold font-space text-foreground">
                        🎯 Your Journey So Far
                    </h2>
                    <div className="rounded-xl border border-border bg-card/30 backdrop-blur-sm p-4">
                        <Timeline milestones={careerMilestones} />
                    </div>
                </AnimatedSection>

                {/* ========== SECTION 3: Performance Deep Dive ========== */}
                <AnimatedSection className="mb-12" delay={2}>
                    <h2 className="mb-6 text-xl font-semibold font-space text-foreground">
                        📊 Performance Deep Dive
                    </h2>

                    <div className="grid gap-6 md:grid-cols-2">
                        {/* Left: Win/Loss Breakdown */}
                        <div className="rounded-xl border border-border bg-card/30 backdrop-blur-sm p-6">
                            <h3 className="mb-4 text-lg font-medium font-space text-foreground">Win/Loss Breakdown</h3>
                            <div className="flex items-center justify-center gap-8">
                                {/* Circular progress - optimized */}
                                <div className="relative h-32 w-32">
                                    <CircularProgress value={profile.winRate} />
                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        <span className="text-2xl font-bold font-space text-foreground">
                                            <AnimatedCounter value={profile.winRate} suffix="%" />
                                        </span>
                                        <span className="text-xs text-muted-foreground font-space">Win Rate</span>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <div className="h-3 w-3 rounded-full bg-green-500" />
                                        <span className="text-sm text-muted-foreground font-space">Wins:</span>
                                        <span className="font-bold text-green-500 font-space">
                                            <AnimatedCounter value={profile.wins} />
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="h-3 w-3 rounded-full bg-red-500" />
                                        <span className="text-sm text-muted-foreground font-space">Losses:</span>
                                        <span className="font-bold text-red-500 font-space">
                                            <AnimatedCounter value={profile.losses} />
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Swords className="h-3 w-3 text-muted-foreground" />
                                        <span className="text-sm text-muted-foreground font-space">Total:</span>
                                        <span className="font-bold font-space">
                                            <AnimatedCounter value={profile.totalMatches} />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right: Skill Breakdown */}
                        <div className="rounded-xl border border-border bg-card/30 backdrop-blur-sm p-6">
                            <h3 className="mb-4 text-lg font-medium font-space text-foreground">Skill Breakdown</h3>
                            <div className="space-y-4">
                                <ProgressBar
                                    label="Speed"
                                    value={profile.speed}
                                    color="orange"
                                    description="Avg solve time"
                                />
                                <ProgressBar
                                    label="Accuracy"
                                    value={profile.accuracy}
                                    color="green"
                                    description="Test cases passed"
                                />
                                <ProgressBar
                                    label="Optimization"
                                    value={profile.optimization}
                                    color="blue"
                                    description="Time/space efficiency"
                                />
                            </div>
                        </div>
                    </div>
                </AnimatedSection>

                {/* ========== SECTION 4: Match History ========== */}
                <AnimatedSection className="mb-12" delay={3}>
                    <h2 className="mb-6 text-xl font-semibold font-space text-foreground">
                        ⚔️ Battle History
                    </h2>

                    <div className="grid gap-4 sm:grid-cols-2">
                        {mockMatchHistory.map((match, index) => (
                            <BattleCard
                                key={match.id}
                                opponent={match.opponent}
                                result={match.result}
                                eloChange={match.eloChange}
                                timeAgo={match.date}
                                matchType={match.matchType}
                                index={index}
                            />
                        ))}
                    </div>
                </AnimatedSection>

                {/* ========== SECTION 5: Achievements Grid ========== */}
                <AnimatedSection className="mb-12" delay={4}>
                    <h2 className="mb-6 text-xl font-semibold font-space text-foreground">
                        🏅 Achievements
                    </h2>

                    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                        {mockAchievements.map((achievement, index) => (
                            <AchievementBadge
                                key={achievement.id}
                                name={achievement.name}
                                icon={achievement.icon}
                                description={achievement.description}
                                requirement={achievement.requirement}
                                unlocked={achievement.unlocked}
                                index={index}
                            />
                        ))}
                    </div>
                </AnimatedSection>

                {/* ========== SECTION 6: Future CTA - Quest Style ========== */}
                <AnimatedSection className="mb-8" delay={5}>
                    <div className="overflow-hidden rounded-2xl border border-purple-500/30 bg-gradient-to-r from-purple-900/20 via-card/30 to-blue-900/20 backdrop-blur-sm">
                        <div className="p-8 text-center">
                            <h2 className="mb-2 text-2xl font-bold font-space text-foreground">🎮 What's Next?</h2>
                            <p className="mb-6 text-lg text-muted-foreground font-space">
                                Next Goal: <span className="text-purple-400 font-semibold">{profile.nextGoal.title}</span>
                            </p>

                            {/* Goal progress bar */}
                            <div className="mx-auto mb-6 max-w-md">
                                <div className="flex justify-between text-sm text-muted-foreground mb-2 font-space">
                                    <span>Current: {profile.nextGoal.current}</span>
                                    <span>Target: {profile.nextGoal.target}</span>
                                </div>
                                <div className="h-3 w-full overflow-hidden rounded-full bg-secondary">
                                    <div
                                        className="h-full rounded-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-1000 ease-out"
                                        style={{ width: `${goalProgress}%` }}
                                    />
                                </div>
                                <p className="mt-2 text-sm text-muted-foreground font-space">
                                    {profile.nextGoal.target - profile.nextGoal.current} ELO to go!
                                </p>
                            </div>

                            {/* CTA Button with CSS glow pulse */}
                            <div className="inline-block rounded-lg animate-cta-glow">
                                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold px-8 font-space">
                                    Enter Arena
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </AnimatedSection>
            </main>

            <Footer />
        </div>
    );
}
