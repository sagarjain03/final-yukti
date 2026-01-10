import { motion } from 'framer-motion';
import { Target, Clock, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { cn } from '@/lib/utils';

interface ScoreCardProps {
    correctness: number;
    timeEfficiency: number;
    optimization: number;
    totalScore: number;
    className?: string;
}

export function ScoreCard({
    correctness,
    timeEfficiency,
    optimization,
    totalScore,
    className,
}: ScoreCardProps) {
    const scoreItems = [
        { label: 'Correctness', value: correctness, max: 60, icon: Target, color: 'text-blue-500' },
        { label: 'Time', value: timeEfficiency, max: 20, icon: Clock, color: 'text-yellow-500' },
        { label: 'Optimization', value: optimization, max: 20, icon: Zap, color: 'text-purple-500' },
    ];

    return (
        <Card className={cn('overflow-hidden', className)}>
            <CardHeader className="pb-2">
                <CardTitle className="flex items-center justify-between text-lg">
                    <span>Score</span>
                    <motion.span
                        key={totalScore}
                        initial={{ scale: 1.2 }}
                        animate={{ scale: 1 }}
                        className="text-2xl font-bold text-primary"
                    >
                        {totalScore}
                    </motion.span>
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                {scoreItems.map((item) => {
                    const Icon = item.icon;
                    const percentage = (item.value / item.max) * 100;

                    return (
                        <div key={item.label} className="space-y-1">
                            <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2">
                                    <Icon className={cn('h-4 w-4', item.color)} />
                                    <span className="text-muted-foreground">{item.label}</span>
                                </div>
                                <span className="font-medium">
                                    {item.value}/{item.max}
                                </span>
                            </div>
                            <div className="h-2 overflow-hidden rounded-full bg-muted">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${percentage}%` }}
                                    transition={{ duration: 0.5, ease: 'easeOut' }}
                                    className={cn('h-full rounded-full', {
                                        'bg-blue-500': item.label === 'Correctness',
                                        'bg-yellow-500': item.label === 'Time',
                                        'bg-purple-500': item.label === 'Optimization',
                                    })}
                                />
                            </div>
                        </div>
                    );
                })}
            </CardContent>
        </Card>
    );
}
