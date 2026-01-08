import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Copy, Users, Crown, Check, X, MessageSquare } from 'lucide-react';
import { GlobalNavigation } from '@/components/layout/GlobalNavigation';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { useAuth } from '@/hooks';
import { CardSpotlight } from '@/components/ui/card-spotlight';

// Mock room data
const mockRoom = {
    id: 'room-123',
    name: 'Quick Battle',
    type: '1v1',
    host: { id: '1', username: 'CodeMaster', elo: 1450, isReady: true },
    players: [
        { id: '1', username: 'CodeMaster', elo: 1450, isReady: true },
        { id: '2', username: 'You', elo: 1320, isReady: false },
    ],
    maxPlayers: 2,
    code: 'ABC123',
};

export function Room() {
    const { roomId } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [isReady, setIsReady] = useState(false);
    const [copied, setCopied] = useState(false);

    const copyRoomCode = () => {
        navigator.clipboard.writeText(mockRoom.code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleReady = () => {
        setIsReady(!isReady);
        // Would emit socket event
    };

    const handleStartGame = () => {
        // Would emit socket event to start game
        navigate(`/battle/${roomId}`);
    };

    const handleLeaveRoom = () => {
        navigate('/lobby');
    };

    const isHost = user?.id === mockRoom.host.id;
    const allReady = mockRoom.players.every((p) => p.isReady);

    return (
        <div className="min-h-screen bg-background relative">
            <GlobalNavigation />

            <main className="container mx-auto px-4 py-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mx-auto max-w-2xl"
                >
                    {/* Room Header */}
                    <Card className="mb-6">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle className="text-2xl">{mockRoom.name}</CardTitle>
                                    <p className="text-sm text-muted-foreground">
                                        {mockRoom.type === '1v1' ? '1v1 Duel' : 'Squad Wars'}
                                    </p>
                                </div>
                                <Button variant="outline" size="sm" onClick={copyRoomCode}>
                                    {copied ? (
                                        <Check className="mr-2 h-4 w-4 text-green-500" />
                                    ) : (
                                        <Copy className="mr-2 h-4 w-4" />
                                    )}
                                    {mockRoom.code}
                                </Button>
                            </div>
                        </CardHeader>
                    </Card>

                    {/* Players */}
                    <Card className="mb-6">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Users className="h-5 w-5" />
                                Players ({mockRoom.players.length}/{mockRoom.maxPlayers})
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {mockRoom.players.map((player) => (
                                <CardSpotlight
                                    key={player.id}
                                    className="flex items-center justify-between !p-4 !bg-card/60"
                                    radius={200}
                                >
                                    <div className="flex items-center gap-3 relative z-20">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-blue-500 text-white font-bold">
                                            {player.username.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <span className="font-medium text-white">{player.username}</span>
                                                {player.id === mockRoom.host.id && (
                                                    <Crown className="h-4 w-4 text-yellow-500" />
                                                )}
                                            </div>
                                            <span className="text-sm text-neutral-400">{player.elo} ELO</span>
                                        </div>
                                    </div>
                                    <div
                                        className={`flex items-center gap-2 rounded-full px-3 py-1 text-sm relative z-20 ${player.isReady
                                            ? 'bg-green-500/10 text-green-500'
                                            : 'bg-yellow-500/10 text-yellow-500'
                                            }`}
                                    >
                                        {player.isReady ? (
                                            <>
                                                <Check className="h-4 w-4" /> Ready
                                            </>
                                        ) : (
                                            'Waiting...'
                                        )}
                                    </div>
                                </CardSpotlight>
                            ))}

                            {/* Empty slots */}
                            {Array.from({ length: mockRoom.maxPlayers - mockRoom.players.length }).map((_, i) => (
                                <div
                                    key={`empty-${i}`}
                                    className="flex items-center justify-center rounded-lg border border-dashed p-4 text-muted-foreground"
                                >
                                    Waiting for player...
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    {/* Chat (placeholder) */}
                    <Card className="mb-6">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <MessageSquare className="h-5 w-5" />
                                Chat
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex h-32 items-center justify-center rounded-lg border border-dashed text-muted-foreground">
                                Chat coming soon...
                            </div>
                        </CardContent>
                    </Card>

                    {/* Actions */}
                    <div className="flex flex-col gap-4">
                        <div className="flex gap-4">
                            <Button variant="outline" className="flex-1" onClick={handleLeaveRoom}>
                                <X className="mr-2 h-4 w-4" />
                                Leave Room
                            </Button>
                            {isHost ? (
                                <Button
                                    className="flex-1"
                                    onClick={handleStartGame}
                                    disabled={!allReady || mockRoom.players.length < 2}
                                >
                                    Start Game
                                </Button>
                            ) : (
                                <Button
                                    variant={isReady ? 'outline' : 'default'}
                                    className="flex-1"
                                    onClick={handleReady}
                                >
                                    {isReady ? 'Cancel Ready' : 'Ready'}
                                </Button>
                            )}
                        </div>

                        {/* Dev Bypass Button */}
                        <Button
                            variant="secondary"
                            className="w-full border border-dashed border-yellow-500/50 bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20"
                            onClick={() => navigate(`/battle/${roomId || '1'}`)}
                        >
                            ⚡ Force Start Battle (Frontend Testing)
                        </Button>
                    </div>
                </motion.div>
            </main>
        </div>
    );
}
