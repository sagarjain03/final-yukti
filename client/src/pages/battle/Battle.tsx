import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Timer } from '@/components/battle/Timer';
import { ScoreCard } from '@/components/battle/ScoreCard';
import { PlayerBadge } from '@/components/battle/PlayerBadge';
import { EditorPanel } from './EditorPanel';
import { ProblemPanel } from './ProblemPanel';
import { OpponentPanel } from './OpponentPanel';
import { MATCH_DURATION } from '@/utils/constants';

// Mock data
const mockUser = {
    id: '1',
    username: 'You',
    email: 'you@example.com',
    elo: 1320,
    wins: 25,
    losses: 12,
    totalMatches: 37,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
};

const mockOpponent = {
    id: '2',
    username: 'CodeMaster',
    email: 'codemaster@example.com',
    elo: 1450,
    wins: 45,
    losses: 20,
    totalMatches: 65,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
};

export function Battle() {
    const { matchId } = useParams();
    const [code, setCode] = useState('// Write your solution here\n\nfunction solution(input) {\n  \n}');
    const [activePanel, setActivePanel] = useState<'problem' | 'opponent'>('problem');

    const handleTimeUp = () => {
        console.log('Time is up! Auto-submitting...');
    };

    const handleSubmit = () => {
        console.log('Submitting code:', code);
    };

    return (
        <div className="flex h-screen flex-col bg-background">
            {/* Minimal Header */}
            <header className="flex h-12 items-center justify-between border-b border-border px-3">
                <PlayerBadge player={mockUser} isCurrentUser size="sm" showElo />
                <Timer
                    initialSeconds={MATCH_DURATION}
                    onComplete={handleTimeUp}
                    autoStart
                />
                <PlayerBadge player={mockOpponent} size="sm" showElo />
            </header>

            {/* Main Content - Editor Dominates */}
            <div className="flex flex-1 overflow-hidden">
                {/* Problem Panel - Narrower */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className="hidden w-[28%] min-w-[280px] flex-col border-r border-border md:flex"
                >
                    <ProblemPanel />
                </motion.div>

                {/* Editor - Maximum Width */}
                <div className="flex flex-1 flex-col">
                    <EditorPanel
                        code={code}
                        onChange={setCode}
                        onSubmit={handleSubmit}
                    />
                </div>

                {/* Opponent Panel - Minimal */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className="hidden w-64 flex-col border-l border-border md:flex"
                >
                    <OpponentPanel opponent={mockOpponent} />
                    <div className="border-t border-border p-3">
                        <ScoreCard
                            correctness={45}
                            timeEfficiency={15}
                            optimization={12}
                            totalScore={72}
                        />
                    </div>
                </motion.div>
            </div>

            {/* Mobile Nav */}
            <div className="flex border-t border-border md:hidden">
                <button
                    onClick={() => setActivePanel('problem')}
                    className={`flex-1 py-2.5 text-center text-sm font-medium transition-colors ${activePanel === 'problem'
                            ? 'bg-secondary text-foreground'
                            : 'text-muted-foreground'
                        }`}
                >
                    Problem
                </button>
                <button
                    onClick={() => setActivePanel('opponent')}
                    className={`flex-1 py-2.5 text-center text-sm font-medium transition-colors ${activePanel === 'opponent'
                            ? 'bg-secondary text-foreground'
                            : 'text-muted-foreground'
                        }`}
                >
                    Opponent
                </button>
            </div>
        </div>
    );
}
