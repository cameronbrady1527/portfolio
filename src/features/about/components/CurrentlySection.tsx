"use client";

import React from 'react';
import { CurrentlyReadingCard } from './CurrentlyReadingCard';
import { MusicCard } from './MusicCard';
import { OutdoorsCard } from './OutdoorsCard';

// Insert book data here!
const currentBook = {
  title: "Dune",
  author: "Frank Herbert",
  coverImage: "/images/books/dune-cover.jpg",
  rating: 5,
  progress: "Page 420 / 624",
  genre: "Science Fiction",
  startedDate: "Jul 2025",
  review: "I love this novel so far! The world building is incredible, and the characters are so believable. As someone who knows little to nothing about the Dune universe or lore, it has been quite fun building a mental image of what everything looks like... kind of like when I had read the Harry Potter books before watching the movies. I am loving reading and discussing this book in my lovely book club! I highly recommend this book to anyone."
};

const pastBooks = [
  {
    title: "The Handmaid's Tale",
    author: "Margaret Atwood",
    coverImage: "/images/books/handmaids-tale-cover.jpg",
    rating: 4,
    progress: "Completed",
    genre: "Dystopian Fiction",
    startedDate: "Jun 2025",
    review: "A chilling portrayal of a totalitarian society that forces women into subservience. Atwood's writing is both poetic and unsettling."
  }
];

export const CurrentlySection: React.FC = () => {
  return (
    <section className="py-16 px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white">
            Currently
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            You&apos;ll likely find me coding, but I could also be reading an epic sci-fi novel, 
            discovering new music, training for my next race, or planning my next hiking adventure.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          <div className="flex justify-center">
            <CurrentlyReadingCard book={currentBook} />
          </div>
          
          {/* <div className="flex justify-center">
            <MusicCard />
          </div> */}
          
          <div className="flex justify-center md:col-span-2 lg:col-span-1">
            <OutdoorsCard />
          </div>
        </div>
      </div>
    </section>
  );
};