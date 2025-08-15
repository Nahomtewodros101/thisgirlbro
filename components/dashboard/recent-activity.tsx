import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Star } from "lucide-react";

interface Activity {
  id: string;
  watchedAt: string;
  movie: {
    id: string;
    title: string;
    poster: string;
    rating: number;
    year: number;
  };
}

interface RecentActivityProps {
  activities: Activity[];
}

export function RecentActivity({ activities }: RecentActivityProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString([], {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        {activities.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">
            No recent activity
          </p>
        ) : (
          <div className="space-y-4">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-center gap-3">
                <img
                  src={
                    activity.movie.poster ||
                    "/placeholder.svg?height=60&width=40"
                  }
                  alt={activity.movie.title}
                  className="w-10 h-14 object-cover rounded"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm line-clamp-1">
                    {activity.movie.title}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="secondary" className="text-xs">
                      <Star className="h-3 w-3 mr-1" />
                      {activity.movie.rating}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {activity.movie.year}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Watched {formatDate(activity.watchedAt)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
