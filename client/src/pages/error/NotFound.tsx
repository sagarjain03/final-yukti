import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function NotFound() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
            >
                {/* 404 Text */}
                <motion.h1
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                    className="mb-4 bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-9xl font-bold text-transparent"
                >
                    404
                </motion.h1>

                <h2 className="mb-2 text-2xl font-bold">Page Not Found</h2>
                <p className="mb-8 text-muted-foreground">
                    Oops! Looks like this page went on a coding break and never came back.
                </p>

                {/* Actions */}
                <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                    <Link to="/">
                        <Button variant="gradient" size="lg">
                            <Home className="mr-2 h-4 w-4" />
                            Go Home
                        </Button>
                    </Link>
                    <Button variant="outline" size="lg" onClick={() => window.history.back()}>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Go Back
                    </Button>
                </div>
            </motion.div>

            {/* Decorative elements */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute left-1/4 top-1/4 h-[300px] w-[300px] rounded-full bg-purple-500/10 blur-3xl" />
                <div className="absolute right-1/4 bottom-1/4 h-[300px] w-[300px] rounded-full bg-blue-500/10 blur-3xl" />
            </div>
        </div>
    );
}
