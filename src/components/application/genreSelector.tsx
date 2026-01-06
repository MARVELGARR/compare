import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter } from "lucide-react";
import { GENRES } from "./ArtistTable";

interface GenreSelectorProps {
    value: string;
    onChange: (genre: string) => void;
}

export const GenreSelector = ({ value, onChange }: GenreSelectorProps) => {
    return (
        <Select
            onValueChange={(val) => {
                const newGenre = val === "ALL" ? "" : val;
                onChange(newGenre);
            }}
            value={value || "ALL"}
        >
            <SelectTrigger className="w-[180px] bg-white text-black border-white rounded-full h-8 font-medium">
                <div className="flex items-center gap-2">
                    <Filter className="w-3 h-3" />
                    <SelectValue placeholder="All Genres" />
                </div>
            </SelectTrigger>
            <SelectContent className="bg-zinc-900 border-zinc-700 text-white">
                <SelectItem value="ALL" className="focus:bg-zinc-800 focus:text-white">
                    All Genres
                </SelectItem>
                {GENRES.map((g) => (
                    <SelectItem key={g} value={g} className="focus:bg-zinc-800 focus:text-white">
                        {g}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};