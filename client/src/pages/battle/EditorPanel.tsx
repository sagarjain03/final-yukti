import { useState } from 'react';
import { Play, Send, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface EditorPanelProps {
    code: string;
    onChange: (code: string) => void;
    onSubmit: () => void;
}

const languages = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'python', label: 'Python' },
    { value: 'cpp', label: 'C++' },
    { value: 'java', label: 'Java' },
];

export function EditorPanel({ code, onChange, onSubmit }: EditorPanelProps) {
    const [language, setLanguage] = useState('javascript');
    const [isRunning, setIsRunning] = useState(false);
    const [output, setOutput] = useState('');

    const handleRun = async () => {
        setIsRunning(true);
        // Simulate code execution
        setTimeout(() => {
            setOutput('> Running tests...\n✓ Test 1 passed\n✓ Test 2 passed\n✗ Test 3 failed');
            setIsRunning(false);
        }, 1000);
    };

    const handleReset = () => {
        onChange('// Write your solution here\n\nfunction solution(input) {\n  \n}');
    };

    return (
        <div className="flex h-full flex-col">
            {/* Toolbar */}
            <div className="flex items-center justify-between border-b px-4 py-2">
                <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="rounded-md border bg-background px-3 py-1.5 text-sm"
                >
                    {languages.map((lang) => (
                        <option key={lang.value} value={lang.value}>
                            {lang.label}
                        </option>
                    ))}
                </select>
                <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={handleReset}>
                        <RotateCcw className="mr-1 h-4 w-4" />
                        Reset
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleRun} isLoading={isRunning}>
                        <Play className="mr-1 h-4 w-4" />
                        Run
                    </Button>
                    <Button variant="gradient" size="sm" onClick={onSubmit}>
                        <Send className="mr-1 h-4 w-4" />
                        Submit
                    </Button>
                </div>
            </div>

            {/* Code Editor (simplified textarea - would use Monaco/CodeMirror in production) */}
            <div className="flex-1 overflow-hidden">
                <textarea
                    value={code}
                    onChange={(e) => onChange(e.target.value)}
                    className="h-full w-full resize-none bg-[#1e1e2e] p-4 font-mono text-sm text-white focus:outline-none"
                    spellCheck={false}
                    placeholder="Write your code here..."
                />
            </div>

            {/* Output Panel */}
            {output && (
                <div className="h-32 border-t bg-[#1e1e2e]">
                    <div className="border-b px-4 py-2 text-sm font-medium text-white">Output</div>
                    <pre className="overflow-auto p-4 font-mono text-sm text-white/80">{output}</pre>
                </div>
            )}
        </div>
    );
}
