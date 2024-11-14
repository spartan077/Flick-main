"use client";

import { Card } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";

interface Message {
  id: string;
  video_url: string;
  created_at: string;
}

interface VideoListProps {
  messages: Message[];
}

export function VideoList({ messages }: VideoListProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {messages.map((message) => (
        <Card key={message.id} className="p-4">
          <video
            src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/videos/${message.video_url}`}
            controls
            className="w-full aspect-video rounded-lg mb-4"
          />
          <div className="text-sm text-muted-foreground">
            {formatDistanceToNow(new Date(message.created_at), {
              addSuffix: true,
            })}
          </div>
        </Card>
      ))}
    </div>
  );
}