
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            <span className="text-club-primary">About</span> Our Club
          </h1>
          <div className="mt-2 h-1 w-24 bg-club-primary"></div>
          <div className="mt-12 grid gap-12 md:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">WE ARE THE MEDIA CLUB OF BHAGALPUR COLLEGE OF ENGINEERING</h2>
              <p className="mt-4 text-gray-600">
                This is the BCE Bhagalpur's official Club. The aim of the club is to showcase all the events, 
                club activities, talents and college life at BCE Bhagalpur. It is a soul initiative of 
                Campus TV and Radio Club (Frontiers) of Bhagalpur College Of Engineering. 
              </p>
              <p className="mt-4 text-gray-600">
                Our club provides a platform for students to explore and develop skills in media 
                production, broadcasting, content creation, and technical operation of audio-visual equipment.
              </p>
              <p className="mt-4 text-gray-600">
                We produce original video series, conduct interviews with distinguished alumni, 
                document campus events, and provide radio broadcasting services for the campus community.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img 
                src="/public/lovable-uploads/bd1d6c22-6b93-4787-a9c2-9b409a4ef859.png" 
                alt="Campus TV and Radio Club Members" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Leadership Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900">Our Leadership</h2>
          <div className="mt-2 h-1 w-20 bg-club-primary"></div>
          
          <div className="mt-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Direction & Guidance</h3>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <Card className="transition-all hover:shadow-lg">
                <CardContent className="p-6">
                  <h4 className="text-lg font-bold text-gray-900">Director</h4>
                  <p className="mt-1 text-gray-600">Dr. OP ROY (Principal, BCE Bhagalpur)</p>
                </CardContent>
              </Card>
              
              <Card className="transition-all hover:shadow-lg">
                <CardContent className="p-6">
                  <h4 className="text-lg font-bold text-gray-900">Chairperson</h4>
                  <p className="mt-1 text-gray-600">Prof. Shashank Shekhar (H.O.D. of English)</p>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="mt-12">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Student Leadership</h3>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <Card className="transition-all hover:shadow-lg">
                <CardContent className="p-6">
                  <h4 className="text-lg font-bold text-gray-900">Founder</h4>
                  <p className="mt-1 text-gray-600">Kumar Gaurav (2k19)</p>
                  <p className="mt-1 text-gray-500">Mechanical Engineering</p>
                </CardContent>
              </Card>
              
              <Card className="transition-all hover:shadow-lg">
                <CardContent className="p-6">
                  <h4 className="text-lg font-bold text-gray-900">Co-Founder</h4>
                  <p className="mt-1 text-gray-600">Kr. Chandra Bhanu</p>
                </CardContent>
              </Card>
              
              <Card className="transition-all hover:shadow-lg">
                <CardContent className="p-6">
                  <h4 className="text-lg font-bold text-gray-900">Secretary</h4>
                  <p className="mt-1 text-gray-600">Keshav Jha (2021)</p>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="mt-12">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Club Coordinators</h3>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {['Kumar Chandra Bhanu', 'Himanshu Vishwas', 'Aman kr', 'Anshika', 
               'Srishty Saumya', 'Rupali', 'Arpita', 'Aashish'].map((name, index) => (
                <Card key={index} className="transition-all hover:shadow-lg">
                  <CardContent className="p-4">
                    <p className="font-medium text-gray-900">{name}</p>
                    <p className="text-sm text-gray-500">Coordinator</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Vision Section */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Our Vision</h2>
          <div className="mt-2 h-1 w-20 bg-club-primary"></div>
          
          <div className="mt-8 bg-white p-8 rounded-lg shadow-md">
            <p className="text-gray-700">
              We envision a vibrant campus media ecosystem where students can express their creativity,
              develop professional media skills, and document the rich tapestry of campus life at 
              BCE Bhagalpur. Our goal is to provide a platform for student voices while creating valuable
              educational resources and fostering a sense of community through our media productions.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <div className="bg-club-primary/10 px-4 py-2 rounded-full">
                <span className="text-club-dark font-medium">Creativity</span>
              </div>
              <div className="bg-club-primary/10 px-4 py-2 rounded-full">
                <span className="text-club-dark font-medium">Education</span>
              </div>
              <div className="bg-club-primary/10 px-4 py-2 rounded-full">
                <span className="text-club-dark font-medium">Documentation</span>
              </div>
              <div className="bg-club-primary/10 px-4 py-2 rounded-full">
                <span className="text-club-dark font-medium">Innovation</span>
              </div>
              <div className="bg-club-primary/10 px-4 py-2 rounded-full">
                <span className="text-club-dark font-medium">Community</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
