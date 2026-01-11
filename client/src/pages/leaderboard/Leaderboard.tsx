import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Search, User, School } from 'lucide-react';
import { useState, useRef } from 'react';
import { Footer } from '@/components/layout/Footer';
import { Input } from '@/components/ui/Input';
import { GlobalNavigation } from '@/components/layout/GlobalNavigation';
import { Spotlight } from '@/components/ui/spotlight-new';

// --- MOCK DATA ---

const mockPlayerLeaderboard = [
    { rank: 1, name: 'AlgorithmGod', elo: 2450, detail: '156W / 23L' },
    { rank: 2, name: 'CodeNinja42', elo: 2380, detail: '142W / 28L' },
    { rank: 3, name: 'ByteWarrior', elo: 2310, detail: '128W / 31L' },
    { rank: 4, name: 'DSAMaster', elo: 2250, detail: '115W / 35L' },
    { rank: 5, name: 'RecursionKing', elo: 2180, detail: '108W / 40L' },
    { rank: 6, name: 'HashMapHero', elo: 2120, detail: '98W / 42L' },
    { rank: 7, name: 'TreeTraverser', elo: 2050, detail: '92W / 45L' },
    { rank: 8, name: 'GraphGuru', elo: 1990, detail: '85W / 48L' },
    { rank: 9, name: 'DynamicDev', elo: 1920, detail: '78W / 52L' },
    { rank: 10, name: 'StackSurfer', elo: 1850, detail: '72W / 55L' },
];

const mockCollegeLeaderboard = [
    { rank: 1, name: 'MIT', elo: 9850, detail: '450 Students' },
    { rank: 2, name: 'Stanford', elo: 9620, detail: '412 Students' },
    { rank: 3, name: 'IIT Bombay', elo: 9540, detail: '520 Students' },
    { rank: 4, name: 'Berkeley', elo: 9300, detail: '380 Students' },
    { rank: 5, name: 'Cambridge', elo: 9150, detail: '340 Students' },
    { rank: 6, name: 'Tsinghua', elo: 8900, detail: '400 Students' },
    { rank: 7, name: 'Oxford', elo: 8750, detail: '310 Students' },
    { rank: 8, name: 'NUS', elo: 8600, detail: '290 Students' },
    { rank: 9, name: 'ETH Zurich', elo: 8450, detail: '275 Students' },
    { rank: 10, name: 'Carnegie Mellon', elo: 8300, detail: '330 Students' },
];

// Simulate current user context
const currentUserName = 'DSAMaster';
const currentUserCollege = 'IIT Bombay';

