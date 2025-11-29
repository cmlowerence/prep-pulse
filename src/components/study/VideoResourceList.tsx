import { ExternalLink, PlaySquare } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

// In a real app, this data would come from the database based on the topic
const MOCK_VIDEOS = [
  { title: "Introduction to Concepts", duration: "10:05", url: "#" },
  { title: "Solved Examples", duration: "15:30", url: "#" },
  { title: "Advanced Theory", duration: "20:00", url: "#" },
];

export const VideoResourceList = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <PlaySquare className="w-5 h-5 text-red-500" />
          Curated Videos
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-1">
        {MOCK_VIDEOS.map((video, i) => (
          <a
            key={i}
            href={video.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3 rounded-md hover:bg-muted transition-colors group"
          >
            <span className="text-sm font-medium group-hover:text-primary">
              {video.title}
            </span>
            <div className="flex items-center gap-3 text-muted-foreground text-xs">
              <span>{video.duration}</span>
              <ExternalLink className="w-3 h-3" />
            </div>
          </a>
        ))}
      </CardContent>
    </Card>
  );
};
