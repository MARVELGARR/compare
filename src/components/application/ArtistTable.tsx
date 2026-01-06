"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { ArrowDown, ArrowUp, Music2, Filter } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Image from "next/image";
import { useQueryState, parseAsString, parseAsStringLiteral, parseAsInteger } from "nuqs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

import { getArtistRankingsByGenre, ArtistRanking } from "@/src/apis/spotify";
import { Button } from "@/src/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/src/components/ui/form";
import { ScrollArea, ScrollBar } from "@/src/components/ui/scroll-area";


// Zod Schema Definition
const ArtistTableSchema = z.object({
  market: z.enum(['NG', 'US', 'GB', 'GH', 'ZA']),
  genre: z.string().optional(),
});

type ArtistTableFormData = z.infer<typeof ArtistTableSchema>;

type Market = 'NG' | 'US' | 'GB' | 'GH' | 'ZA';

const MARKETS: { code: Market; name: string }[] = [
  { code: 'NG', name: 'Nigeria' },
  { code: 'US', name: 'USA' },
  { code: 'GB', name: 'UK' },
  { code: 'GH', name: 'Ghana' },
  { code: 'ZA', name: 'South Africa' },
];

export const GENRES = [
  "afrobeat", "afropop", "amapiano", "hiphop", "r&b", "rap", "highlife", "alte"
];

const LIMIT = 10;

