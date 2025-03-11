import { VT323 } from "next/font/google";
import "./globals.css";
import dynamic from "next/dynamic";
import { Toaster } from "@/components/ui/sonner";
const Provider = dynamic(() => import("@/components/common/Provider"));

const vt323 = VT323({
  variable: "--font-vt323",
  weight: "400",
  subsets: ["latin"],
});

export async function generateMetadata() {
  const appUrl = process.env.NEXT_PUBLIC_URL;
  const imageUrl = process.env.NEXT_PUBLIC_IMAGE_URL;
  const logoUrl = process.env.NEXT_PUBLIC_LOGO;
  return {
    title: "TapInn",
    description: "Tap to win",
    openGraph: {
      title: `TapInn`,
      description: `Tap to Win`,

      images: [
        {
          url: `${imageUrl}`,
          width: 800,
          height: 600,
        },
      ],
    },
    other: {
      "fc:frame": JSON.stringify({
        version: "next",
        imageUrl: `${imageUrl}`,
        button: {
          title: "Start TapInn",
          action: {
            type: "launch_frame",
            name: "TapInn",
            url: `${appUrl}`,
            splashImageUrl: `${logoUrl}`,
            splashBackgroundColor: "#FFFFFF",
          },
        },
      }),
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${vt323.variable}  bg-lobby theme-light`}>
        <Provider>{children}</Provider>
        <Toaster position="bottom-center" />
      </body>
    </html>
  );
}
