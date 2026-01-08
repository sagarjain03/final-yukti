import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface LoaderProps {
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

export function Loader({ size = 'md', className }: LoaderProps) {
    const sizeClasses = {
        sm: 'h-4 w-4',
        md: 'h-6 w-6',
        lg: 'h-8 w-8',
    };

    return (
        <Loader2
            className={cn(
                'animate-spin text-muted-foreground',
                sizeClasses[size],
                className
            )}
        />
    );
}

export function PageLoader() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-background">
            <Loader size="lg" />
        </div>
    );
}

export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn('animate-pulse rounded-md bg-muted', className)}
            {...props}
        />
    );
}
