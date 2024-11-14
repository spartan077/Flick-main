"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Video, Pause, Square, Send } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export function VideoRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const { toast } = useToast();
  const router = useRouter();

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          setRecordedChunks((prev) => [...prev, event.data]);
        }
      };

      recorder.start(1000);
      setIsRecording(true);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to start recording. Please check your permissions.",
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      streamRef.current?.getTracks().forEach((track) => track.stop());
      setIsRecording(false);
      setIsPaused(false);
    }
  };

  const togglePause = () => {
    if (mediaRecorder) {
      if (isPaused) {
        mediaRecorder.resume();
      } else {
        mediaRecorder.pause();
      }
      setIsPaused(!isPaused);
    }
  };

  const uploadVideo = async () => {
    if (recordedChunks.length === 0) return;

    const videoBlob = new Blob(recordedChunks, { type: "video/webm" });
    const fileName = `video-${Date.now()}.webm`;

    try {
      const { data, error } = await supabase.storage
        .from("videos")
        .upload(fileName, videoBlob);

      if (error) throw error;

      const { error: dbError } = await supabase.from("messages").insert({
        video_url: data.path,
        user_id: (await supabase.auth.getUser()).data.user?.id,
      });

      if (dbError) throw dbError;

      toast({
        title: "Success",
        description: "Video uploaded successfully!",
      });

      router.push("/messages");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to upload video.",
      });
    }
  };

  return (
    <Card className="p-6">
      <div className="aspect-video mb-4 bg-muted rounded-lg overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex justify-center gap-4">
        {!isRecording ? (
          <Button onClick={startRecording}>
            <Video className="mr-2 h-4 w-4" />
            Start Recording
          </Button>
        ) : (
          <>
            <Button onClick={togglePause}>
              <Pause className="mr-2 h-4 w-4" />
              {isPaused ? "Resume" : "Pause"}
            </Button>
            <Button variant="destructive" onClick={stopRecording}>
              <Square className="mr-2 h-4 w-4" />
              Stop
            </Button>
          </>
        )}
        {recordedChunks.length > 0 && !isRecording && (
          <Button onClick={uploadVideo}>
            <Send className="mr-2 h-4 w-4" />
            Upload
          </Button>
        )}
      </div>
    </Card>
  );
}