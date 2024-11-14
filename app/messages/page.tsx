import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { VideoList } from "@/components/video/video-list";

export default async function MessagesPage() {
  const supabase = createServerComponentClient({ cookies });

  const { data: messages } = await supabase
    .from("messages")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="container py-8">
      <h1 className="text-4xl font-bold mb-8">My Messages</h1>
      <VideoList messages={messages || []} />
    </div>
  );
}