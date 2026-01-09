import { memo } from 'react';
import { Play, LineChart, Trophy, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

interface QuickActionProps {
    className?: string;
}

const QuickActionsStripComponent = ({ className }: QuickActionProps) => {
    return (
        <div className={cn('flex items-center gap-3 w-full overflow-x-auto pb-2 scrollbar-hide', className)}>
            {/* Primary Action - Quick Match */}
            <Link to="/lobby" className="flex-shrink-0">
                <Button
                    variant="outline"
                    className="h-10 border-primary/40 bg-primary/5 px-6 font-space text-primary hover:bg-primary/10 hover:border-primary/60 hover:text-primary transition-all duration-300"
                >
                    <Play className="mr-2 h-4 w-4 fill-current" />
                    Quick Match
                </Button>
            </Link>

            {/* Secondary Actions */}
            <Link to="/practice" className="flex-shrink-0">
                <Button
                    variant="outline"
                    className="h-10 border-border bg-secondary/30 px-5 font-space text-muted-foreground hover:bg-secondary/60 hover:text-foreground hover:border-border/80 transition-all duration-200"
                >
                    <LineChart className="mr-2 h-4 w-4" />
                    Practice
                </Button>
            </Link>

            <Link to="/leaderboard" className="flex-shrink-0">
                <Button
                    variant="outline"
                    className="h-10 border-border bg-secondary/30 px-5 font-space text-muted-foreground hover:bg-secondary/60 hover:text-foreground hover:border-border/80 transition-all duration-200"
                >
                    <Trophy className="mr-2 h-4 w-4" />
                    Leaderboard
                </Button>
            </Link>

            <Link to="/profile" className="flex-shrink-0">
                <Button
                    variant="outline"
                    className="h-10 border-border bg-secondary/30 px-5 font-space text-muted-foreground hover:bg-secondary/60 hover:text-foreground hover:border-border/80 transition-all duration-200"
                >
                    <User className="mr-2 h-4 w-4" />
                    Profile
                </Button>
            </Link>
        </div>
    );
};

export const QuickActionsStrip = memo(QuickActionsStripComponent);
