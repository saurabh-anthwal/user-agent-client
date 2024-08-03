import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";
import twitterXLogo from "@/public/twitter-logo.png";
import withAuth from '@/components/withAuth';
import { useContext, useEffect, useState } from "react";
import { AuthenticationContext, AuthenticationContextProps } from '@/context/AuthenticationContext';

const inter = Inter({ subsets: ["latin"] });

interface DataItem {
  title: string;
  description: string;
  imageUrl: string; // Change to string if the URL is a string
  url: string;
}

const Home = () => {
  const [agents, setAgents] = useState<any[]>([]);

  const context = useContext<AuthenticationContextProps | undefined>(AuthenticationContext);

  useEffect(() => {
    const fetchAgents = async () => {
      if (context?.agentList) {
        try {
          const res = await context.agentList();
          setAgents(res); // Assuming agentList already returns JSON data
          console.log('Agents data:', res);
        } catch (err) {
          console.log(err, "err");
        } 
      }
    };

    fetchAgents();
  }, [context]);


  return (
    <main className="container mx-auto p-6">
      <div className="flex flex-wrap justify-center gap-10 mt-4">
        {agents?.map((detail, index) => (
          <section key={index} className="bg-white shadow-lg rounded-xl overflow-hidden w-full max-w-sm transition-transform transform hover:scale-105">
            <div className="relative w-full h-40">
              <Image className="object-cover rounded-t-xl" src={twitterXLogo.src || '/agents/whatsapp-post-agent'} layout="fill" alt={""} />
            </div>
            <div className="p-6">
              <h1 className="text-2xl font-semibold text-gray-800 mb-3">{detail?.name}</h1>
              <p className="text-base text-gray-600 mb-4">{detail?.description.length > 120 ? `${detail.description.slice(0, 120)}...` : detail.description}</p>
              <Link href={detail?.url || "" }>
                <button
                  type="button"
                  className="w-full bg-gradient-to-r from-blue-600 to-teal-400 text-white py-3 rounded-lg shadow-lg hover:from-blue-700 hover:to-teal-500 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-300 ease-in-out"
                >
                  Use Agent
                </button>
              </Link>
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}

export default withAuth(Home);
