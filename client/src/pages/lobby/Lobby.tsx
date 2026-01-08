import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Users, Lock, Swords, User } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { GlobalNavigation } from '@/components/layout/GlobalNavigation';
import { cn } from '@/lib/utils';

// Mock rooms data
const publicRooms = [
    { id: '1', name: 'Quick Battle', host: 'CodeMaster', players: 1, maxPlayers: 2, type: '1v1', status: 'waiting' },
    { id: '2', name: 'Algorithm Arena', host: 'AlgoKing', players: 3, maxPlayers: 5, type: 'squad', status: 'waiting' },
    { id: '3', name: 'DSA Practice', host: 'ByteNinja', players: 1, maxPlayers: 2, type: '1v1', status: 'waiting' },
    { id: '4', name: 'Midnight Duel', host: 'NullPointer', players: 2, maxPlayers: 2, type: '1v1', status: 'full' },
];

export function Lobby() {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('all');
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
    const [roomCode, setRoomCode] = useState('');
    const [newRoom, setNewRoom] = useState({
        name: '',
        type: '1v1' as '1v1' | 'squad',
        isPrivate: false,
        password: '',
    });

    const filteredRooms = publicRooms.filter((room) => {
        const matchesSearch = room.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesType = activeTab === 'all' || room.type === activeTab;
        return matchesSearch && matchesType;
    });

    const handleCreateRoom = () => {
        setIsCreateModalOpen(false);
        navigate('/room/new-room-id');
    };

    const handleJoinRoom = (roomId: string) => {
        navigate(`/room/${roomId}`);
    };

    return (
        <div className="min-h-screen bg-background relative">
            <GlobalNavigation />

            <main className="container mx-auto max-w-5xl px-4 py-12">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    {/* Header */}
                    <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">Lobby</h1>
                            <p className="text-muted-foreground">Join an existing match or create your own arena.</p>
                        </div>
                        <div className="flex gap-3">
                            <Button variant="outline" onClick={() => setIsJoinModalOpen(true)}>
                                <Lock className="mr-2 h-4 w-4" />
                                Private Code
                            </Button>
                            <Button onClick={() => setIsCreateModalOpen(true)}>
                                <Plus className="mr-2 h-4 w-4" />
                                Create Room
                            </Button>
                        </div>
                    </div>

                    {/* Search & Filters */}
                    <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center justify-between">
                        <div className="relative w-full max-w-md">
                            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search active rooms..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-9 bg-card/50"
                            />
                        </div>

                        <Tabs value={activeTab} onValueChange={setActiveTab} defaultValue="all" className="w-auto">
                            <TabsList className="bg-card/50">
                                <TabsTrigger value="all">All</TabsTrigger>
                                <TabsTrigger value="1v1">1v1</TabsTrigger>
                                <TabsTrigger value="squad">Squad</TabsTrigger>
                            </TabsList>
                        </Tabs>
                    </div>

                    {/* Room List Grid */}
                    <RoomList rooms={filteredRooms} onJoin={handleJoinRoom} />

                </motion.div>
            </main>

            {/* Create Room Modal */}
            <Modal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                title="Create Room"
            >
                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Room Name</label>
                        <Input
                            placeholder="e.g. Daily Practice"
                            value={newRoom.name}
                            onChange={(e) => setNewRoom({ ...newRoom, name: e.target.value })}
                            autoFocus
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div
                            className={cn(
                                "cursor-pointer rounded-lg border p-4 transition-all hover:bg-secondary/50",
                                newRoom.type === '1v1' ? "border-primary bg-primary/5" : "border-border"
                            )}
                            onClick={() => setNewRoom({ ...newRoom, type: '1v1' })}
                        >
                            <Swords className="mb-2 h-5 w-5" />
                            <div className="font-medium">1v1 Duel</div>
                            <div className="text-xs text-muted-foreground">Head to Head</div>
                        </div>
                        <div
                            className={cn(
                                "cursor-pointer rounded-lg border p-4 transition-all hover:bg-secondary/50",
                                newRoom.type === 'squad' ? "border-primary bg-primary/5" : "border-border"
                            )}
                            onClick={() => setNewRoom({ ...newRoom, type: 'squad' })}
                        >
                            <Users className="mb-2 h-5 w-5" />
                            <div className="font-medium">Squad</div>
                            <div className="text-xs text-muted-foreground">Team Battle</div>
                        </div>
                    </div>
                    <Button className="w-full mt-2" onClick={handleCreateRoom}>
                        Create Arena
                    </Button>
                </div>
            </Modal>

            {/* Join Private Modal */}
            <Modal
                isOpen={isJoinModalOpen}
                onClose={() => setIsJoinModalOpen(false)}
                title="Join Private Room"
            >
                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Room Code</label>
                        <Input
                            placeholder="Enter 6-digit code"
                            value={roomCode}
                            onChange={(e) => setRoomCode(e.target.value)}
                            className="text-center text-lg tracking-widest uppercase"
                            maxLength={6}
                        />
                    </div>
                    <Button className="w-full" onClick={() => navigate(`/room/${roomCode}`)}>
                        Enter Arena
                    </Button>
                </div>
            </Modal>
        </div>
    );
}

