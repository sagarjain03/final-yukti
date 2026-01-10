import { memo } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Target } from 'lucide-react';

interface MomentumBarProps {
    current: number;
    target: number;
    milestoneName: string;
    className?: string;
}

const MomentumBarComponent = ({
    current,
    target,
    milestoneName,
    className,
}: MomentumBarProps) => {
    // Calculate percentage, capped at 100
    const percentage = Math.min((current / target) * 100, 100);
    const remaining = Math.max(target - current, 0);

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={cn('w-full', className)}
        >
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-purple-500" />
                    <span className="text-sm font-medium font-space text-foreground">Your Momentum</span>
                </div>
                <div className="flex items-baseline gap-1.5">
                    <span className="text-sm font-bold font-space text-foreground">{current}</span>
                    <span className="text-xs font-space text-muted-foreground">/ {target} ELO</span>
                </div>
            </div>

            <div className="relative h-2.5 w-full bg-secondary/50 rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${percentage}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"
                />
            </div>

            {/* Motivational Text - Static */}
            <div className="mt-3 flex items-center justify-between">
                <p className="text-xs font-medium font-space text-muted-foreground">
                    Next milestone: <span className="text-foreground">{milestoneName}</span>
                </p>
                <div className="text-xs text-purple-400 font-medium font-space">
                    You're {remaining} ELO away from {milestoneName.split(' ')[0]}
                </div>
            </div>
        </motion.div>
    );
};

export const MomentumBar = memo(MomentumBarComponent);
