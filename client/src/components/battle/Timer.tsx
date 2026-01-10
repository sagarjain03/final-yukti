import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import { useCountdown } from '@/hooks';
import { cn } from '@/lib/utils';

interface TimerProps {
    initialSeconds: number;
    onComplete?: () => void;
    autoStart?: boolean;
    className?: string;
    showIcon?: boolean;
}

export function Timer({
    initialSeconds,
    onComplete,
    autoStart = true,
    className,
    showIcon = true,
}: TimerProps) {
    const { formatted, seconds, isComplete } = useCountdown(initialSeconds, {
        onComplete,
        autoStart,
    });

    const isUrgent = seconds <= 30 && !isComplete;
    const isCritical = seconds <= 10 && !isComplete;

    const getTimerColor = () => {
        if (isCritical) return 'text-red-500';
        if (isUrgent) return 'text-yellow-500';
        return 'text-foreground';
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={cn(
                'flex items-center gap-2 rounded-md border border-border bg-card px-4 py-2',
                isCritical && 'border-red-500/50',
                className
            )}
        >
            {showIcon && <Clock className={cn('h-4 w-4', isUrgent ? getTimerColor() : 'text-muted-foreground')} />}
            <span
                className={cn(
                    'font-mono text-lg font-bold tabular-nums transition-colors',
                    getTimerColor(),
                    isCritical && 'animate-pulse'
                )}
            >
                {formatted}
            </span>
        </motion.div>
    );
}
