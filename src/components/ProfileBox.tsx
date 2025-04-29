
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Linkedin, Mail } from "lucide-react";

export interface ProfileProps {
  name: string;
  role: string;
  department?: string;
  email?: string;
  linkedinUrl?: string;
  imageUrl?: string;
  batch?: string;
  timeline?: string;
}

const ProfileBox = ({
  name,
  role,
  department,
  email,
  linkedinUrl,
  imageUrl,
  batch,
  timeline,
}: ProfileProps) => {
  // Generate initials from name for avatar fallback
  const initials = name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group">
      <div className="p-4 flex flex-col items-center">
        <Avatar className="h-24 w-24 mb-4 ring-2 ring-club-primary/30 group-hover:ring-club-primary">
          <AvatarImage src={imageUrl} alt={name} />
          <AvatarFallback className="bg-club-dark text-club-primary text-xl">
            {initials}
          </AvatarFallback>
        </Avatar>
        
        <h3 className="font-bold text-lg text-center">{name}</h3>
        <p className="text-club-primary font-medium text-sm text-center">{role}</p>
        
        {department && (
          <p className="text-gray-500 text-sm mt-1 text-center">{department}</p>
        )}
        
        {batch && (
          <p className="text-gray-500 text-xs mt-1 text-center">Batch: {batch}</p>
        )}
        
        {timeline && (
          <p className="text-gray-600 text-xs mt-1 text-center">Timeline: {timeline}</p>
        )}
        
        <div className="flex mt-3 space-x-2">
          {email && (
            <a
              href={`mailto:${email}`}
              className="p-1.5 rounded-full bg-gray-100 text-gray-600 hover:bg-club-primary/10 hover:text-club-primary transition-colors"
              title={email}
            >
              <Mail className="h-4 w-4" />
            </a>
          )}
          
          {linkedinUrl && (
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-full bg-gray-100 text-gray-600 hover:bg-club-primary/10 hover:text-club-primary transition-colors"
              title="LinkedIn Profile"
            >
              <Linkedin className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>
    </Card>
  );
};

export default ProfileBox;
