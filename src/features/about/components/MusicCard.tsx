"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Play, Pause, Clock, TrendingUp, ExternalLink } from 'lucide-react';
import { GlassCard } from '@/components/GlassCard';
import Image from 'next/image';

interface Track {
  id: string;
  name: string;
  artists: Array<{ name: string }>;
  album: {
    name: string;
    images: Array<{ url: string; height: number; width: number }>;
  };
  external_urls: {
    spotify: string;
  };
  preview_url?: string;
}

interface SpotifyData {
  currentlyPlaying?: Track;
  recentlyPlayed: Track[];
  topTracks: Track[];
  isLoading: boolean;
  error?: string;
}

export const MusicCard: React.FC = () => {
  const [spotifyData, setSpotifyData] = useState<SpotifyData>({
    recentlyPlayed: [],
    topTracks: [],
    isLoading: true
  });
  const [currentView, setCurrentView] = useState<'recent' | 'top' | 'current'>('current');
  const [isPlaying, setIsPlaying] = useState(false);

  // Mock data for demo (replace with actual Spotify API calls)
  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      setSpotifyData({
        currentlyPlaying: {
          id: '1',
          name: 'Bohemian Rhapsody',
          artists: [{ name: 'Queen' }],
          album: {
            name: 'A Night at the Opera',
            images: [{ url: '/images/music/queen-album.jpg', height: 300, width: 300 }]
          },
          external_urls: { spotify: 'https://open.spotify.com/track/example' }
        },
        recentlyPlayed: [
          {
            id: '2',
            name: 'Stairway to Heaven',
            artists: [{ name: 'Led Zeppelin' }],
            album: {
              name: 'Led Zeppelin IV',
              images: [{ url: '/images/music/led-zeppelin.jpg', height: 300, width: 300 }]
            },
            external_urls: { spotify: 'https://open.spotify.com/track/example2' }
          },
          {
            id: '3',
            name: 'Hotel California',
            artists: [{ name: 'Eagles' }],
            album: {
              name: 'Hotel California',
              images: [{ url: '/images/music/eagles.jpg', height: 300, width: 300 }]
            },
            external_urls: { spotify: 'https://open.spotify.com/track/example3' }
          }
        ],
        topTracks: [
          {
            id: '4',
            name: 'The Sound of Silence',
            artists: [{ name: 'Simon & Garfunkel' }],
            album: {
              name: 'Sounds of Silence',
              images: [{ url: '/images/music/simon-garfunkel.jpg', height: 300, width: 300 }]
            },
            external_urls: { spotify: 'https://open.spotify.com/track/example4' }
          }
        ],
        isLoading: false
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const getCurrentViewData = () => {
    switch (currentView) {
      case 'current':
        return spotifyData.currentlyPlaying ? [spotifyData.currentlyPlaying] : [];
      case 'recent':
        return spotifyData.recentlyPlayed;
      case 'top':
        return spotifyData.topTracks;
      default:
        return [];
    }
  };

  const getViewTitle = () => {
    switch (currentView) {
      case 'current':
        return 'Currently Playing';
      case 'recent':
        return 'Recently Played';
      case 'top':
        return 'Top Tracks';
      default:
        return '';
    }
  };

  const ViewButton = ({ view, icon: Icon, label }: { 
    view: 'recent' | 'top' | 'current'; 
    icon: React.ElementType; 
    label: string;
  }) => (
    <motion.button
      onClick={() => setCurrentView(view)}
      className={`flex items-center space-x-1 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
        currentView === view
          ? 'bg-green-500/20 text-green-300 border border-green-500/30'
          : 'text-gray-400 hover:text-gray-300 hover:bg-gray-700/30'
      }`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Icon className="w-3 h-3" />
      <span>{label}</span>
    </motion.button>
  );

  const TrackItem = ({ track, index }: { track: Track; index: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-700/30 transition-colors group cursor-pointer"
      onClick={() => window.open(track.external_urls.spotify, '_blank')}
    >
      <div className="relative flex-shrink-0">
        {track.album.images[0] ? (
          <Image
            src={track.album.images[0].url}
            alt={track.album.name}
            width={40}
            height={40}
            className="rounded object-cover"
          />
        ) : (
          <div className="w-10 h-10 bg-gray-700 rounded flex items-center justify-center">
            <Music className="w-5 h-5 text-gray-400" />
          </div>
        )}
        {currentView === 'current' && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded opacity-0 group-hover:opacity-100 transition-opacity">
            {isPlaying ? <Pause className="w-4 h-4 text-white" /> : <Play className="w-4 h-4 text-white" />}
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-white truncate">{track.name}</p>
        <p className="text-xs text-gray-400 truncate">
          {track.artists.map(artist => artist.name).join(', ')}
        </p>
      </div>

      <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
        <ExternalLink className="w-4 h-4 text-gray-400" />
      </div>
    </motion.div>
  );

  return (
    <GlassCard className="h-120 flex flex-col p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Music className="w-5 h-5 text-green-400" />
          <h3 className="text-lg font-bold text-white">Music</h3>
        </div>
        
        <div className="flex items-center space-x-2">
          <ViewButton view="current" icon={Play} label="Now" />
          <ViewButton view="recent" icon={Clock} label="Recent" />
          <ViewButton view="top" icon={TrendingUp} label="Top" />
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          {spotifyData.isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center h-full"
            >
              <div className="text-gray-400 text-sm">Loading music data...</div>
            </motion.div>
          ) : (
            <motion.div
              key={currentView}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="h-full"
            >
              <div className="mb-3">
                <h4 className="text-sm font-medium text-gray-300">{getViewTitle()}</h4>
              </div>
              
              <div className="space-y-1 max-h-56 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
                {getCurrentViewData().length > 0 ? (
                  getCurrentViewData().map((track, index) => (
                    <TrackItem key={`${track.id}-${index}`} track={track} index={index} />
                  ))
                ) : (
                  <div className="flex items-center justify-center h-24 text-gray-400 text-sm">
                    {currentView === 'current' ? 'Not currently playing' : 'No tracks available'}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-4 pt-3 border-t border-gray-600/30">
        <div className="flex items-center justify-between text-xs text-gray-400">
          <span>Powered by Spotify</span>
          <motion.a
            href="https://open.spotify.com/user/cameronbrady"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1 text-green-400 hover:text-green-300 transition-colors"
            whileHover={{ scale: 1.05 }}
          >
            <span>Follow me</span>
            <ExternalLink className="w-3 h-3" />
          </motion.a>
        </div>
      </div>
    </GlassCard>
  );
};