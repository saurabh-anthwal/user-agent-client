import { useRouter } from 'next/router';
import withAuth from '@/components/withAuth';


const SubPage = () => {
  const router = useRouter();
  const { slug } = router.query;
  return (
    <div className='container'>
      <h1 className='text-xl text-white'>This is the sub page with slug: {slug}</h1>
    </div>
  );
};

export default withAuth(SubPage);
