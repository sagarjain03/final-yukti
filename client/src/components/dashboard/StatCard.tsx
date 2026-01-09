import { memo, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface StatCardProps {
    title: string;
    value: string;
    subtext?: string;
    trend?: string;
    isPositive?: boolean;
    variant?: 'primary' | 'secondary';
    icon?: ReactNode;
    className?: string;
    delay?: number;
}

const StatCardComponent = ({
    title,
    value,
    subtext,
    trend,
    isPositive = true,
    variant = 'secondary',
    icon,
    className,
    delay = 0,
}: StatCardProps) => {
    // Primary vs Secondary styling
    const isPrimary = variant === 'primary';

    const containerClasses = cn(
        'relative overflow-hidden rounded-xl border transition-all duration-300 hover:-translate-y-1',
        isPrimary
            ? 'border-primary/20 bg-primary/5 shadow-[0_0_20px_rgba(59,130,246,0.05)]'
            : 'border-border/40 bg-card/20 hover:border-border/80',
        className
    );

    const valueClasses = cn(
        'font-space font-bold tracking-tight text-foreground',
        isPrimary ? 'text-3xl' : 'text-2xl'
    );

    const titleClasses = cn(
        'font-medium font-space text-muted-foreground',
        isPrimary ? 'text-sm mb-1' : 'text-xs mb-1'
    );

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: delay * 0.1, ease: 'easeOut' }}
            className={containerClasses}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            <div className="relative p-5">
                <div className="flex items-start justify-between mb-2">
                    <h3 className={titleClasses}>{title}</h3>
                    {icon && <div className="text-muted-foreground/40">{icon}</div>}
                </div>

                <div className="flex items-baseline gap-2">
                    <span className={valueClasses}>{value}</span>
                    {trend && (
                        <div className={cn(
                            'flex items-center text-xs font-medium',
                            isPositive ? 'text-green-500' : 'text-red-500'
                        )}>
                            {isPositive ? <ArrowUp className="w-3 h-3 mr-0.5" /> : <ArrowDown className="w-3 h-3 mr-0.5" />}
                            {trend}
                        </div>
                    )}
                </div>

                {subtext && (
                    <p className="mt-1 text-xs text-muted-foreground/60 font-medium font-space">
                        {subtext}
                    </p>
                )}
            </div>

            {/* Subtle inner glow for primary cards */}
            {isPrimary && (
                <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-primary/10 blur-2xl rounded-full pointer-events-none" />
            )}
        </motion.div>
    );
};

export const StatCard = memo(StatCardComponent);
