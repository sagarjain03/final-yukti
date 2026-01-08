import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';
import { Whiteboard } from '@/components/battle/Whiteboard';

// Mock problem data
const mockProblem = {
    title: 'Two Sum',
    difficulty: 'easy' as const,
    description: `Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to \`target\`.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
    constraints: [
        '2 ≤ nums.length ≤ 10⁴',
        '-10⁹ ≤ nums[i] ≤ 10⁹',
        '-10⁹ ≤ target ≤ 10⁹',
        'Only one valid answer exists.',
    ],
    examples: [
        {
            input: 'nums = [2,7,11,15], target = 9',
            output: '[0,1]',
            explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].',
        },
        {
            input: 'nums = [3,2,4], target = 6',
            output: '[1,2]',
            explanation: 'Because nums[1] + nums[2] == 6, we return [1, 2].',
        },
    ],
};

const difficultyColors = {
    easy: 'text-green-500 bg-green-500/10',
    medium: 'text-yellow-500 bg-yellow-500/10',
    hard: 'text-red-500 bg-red-500/10',
};

export function ProblemPanel() {
    return (
        <div className="flex h-full flex-col overflow-hidden">
            {/* Problem Header */}
            <div className="border-b p-4">
                <div className="flex items-center gap-3">
                    <h2 className="text-xl font-bold">{mockProblem.title}</h2>
                    <span
                        className={`rounded-full px-2 py-0.5 text-xs font-medium capitalize ${difficultyColors[mockProblem.difficulty]
                            }`}
                    >
                        {mockProblem.difficulty}
                    </span>
                </div>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="description" className="flex flex-1 flex-col overflow-hidden">
                <TabsList className="mx-4 mt-2">
                    <TabsTrigger value="description">Description</TabsTrigger>
                    <TabsTrigger value="examples">Examples</TabsTrigger>
                    <TabsTrigger value="constraints">Constraints</TabsTrigger>
                    <TabsTrigger value="whiteboard">Whiteboard</TabsTrigger>
                </TabsList>

                <TabsContent value="description" className="flex-1 overflow-auto p-4">
                    <div className="prose prose-sm prose-invert max-w-none">
                        <p className="whitespace-pre-wrap text-foreground">{mockProblem.description}</p>
                    </div>
                </TabsContent>

                <TabsContent value="examples" className="flex-1 overflow-auto p-4">
                    <div className="space-y-4">
                        {mockProblem.examples.map((example, index) => (
                            <div key={index} className="rounded-lg border p-4">
                                <h4 className="mb-2 font-medium">Example {index + 1}</h4>
                                <div className="space-y-2 font-mono text-sm">
                                    <div>
                                        <span className="text-muted-foreground">Input: </span>
                                        <code className="rounded bg-muted px-1">{example.input}</code>
                                    </div>
                                    <div>
                                        <span className="text-muted-foreground">Output: </span>
                                        <code className="rounded bg-muted px-1">{example.output}</code>
                                    </div>
                                    {example.explanation && (
                                        <div className="text-muted-foreground">
                                            <span>Explanation: </span>
                                            {example.explanation}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="constraints" className="flex-1 overflow-auto p-4">
                    <ul className="space-y-2">
                        {mockProblem.constraints.map((constraint, index) => (
                            <li key={index} className="flex items-center gap-2 font-mono text-sm">
                                <span className="text-primary">•</span>
                                {constraint}
                            </li>
                        ))}
                    </ul>
                </TabsContent>

                <TabsContent value="whiteboard" className="flex-1 overflow-hidden p-4">
                    <Whiteboard className="h-full" />
                </TabsContent>
            </Tabs>
        </div>
    );
}
