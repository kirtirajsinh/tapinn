import { create } from "zustand";

interface Location {
    placeId: string;
    description: string;
}

interface Player {
    displayName: string;
    fid: number;
    location: Location;
    pfpUrl: string;
    username: string;
}

interface PlayerStore {
    player: Player | null;
    setPlayer: (user: Player) => void;
    clearPlayer: () => void;
    client: Client;
    setClient: (client: Client) => void;
}
interface Client {
    added: boolean;
}

export const usePlayerStore = create<PlayerStore>((set) => ({
    player: null, // defailt value
    setPlayer: (player) => set({ player }),
    clearPlayer: () => set({ player: null }),
    client: {
        added: false,
    },
    setClient: (client: Client) => set({ client }),
}));