
import { Button } from "@/components/ui/button";

type UploadCTAProps = {
  uploadUrls: {
    questionPapers: string;
    notes: string;
  };
};

const UploadCTA = ({ uploadUrls }: UploadCTAProps) => {
  return (
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
  );
};

export default UploadCTA;
