import { Swords } from 'lucide-react';

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-border/50 bg-background py-4">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                        <Swords className="h-3.5 w-3.5" />
                        <span>CodeBattle</span>
                    </div>
                    <p>© {currentYear}</p>
                </div>
            </div>
        </footer>
    );
}
