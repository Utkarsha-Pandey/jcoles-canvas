"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { useCreateProject } from "@/features/projects/api/use-create-project";
import { useRouter } from "next/navigation";

export const Banner = () => {
  const router = useRouter();
  const mutation = useCreateProject();

  const onClick = () => {
    mutation.mutate(
      {
        name: "Untitled project",
        json: "",
        width: 900,
        height: 1200,
      },
      {
        onSuccess: ({ data }) => {
          router.push(`/editor/${data.id}`);
        },
      }
    );
  };

  return (
    <section
      className="relative h-[70vh] w-full bg-cover bg-center bg-no-repeat overflow-hidden flex items-center justify-center px-6"
      style={{ backgroundImage: "url('/banner-bg.jpg')" }} 
    >
      {}
      <div className="absolute inset-0 bg-black/50 z-0" />

      {}
      <div className="z-10 max-w-2xl text-center text-white space-y-6">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
          Design Beyond Limits
        </h1>
        <p className="text-lg md:text-xl text-white/90">
          Bring your creative ideas to life with JColes Canvas.
        </p>
        <Button
          disabled={mutation.isPending}
          onClick={onClick}
          size="lg"
          className="text-lg px-8 py-6 font-semibold bg-white text-[#0073ff] hover:bg-gray-100 transition"
        >
          Start Creating
          <ArrowRight className="ml-3 w-5 h-5" />
        </Button>
      </div>
    </section>
  );
};