function RoomList({
    rooms,
    onJoin,
}: {
    rooms: typeof publicRooms;
    onJoin: (id: string) => void;
}) {
    let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    if (rooms.length === 0) {
        return (
            <div className="rounded-xl border border-dashed border-border bg-card/30 p-12 text-center">
                <p className="text-muted-foreground">No active rooms found matching your criteria.</p>
                <Button variant="link" className="mt-2 text-primary">Create a room instead</Button>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {rooms.map((room, idx) => (
                <div
                    key={room.id}
                    className="relative group block p-2 h-full w-full"
                    onMouseEnter={() => setHoveredIndex(idx)}
                    onMouseLeave={() => setHoveredIndex(null)}
                >
                    <AnimatePresence>
                        {hoveredIndex === idx && (
                            <motion.span
                                className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-slate-800/[0.8] block  rounded-3xl"
                                layoutId="hoverBackground"
                                initial={{ opacity: 0 }}
                                animate={{
                                    opacity: 1,
                                    transition: { duration: 0.15 },
                                }}
                                exit={{
                                    opacity: 0,
                                    transition: { duration: 0.15, delay: 0.2 },
                                }}
                            />
                        )}
                    </AnimatePresence>
                    <div className="rounded-2xl h-full w-full p-6 overflow-hidden bg-card border border-border relative z-20 transition-colors group-hover:border-primary/50">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${room.type === '1v1' ? 'bg-blue-500/10 text-blue-500' : 'bg-purple-500/10 text-purple-500'
                                }`}>
                                {room.type === '1v1' ? <Swords className="w-3 h-3 mr-1" /> : <Users className="w-3 h-3 mr-1" />}
                                {room.type}
                            </div>
                            <div className={`h-2 w-2 rounded-full ${room.status === 'waiting' ? 'bg-green-500 animate-pulse' : 'bg-yellow-500'}`} />
                        </div>

                        <h4 className="text-xl font-bold tracking-tight text-foreground mb-1">{room.name}</h4>
                        <div className="flex items-center text-sm text-muted-foreground mb-6">
                            <User className="w-3 h-3 mr-1" />
                            {room.host}
                        </div>

                        <div className="flex items-center justify-between mt-auto">
                            <div className="text-sm font-medium text-muted-foreground">
                                {room.players} <span className="text-muted-foreground/50">/</span> {room.maxPlayers} <span className="text-xs font-normal">Players</span>
                            </div>
                            <Button
                                size="sm"
                                onClick={() => onJoin(room.id)}
                                disabled={room.players >= room.maxPlayers}
                                className={cn(room.players >= room.maxPlayers && "opacity-50")}
                            >
                                {room.players >= room.maxPlayers ? 'Full' : 'Join'}
                            </Button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
