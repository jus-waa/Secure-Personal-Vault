import NoteCard from "../components/cards/NoteCard"
import SideNav from "../components/SideNav"
import { MdAdd } from "react-icons/md";
export default function Homepage() {
  return (
    <>
      <SideNav/>
      <div className="container mx-auto">
        <div className="grid grid-cols-3 gap-4 mt-8">
          <main className="ml-16 p-6 border-3">
          <NoteCard title="Hello" date="May 27, 2025" content="This is a note preview"
          tags="#note"
          isPinned={true}
          onEdit={()=>{}}
          onDelete={()=>{}}
          onPinNote={()=>{}}
          />
          </main>

          <main className="ml-6 p-6 border-3">
          <NoteCard title="Hello" date="May 27, 2025" content="This is a note preview"
          tags="#note"
          isPinned={true}
          onEdit={()=>{}}
          onDelete={()=>{}}
          onPinNote={()=>{}}
          />
          </main>

          <main className="ml-6 p-6 border-3">
          <NoteCard title="Hello" date="May 27, 2025" content="This is a note preview"
          tags="#note"
          isPinned={true}
          onEdit={()=>{}}
          onDelete={()=>{}}
          onPinNote={()=>{}}
          />
          </main>
        </div>
      </div>
      
      <button className="w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10  " onClick={() => {}}>
        <MdAdd className="text-[32px] text-white" />
      </button>
    </>
  )
}