export function Leaderboard() {
    const [searchQuery, setSearchQuery] = useState('');
    const [view, setView] = useState<'players' | 'colleges'>('players');
    const listRef = useRef<HTMLDivElement>(null);

    // Determine which dataset to use
    const currentData = view === 'players' ? mockPlayerLeaderboard : mockCollegeLeaderboard;

    // Filter logic
    const filteredData = currentData.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const topThree = currentData.slice(0, 3);

    return (
        <div className="h-screen bg-background relative overflow-hidden flex flex-col">
            <GlobalNavigation />

            <main className="container mx-auto max-w-3xl px-4 py-8 flex-1 flex flex-col min-h-0">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-1 flex flex-col min-h-0"
                >
                    {/* Header */}
                    <div className="mb-6 text-center">
                        <h1 className="mb-1 text-5xl font-space font-bold text-foreground">Leaderboard</h1>
                        <p className="text-sm font-space text-muted-foreground">Global Rankings</p>
                    </div>

                    {/* View Switcher (Segmented Control with Sliding Shade) */}
                    <div className="flex justify-center mb-8">
                        <div className="bg-secondary/50 p-1 rounded-lg flex items-center gap-1 border border-border relative">
                            {/* Players Tab */}
                            <button
                                onClick={() => setView('players')}
                                className={`relative flex items-center gap-2 px-4 py-2 rounded-md text-sm font-space font-medium transition-colors z-10 ${
                                    view === 'players' ? 'text-white' : 'text-muted-foreground hover:text-foreground'
                                }`}
                            >
                                {view === 'players' && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute inset-0 bg-blue-600 rounded-md -z-10 shadow-sm"
                                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                    />
                                )}
                                <User size={16} />
                                Players
                            </button>

                            {/* Colleges Tab */}
                            <button
                                onClick={() => setView('colleges')}
                                className={`relative flex items-center gap-2 px-4 py-2 rounded-md text-sm font-space font-medium transition-colors z-10 ${
                                    view === 'colleges' ? 'text-white' : 'text-muted-foreground hover:text-foreground'
                                }`}
                            >
                                {view === 'colleges' && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute inset-0 bg-orange-600 rounded-md -z-10 shadow-sm"
                                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                    />
                                )}
                                <School size={16} />
                                Colleges
                            </button>
                        </div>
                    </div>

                    {/* Top 3 Podium */}
                    <div className="relative mb-6">
                        <div className="absolute inset-0 pointer-events-none">
                            <Spotlight />
                        </div>
                        
                        <AnimatePresence mode='wait'>
                            <motion.div
                                key={view}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.3 }}
                                className="flex items-end justify-center gap-3 relative z-10"
                            >
                                {/* 2nd Place */}
                                <div className="flex flex-col items-center">
                                    <span className="mb-1 text-xs font-space text-muted-foreground">2nd</span>
                                    <div className={`flex h-16 w-24 flex-col items-center justify-center rounded-t-md border border-border relative overflow-hidden group ${
                                        view === 'players' ? 'bg-secondary' : 'bg-orange-950/20'
                                    }`}>
                                        <div className={`absolute inset-0 transition-colors ${
                                            view === 'players' ? 'bg-blue-500/5 group-hover:bg-blue-500/10' : 'bg-orange-500/5 group-hover:bg-orange-500/10'
                                        }`} />
                                        <span className="text-xs font-semibold font-space text-foreground truncate w-full text-center px-1 z-10">{topThree[1].name}</span>
                                        <span className="text-lg font-bold font-space tabular-nums text-foreground z-10">{topThree[1].elo}</span>
                                    </div>
                                </div>

                                {/* 1st Place */}
                                <div className="flex flex-col items-center">
                                    <Trophy className={`mb-1 h-6 w-6 drop-shadow-md transition-colors ${
                                        view === 'players' ? 'text-yellow-500' : 'text-orange-500'
                                    }`} />
                                    <div className={`flex h-24 w-28 flex-col items-center justify-center rounded-t-md border-t-2 bg-secondary border-x border-b border-border relative overflow-hidden group shadow-[0_0_15px_rgba(0,0,0,0.1)] ${
                                        view === 'players' ? 'border-yellow-500' : 'border-orange-500'
                                    }`}>
                                        <div className={`absolute inset-0 transition-colors ${
                                            view === 'players' ? 'bg-yellow-500/10 group-hover:bg-yellow-500/15' : 'bg-orange-500/10 group-hover:bg-orange-500/15'
                                        }`} />
                                        <span className="text-sm font-bold font-space text-foreground truncate w-full text-center px-1 z-10">{topThree[0].name}</span>
                                        <span className="text-xl font-bold font-space tabular-nums text-foreground z-10">{topThree[0].elo}</span>
                                    </div>
                                </div>

                                {/* 3rd Place */}
                                <div className="flex flex-col items-center">
                                    <span className="mb-1 text-xs font-space text-muted-foreground">3rd</span>
                                    <div className={`flex h-14 w-24 flex-col items-center justify-center rounded-t-md border border-border relative overflow-hidden group ${
                                        view === 'players' ? 'bg-secondary' : 'bg-orange-950/20'
                                    }`}>
                                        <div className={`absolute inset-0 transition-colors ${
                                            view === 'players' ? 'bg-blue-500/5 group-hover:bg-blue-500/10' : 'bg-orange-500/5 group-hover:bg-orange-500/10'
                                        }`} />
                                        <span className="text-xs font-semibold font-space text-foreground truncate w-full text-center px-1 z-10">{topThree[2].name}</span>
                                        <span className="text-lg font-bold font-space tabular-nums text-foreground z-10">{topThree[2].elo}</span>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Search Input */}
                    <motion.div className="relative mb-4">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder={`Search ${view}...`}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-9"
                        />
                    </motion.div>

                    {/* Scrollable Table Container - Tinted Background */}
                    <motion.div
                        ref={listRef}
                        animate={{
                            backgroundColor: view === 'players' ? 'rgba(59, 130, 246, 0.03)' : 'rgba(249, 115, 22, 0.03)',
                            borderColor: view === 'players' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(249, 115, 22, 0.2)'
                        }}
                        transition={{ duration: 0.3 }}
                        className="rounded-md border flex-1 overflow-y-auto min-h-0 backdrop-blur-sm"
                    >
                        <table className="w-full">
                            <thead className="sticky top-0 z-10 bg-background/95 backdrop-blur-md border-b border-border">
                                <tr className="text-left text-xs font-space text-muted-foreground uppercase tracking-wider">
                                    <th className="w-16 p-3 font-medium">Rank</th>
                                    <th className="p-3 font-medium">{view === 'players' ? 'Player' : 'College'}</th>
                                    <th className="p-3 text-right font-medium">Score (ELO)</th>
                                    <th className="hidden p-3 text-right font-medium sm:table-cell">
                                        {view === 'players' ? 'W/L Record' : 'Active Students'}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.map((item, index) => {
                                    const isHighlighted = view === 'players' 
                                        ? item.name === currentUserName 
                                        : item.name === currentUserCollege;
                                    
                                    const isTop3 = item.rank <= 3;
                                    
                                    // Dynamic highlight color based on view
                                    const highlightClass = view === 'players' 
                                        ? 'bg-blue-500/10 text-blue-500' 
                                        : 'bg-orange-500/10 text-orange-500';

                                    const rankHighlight = view === 'players'
                                        ? 'bg-blue-500/20 text-blue-500'
                                        : 'bg-orange-500/20 text-orange-500';

                                    return (
                                        <motion.tr
                                            key={`${view}-${item.name}`}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.05 * index, duration: 0.2 }}
                                            className={`border-b border-border last:border-0 transition-colors ${
                                                isHighlighted ? highlightClass : 'hover:bg-secondary/50'
                                            }`}
                                        >
                                            <td className="p-3">
                                                <div className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold font-space ${
                                                    isTop3 ? rankHighlight : 'text-muted-foreground'
                                                }`}>
                                                    {item.rank}
                                                </div>
                                            </td>
                                            <td className="p-3">
                                                <div className="flex items-center gap-2">
                                                    {view === 'colleges' && <School size={14} className={view === 'colleges' ? "text-orange-500/70" : "text-muted-foreground"} />}
                                                    <span className={`text-sm font-medium font-space ${isHighlighted ? 'font-bold' : 'text-foreground'}`}>
                                                        {item.name}
                                                        {isHighlighted && (
                                                            <span className={`ml-2 text-[10px] px-1.5 py-0.5 rounded-full uppercase tracking-wider ${
                                                                view === 'players' ? 'bg-blue-500/20 text-blue-500' : 'bg-orange-500/20 text-orange-500'
                                                            }`}>
                                                                You
                                                            </span>
                                                        )}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="p-3 text-right">
                                                <span className="text-sm font-bold font-space tabular-nums text-foreground">
                                                    {item.elo.toLocaleString()}
                                                </span>
                                            </td>
                                            <td className="hidden p-3 text-right text-sm font-space text-muted-foreground sm:table-cell">
                                                {item.detail}
                                            </td>
                                        </motion.tr>
                                    );
                                })}
                            </tbody>
                        </table>
                        
                        {filteredData.length === 0 && (
                            <div className="p-8 text-center text-muted-foreground font-space text-sm">
                                No {view} found matching "{searchQuery}"
                            </div>
                        )}
                    </motion.div>
                </motion.div>
            </main>

            <Footer />
        </div>
    );
}