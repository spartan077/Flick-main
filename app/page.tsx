import { Button } from "@/components/ui/button";
import { Video, MessageSquare, Users } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] flex-col">
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
            Share your message with impact using{" "}
            <span className="text-primary">VideoMate</span>
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            Record and share video messages effortlessly. Perfect for teams,
            creators, and anyone who wants to communicate more effectively.
          </p>
          <div className="space-x-4">
            <Link href="/record">
              <Button size="lg" className="px-8">
                Start Recording
              </Button>
            </Link>
            <Link href="/messages">
              <Button size="lg" variant="outline" className="px-8">
                View Messages
              </Button>
            </Link>
          </div>
        </div>
      </section>
      <section className="container space-y-6 py-8 md:py-12 lg:py-24">
        <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <Video className="h-12 w-12" />
              <div className="space-y-2">
                <h3 className="font-bold">Screen Recording</h3>
                <p className="text-sm text-muted-foreground">
                  Record your screen with audio narration
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <MessageSquare className="h-12 w-12" />
              <div className="space-y-2">
                <h3 className="font-bold">Video Messages</h3>
                <p className="text-sm text-muted-foreground">
                  Send personalized video messages
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <Users className="h-12 w-12" />
              <div className="space-y-2">
                <h3 className="font-bold">Team Collaboration</h3>
                <p className="text-sm text-muted-foreground">
                  Share videos with your team
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}