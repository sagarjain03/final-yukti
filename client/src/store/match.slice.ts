import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type { Match, Room, MatchState } from '@/types/match';
import { matchService } from '@/services/match.service';

const initialState: MatchState = {
    currentMatch: null,
    currentRoom: null,
    isLoading: false,
    error: null,
};

// Async thunks
export const createRoom = createAsyncThunk(
    'match/createRoom',
    async (data: { name: string; type: '1v1' | 'squad'; isPrivate: boolean; password?: string }, { rejectWithValue }) => {
        try {
            const room = await matchService.createRoom(data);
            return room;
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

export const joinRoom = createAsyncThunk(
    'match/joinRoom',
    async (data: { roomId: string; password?: string }, { rejectWithValue }) => {
        try {
            const room = await matchService.joinRoom(data.roomId, data.password);
            return room;
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

export const getMatch = createAsyncThunk(
    'match/getMatch',
    async (matchId: string, { rejectWithValue }) => {
        try {
            const match = await matchService.getMatch(matchId);
            return match;
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

const matchSlice = createSlice({
    name: 'match',
    initialState,
    reducers: {
        setCurrentRoom: (state, action: PayloadAction<Room | null>) => {
            state.currentRoom = action.payload;
        },
        setCurrentMatch: (state, action: PayloadAction<Match | null>) => {
            state.currentMatch = action.payload;
        },
        updateMatch: (state, action: PayloadAction<Partial<Match>>) => {
            if (state.currentMatch) {
                state.currentMatch = { ...state.currentMatch, ...action.payload };
            }
        },
        leaveRoom: (state) => {
            state.currentRoom = null;
            state.currentMatch = null;
        },
        clearMatchError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Create room
            .addCase(createRoom.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(createRoom.fulfilled, (state, action) => {
                state.isLoading = false;
                state.currentRoom = action.payload;
            })
            .addCase(createRoom.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            // Join room
            .addCase(joinRoom.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(joinRoom.fulfilled, (state, action) => {
                state.isLoading = false;
                state.currentRoom = action.payload;
            })
            .addCase(joinRoom.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            // Get match
            .addCase(getMatch.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getMatch.fulfilled, (state, action) => {
                state.isLoading = false;
                state.currentMatch = action.payload;
            })
            .addCase(getMatch.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    },
});

export const { setCurrentRoom, setCurrentMatch, updateMatch, leaveRoom, clearMatchError } = matchSlice.actions;
export default matchSlice.reducer;
