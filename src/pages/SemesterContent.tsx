
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { FileIcon, Download, Upload } from "lucide-react";

// Define the branches
const branches = [
  { id: "cse", name: "Computer Science (CSE)" },
  { id: "me", name: "Mechanical Engineering" },
  { id: "ece", name: "Electronics & Communication (ECE)" },
  { id: "ee", name: "Electrical Engineering (EE)" },
  { id: "ce", name: "Civil Engineering" }
];

// Define the upload URLs (for admin use)
const uploadUrls = {
  questionPapers: "https://forms.gle/exampleQuestionPaperUploadForm",
  notes: "https://forms.gle/exampleNotesUploadForm"
};

// Define mock data for question papers
const questionPapers = {
  cse: [
    { id: 1, title: "Data Structures & Algorithms", year: "2024", fileSize: "2.4 MB", pages: 12 },
    { id: 2, title: "Database Management Systems", year: "2024", fileSize: "1.8 MB", pages: 8 },
    { id: 3, title: "Computer Networks", year: "2023", fileSize: "3.2 MB", pages: 14 },
    { id: 4, title: "Operating Systems", year: "2023", fileSize: "2.1 MB", pages: 10 }
  ],
  me: [
    { id: 1, title: "Thermodynamics", year: "2024", fileSize: "2.2 MB", pages: 10 },
    { id: 2, title: "Fluid Mechanics", year: "2024", fileSize: "1.9 MB", pages: 9 },
    { id: 3, title: "Machine Design", year: "2023", fileSize: "3.5 MB", pages: 15 }
  ],
  ece: [
    { id: 1, title: "Digital Electronics", year: "2024", fileSize: "2.3 MB", pages: 11 },
    { id: 2, title: "Communication Systems", year: "2024", fileSize: "2.0 MB", pages: 9 },
    { id: 3, title: "Signals & Systems", year: "2023", fileSize: "2.8 MB", pages: 12 }
  ],
  ee: [
    { id: 1, title: "Power Systems", year: "2024", fileSize: "2.5 MB", pages: 12 },
    { id: 2, title: "Electrical Machines", year: "2024", fileSize: "2.2 MB", pages: 10 },
    { id: 3, title: "Control Systems", year: "2023", fileSize: "2.7 MB", pages: 12 }
  ],
  ce: [
    { id: 1, title: "Structural Analysis", year: "2024", fileSize: "2.4 MB", pages: 11 },
    { id: 2, title: "Geotechnical Engineering", year: "2024", fileSize: "2.1 MB", pages: 10 },
    { id: 3, title: "Transportation Engineering", year: "2023", fileSize: "2.6 MB", pages: 12 }
  ]
};

// Define mock data for notes
const notes = {
  cse: [
    { id: 1, title: "Data Structures Complete Notes", author: "Prof. Kumar", fileSize: "4.6 MB", pages: 45 },
    { id: 2, title: "DBMS Concepts and SQL", author: "Prof. Sharma", fileSize: "3.8 MB", pages: 32 },
    { id: 3, title: "Computer Networks Fundamentals", author: "Prof. Gupta", fileSize: "5.2 MB", pages: 50 }
  ],
  me: [
    { id: 1, title: "Thermodynamics Principles", author: "Prof. Singh", fileSize: "4.2 MB", pages: 40 },
    { id: 2, title: "Fluid Mechanics Complete Notes", author: "Prof. Verma", fileSize: "3.9 MB", pages: 35 }
  ],
  ece: [
    { id: 1, title: "Digital Electronics Circuits", author: "Prof. Jha", fileSize: "4.3 MB", pages: 42 },
    { id: 2, title: "Communication Systems Notes", author: "Prof. Mishra", fileSize: "4.0 MB", pages: 38 }
  ],
  ee: [
    { id: 1, title: "Power Systems Analysis", author: "Prof. Roy", fileSize: "4.5 MB", pages: 44 },
    { id: 2, title: "Electrical Machines Complete Notes", author: "Prof. Das", fileSize: "4.2 MB", pages: 40 }
  ],
  ce: [
    { id: 1, title: "Structural Analysis Methods", author: "Prof. Banerjee", fileSize: "4.4 MB", pages: 43 },
    { id: 2, title: "Geotechnical Engineering Notes", author: "Prof. Chatterjee", fileSize: "4.1 MB", pages: 39 }
  ]
};

