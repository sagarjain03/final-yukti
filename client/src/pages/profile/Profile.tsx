import { Trophy, Swords, Target, Calendar, Edit2, Github, Linkedin } from 'lucide-react';
import { Footer } from '@/components/layout/Footer';
import { GlobalNavigation } from '@/components/layout/GlobalNavigation';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';
import { BlurFade } from '@/components/ui/blurfade';
import { EncryptedText } from '@/components/ui/encrypted-text';

// Mock profile data
const mockProfile = {
    username: 'CodeWarrior',
    email: 'codewarrior@example.com',
    bio: 'Competitive programmer | DSA enthusiast | Building cool stuff',
    elo: 1450,
    rank: 234,
    wins: 47,
    losses: 23,
    totalMatches: 70,
    winRate: 67,
    joinDate: 'January 2024',
    achievements: [
        { id: '1', name: 'First Victory', icon: '🏆', description: 'Win your first match' },
        { id: '2', name: 'Streak Master', icon: '🔥', description: 'Win 5 matches in a row' },
        { id: '3', name: 'Speed Demon', icon: '⚡', description: 'Solve a problem in under 5 minutes' },
        { id: '4', name: 'Perfectionist', icon: '💯', description: 'Get a perfect score' },
    ],
    matchHistory: [
        { id: '1', opponent: 'AlgoKing', result: 'win', eloChange: 25, date: '2 hours ago' },
        { id: '2', opponent: 'ByteNinja', result: 'loss', eloChange: -18, date: '5 hours ago' },
        { id: '3', opponent: 'CodeMaster', result: 'win', eloChange: 22, date: '1 day ago' },
        { id: '4', opponent: 'DSAGuru', result: 'win', eloChange: 20, date: '2 days ago' },
        { id: '5', opponent: 'TreeTraverser', result: 'loss', eloChange: -15, date: '3 days ago' },
        { id: '6', opponent: 'HeapHero', result: 'win', eloChange: 18, date: '4 days ago' },
        { id: '7', opponent: 'QueueQueen', result: 'win', eloChange: 15, date: '5 days ago' },
    ],
};

