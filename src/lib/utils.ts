import { type ClassValue, clsx } from "clsx"
import { Metadata } from "next"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function constructMetadata({
  title = "Paras Mandola",
  description = "Paras Mandola | Full-Stack Developer | Building modern, scalable web solutions.",
  image = "/image.png",
  icons = "/favicon.ico"
}: {
  title?: string,
  description?: string,
  image?: string,
  icons?: string
} = {}): Metadata {
  return {
    title, description, openGraph: {
      title, description, images: [{ url: image }]
    },
    icons,
    metadataBase: new URL(process.env.URL || "https://parasmandola.vercel.app")
  }
}