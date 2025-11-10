import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-text-primary mb-4">
          Car Not Found
        </h2>
        <p className="text-text-secondary mb-8">
          Sorry, we couldn&apos;t find the car you&apos;re looking for. It may have been removed or the link is incorrect.
        </p>
        <Link href="/#cars">
          <Button className="bg-primary hover:bg-primary/90 text-white">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Cars
          </Button>
        </Link>
      </div>
    </div>
  );
}