const SemesterContent = () => {
  const { semester } = useParams<{ semester: string }>();
  const [selectedBranch, setSelectedBranch] = useState("cse");
  const [showAdminLinks, setShowAdminLinks] = useState(false);
  
  if (!semester) {
    return (
      <div className="flex h-96 items-center justify-center">
        <p className="text-lg text-gray-600">Semester not specified</p>
      </div>
    );
  }

  const semesterNumber = parseInt(semester);
  
  // Helper function to handle file download
  const handleDownload = (fileType: string, fileName: string) => {
    // In a real app, this would trigger the actual file download
    // For now, we'll just show a toast message
    alert(`Downloading ${fileType}: ${fileName}`);
  };

  // Toggle admin links visibility
  const toggleAdminLinks = () => {
    setShowAdminLinks(!showAdminLinks);
  };

  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Back Button */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center">
            <Button asChild variant="outline" className="mr-4">
              <Link to="/study-material">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mr-2 h-5 w-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
                Back to Study Material
              </Link>
            </Button>
            <h1 className="text-3xl font-bold text-gray-900">Semester {semesterNumber} Resources</h1>
          </div>
          
          {/* Admin button - double click to reveal upload links */}
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-gray-400 hover:text-gray-600"
            onDoubleClick={toggleAdminLinks}
          >
            Admin
          </Button>
        </div>
        
        {/* Admin Upload Links (hidden by default) */}
        {showAdminLinks && (
          <div className="mb-6 rounded-lg border border-dashed border-gray-300 bg-gray-50 p-4">
            <h3 className="mb-2 text-lg font-semibold text-gray-900">Admin Upload Links</h3>
            <div className="space-y-2">
              <div className="flex items-center">
                <Upload className="mr-2 h-4 w-4 text-gray-500" />
                <span className="mr-2 text-sm text-gray-700">Upload Question Papers:</span>
                <a 
                  href={uploadUrls.questionPapers} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
                >
                  {uploadUrls.questionPapers}
                </a>
              </div>
              <div className="flex items-center">
                <Upload className="mr-2 h-4 w-4 text-gray-500" />
                <span className="mr-2 text-sm text-gray-700">Upload Notes:</span>
                <a 
                  href={uploadUrls.notes} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
                >
                  {uploadUrls.notes}
                </a>
              </div>
            </div>
            <p className="mt-2 text-xs text-gray-500">
              These links are for administrators only. Please use the appropriate form to upload materials for each category.
            </p>
          </div>
        )}

        {/* Branch Selection */}
        <div className="mb-8 overflow-x-auto">
          <div className="inline-flex min-w-full space-x-1 rounded-lg bg-white p-1 shadow-sm">
            {branches.map(branch => (
              <Button
                key={branch.id}
                variant={selectedBranch === branch.id ? "default" : "ghost"}
                className={selectedBranch === branch.id ? "bg-club-primary text-white" : ""}
                onClick={() => setSelectedBranch(branch.id)}
              >
                {branch.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Content Tabs */}
        <Tabs defaultValue="question-papers">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="question-papers">Question Papers</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
          </TabsList>
          
          {/* Question Papers Content */}
          <TabsContent value="question-papers">
            <Card>
              <CardContent className="p-6">
                <h3 className="mb-6 text-xl font-bold text-gray-900">Question Papers - {branches.find(b => b.id === selectedBranch)?.name}</h3>
                
                {questionPapers[selectedBranch as keyof typeof questionPapers].length > 0 ? (
                  <div className="space-y-4">
                    {questionPapers[selectedBranch as keyof typeof questionPapers].map(paper => (
                      <div key={paper.id} className="flex items-center justify-between rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50">
                        <div className="flex items-center">
                          <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-club-primary/10 text-club-primary">
                            <FileIcon className="h-6 w-6" />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">{paper.title}</h4>
                            <p className="text-sm text-gray-500">
                              {paper.year} • {paper.pages} pages • {paper.fileSize}
                            </p>
                          </div>
                        </div>
                        <Button 
                          variant="outline"
                          className="flex items-center text-club-primary hover:bg-club-primary/10 hover:text-club-primary"
                          onClick={() => handleDownload("Question Paper", paper.title)}
                        >
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center">
                    <p className="text-gray-500">No question papers available for this branch</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Notes Content */}
          <TabsContent value="notes">
            <Card>
              <CardContent className="p-6">
                <h3 className="mb-6 text-xl font-bold text-gray-900">Notes - {branches.find(b => b.id === selectedBranch)?.name}</h3>
                
                {notes[selectedBranch as keyof typeof notes].length > 0 ? (
                  <div className="space-y-4">
                    {notes[selectedBranch as keyof typeof notes].map(note => (
                      <div key={note.id} className="flex items-center justify-between rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50">
                        <div className="flex items-center">
                          <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-club-secondary/10 text-club-secondary">
                            <FileIcon className="h-6 w-6" />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">{note.title}</h4>
                            <p className="text-sm text-gray-500">
                              By {note.author} • {note.pages} pages • {note.fileSize}
                            </p>
                          </div>
                        </div>
                        <Button 
                          variant="outline"
                          className="flex items-center text-club-secondary hover:bg-club-secondary/10 hover:text-club-secondary"
                          onClick={() => handleDownload("Note", note.title)}
                        >
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center">
                    <p className="text-gray-500">No notes available for this branch</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Upload CTA Section */}
        <div className="mt-12 rounded-lg bg-gradient-to-r from-club-dark to-club-secondary p-8 text-white">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-bold">Have materials to share?</h2>
            <p className="mt-4 opacity-90">
              If you have notes, question papers, or other study materials to contribute, please share them with us.
              Your contribution helps your fellow students!
            </p>
            <div className="mt-6 flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <Button asChild className="w-full bg-white text-club-dark hover:bg-gray-100 sm:w-auto">
                <a href={uploadUrls.questionPapers} target="_blank" rel="noopener noreferrer">
                  Upload Question Papers
                </a>
              </Button>
              <Button asChild className="w-full bg-white text-club-dark hover:bg-gray-100 sm:w-auto">
                <a href={uploadUrls.notes} target="_blank" rel="noopener noreferrer">
                  Upload Notes
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SemesterContent;
