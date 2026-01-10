import { useRef, useEffect, useState } from 'react';
import { Eraser, Pen, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface WhiteboardProps {
    className?: string;
    readOnly?: boolean;
    onDraw?: (data: DrawData) => void;
}

interface DrawData {
    type: 'draw' | 'clear';
    points?: { x: number; y: number }[];
    color: string;
    strokeWidth: number;
}

export function Whiteboard({ className, readOnly = false, onDraw }: WhiteboardProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [color, setColor] = useState('#ffffff');
    const [strokeWidth, setStrokeWidth] = useState(3);
    const [tool, setTool] = useState<'pen' | 'eraser'>('pen');
    const lastPoint = useRef<{ x: number; y: number } | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas size
        const resizeCanvas = () => {
            const rect = canvas.getBoundingClientRect();
            canvas.width = rect.width;
            canvas.height = rect.height;
            ctx.fillStyle = '#1e1e2e';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        return () => window.removeEventListener('resize', resizeCanvas);
    }, []);

    const getCoordinates = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        if (!canvas) return { x: 0, y: 0 };
        const rect = canvas.getBoundingClientRect();
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        };
    };

    const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (readOnly) return;
        setIsDrawing(true);
        lastPoint.current = getCoordinates(e);
    };

    const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!isDrawing || readOnly) return;

        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!ctx || !lastPoint.current) return;

        const currentPoint = getCoordinates(e);

        ctx.beginPath();
        ctx.moveTo(lastPoint.current.x, lastPoint.current.y);
        ctx.lineTo(currentPoint.x, currentPoint.y);
        ctx.strokeStyle = tool === 'eraser' ? '#1e1e2e' : color;
        ctx.lineWidth = tool === 'eraser' ? strokeWidth * 3 : strokeWidth;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.stroke();

        onDraw?.({
            type: 'draw',
            points: [lastPoint.current, currentPoint],
            color: tool === 'eraser' ? '#1e1e2e' : color,
            strokeWidth: tool === 'eraser' ? strokeWidth * 3 : strokeWidth,
        });

        lastPoint.current = currentPoint;
    };

    const stopDrawing = () => {
        setIsDrawing(false);
        lastPoint.current = null;
    };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!ctx || !canvas) return;
        ctx.fillStyle = '#1e1e2e';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        onDraw?.({ type: 'clear', color, strokeWidth });
    };

    const colors = ['#ffffff', '#ef4444', '#22c55e', '#3b82f6', '#eab308', '#a855f7'];

    return (
        <div className={cn('flex flex-col gap-2', className)}>
            {/* Toolbar */}
            {!readOnly && (
                <div className="flex items-center gap-2 rounded-lg bg-card p-2">
                    <Button
                        variant={tool === 'pen' ? 'default' : 'ghost'}
                        size="icon"
                        onClick={() => setTool('pen')}
                    >
                        <Pen className="h-4 w-4" />
                    </Button>
                    <Button
                        variant={tool === 'eraser' ? 'default' : 'ghost'}
                        size="icon"
                        onClick={() => setTool('eraser')}
                    >
                        <Eraser className="h-4 w-4" />
                    </Button>
                    <div className="mx-2 h-6 w-px bg-border" />
                    {colors.map((c) => (
                        <button
                            key={c}
                            onClick={() => setColor(c)}
                            className={cn(
                                'h-6 w-6 rounded-full border-2 transition-transform hover:scale-110',
                                color === c ? 'border-primary' : 'border-transparent'
                            )}
                            style={{ backgroundColor: c }}
                        />
                    ))}
                    <div className="mx-2 h-6 w-px bg-border" />
                    <input
                        type="range"
                        min="1"
                        max="10"
                        value={strokeWidth}
                        onChange={(e) => setStrokeWidth(Number(e.target.value))}
                        className="w-20"
                    />
                    <div className="flex-1" />
                    <Button variant="destructive" size="icon" onClick={clearCanvas}>
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            )}

            {/* Canvas */}
            <canvas
                ref={canvasRef}
                className="h-full w-full flex-1 cursor-crosshair rounded-lg border touch-none"
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
            />
        </div>
    );
}
