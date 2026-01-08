import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    description?: string;
    children: React.ReactNode;
    className?: string;
}

export function Modal({
    isOpen,
    onClose,
    title,
    description,
    children,
    className,
}: ModalProps) {
    React.useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-50 bg-black/80"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className={cn(
                            'fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-md border border-border bg-card p-6',
                            className
                        )}
                    >
                        {/* Close button */}
                        <button
                            onClick={onClose}
                            className="absolute right-4 top-4 text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <X className="h-4 w-4" />
                        </button>

                        {/* Header */}
                        {(title || description) && (
                            <div className="mb-4">
                                {title && (
                                    <h2 className="text-lg font-semibold text-foreground">{title}</h2>
                                )}
                                {description && (
                                    <p className="mt-1 text-sm text-muted-foreground">{description}</p>
                                )}
                            </div>
                        )}

                        {/* Content */}
                        {children}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
