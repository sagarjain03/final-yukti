import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trophy, ArrowRight, RotateCcw, Home, TrendingUp, TrendingDown } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { ScoreCard } from '@/components/battle/ScoreCard';
import { PlayerBadge } from '@/components/battle/PlayerBadge';

// Mock result data
const mockResult = {
    winner: 'you',
    you: {
        id: '1',
        username: 'You',
        email: 'you@example.com',
        elo: 1345,
        wins: 26,
        losses: 12,
        totalMatches: 38,
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01',
    },
    opponent: {
        id: '2',
        username: 'CodeMaster',
        email: 'codemaster@example.com',
        elo: 1425,
        wins: 45,
        losses: 21,
        totalMatches: 66,
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01',
    },
    yourScore: {
        correctness: 54,
        timeEfficiency: 18,
        optimization: 16,
        total: 88,
    },
    opponentScore: {
        correctness: 48,
        timeEfficiency: 14,
        optimization: 12,
        total: 74,
    },
    eloChange: 25,
};

export function Result() {
    const { matchId } = useParams();
    const isWinner = mockResult.winner === 'you';

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mx-auto max-w-2xl text-center"
                >
                    {/* Result Banner */}
                    <div
                        className={`mb-8 rounded-2xl p-8 ${isWinner
                                ? 'bg-gradient-to-r from-yellow-500 to-amber-500'
                                : 'bg-gradient-to-r from-gray-600 to-gray-700'
                            }`}
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: 'spring' }}
                        >
                            <Trophy
                                className={`mx-auto mb-4 h-20 w-20 ${isWinner ? 'text-white' : 'text-gray-400'
                                    }`}
                            />
                        </motion.div>
                        <h1 className="mb-2 text-4xl font-bold text-white">
                            {isWinner ? 'Victory!' : 'Defeat'}
                        </h1>
                        <p className="text-white/80">
                            {isWinner
                                ? 'Congratulations! You outperformed your opponent.'
                                : "Don't give up! Learn from this match and try again."}
                        </p>
                    </div>

                    {/* ELO Change */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="mb-8"
                    >
                        <Card>
                            <CardContent className="flex items-center justify-center gap-4 p-6">
                                {isWinner ? (
                                    <TrendingUp className="h-8 w-8 text-green-500" />
                                ) : (
                                    <TrendingDown className="h-8 w-8 text-red-500" />
                                )}
                                <div className="text-left">
                                    <p className="text-sm text-muted-foreground">ELO Change</p>
                                    <p
                                        className={`text-3xl font-bold ${isWinner ? 'text-green-500' : 'text-red-500'
                                            }`}
                                    >
                                        {isWinner ? '+' : '-'}
                                        {mockResult.eloChange}
                                    </p>
                                </div>
                                <div className="ml-4 text-left">
                                    <p className="text-sm text-muted-foreground">New Rating</p>
                                    <p className="text-3xl font-bold">{mockResult.you.elo}</p>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Score Comparison */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="mb-8 grid gap-4 md:grid-cols-2"
                    >
                        <div>
                            <PlayerBadge player={mockResult.you} isCurrentUser className="mb-4" />
                            <ScoreCard
                                correctness={mockResult.yourScore.correctness}
                                timeEfficiency={mockResult.yourScore.timeEfficiency}
                                optimization={mockResult.yourScore.optimization}
                                totalScore={mockResult.yourScore.total}
                            />
                        </div>
                        <div>
                            <PlayerBadge player={mockResult.opponent} className="mb-4" />
                            <ScoreCard
                                correctness={mockResult.opponentScore.correctness}
                                timeEfficiency={mockResult.opponentScore.timeEfficiency}
                                optimization={mockResult.opponentScore.optimization}
                                totalScore={mockResult.opponentScore.total}
                            />
                        </div>
                    </motion.div>

                    {/* Actions */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="flex flex-col gap-4 sm:flex-row sm:justify-center"
                    >
                        <Link to={`/analysis/${matchId}`}>
                            <Button variant="gradient" size="lg">
                                View Analysis
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                        <Link to="/lobby">
                            <Button variant="outline" size="lg">
                                <RotateCcw className="mr-2 h-4 w-4" />
                                Play Again
                            </Button>
                        </Link>
                        <Link to="/dashboard">
                            <Button variant="ghost" size="lg">
                                <Home className="mr-2 h-4 w-4" />
                                Dashboard
                            </Button>
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}
