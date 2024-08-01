import Image, { StaticImageData } from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";
import twitterXLogo from "@/public/twitter-logo.png";
import withAuth from '@/components/withAuth';
import { getCookie } from 'cookies-next';


const inter = Inter({ subsets: ["latin"] });

interface DataItem {
  title: string;
  description: string;
  imageUrl: StaticImageData;
  url: string;
}

const Home = () => {
  // console.log(getCookie('access'));
  const data: DataItem[] = [
    {
      title: "Twitter Post Agent",
      description: "Automatically extracts data from website URLs and crafts engaging Twitter posts to keep your audience informed and active.",
      imageUrl: twitterXLogo,
      url: '/agents/twitter-post-agent'
    },
    {
      title: "Twitter Post Agent",
      description: "Automatically extracts data from website URLs and crafts engaging Twitter posts to keep your audience informed and active.",
      imageUrl: twitterXLogo,
      url: '/agents/facebook-post-agent'
    },
    {
      title: "Twitter Post Agent",
      description: "Automatically extracts data from website URLs and crafts engaging Twitter posts to keep your audience informed and active.",
      imageUrl: twitterXLogo,
      url: 'agents/whatsapp-post-agent'
    }
  ]
  return (
    <main className="container">
      <div className="flex flex-wrap justify-center gap-6 mt-4">
        {data &&
          data.map((detail, index) => (
            <section key={index} className="glass-card">
              <div className="relative mb-2 w-24 h-24">
                <Image className="rounded-full" src={detail.imageUrl} layout="fill" objectFit="cover" alt="twitter-bg" />
              </div>
              <div className="card">
                <h1 className="text-xl text-center text-white font-bold mb-4">
                  {detail.title}
                </h1>
                <p className="text-sm text-center text-white mb-4">
                  {detail.description}
                </p>
              </div>
              <Link href={detail.url}>
                <button type="button" className="w-full text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2">
                  Use Agent
                </button>
              </Link>
            </section>
          ))}
      </div>
    </main>
  );
}

export default withAuth(Home);