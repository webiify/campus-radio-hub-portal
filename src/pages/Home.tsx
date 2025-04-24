import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SubscribeForm } from "@/components/SubscribeForm";
import { Card, CardContent } from "@/components/ui/card";
import { useEventContext } from "@/context/EventContext";
import { format } from "date-fns";
import VideoSection from "@/components/VideoSection";

const Home = () => {
  const { events } = useEventContext();
  
  // Get the most recent upcoming event
  const upcomingEvent = events
    .filter(event => new Date(event.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0];

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen w-full bg-college-bg bg-cover bg-center bg-no-repeat">
        <div className="absolute inset-0 bg-overlay"></div>
        <div className="container relative mx-auto flex h-full flex-col items-center justify-center px-4 text-center text-white sm:px-6 lg:px-8">
          <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            <span className="block text-club-primary">Campus TV and Radio Club</span>
            <span className="block">BCE BHAGALPUR</span>
          </h1>
          <p className="mb-8 max-w-3xl text-lg opacity-90">
            Showcasing campus events, activities, and talent through media, broadcasting, and creative content.
          </p>
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            <Button asChild className="bg-club-primary text-white hover:bg-club-secondary">
              <Link to="/about">Know more about the club</Link>
            </Button>
            <Button asChild variant="outline" className="border-white text-white hover:bg-white hover:text-club-dark">
              <Link to="/study-material">Access Study Material</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Latest Event Section */}
      {upcomingEvent && (
        <section className="bg-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">Upcoming Event</h2>
              <div className="mt-2 h-1 w-20 bg-club-primary mx-auto"></div>
            </div>
            
            <div className="mx-auto max-w-3xl overflow-hidden rounded-lg bg-gradient-to-r from-club-dark to-club-secondary p-1 shadow-lg">
              <div className="bg-white p-6 sm:p-8">
                <div className="flex flex-col justify-between sm:flex-row sm:items-center">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{upcomingEvent.title}</h3>
                    <p className="mt-1 text-lg text-gray-600">
                      {format(new Date(upcomingEvent.date), "MMMM dd, yyyy")}
                    </p>
                    <p className="mt-3 text-gray-700">{upcomingEvent.description}</p>
                  </div>
                  <div className="mt-6 sm:mt-0">
                    <Button asChild className="bg-club-primary text-white hover:bg-club-secondary">
                      <Link to="/events">View All Events</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Video Section */}
      <VideoSection />

      {/* Features Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">What We Offer</h2>
            <div className="mt-2 h-1 w-20 bg-club-primary mx-auto"></div>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <Card className="overflow-hidden border-none shadow-lg transition-transform hover:-translate-y-1 hover:shadow-xl">
              <div className="h-2 bg-club-primary"></div>
              <CardContent className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-club-primary/10 text-club-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-bold">Academic Resources</h3>
                <p className="text-gray-600">Access to study materials, notes, and question papers from previous semesters for all branches.</p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-none shadow-lg transition-transform hover:-translate-y-1 hover:shadow-xl">
              <div className="h-2 bg-club-secondary"></div>
              <CardContent className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-club-secondary/10 text-club-secondary">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-bold">Media Content</h3>
                <p className="text-gray-600">Original video series, interviews, documentaries, and radio programs produced by our talented members.</p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-none shadow-lg transition-transform hover:-translate-y-1 hover:shadow-xl">
              <div className="h-2 bg-club-accent"></div>
              <CardContent className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-club-accent/10 text-club-accent">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-bold">Events & Workshops</h3>
                <p className="text-gray-600">Regular workshops, events, and training sessions to develop skills in media production and broadcasting.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-club-dark py-16 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Stay Updated with Our Latest Events</h2>
            <p className="mt-4 text-lg opacity-90">
              Subscribe to receive notifications about upcoming events, new workshops, and study material updates.
            </p>
            <div className="mt-8 mx-auto max-w-md">
              <SubscribeForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
