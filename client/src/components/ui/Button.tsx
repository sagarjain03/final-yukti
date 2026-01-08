import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
    'inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all duration-150 disabled:pointer-events-none disabled:opacity-50',
    {
        variants: {
            variant: {
                default:
                    'bg-primary text-primary-foreground hover:bg-primary/90',
                secondary:
                    'bg-secondary text-secondary-foreground hover:bg-secondary/80',
                outline:
                    'border border-border bg-transparent hover:bg-secondary hover:text-foreground',
                ghost:
                    'hover:bg-secondary hover:text-foreground',
                link:
                    'text-primary underline-offset-4 hover:underline',
                destructive:
                    'bg-destructive text-destructive-foreground hover:bg-destructive/90',
            },
            size: {
                default: 'h-9 px-4 py-2 rounded-md',
                sm: 'h-8 px-3 text-xs rounded-md',
                lg: 'h-10 px-6 rounded-md',
                xl: 'h-11 px-8 text-base rounded-md',
                icon: 'h-9 w-9 rounded-md',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, isLoading, children, disabled, ...props }, ref) => {
        return (
            <button
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                disabled={disabled || isLoading}
                {...props}
            >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {children}
            </button>
        );
    }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
