import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
  return (
    <section
      className="flex flex-col items-center justify-center bg-linear-to-b from-gray-100 to-white text-center"
      style={{ minHeight: "100vh" }}
    >
      <section className="rounded-lg p-4">
        <section className="relative">
          <Image
            src="/images/404.png"
            width={100}
            height={100}
            alt="not-found"
            sizes="(max-width: 768px) 100vw,
            (max-width: 1200px) 50vw,
            33vw"
            className="size-full max-h-[640px]"
          />
        </section>
        <Button asChild>
          <Link
            href="/"
            className="mt-10 inline-block rounded px-6 py-3 text-sm text-white transition-colors duration-300 md:text-base"
          >
            Go back to Home Page
          </Link>
        </Button>
      </section>
    </section>
  );
}
