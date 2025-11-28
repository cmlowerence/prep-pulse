import { ExternalLink, PlayCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";

interface VideoResource {
  title: string;
  url: string;
  thumbnail?: string;
}

interface VideoResourceListProps {
  videos: VideoResource[];
}

export function VideoResourceList({ videos }: VideoResourceListProps) {
  if (!videos || videos.length === 0) return null;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <PlayCircle className="text-red-500" />
        Recommended Videos
      </h3>
      <div className="grid gap-4 md:grid-cols-2">
        {videos.map((video, idx) => (
          <Card key={idx} className="overflow-hidden hover:shadow-md transition-shadow">
            <CardContent className="p-0">
              <a 
                href={video.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center p-4 gap-4 group"
              >
                <div className="h-12 w-12 bg-slate-100 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-red-50 transition-colors">
                  <PlayCircle className="text-slate-400 group-hover:text-red-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm line-clamp-2 group-hover:text-indigo-600 transition-colors">
                    {video.title}
                  </p>
                  <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                    Watch on YouTube <ExternalLink size={10} />
                  </p>
                </div>
              </a>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

