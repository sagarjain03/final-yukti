import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Code, Clock, Zap, Target, CheckCircle, XCircle } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';

// Mock analysis data
const mockAnalysis = {
    problem: {
        title: 'Two Sum',
        difficulty: 'easy',
    },
    yourSolution: `function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}`,
    opponentSolution: `function twoSum(nums, target) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j];
      }
    }
  }
}`,
    testResults: [
        { id: 1, passed: true, input: '[2,7,11,15], 9', expected: '[0,1]', output: '[0,1]' },
        { id: 2, passed: true, input: '[3,2,4], 6', expected: '[1,2]', output: '[1,2]' },
        { id: 3, passed: true, input: '[3,3], 6', expected: '[0,1]', output: '[0,1]' },
        { id: 4, passed: false, input: 'Large array test', expected: '...', output: 'TLE' },
        { id: 5, passed: true, input: '[-1,-2,-3,-4,-5], -8', expected: '[2,4]', output: '[2,4]' },
    ],
    stats: {
        executionTime: '12ms',
        memoryUsage: '42.1 MB',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)',
    },
};

export function Analysis() {
    const { matchId } = useParams();

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <main className="container mx-auto px-4 py-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    {/* Header */}
                    <div className="mb-8 flex items-center justify-between">
                        <div>
                            <Link
                                to={`/result/${matchId}`}
                                className="mb-2 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                Back to Results
                            </Link>
                            <h1 className="text-3xl font-bold">Post-Match Analysis</h1>
                            <p className="text-muted-foreground">
                                Problem: {mockAnalysis.problem.title}
                            </p>
                        </div>
                    </div>

                    {/* Stats Overview */}
                    <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {[
                            { icon: Clock, label: 'Execution Time', value: mockAnalysis.stats.executionTime },
                            { icon: Zap, label: 'Memory Usage', value: mockAnalysis.stats.memoryUsage },
                            { icon: Target, label: 'Time Complexity', value: mockAnalysis.stats.timeComplexity },
                            { icon: Code, label: 'Space Complexity', value: mockAnalysis.stats.spaceComplexity },
                        ].map((stat) => {
                            const Icon = stat.icon;
                            return (
                                <Card key={stat.label}>
                                    <CardContent className="flex items-center gap-4 p-6">
                                        <Icon className="h-8 w-8 text-primary" />
                                        <div>
                                            <p className="text-sm text-muted-foreground">{stat.label}</p>
                                            <p className="text-xl font-bold">{stat.value}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>

                    {/* Solutions Comparison */}
                    <Tabs defaultValue="your-solution" className="space-y-4">
                        <TabsList>
                            <TabsTrigger value="your-solution">Your Solution</TabsTrigger>
                            <TabsTrigger value="opponent-solution">Opponent's Solution</TabsTrigger>
                            <TabsTrigger value="test-results">Test Results</TabsTrigger>
                        </TabsList>

                        <TabsContent value="your-solution">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Your Solution</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <pre className="overflow-auto rounded-lg bg-[#1e1e2e] p-4 font-mono text-sm text-white">
                                        <code>{mockAnalysis.yourSolution}</code>
                                    </pre>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="opponent-solution">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Opponent's Solution</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <pre className="overflow-auto rounded-lg bg-[#1e1e2e] p-4 font-mono text-sm text-white">
                                        <code>{mockAnalysis.opponentSolution}</code>
                                    </pre>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="test-results">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Test Results</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {mockAnalysis.testResults.map((test) => (
                                            <div
                                                key={test.id}
                                                className={`flex items-center justify-between rounded-lg border p-4 ${test.passed ? 'border-green-500/30' : 'border-red-500/30'
                                                    }`}
                                            >
                                                <div className="flex items-center gap-4">
                                                    {test.passed ? (
                                                        <CheckCircle className="h-5 w-5 text-green-500" />
                                                    ) : (
                                                        <XCircle className="h-5 w-5 text-red-500" />
                                                    )}
                                                    <div>
                                                        <p className="font-medium">Test Case {test.id}</p>
                                                        <p className="font-mono text-sm text-muted-foreground">
                                                            Input: {test.input}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-sm text-muted-foreground">Expected: {test.expected}</p>
                                                    <p className="font-mono text-sm">Output: {test.output}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </motion.div>
            </main>
        </div>
    );
}
