import { motion } from 'framer-motion';
import { Eye, EyeOff, CheckCircle, XCircle, Clock } from 'lucide-react';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import type { User } from '@/types/user';

interface OpponentPanelProps {
    opponent: User;
}

// Mock opponent progress
const mockProgress = {
    testsPassed: 2,
    totalTests: 5,
    submissionCount: 1,
    lastSubmissionTime: '2 min ago',
    status: 'coding' as const, // 'coding' | 'submitted' | 'idle'
};

export function OpponentPanel({ opponent }: OpponentPanelProps) {
    const [showProgress, setShowProgress] = useState(true);

    return (
        <div className="flex flex-col p-4">
            {/* Opponent Info */}
            <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-orange-500 text-lg font-bold text-white">
                        {opponent.username.charAt(0)}
                    </div>
                    <div>
                        <h3 className="font-semibold">{opponent.username}</h3>
                        <p className="text-sm text-muted-foreground">{opponent.elo} ELO</p>
                    </div>
                </div>
                <button
                    onClick={() => setShowProgress(!showProgress)}
                    className="text-muted-foreground hover:text-foreground"
                >
                    {showProgress ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
                </button>
            </div>

            {showProgress && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="space-y-4"
                >
                    {/* Status */}
                    <Card>
                        <CardContent className="flex items-center gap-3 p-4">
                            <div
                                className={`h-3 w-3 rounded-full ${mockProgress.status === 'coding'
                                        ? 'animate-pulse bg-green-500'
                                        : mockProgress.status === 'submitted'
                                            ? 'bg-blue-500'
                                            : 'bg-gray-500'
                                    }`}
                            />
                            <span className="text-sm capitalize">{mockProgress.status}</span>
                        </CardContent>
                    </Card>

                    {/* Test Progress */}
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm">Test Progress</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-2">
                                {Array.from({ length: mockProgress.totalTests }).map((_, i) => (
                                    <div
                                        key={i}
                                        className={`flex h-8 w-8 items-center justify-center rounded-lg ${i < mockProgress.testsPassed
                                                ? 'bg-green-500/20 text-green-500'
                                                : 'bg-muted text-muted-foreground'
                                            }`}
                                    >
                                        {i < mockProgress.testsPassed ? (
                                            <CheckCircle className="h-4 w-4" />
                                        ) : (
                                            <XCircle className="h-4 w-4" />
                                        )}
                                    </div>
                                ))}
                            </div>
                            <p className="mt-2 text-sm text-muted-foreground">
                                {mockProgress.testsPassed}/{mockProgress.totalTests} tests passed
                            </p>
                        </CardContent>
                    </Card>

                    {/* Submissions */}
                    <Card>
                        <CardContent className="flex items-center justify-between p-4">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Clock className="h-4 w-4" />
                                Last submission: {mockProgress.lastSubmissionTime}
                            </div>
                            <span className="text-sm font-medium">
                                {mockProgress.submissionCount} submissions
                            </span>
                        </CardContent>
                    </Card>
                </motion.div>
            )}
        </div>
    );
}
