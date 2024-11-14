import { AuthForm } from "@/components/auth/auth-form";

export default function AuthPage() {
  return (
    <div className="container flex h-[calc(100vh-3.5rem)] w-full flex-col items-center justify-center">
      <AuthForm />
    </div>
  );
}