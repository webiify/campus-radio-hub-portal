
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  url: string;
  description: string;
}

const initialVideos: Video[] = [
  {
    id: '1',
    title: 'Campus TV Introduction',
    thumbnail: '/public/lovable-uploads/e36423e3-96f0-449f-a01f-01d4364ed53f.png',
    url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    description: 'Learn about our club and how we create amazing content for the campus.'
  },
  {
    id: '2',
    title: 'College Events Coverage',
    thumbnail: '/public/lovable-uploads/68409509-4d7a-4cf6-8fde-640eccab8668.png',
    url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    description: 'Watch our coverage of recent campus events and activities.'
  },
  {
    id: '3',
    title: 'Student Interview Series',
    thumbnail: '/public/lovable-uploads/a9be672f-0601-4b08-a117-9c6182bdf2b2.png',
    url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    description: 'Interviews with talented students from BCE Bhagalpur.'
  }
];

const VideoSection = () => {
  const [videos, setVideos] = useState<Video[]>(initialVideos);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleVideoSelect = (video: Video) => {
    setSelectedVideo(video);
    setIsPlaying(true);
  };

  const handleCloseVideo = () => {
    setSelectedVideo(null);
    setIsPlaying(false);
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section className="relative py-16 overflow-hidden bg-gradient-to-b from-gray-100 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Background decoration elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-400 rounded-full opacity-10 -translate-x-1/3 -translate-y-1/3 animate-spin-slow"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-400 rounded-full opacity-10 translate-x-1/3 translate-y-1/3 animate-spin-slow"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Our Latest Videos</h2>
          <div className="mt-2 h-1 w-20 bg-gradient-to-r from-emerald-400 to-teal-500 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Check out our original content created by talented club members. We cover campus events, interviews, tutorials, and more.
          </p>
        </motion.div>

        {selectedVideo ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative max-w-4xl mx-auto mb-12"
          >
            <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-xl">
              <iframe 
                src={`${selectedVideo.url}${isPlaying ? '?autoplay=1' : ''}`}
                title={selectedVideo.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{selectedVideo.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{selectedVideo.description}</p>
              </div>
              <motion.div 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }}
                className="mt-4 sm:mt-0"
              >
                <Button 
                  onClick={handleCloseVideo}
                  variant="outline"
                  className="border-emerald-500 text-emerald-600 hover:bg-emerald-50 dark:text-emerald-400 dark:border-emerald-700 dark:hover:bg-emerald-900/30"
                >
                  Back to Videos
                </Button>
              </motion.div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid gap-8 md:grid-cols-3"
          >
            {videos.map((video) => (
              <motion.div
                key={video.id}
                variants={item}
                whileHover={{ 
                  y: -10,
                  transition: { duration: 0.2 }
                }}
                className="group"
              >
                <div 
                  className="cursor-pointer overflow-hidden rounded-lg shadow-lg bg-white dark:bg-gray-800 h-full flex flex-col"
                  onClick={() => handleVideoSelect(video)}
                >
                  <div className="relative overflow-hidden">
                    <div className="aspect-w-16 aspect-h-9">
                      <img 
                        src={video.thumbnail} 
                        alt={video.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <motion.div 
                        whileHover={{ scale: 1.2 }}
                        className="w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-white ml-1">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
                        </svg>
                      </motion.div>
                    </div>
                  </div>
                  <div className="flex flex-col flex-grow p-6">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">{video.title}</h3>
                    <p className="mt-2 text-gray-600 dark:text-gray-400 flex-grow">{video.description}</p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="mt-4 w-full py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-md font-medium hover:from-emerald-600 hover:to-teal-700 transition-all duration-300"
                    >
                      Watch Now
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-center mt-10"
        >
          <Button 
            asChild
            className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white"
          >
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
              Visit Our YouTube Channel
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default VideoSection;
