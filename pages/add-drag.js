import dynamic from 'next/dynamic';

const AddLocationDrag = dynamic(() => import('../components/AddLocationDrag'), {
  ssr: false,
});

export default function AddDragPage() {
  return <AddLocationDrag />;
}
