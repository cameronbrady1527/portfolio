"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mountain, MapPin, Target, Calendar, ChevronLeft, ChevronRight, TrendingUp, Clock, Activity } from 'lucide-react';
import { GlassCard } from '@/components/GlassCard';
import Image from 'next/image';

interface ActivityStats {
  totalRuns: number;
  totalTime: string;
  totalDistance: number;
  elevationGained: number;
  countries: number;
  states: number;
}

interface TrainingGoal {
  event: string;
  date: string;
  distance: string;
  progress: number;
}

interface ActivityPhoto {
  id: string;
  src: string;
  alt: string;
  location: string;
  date: string;
}

const activityStats: ActivityStats = {
  totalRuns: 62,
  totalTime: "38h 26m",
  totalDistance: 217,
  elevationGained: 6531,
  countries: 2,
  states: 4
};

const currentTraining: TrainingGoal = {
  event: "Philadelphia Half Marathon",
  date: "November 2025",
  distance: "13.1 miles",
  progress: 57
};

const recentPhotos: ActivityPhoto[] = [
  {
    id: '1',
    src: '/images/runs/training-hello-world.png',
    alt: 'Training day 1',
    location: 'NY',
    date: 'August 2025'
  },
  {
    id: '2',
    src: '/images/runs/rocky-run-finish.png',
    alt: 'Finishing the 2024 Rocky Run',
    location: 'Philadelphia, PA',
    date: 'November 2024'
  },
  {
    id: '3',
    src: '/images/runs/rocky-run-friends.png',
    alt: 'Celebrating the 2024 Rocky Run',
    location: 'Philadelphia, PA',
    date: 'November 2024'
  },
  {
    id: '4',
    src: '/images/runs/spring-flowers.png',
    alt: 'Pretty Spring Flowers',
    location: 'NY',
    date: 'Spring 2025'
  },
  {
    id: '5',
    src: '/images/runs/rail-trail.png',
    alt: 'Rail Trail Adventure',
    location: 'Hudson River, NY',
    date: 'June 2025'
  },
  {
    id: '6',
    src: '/images/runs/gracie-tough-love.png',
    alt: 'Gracie Abrams Tough Love',
    location: 'Brain',
    date: 'Always'
  },
  {
    id: '7',
    src: '/images/runs/evening-run.png',
    alt: 'Evening Run',
    location: 'NY',
    date: 'May 2025'
  },
  {
    id: '8',
    src: '/images/runs/sparrows-ladies.png',
    alt: 'OCMD Half Marathon with Friends',
    location: 'Ocean City, MD',
    date: 'Nov 2024'
  },
  {
    id: '9',
    src: '/images/runs/taormina.png',
    alt: 'Running in Taormina',
    location: 'Taormina, Italy',
    date: 'July 2025'
  }
];

