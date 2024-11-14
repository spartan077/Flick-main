"use client";

import { VideoRecorder } from "@/components/video/video-recorder";

export default function RecordPage() {
  return (
    <div className="container py-8">
      <h1 className="text-4xl font-bold mb-8">Record Video Message</h1>
      <VideoRecorder />
    </div>
  );
}