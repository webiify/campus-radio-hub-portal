
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Youtube, ChevronDown, ChevronUp, Link } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  url?: string;
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
        thumbnail: "https://img.youtube.com/vi/DEMO1/default.jpg",
        url: "https://www.youtube.com/embed/DEMO1"
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
        thumbnail: "https://img.youtube.com/vi/DEMO2/default.jpg",
        url: "https://www.youtube.com/embed/DEMO2"
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
        thumbnail: "https://img.youtube.com/vi/DEMO3/default.jpg",
        url: "https://www.youtube.com/embed/DEMO3"
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
        thumbnail: "https://img.youtube.com/vi/DEMO4/default.jpg",
        url: "https://www.youtube.com/embed/DEMO4"
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
        thumbnail: "https://img.youtube.com/vi/DEMO5/default.jpg",
        url: "https://www.youtube.com/embed/DEMO5"
      },
      // Add more mantra videos here
    ]
  }
];

const VideoSection = () => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const toggleCategory = (title: string) => {
    setExpandedCategory(expandedCategory === title ? null : title);
  };

  const openVideoDialog = (video: Video) => {
    setSelectedVideo(video);
    setIsDialogOpen(true);
  };

  const closeVideoDialog = () => {
    setSelectedVideo(null);
    setIsDialogOpen(false);
  };

  return (
    <section className="py-16 bg-gradient-to-br from-club-dark/80 via-purple-900/60 to-club-dark/90">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white animate-fade-in">Our Videos</h2>
          <div className="mt-2 h-1 w-20 bg-club-primary mx-auto"></div>
        </div>

        <div className="space-y-6">
          {videoData.map((category) => (
            <Card 
              key={category.title} 
              className="overflow-hidden backdrop-blur-md bg-white/10 border border-white/20 transition-all duration-300 hover:shadow-lg hover:shadow-club-primary/20"
            >
              <CardContent className="p-0">
                <Button
                  variant="ghost"
                  className="w-full flex justify-between items-center p-6 hover:bg-white/5 text-white"
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
                        className="group cursor-pointer transition-all duration-300 hover:-translate-y-2"
                        onClick={() => openVideoDialog(video)}
                      >
                        <div className="relative aspect-video overflow-hidden rounded-lg">
                          <img
                            src={video.thumbnail}
                            alt={video.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300">
                            <Youtube className="h-12 w-12 text-white animate-pulse" />
                          </div>
                        </div>
                        <h3 className="mt-2 text-sm font-medium text-white group-hover:text-club-primary transition-colors">{video.title}</h3>
                        
                        {video.url && (
                          <div className="mt-2 flex items-center text-club-primary/80 text-xs">
                            <Link className="h-3 w-3 mr-1" />
                            <a href={video.url.replace('embed/', 'watch?v=')} target="_blank" rel="noopener noreferrer" className="hover:underline" onClick={(e) => e.stopPropagation()}>
                              View on YouTube
                            </a>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[800px] bg-club-dark text-white border-club-primary/30">
          <DialogHeader>
            <DialogTitle className="text-club-primary">{selectedVideo?.title}</DialogTitle>
          </DialogHeader>
          <div className="aspect-video w-full mt-2">
            {selectedVideo?.url && (
              <iframe
                src={selectedVideo.url}
                title={selectedVideo.title}
                className="w-full h-full rounded-md"
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              ></iframe>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default VideoSection;
