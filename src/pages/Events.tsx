
import { useState } from "react";
import { useEventContext, Event } from "@/context/EventContext";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";

const Events = () => {
  const { events, addEvent, updateEvent, deleteEvent } = useEventContext();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newEvent, setNewEvent] = useState<Partial<Event>>({
    title: "",
    description: "",
    date: new Date(),
    isActive: true
  });
  const [editing, setEditing] = useState<string | null>(null);

  // Get events for the selected date
  const getEventsForDate = (date: Date | undefined) => {
    if (!date) return [];
    
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return (
        eventDate.getDate() === date.getDate() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getFullYear() === date.getFullYear()
      );
    });
  };

  const selectedDateEvents = getEventsForDate(date);

  // Handler for opening the dialog to add a new event
  const handleAddEvent = () => {
    setEditing(null);
    setNewEvent({
      title: "",
      description: "",
      date: date || new Date(),
      isActive: true
    });
    setDialogOpen(true);
  };

  // Handler for opening the dialog to edit an existing event
  const handleEditEvent = (event: Event) => {
    setEditing(event.id);
    setNewEvent({ ...event });
    setDialogOpen(true);
  };

  // Handler for form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newEvent.title || !newEvent.date) {
      alert("Please fill in the required fields");
      return;
    }

    if (editing) {
      updateEvent(editing, newEvent);
    } else {
      addEvent(newEvent as Omit<Event, 'id'>);
    }
    
    setDialogOpen(false);
  };

  // Handler for event deletion
  const handleDeleteEvent = (id: string) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      deleteEvent(id);
    }
  };

  // Function to highlight dates with events on the calendar
  const isDayWithEvent = (day: Date) => {
    return events.some(event => {
      const eventDate = new Date(event.date);
      return (
        eventDate.getDate() === day.getDate() &&
        eventDate.getMonth() === day.getMonth() &&
        eventDate.getFullYear() === day.getFullYear()
      );
    });
  };

  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Events Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">Events Calendar</h1>
          <p className="mt-4 text-lg text-gray-600">Browse and manage all club events, workshops, and activities.</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Calendar Section */}
          <div className="lg:col-span-1">
            <div className="rounded-lg bg-white p-4 shadow-md">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="p-3 pointer-events-auto"
                modifiersStyles={{
                  selected: {
                    backgroundColor: '#0FFBCD',
                    color: '#052c36',
                    fontWeight: 'bold'
                  }
                }}
                modifiers={{
                  event: (date) => isDayWithEvent(date)
                }}
                styles={{
                  event: { border: '2px solid #0FFBCD', borderRadius: '100%' }
                }}
              />
              <div className="mt-4">
                <Button 
                  onClick={handleAddEvent}
                  className="w-full bg-club-primary text-white hover:bg-club-secondary"
                >
                  Add Event
                </Button>
              </div>
            </div>

            <div className="mt-6 rounded-lg bg-white p-4 shadow-md">
              <h3 className="mb-3 text-lg font-semibold text-gray-900">Upcoming Events</h3>
              <ul className="space-y-3">
                {events
                  .filter(event => new Date(event.date) >= new Date())
                  .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                  .slice(0, 5)
                  .map(event => (
                    <li key={event.id} className="flex items-center justify-between border-b border-gray-100 pb-2">
                      <span>{event.title}</span>
                      <span className="text-sm text-gray-500">
                        {format(new Date(event.date), "MMM d, yyyy")}
                      </span>
                    </li>
                  ))}
                {events.filter(event => new Date(event.date) >= new Date()).length === 0 && (
                  <li className="text-sm text-gray-500">No upcoming events</li>
                )}
              </ul>
            </div>
          </div>

          {/* Events for Selected Date */}
          <div className="lg:col-span-2">
            <div className="rounded-lg bg-white p-6 shadow-md">
              <h2 className="mb-6 text-2xl font-bold text-gray-900">
                {date ? (
                  <>Events for {format(date, "MMMM d, yyyy")}</>
                ) : (
                  <>Select a date</>
                )}
              </h2>

              {selectedDateEvents.length > 0 ? (
                <div className="space-y-6">
                  {selectedDateEvents.map(event => (
                    <Card key={event.id} className={`overflow-hidden transition-all ${event.isActive ? 'border-l-4 border-l-club-primary' : 'opacity-70'}`}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900">{event.title}</h3>
                            <p className="mt-2 text-gray-600">{event.description}</p>
                            <div className="mt-3 flex items-center">
                              <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${event.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                {event.isActive ? 'Active' : 'Inactive'}
                              </span>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleEditEvent(event)}
                            >
                              Edit
                            </Button>
                            <Button 
                              variant="destructive" 
                              size="sm"
                              onClick={() => handleDeleteEvent(event.id)}
                            >
                              Delete
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center">
                  <p className="text-gray-500">No events scheduled for this date</p>
                  <Button 
                    onClick={handleAddEvent}
                    className="mt-4 bg-club-primary text-white hover:bg-club-secondary"
                  >
                    Add Event
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Past Events Section */}
        <div className="mt-20">
          <h2 className="mb-8 text-3xl font-bold text-gray-900">Our Golden Moments</h2>
          <div className="grid gap-8 sm:grid-cols-2">
            <Card className="overflow-hidden shadow-lg">
              <div className="aspect-video overflow-hidden">
                <img 
                  src="/public/lovable-uploads/b9ae19f3-25e0-47b1-990d-4e3185771e2b.png" 
                  alt="Alumni Session" 
                  className="h-full w-full object-cover"
                />
              </div>
              <CardContent className="p-6">
                <div className="mb-4 text-sm font-medium text-club-primary">March 9, 2022</div>
                <h3 className="mb-2 text-xl font-bold text-gray-900">Alumni Session with Mr. Subhash Dubey</h3>
                <p className="text-gray-600">An online session with our distinguished alumnus who is now a specialist leader at Deloitte.</p>
                <Button className="mt-4 bg-club-primary text-white hover:bg-club-secondary">
                  <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                    Watch on YouTube
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="overflow-hidden shadow-lg">
              <div className="aspect-video overflow-hidden">
                <img 
                  src="/public/lovable-uploads/39c2b856-3a97-464e-aeb1-7f6cef8b691d.png" 
                  alt="Alumni Interview" 
                  className="h-full w-full object-cover"
                />
              </div>
              <CardContent className="p-6">
                <div className="mb-4 text-sm font-medium text-club-primary">September 9, 2022</div>
                <h3 className="mb-2 text-xl font-bold text-gray-900">Alumni Interview with Ms. Barnali Ghosh</h3>
                <p className="text-gray-600">An insightful conversation with Ms. Barnali Ghosh, Technical Director at Mott MacDonald.</p>
                <Button className="mt-4 bg-club-primary text-white hover:bg-club-secondary">
                  <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                    Watch on YouTube
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Event Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{editing ? 'Edit Event' : 'Add New Event'}</DialogTitle>
            <DialogDescription>
              {editing ? 'Make changes to the existing event' : 'Enter details for the new event'}
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Event Title</Label>
                <Input
                  id="title"
                  placeholder="Enter event title"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Enter event description"
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                  rows={3}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={newEvent.date ? format(new Date(newEvent.date), "yyyy-MM-dd") : ""}
                  onChange={(e) => setNewEvent({...newEvent, date: new Date(e.target.value)})}
                  required
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="active"
                  checked={newEvent.isActive}
                  onCheckedChange={(checked) => setNewEvent({...newEvent, isActive: checked})}
                />
                <Label htmlFor="active">Active (display notification)</Label>
              </div>
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-club-primary text-white hover:bg-club-secondary">
                {editing ? 'Update' : 'Add'} Event
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Events;
