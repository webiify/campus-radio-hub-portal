
import React, { useState, useEffect } from 'react';
import { useEventContext } from '../context/EventContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarIcon, MapPinIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { motion } from 'framer-motion';

const Events = () => {
  const { events, fetchEvents } = useEventContext();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadEvents = async () => {
      setLoading(true);
      setError(null);
      try {
        await fetchEvents();
      } catch (e: any) {
        setError(e.message || 'Failed to load events');
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, [fetchEvents]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300 } }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1], 
            rotate: [0, 180, 360] 
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            repeatType: "loop" 
          }}
          className="w-12 h-12 rounded-full border-4 border-t-emerald-500 border-emerald-200"
        ></motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="bg-red-100 dark:bg-red-900/30 p-6 rounded-lg max-w-md"
          >
            <h2 className="text-xl font-bold text-red-600 dark:text-red-400 mb-2">Error</h2>
            <p className="text-gray-700 dark:text-gray-300">{error}</p>
            <Button 
              className="mt-4 bg-emerald-500 hover:bg-emerald-600"
              onClick={() => window.location.reload()}
            >
              Try Again
            </Button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">Upcoming Events</h1>
        <div className="h-1 w-24 bg-gradient-to-r from-emerald-400 to-teal-500 mx-auto"></div>
      </motion.div>
      
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {events.map(event => (
          <motion.div key={event.id} variants={item}>
            <Card className="h-full bg-white dark:bg-gray-800 shadow-md hover:shadow-xl transition-all duration-300 border border-emerald-200 dark:border-emerald-800 overflow-hidden">
              <CardHeader className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/30 dark:to-teal-900/30 border-b border-emerald-100 dark:border-emerald-800">
                <CardTitle className="text-lg font-semibold text-emerald-800 dark:text-emerald-300">{event.title}</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400 line-clamp-2">{event.description}</CardDescription>
              </CardHeader>
              <CardContent className="p-4">
                <div className="flex items-center mb-2 text-emerald-700 dark:text-emerald-300">
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  <span className="text-sm">{format(new Date(event.date), 'MMMM dd, yyyy')}</span>
                </div>
                <div className="flex items-center mb-2 text-emerald-700 dark:text-emerald-300">
                  <MapPinIcon className="h-4 w-4 mr-2" />
                  <span className="text-sm">{event.location}</span>
                </div>
                <div className="flex justify-between items-center mt-4 pt-3 border-t border-dashed border-emerald-100 dark:border-emerald-800">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Time: {event.time}</span>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button asChild variant="default" size="sm" className="bg-emerald-500 hover:bg-emerald-600 text-white">
                      <Link to="/events">View Details</Link>
                    </Button>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Events;