export const OutdoorsCard: React.FC = () => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [showPhotos, setShowPhotos] = useState(false);

  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % recentPhotos.length);
  };

  const prevPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev - 1 + recentPhotos.length) % recentPhotos.length);
  };

  const StatItem = ({ icon: Icon, label, value, unit }: {
    icon: React.ElementType;
    label: string;
    value: number | string;
    unit: string;
  }) => (
    <div className="text-center">
      <div className="flex items-center justify-center mb-1">
        <Icon className="w-4 h-4 text-green-400" />
      </div>
      <div className="text-lg font-bold text-white">{typeof value === 'number' ? value.toLocaleString() : value}</div>
      <div className="text-xs text-gray-400">{unit}</div>
      <div className="text-xs text-gray-500">{label}</div>
    </div>
  );

  return (
    <GlassCard className="h-120 flex flex-col p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Mountain className="w-5 h-5 text-green-400" />
          <h3 className="text-lg font-bold text-white">Adventures</h3>
        </div>
        
        <motion.button
          onClick={() => setShowPhotos(!showPhotos)}
          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
            showPhotos
              ? 'bg-green-500/20 text-green-300 border border-green-500/30'
              : 'text-gray-400 hover:text-gray-300 hover:bg-gray-700/30'
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {showPhotos ? 'Stats' : 'Photos'}
        </motion.button>
      </div>

      <div className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          {showPhotos ? (
            <motion.div
              key="photos"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="h-full flex flex-col"
            >
              <div className="relative mb-3 h-80">
                <div className="relative w-full h-full rounded-lg overflow-hidden bg-gray-800">
                  <Image
                    src={recentPhotos[currentPhotoIndex].src}
                    alt={recentPhotos[currentPhotoIndex].alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-cover"
                    loading="lazy"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
                  
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="flex items-center space-x-1 text-white text-sm mb-1">
                      <MapPin className="w-3 h-3" />
                      <span className="font-medium">{recentPhotos[currentPhotoIndex].location}</span>
                    </div>
                    <p className="text-xs text-gray-300">{recentPhotos[currentPhotoIndex].date}</p>
                  </div>

                  {recentPhotos.length > 1 && (
                    <>
                      <motion.button
                        onClick={prevPhoto}
                        className="absolute left-2 top-1/2 -translate-y-1/2 p-1 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </motion.button>
                      
                      <motion.button
                        onClick={nextPhoto}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-1 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <ChevronRight className="w-4 h-4" />
                      </motion.button>
                    </>
                  )}
                </div>
              </div>

              {recentPhotos.length > 1 && (
                <div className="flex justify-center space-x-2 mb-2">
                  {recentPhotos.map((_, index) => (
                    <motion.button
                      key={index}
                      onClick={() => setCurrentPhotoIndex(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentPhotoIndex ? 'bg-green-400' : 'bg-gray-600'
                      }`}
                      whileHover={{ scale: 1.2 }}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="stats"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="h-full flex flex-col"
            >
              {/* Training Goal */}
              <div className="mb-4 p-3 bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Target className="w-4 h-4 text-green-400" />
                  <h4 className="text-sm font-medium text-white">Training For</h4>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="text-sm font-medium text-green-300">{currentTraining.event}</p>
                    <p className="text-xs text-gray-400">{currentTraining.date} • {currentTraining.distance}</p>
                    <p className="text-xs text-gray-500">Week 8 of 14</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-white">{currentTraining.progress}%</p>
                    <p className="text-xs text-gray-400">Complete</p>
                  </div>
                </div>
                <div className="w-full bg-gray-700/50 rounded-full h-1.5">
                  <motion.div
                    className="bg-green-400 h-1.5 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${currentTraining.progress}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                </div>
              </div>

              {/* Activity Stats Grid */}
              <div className="grid grid-cols-2 gap-3 flex-1">
                <StatItem 
                  icon={Activity} 
                  label="Runs" 
                  value={activityStats.totalRuns} 
                  unit="completed" 
                />
                <StatItem 
                  icon={Clock} 
                  label="Time" 
                  value={activityStats.totalTime} 
                  unit="total" 
                />
                <StatItem 
                  icon={TrendingUp} 
                  label="Distance" 
                  value={activityStats.totalDistance} 
                  unit="miles" 
                />
                <StatItem 
                  icon={Mountain} 
                  label="Elevation" 
                  value={activityStats.elevationGained.toLocaleString()} 
                  unit="ft gained" 
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-3 pt-3 border-t border-gray-600/30">
        <div className="flex items-center justify-between text-xs text-gray-400">
          <div className="flex items-center space-x-1">
            <Calendar className="w-3 h-3" />
            <span>Year-to-Date Running</span>
          </div>
          <div className="flex items-center space-x-1 ml-4">
            <MapPin className="w-3 h-3" />
            <span>{activityStats.countries} countries • {activityStats.states} states</span>
          </div>
        </div>
      </div>
    </GlassCard>
  );
};