export default function ArtistTable() {
  const router = useRouter();
  const tableContainerRef = useRef<HTMLDivElement>(null);

  // URL State with nuqs (kept for syncing URL <-> Form)
  const [urlMarket, setUrlMarket] = useQueryState<Market>('market', parseAsStringLiteral(['NG', 'US', 'GB', 'GH', 'ZA'] as const).withDefault('NG'));
  const [urlGenre, setUrlGenre] = useQueryState('genre', parseAsString.withDefault('afropop'));
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1));

  // Initialize React Hook Form
  const form = useForm<ArtistTableFormData>({
    resolver: zodResolver(ArtistTableSchema),
    defaultValues: {
      market: (urlMarket as Market) || 'NG',
      genre: urlGenre || '',
    }
  });

  const { watch, control } = form;
  const formValues = watch();

  // Sync URL -> Form (when URL changes externally, e.g. back button)
  useEffect(() => {
    form.reset({
      market: urlMarket as Market,
      genre: urlGenre || '',
    });
  }, [urlMarket, urlGenre, form]);

  // Scroll to top when page changes
  useEffect(() => {
    if (tableContainerRef.current) {
      tableContainerRef.current.scrollTop = 0;
    }
  }, [page]);

  const { data: artists, isLoading, isFetching, error } = useQuery({
    queryKey: ["artist-rankings", formValues.market, formValues.genre, page],
    queryFn: () => getArtistRankingsByGenre(LIMIT, (page - 1) * LIMIT, formValues.market, formValues.genre || null),
    placeholderData: keepPreviousData,
  });

  const [sorting, setSorting] = useState<SortingState>([]);

  const columns = useMemo<ColumnDef<ArtistRanking>[]>(
    () => [
      {
        accessorKey: "rank",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              className="hover:bg-transparent pl-0 text-zinc-400 hover:text-white res_font"
            >
              #
              {column.getIsSorted() === "asc" ? <ArrowUp className="ml-2 h-4 w-4" /> : column.getIsSorted() === "desc" ? <ArrowDown className="ml-2 h-4 w-4" /> : <div className="ml-2 h-4 w-4 opacity-20"><ArrowDown className="w-4 h-4" /></div>}
            </Button>
          )
        },
        cell: ({ row }) => <div className="text-zinc-500 font-mono text-xl md:text-2xl opacity-50 group-hover:opacity-100 pl-4">{row.getValue("rank")}</div>,
      },
      {
        accessorKey: "name",
        header: ({ column }) => {
          return (
            <div className="text-right">
              <Button
                variant="ghost"

                className="hover:bg-transparent res_font pr-0 text-zinc-400 hover:text-white"
              >
                Artist

              </Button>
            </div>
          )
        },
        cell: ({ row }) => (
          <div className="flex items-center gap-3 res_font">
            <div className="w-10 h-10 md:w-12 md:h-12 relative rounded-md overflow-hidden bg-zinc-800 flex-shrink-0">
              {row.original.avatar ? (
                <Image src={row.original.avatar} alt={row.original.name} fill className="object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-zinc-500 text-xs">?</div>
              )}
            </div>
            <div className="res_font">
              <div className="font-bold text-white text-sm md:text-base lg:text-lg" style={{ fontSize: 'clamp(0.875rem, 2vw + 0.5rem, 1.125rem)' }}>{row.original.name}</div>
              <div className="text-zinc-500 text-[10px] md:text-xs">{row.original.handle}</div>
            </div>
          </div>
        ),
      },
      {
        accessorKey: "followers",
        header: ({ column }) => {
          return (
            <div className="text-right">
              <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                className="hover:bg-transparent res_font pr-0 text-zinc-400 hover:text-white"
              >
                Followers
                {column.getIsSorted() === "asc" ? <ArrowUp className="ml-2 h-4 w-4" /> : column.getIsSorted() === "desc" ? <ArrowDown className="ml-2 h-4 w-4" /> : <div className="ml-2 h-4 w-4 opacity-20"><ArrowDown className="w-4 h-4" /></div>}
              </Button>
            </div>
          )
        },
        cell: ({ row }) => {
          // Use a deterministic value based on ID instead of Math.random() to prevent hydration mismatches
          const isUp = (row.original.id.charCodeAt(0) + row.original.id.charCodeAt(row.original.id.length - 1)) % 2 === 0;
          return (
            <div className="text-right">
              <div className="font-bold text-white">{row.original.followersDisplay}</div>
              <div className={`text-xs flex items-center justify-end gap-1 ${isUp ? 'text-green-500' : 'text-red-500'}`}>
                {isUp ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                {/* Stable pseudo-random percentage based on followers count */}
                {(Number(row.original.id.charCodeAt(0) % 20) / 10).toFixed(2)}%
              </div>
            </div>
          )
        },
      },
      {
        accessorKey: "popularity",
        header: ({ column }) => {
          return (
            <div className="text-right">
              <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                className="hover:bg-transparent res_font pr-0 text-zinc-400 hover:text-white res_font"
              >
                Popularity
                {column.getIsSorted() === "asc" ? <ArrowUp className="ml-2 h-4 w-4" /> : column.getIsSorted() === "desc" ? <ArrowDown className="ml-2 h-4 w-4" /> : <div className="ml-2 h-4 w-4 opacity-20"><ArrowDown className="w-4 h-4" /></div>}
              </Button>
            </div>
          )
        },
        cell: ({ row }) => (
          <div className="flex items-center justify-end gap-2 text-white res_font">
            <div className="h-8 w-20 flex items-end gap-[2px]">
              {row.original.trendData.map((val: any, i: any) => (
                <div
                  key={i}
                  className={`w-full rounded-t-sm ${i === row.original.trendData.length - 1 ? 'bg-green-500 animate-pulse' : 'bg-green-500/50'}`}
                  style={{ height: `${val}%` }}
                ></div>
              ))}
            </div>
            <span className="font-bold text-lg">{row.original.popularityDisplay}</span>
          </div>
        ),
      },
      {
        accessorKey: "genres",
        header: ({ column }) => {
          return (

            <div className="text-right">
              <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                className="hover:bg-transparent res_font pr-0 text-zinc-400 hover:text-white"
              >
                Genres
                {column.getIsSorted() === "asc" ? <ArrowUp className="ml-2 h-4 w-4" /> : column.getIsSorted() === "desc" ? <ArrowDown className="ml-2 h-4 w-4" /> : <div className="ml-2 h-4 w-4 opacity-20"><ArrowDown className="w-4 h-4" /></div>}
              </Button>
            </div>
          )
        },
        cell: ({ row }) => (
          <div className="flex flex-wrap gap-1 res_font">
            {row.original.genres.slice(0, 3).map((genre) => (
              <span key={genre} className="px-2 py-0.5 bg-zinc-800 res_font rounded res_font text-zinc-400 capitalize text-white">
                {genre}
              </span>
            ))}
            {row.original.genres.length > 3 && (
              <span className="px-2 py-0.5 text-xs text-zinc-500">+{row.original.genres.length - 3}</span>
            )}
          </div>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: artists || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  const handlePlatformClick = (platform: string) => {
    if (platform === 'Spotify') return;
    toast.info(`${platform} data is coming soon!`);
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  // if (isLoading) return <div className="text-white p-8 animate-pulse">Loading rankings for {MARKETS.find(m => m.code === formValues.market)?.name}...</div>;
  // if (error) return <div className="text-red-500 p-8">Error loading data.</div>;

  return (
    <div className="w-full h-full flex flex-col text-white font-sans mt-4 min-h-0 min-w-0">
      {/* Filters form group */}
      <Form {...form}>
        <form className="w-full res-font">
          <div className="flex flex-col lg:overflow-x-auto lg:flex-row items-start lg:items-center justify-between mb-6 gap-6 md:gap-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full lg:w-auto">
              {/* Genre Dropdown */}
              <FormField
                control={control}
                name="genre"
                render={({ field }) => (
                  <FormItem className="space-y-0">
                    <Select
                      onValueChange={(val) => {
                        const newGenre = val === "ALL" ? "" : val;
                        field.onChange(newGenre);
                        setUrlGenre(newGenre || null);
                        setPage(1);
                      }}
                      value={field.value || "ALL"}
                    >
                      <FormControl>
                        <SelectTrigger className="w-[180px] bg-white text-black border-white rounded-full h-8 font-medium">
                          <div className="flex items-center gap-2">
                            <Filter className="w-3 h-3" />
                            <SelectValue placeholder="All Genres" />
                          </div>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-zinc-900 border-zinc-700 text-white">
                        <SelectItem value="ALL" className="focus:bg-zinc-800 focus:text-white">All Genres</SelectItem>
                        {GENRES.map(g => (
                          <SelectItem key={g} value={g} className="focus:bg-zinc-800 focus:text-white">{g}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              {/* Market Selector */}
              <ScrollArea className="w-full lg:w-auto">
                <div className="bg-zinc-800 rounded-full p-1 flex items-center text-xs">
                  <FormField
                    control={control}
                    name="market"
                    render={({ field }) => (
                      <div className="flex">
                        {MARKETS.map((m) => (
                          <button
                            key={m.code}
                            type="button"
                            onClick={() => {
                              field.onChange(m.code);
                              setUrlMarket(m.code);
                              setPage(1);
                            }}
                            className={`flex-shrink-0 px-4 py-1.5 rounded-full cursor-pointer transition-colors whitespace-nowrap ${field.value === m.code ? 'bg-white text-black shadow-sm' : 'text-zinc-400 hover:text-white'}`}
                          >
                            {m.name}
                          </button>
                        ))}
                      </div>
                    )}
                  />
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </div>

            <div className="w-full min-w-0">
              <ScrollArea className="w-full">
                <div className="flex items-center gap-2 pb-2 lg:pb-0 min-w-max">
                  <Button type="button" variant="secondary" className="rounded-full bg-white text-black h-8 font-medium hover:bg-gray-100 flex-shrink-0" onClick={() => handlePlatformClick('Spotify')}>
                    <span className="text-green-500"><Music2 className="w-3 h-3 fill-current" /></span> Spotify
                  </Button>
                  {['Instagram', 'Youtube', 'SoundCloud', 'Apple Music'].map(platform => (
                    <Button
                      key={platform}
                      type="button"
                      variant="outline"
                      onClick={() => handlePlatformClick(platform)}
                      className="rounded-full res_font border-zinc-700 text-zinc-300 h-8 hover:bg-zinc-800 hover:text-white bg-transparent flex-shrink-0"
                    >
                      {platform}
                    </Button>
                  ))}
                </div>
                <ScrollBar orientation="horizontal" className="h-1.5" />
              </ScrollArea>
            </div>
          </div>
        </form>
      </Form>

      {/* Table */}
      <div
        ref={tableContainerRef}
        className={`rounded-xl border border-zinc-800 overflow-x-auto overflow-y-auto flex-1 min-h-0 relative ${isFetching ? 'opacity-70 grayscale-[0.3]' : ''} transition-all duration-300`}
      >
        {isFetching && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/5 pointer-events-none">
            <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
          </div>
        )}
        <div className="min-w-[800px] md:min-w-full">
          <Table>
            <TableHeader className="bg-zinc-900/50 border-zinc-800  sticky  top-0 z-10 backdrop-blur-md">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="border-zinc-800   hover:bg-transparent">
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} className="text-zinc-400  uppercase text-xs font-medium bg-zinc-900/90">
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="border-zinc-800 hover:bg-zinc-900/50 cursor-pointer group"
                    onClick={() => router.push(`/application/artist/${row.original.id}`)}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="py-4">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center text-zinc-500"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center text-sm text-zinc-500 mt-4">
        <div>
          Showing {(page - 1) * LIMIT + 1}-{Math.min(page * LIMIT, (page - 1) * LIMIT + (artists?.length || 0))}
          {/* Note: Total count not available from API currently, so simplistic display */}
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="bg-zinc-800 border-none text-zinc-300 hover:bg-zinc-700 h-8"
            onClick={handlePrevPage}
            disabled={page === 1}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="bg-zinc-800 border-none text-zinc-300 hover:bg-zinc-700 h-8"
            onClick={handleNextPage}
            disabled={artists?.length !== LIMIT}
          >
            Next
          </Button>
        </div>
      </div>

    </div>
  );
}
