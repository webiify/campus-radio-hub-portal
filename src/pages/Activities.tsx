
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

// Define activities
const activities = [
  {
    id: "a1",
    title: "Video Production",
    image: "/public/lovable-uploads/e36423e3-96f0-449f-a01f-01d4364ed53f.png",
    description: "Creating original content for our YouTube channel including campus news, event coverage, interviews, and educational videos.",
    skills: ["Video shooting", "Editing", "Direction", "Scriptwriting"]
  },
  {
    id: "a2",
    title: "Radio Broadcasting",
    image: "/public/lovable-uploads/f24e78e1-ea67-467d-ba71-d53eb881bb8a.png",
    description: "Producing radio content including music shows, interviews, campus news bulletins, and educational programming.",
    skills: ["Voice modulation", "Sound editing", "Script preparation", "Live broadcasting"]
  },
  {
    id: "a3",
    title: "Photography",
    image: "/public/lovable-uploads/63f69d7c-2626-40b1-8b74-318f48ac82a9.png",
    description: "Documenting campus events, creating photo essays, and developing skills in various photography styles.",
    skills: ["Composition", "Lighting", "Post-processing", "Event photography"]
  },
  {
    id: "a4",
    title: "Workshop Sessions",
    image: "/public/lovable-uploads/bd1d6c22-6b93-4787-a9c2-9b409a4ef859.png",
    description: "Regular skill development workshops for members on various aspects of media production.",
    skills: ["Peer learning", "Hands-on training", "Industry exposure", "Technical skills"]
  },
  {
    id: "a5",
    title: "Content Creation",
    image: "/public/lovable-uploads/b9ae19f3-25e0-47b1-990d-4e3185771e2b.png",
    description: "Designing posters, digital content, website materials, and social media posts for club activities.",
    skills: ["Graphic design", "Social media management", "Content strategy", "Visual aesthetics"]
  },
  {
    id: "a6",
    title: "Study Material Compilation",
    image: "/public/lovable-uploads/4ecea806-3515-4970-9158-058fc327647f.png",
    description: "Collecting, organizing, and distributing study materials, notes, and question papers for all courses and semesters.",
    skills: ["Resource management", "Digital archiving", "Content categorization", "Educational resource development"]
  }
];

// Define sessions for juniors
const sessions = [
  {
    id: "s1",
    title: "Induction Session",
    image: "/public/lovable-uploads/56a6e27f-b407-4c4e-a0e5-74b8131ffa3c.png",
    description: "An introduction session for juniors to get familiar with the club."
  },
  {
    id: "s2",
    title: "Video Editing",
    image: "/public/lovable-uploads/e36423e3-96f0-449f-a01f-01d4364ed53f.png",
    description: "A workshop was organised to teach about the video editing and get started with the Adobe Premiere Pro."
  },
  {
    id: "s3",
    title: "Graphic Design",
    image: "/public/lovable-uploads/a9be672f-0601-4b08-a117-9c6182bdf2b2.png",
    description: "An online Session was conducted to teach about Graphic Designing."
  }
];

// Define series content
const seriesContent = [
  {
    id: "sc1",
    title: "दर्पण Series",
    image: "/public/lovable-uploads/4a22c3da-f665-48a5-9412-d74cad53a2af.png",
    description: "Interviews with faculty members about academic and career guidance."
  },
  {
    id: "sc2",
    title: "MANTRAS",
    image: "/public/lovable-uploads/67b9f2c9-24c8-4ef6-af8a-d29631323bb5.png",
    description: "Success principles and motivation for students."
  },
  {
    id: "sc3",
    title: "Alumni Interviews",
    image: "/public/lovable-uploads/39c2b856-3a97-464e-aeb1-7f6cef8b691d.png",
    description: "Conversations with successful alumni about their journey after graduation."
  }
];

const Activities = () => {
  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Activities Heading */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">Club Activities</h1>
          <p className="mt-4 text-lg text-gray-600">Explore the various activities and initiatives run by our club members.</p>
        </div>

        {/* Main Activities */}
        <div className="mb-20">
          <h2 className="mb-8 text-3xl font-bold text-gray-900">Core Activities</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {activities.map(activity => (
              <Card key={activity.id} className="overflow-hidden transition-all hover:shadow-lg">
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={activity.image} 
                    alt={activity.title} 
                    className="h-full w-full object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="mb-2 text-xl font-bold text-gray-900">{activity.title}</h3>
                  <p className="mb-4 text-gray-600">{activity.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {activity.skills.map((skill, index) => (
                      <span 
                        key={index} 
                        className="rounded-full bg-club-primary/10 px-3 py-1 text-xs font-medium text-club-dark"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Sessions for Juniors */}
        <div className="mb-20">
          <h2 className="mb-8 text-3xl font-bold text-gray-900">Our Sessions for Juniors</h2>
          <p className="mb-6 text-gray-600">Workshops are regularly organised by the club for the new comers to learn about Photo editing, Video Editing, Graphic Design, and many more.</p>
          
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {sessions.map(session => (
              <Card key={session.id} className="overflow-hidden transition-all hover:shadow-lg">
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={session.image} 
                    alt={session.title} 
                    className="h-full w-full object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="mb-2 text-xl font-bold text-gray-900">{session.title}</h3>
                  <p className="text-gray-600">{session.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Exclusive Series */}
        <div className="mb-20">
          <h2 className="mb-8 text-3xl font-bold text-gray-900">Our Exclusive Series</h2>
          <p className="mb-6 text-gray-600">These are our exclusive series. Select to watch on YouTube.</p>
          
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {seriesContent.map(series => (
              <Card key={series.id} className="overflow-hidden transition-all hover:shadow-lg">
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={series.image} 
                    alt={series.title} 
                    className="h-full w-full object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="mb-2 text-xl font-bold text-gray-900">{series.title}</h3>
                  <p className="mb-4 text-gray-600">{series.description}</p>
                  <Button className="bg-club-primary text-white hover:bg-club-secondary">
                    <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                      Watch on YouTube
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="rounded-lg bg-gradient-to-r from-club-dark to-club-secondary p-8 text-white">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold">Interested in joining our club?</h2>
            <p className="mt-4 text-lg opacity-90">
              We're always looking for passionate students to join our team. Whether you're interested in 
              video production, radio broadcasting, photography, or content creation, there's a place for you!
            </p>
            <Button asChild className="mt-6 bg-white text-club-dark hover:bg-gray-100">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activities;
