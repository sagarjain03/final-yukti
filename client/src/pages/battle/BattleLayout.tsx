import { Outlet } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface BattleLayoutProps {
    mode?: 'default' | 'spectator' | 'replay';
    className?: string;
}

/**
 * BattleLayout - Layout wrapper for battle pages
 * Supports different modes:
 * - default: Standard battle view with editor, problem, and opponent panels
 * - spectator: Watch mode with both players visible
 * - replay: Replay mode with playback controls
 */
export function BattleLayout({ mode = 'default', className }: BattleLayoutProps) {
    return (
        <div
            className={cn(
                'flex h-screen flex-col bg-background',
                mode === 'spectator' && 'spectator-mode',
                mode === 'replay' && 'replay-mode',
                className
            )}
        >
            {/* Battle content will be rendered here */}
            <Outlet />
        </div>
    );
}
