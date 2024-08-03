import { useRouter } from 'next/router';
import withAuth from '@/components/withAuth';
import { useContext, useEffect, useState } from 'react';
import { AuthenticationContext, AuthenticationContextProps } from '@/context/AuthenticationContext';
interface FormField {
  type: string;
  label: string;
  placeholder: string;
}

interface DataItem {
  url: string;
  formData: FormField[];
}

const SubPage = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [matchedData, setMatchedData] = useState<DataItem | null>(null);
  const [agents, setAgents] = useState<any[]>([]);


  const context = useContext<AuthenticationContextProps | undefined>(AuthenticationContext);

  useEffect(() => {
    const fetchAgents = async () => {
      if (context?.agentList) {
        try {
          const res = await context?.agentList();
          setAgents(res);
        } catch (err) {
          console.log(err, "err");
        } 
      }
    };

    fetchAgents();
  }, []);


  const data: DataItem[] = [
    {
      url: '/agents/twitter-post-agent',
      formData: [
        { type: "email", label: "Email", placeholder: "Enter your email." },
      ]
    },
    {
      url: '/agents/facebook-post-agent',
      formData: [
        { type: "number", label: "Mobile", placeholder: "Enter your mobile number." }
      ]
    },
    {
      url: '/agents/whatsapp-post-agent',
      formData: [
        { type: "email", label: "Email", placeholder: "Enter your email." },
        { type: "number", label: "Mobile", placeholder: "Enter your mobile number." },
        { type: "text", label: "Name", placeholder: "Enter your name." },
      ]
    }
  ];

  useEffect(() => {
    if (slug) {
      console.log(`/agents/${slug}`,"slug")
      console.log(agents,"agents")
      const matchedItem = agents?.find(item => item.url == `/agents/${slug}`);
      setMatchedData(matchedItem || null);
    }
  }, [slug,agents]);

  return (
    <div className='bg-gray-50 h-screen'>
    <div className='container mx-auto bg-white shadow-lg my-5 rounded-lg p-8 space-y-8'>
    <h1 className='px-6 text-3xl font-bold text-gray-800 mb-6'>
      Form for: <span className='text-blue-500'>{slug}</span>
    </h1>
    <div className="p-6 rounded-lg space-y-6">
    {matchedData ? (
      <form className="space-y-6">
        <div className='grid md:grid-cols-2 gap-5 items-center'>
        {matchedData?.formData?.map((field, index) => (
          <div key={index} className="flex flex-col">
            <label className="text-base font-medium text-gray-800 mb-2">{field?.label}</label>
            <input
              type={field?.type}
              placeholder={field?.placeholder}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
            />
          </div>
        ))}
        </div>
      <button
          type="submit"
          className="px-4 bg-blue-600 text-white py-3 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-200 ease-in-out"
        >
          Submit
        </button>
      </form>
    ) : (
      <p className='text-gray-600 text-center mt-4'>No matching form found for this page.</p>
    )}

    <div className="border-t py-5 space-y-4">
      <h2 className="text-2xl font-semibold text-gray-800">API Response</h2>
      <p className="text-gray-700">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam a, dolorem repellendus, obcaecati repellat quidem enim maxime est ullam quos esse vitae nam! Temporibus vitae facilis aspernatur eum minus iusto.
      </p>
    </div>
    </div>
  </div>
  </div>
  );
};

// export default SubPage;
export default withAuth(SubPage);
