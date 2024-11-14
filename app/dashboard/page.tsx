import { Button } from "@/components/ui/button";
import { Video } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="container py-8">
      <h1 className="text-4xl font-bold mb-8">Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center gap-4 mb-4">
            <Video className="h-8 w-8" />
            <h2 className="text-2xl font-semibold">New Recording</h2>
          </div>
          <p className="text-muted-foreground mb-4">
            Start a new screen or video recording
          </p>
          <Link href="/record">
            <Button>Start Recording</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}