export function Profile() {
    return (
        <div className="min-h-screen bg-background relative">
            <GlobalNavigation />

            <main className="container mx-auto px-4 py-8">
                <BlurFade delay={0.1}>
                    {/* Profile Header */}
                    <Card className="mb-8 overflow-hidden">
                        <div className="h-32 bg-gradient-to-r from-purple-600 to-blue-600" />
                        <CardContent className="-mt-16 relative">
                            <div className="flex flex-col items-center md:flex-row md:items-end md:gap-6">
                                {/* Avatar */}
                                <div className="flex h-32 w-32 items-center justify-center rounded-full border-4 border-background bg-gradient-to-br from-purple-500 to-blue-500 text-4xl font-bold text-white">
                                    {mockProfile.username.charAt(0)}
                                </div>

                                {/* Info */}
                                <div className="mt-4 flex-1 text-center md:mt-0 md:text-left">
                                    <div className="flex items-center justify-center gap-4 md:justify-start">
                                        <h1 className="text-3xl font-bold">
                                            <EncryptedText text={mockProfile.username} />
                                        </h1>
                                        <Button variant="outline" size="sm">
                                            <Edit2 className="mr-1 h-4 w-4" />
                                            Edit Profile
                                        </Button>
                                    </div>
                                    <p className="mt-1 text-muted-foreground">
                                        <EncryptedText text={mockProfile.bio} revealDelayMs={50} />
                                    </p>
                                    <div className="mt-2 flex items-center justify-center gap-4 text-sm text-muted-foreground md:justify-start">
                                        <span className="flex items-center gap-1">
                                            <Calendar className="h-4 w-4" />
                                            Joined {mockProfile.joinDate}
                                        </span>
                                        <a href="#" className="hover:text-primary">
                                            <Github className="h-4 w-4" />
                                        </a>
                                        <a href="#" className="hover:text-primary">
                                            <Linkedin className="h-4 w-4" />
                                        </a>
                                    </div>
                                </div>

                                {/* Stats */}
                                <div className="mt-4 grid grid-cols-3 gap-6 md:mt-0">
                                    <div className="text-center">
                                        <p className="text-2xl font-bold text-primary">
                                            <EncryptedText text={String(mockProfile.elo)} />
                                        </p>
                                        <p className="text-sm text-muted-foreground">ELO</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-2xl font-bold">
                                            <EncryptedText text={`#${mockProfile.rank}`} />
                                        </p>
                                        <p className="text-sm text-muted-foreground">Rank</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-2xl font-bold text-green-500">
                                            <EncryptedText text={`${mockProfile.winRate}%`} />
                                        </p>
                                        <p className="text-sm text-muted-foreground">Win Rate</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </BlurFade>

                <BlurFade delay={0.2}>
                    {/* Stats Cards */}
                    <div className="mb-8 grid gap-4 sm:grid-cols-3">
                        <Card>
                            <CardContent className="flex items-center gap-4 p-6">
                                <div className="rounded-lg bg-purple-500/10 p-3 text-purple-500">
                                    <Swords className="h-6 w-6" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Total Matches</p>
                                    <p className="text-2xl font-bold">{mockProfile.totalMatches}</p>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="flex items-center gap-4 p-6">
                                <div className="rounded-lg bg-green-500/10 p-3 text-green-500">
                                    <Trophy className="h-6 w-6" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Victories</p>
                                    <p className="text-2xl font-bold">{mockProfile.wins}</p>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="flex items-center gap-4 p-6">
                                <div className="rounded-lg bg-red-500/10 p-3 text-red-500">
                                    <Target className="h-6 w-6" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Defeats</p>
                                    <p className="text-2xl font-bold">{mockProfile.losses}</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </BlurFade>

                <BlurFade delay={0.3}>
                    {/* Tabs */}
                    <Tabs defaultValue="history" className="space-y-4">
                        <TabsList>
                            <TabsTrigger value="history">Match History</TabsTrigger>
                            <TabsTrigger value="achievements">Achievements</TabsTrigger>
                        </TabsList>

                        <TabsContent value="history">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Recent Matches</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                                        {mockProfile.matchHistory.map((match, index) => (
                                            <BlurFade key={match.id} delay={0.1 + index * 0.05} inView>
                                                <div
                                                    className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-secondary/50"
                                                >
                                                    <div className="flex items-center gap-4">
                                                        <div
                                                            className={`h-2 w-2 rounded-full ${match.result === 'win' ? 'bg-green-500' : 'bg-red-500'
                                                                }`}
                                                        />
                                                        <div>
                                                            <p className="font-medium">vs {match.opponent}</p>
                                                            <p className="text-sm text-muted-foreground">{match.date}</p>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <span
                                                            className={`font-medium ${match.eloChange > 0 ? 'text-green-500' : 'text-red-500'
                                                                }`}
                                                        >
                                                            {match.eloChange > 0 ? '+' : ''}
                                                            {match.eloChange} ELO
                                                        </span>
                                                        <p className="text-sm capitalize text-muted-foreground">{match.result}</p>
                                                    </div>
                                                </div>
                                            </BlurFade>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="achievements">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Achievements</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid gap-4 sm:grid-cols-2">
                                        {mockProfile.achievements.map((achievement, index) => (
                                            <BlurFade key={achievement.id} delay={0.1 + index * 0.05} inView>
                                                <div
                                                    className="flex items-center gap-4 rounded-lg border p-4 transition-colors hover:bg-secondary/50"
                                                >
                                                    <div className="text-4xl">{achievement.icon}</div>
                                                    <div>
                                                        <p className="font-medium">{achievement.name}</p>
                                                        <p className="text-sm text-muted-foreground">{achievement.description}</p>
                                                    </div>
                                                </div>
                                            </BlurFade>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </BlurFade>
            </main>

            <Footer />
        </div>
    );
}
