import React, { useContext, useState, useEffect } from 'react';
import { EventContext } from '../context/EventContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarIcon, MapPinIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

const Events = () => {
  const { events, fetchEvents } = useContext(EventContext);
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

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading events...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Upcoming Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map(event => (
          <Card key={event.id} className="bg-white shadow-md rounded-lg overflow-hidden">
            <CardHeader className="p-4">
              <CardTitle className="text-lg font-semibold">{event.title}</CardTitle>
              <CardDescription className="text-gray-500">{event.description}</CardDescription>
            </CardHeader>
            <CardContent className="p-4">
              <div className="flex items-center mb-2">
                <CalendarIcon className="h-4 w-4 mr-2 text-gray-400" />
                <span>{format(new Date(event.date), 'MMMM dd, yyyy')}</span>
              </div>
              <div className="flex items-center mb-2">
                <MapPinIcon className="h-4 w-4 mr-2 text-gray-400" />
                <span>{event.location}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Time: {event.time}</span>
                <Button asChild variant="secondary" size="sm">
                  <Link to={`/event/${event.id}`}>Learn More</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Events;
