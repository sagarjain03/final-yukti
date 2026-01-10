import { motion } from 'framer-motion';
import { User as UserIcon, TrendingUp, TrendingDown } from 'lucide-react';
import type { User } from '@/types/user';
import { cn } from '@/lib/utils';

interface PlayerBadgeProps {
    player: User;
    isCurrentUser?: boolean;
    showElo?: boolean;
    showRank?: boolean;
    size?: 'sm' | 'md' | 'lg';
    eloChange?: number;
    className?: string;
}

export function PlayerBadge({
    player,
    isCurrentUser = false,
    showElo = true,
    size = 'md',
    eloChange,
    className,
}: PlayerBadgeProps) {
    const sizeClasses = {
        sm: 'h-7 w-7 text-xs',
        md: 'h-9 w-9 text-sm',
        lg: 'h-11 w-11 text-base',
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={cn(
                'flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2',
                isCurrentUser && 'border-primary/50',
                className
            )}
        >
            <div
                className={cn(
                    'flex items-center justify-center rounded-md bg-secondary',
                    sizeClasses[size]
                )}
            >
                {player.avatar ? (
                    <img
                        src={player.avatar}
                        alt={player.username}
                        className="h-full w-full rounded-md object-cover"
                    />
                ) : (
                    <UserIcon className="h-4 w-4 text-muted-foreground" />
                )}
            </div>
            <div className="text-left">
                <p className="text-sm font-medium text-foreground">
                    {player.username}
                    {isCurrentUser && <span className="ml-1 text-xs text-muted-foreground">(you)</span>}
                </p>
                {showElo && (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <span>{player.elo}</span>
                        {eloChange !== undefined && (
                            <span className={cn(
                                'flex items-center',
                                eloChange > 0 ? 'text-green-500' : 'text-red-500'
                            )}>
                                {eloChange > 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                                {eloChange > 0 ? '+' : ''}{eloChange}
                            </span>
                        )}
                    </div>
                )}
            </div>
        </motion.div>
    );
}
