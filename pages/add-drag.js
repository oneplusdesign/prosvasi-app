import dynamic from 'next/dynamic';
const AddDragView = dynamic(() => import('../components/AddDragView'), { ssr: false });
export default function AddDragPage() {
  return <AddDragView />;
}
