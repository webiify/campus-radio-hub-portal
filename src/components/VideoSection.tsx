
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Youtube, ChevronDown, ChevronUp } from "lucide-react";

interface Video {
  id: string;
  title: string;
  thumbnail: string;
}

interface VideoCategory {
  title: string;
  videos: Video[];
}

const videoData: VideoCategory[] = [
  {
    title: "College Tour",
    videos: [
      {
        id: "video1",
        title: "Campus Main Building Tour",
        thumbnail: "https://img.youtube.com/vi/DEMO1/default.jpg"
      },
      // Add more tour videos here
    ]
  },
  {
    title: "College Event",
    videos: [
      {
        id: "event1",
        title: "Annual Tech Fest 2024",
        thumbnail: "https://img.youtube.com/vi/DEMO2/default.jpg"
      },
      // Add more event videos here
    ]
  },
  {
    title: "Faculty Introduction",
    videos: [
      {
        id: "faculty1",
        title: "Meet Our HOD",
        thumbnail: "https://img.youtube.com/vi/DEMO3/default.jpg"
      },
      // Add more faculty videos here
    ]
  },
  {
    title: "Alumni Interview",
    videos: [
      {
        id: "alumni1",
        title: "Success Story: Google Engineer",
        thumbnail: "https://img.youtube.com/vi/DEMO4/default.jpg"
      },
      // Add more alumni videos here
    ]
  },
  {
    title: "Mantra Videos",
    videos: [
      {
        id: "mantra1",
        title: "Motivation for Success",
        thumbnail: "https://img.youtube.com/vi/DEMO5/default.jpg"
      },
      // Add more mantra videos here
    ]
  }
];

const VideoSection = () => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const toggleCategory = (title: string) => {
    setExpandedCategory(expandedCategory === title ? null : title);
  };

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">Our Videos</h2>
          <div className="mt-2 h-1 w-20 bg-club-primary mx-auto"></div>
        </div>

        <div className="space-y-6">
          {videoData.map((category) => (
            <Card key={category.title} className="overflow-hidden">
              <CardContent className="p-0">
                <Button
                  variant="ghost"
                  className="w-full flex justify-between items-center p-6 hover:bg-gray-50"
                  onClick={() => toggleCategory(category.title)}
                >
                  <div className="flex items-center gap-2">
                    <Youtube className="h-5 w-5 text-club-primary" />
                    <span className="text-xl font-semibold">{category.title}</span>
                  </div>
                  {expandedCategory === category.title ? (
                    <ChevronUp className="h-5 w-5" />
                  ) : (
                    <ChevronDown className="h-5 w-5" />
                  )}
                </Button>

                {expandedCategory === category.title && (
                  <div className="grid gap-6 p-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 animate-accordion-down">
                    {category.videos.map((video) => (
                      <div
                        key={video.id}
                        className="group cursor-pointer transition-transform hover:-translate-y-1"
                      >
                        <div className="relative aspect-video overflow-hidden rounded-lg">
                          <img
                            src={video.thumbnail}
                            alt={video.title}
                            className="w-full h-full object-cover transition-transform group-hover:scale-105"
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Youtube className="h-12 w-12 text-white" />
                          </div>
                        </div>
                        <h3 className="mt-2 text-sm font-medium text-gray-900">{video.title}</h3>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
