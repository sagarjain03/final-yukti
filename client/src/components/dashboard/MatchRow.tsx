import { memo } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface MatchRowProps {
    id: string;
    opponent: string;
    result: 'win' | 'loss';
    eloChange: number;
    date: string;
    index: number;
}

const MatchRowComponent = ({
    id,
    opponent,
    result,
    eloChange,
    date,
    index,
}: MatchRowProps) => {
    const isWin = result === 'win';

    return (
        <motion.div
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
        >
            <Link
                to={`/match/${id}`}
                className="group flex items-center justify-between p-3 rounded-lg border border-transparent hover:border-border/50 hover:bg-secondary/30 transition-all duration-200"
            >
                <div className="flex items-center gap-3">
                    {/* Status Dot */}
                    <div className={cn(
                        "w-2 h-2 rounded-full shadow-[0_0_8px]",
                        isWin ? "bg-green-500 shadow-green-500/50" : "bg-red-500 shadow-red-500/50"
                    )} />

                    <div className="flex flex-col">
                        <span className="text-sm font-medium font-space text-foreground group-hover:text-primary transition-colors">
                            vs {opponent}
                        </span>
                        <span className="text-[10px] font-space text-muted-foreground">
                            {date}
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <div className={cn(
                        "text-xs font-bold font-space px-2 py-0.5 rounded",
                        isWin
                            ? "bg-green-500/10 text-green-500"
                            : "bg-red-500/10 text-red-500"
                    )}>
                        {isWin ? '+' : ''}{eloChange} ELO
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground/30 group-hover:text-foreground transition-colors" />
                </div>
            </Link>
        </motion.div>
    );
};

export const MatchRow = memo(MatchRowComponent);
