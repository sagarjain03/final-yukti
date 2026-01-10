import { useState, useEffect, useCallback, useRef } from 'react';

interface UseCountdownOptions {
    onComplete?: () => void;
    autoStart?: boolean;
}

export function useCountdown(
    initialSeconds: number,
    options: UseCountdownOptions = {}
) {
    const { onComplete, autoStart = false } = options;
    const [seconds, setSeconds] = useState(initialSeconds);
    const [isRunning, setIsRunning] = useState(autoStart);
    const intervalRef = useRef<number | null>(null);
    const onCompleteRef = useRef(onComplete);

    // Keep callback reference updated
    useEffect(() => {
        onCompleteRef.current = onComplete;
    }, [onComplete]);

    const start = useCallback(() => {
        setIsRunning(true);
    }, []);

    const pause = useCallback(() => {
        setIsRunning(false);
    }, []);

    const reset = useCallback((newSeconds?: number) => {
        setSeconds(newSeconds ?? initialSeconds);
        setIsRunning(false);
    }, [initialSeconds]);

    const restart = useCallback((newSeconds?: number) => {
        setSeconds(newSeconds ?? initialSeconds);
        setIsRunning(true);
    }, [initialSeconds]);

    useEffect(() => {
        if (isRunning && seconds > 0) {
            intervalRef.current = window.setInterval(() => {
                setSeconds((prev) => {
                    if (prev <= 1) {
                        setIsRunning(false);
                        onCompleteRef.current?.();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [isRunning, seconds]);

    // Format time for display
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formatted = `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;

    return {
        seconds,
        minutes,
        remainingSeconds,
        formatted,
        isRunning,
        isComplete: seconds === 0,
        start,
        pause,
        reset,
        restart,
    };
}
