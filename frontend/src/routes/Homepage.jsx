import { useState } from "react";
import Modal from "react-modal";
import SideNav from "../components/SideNav";
import NoteCard from "../components/cards/NoteCard";
import AddEditNotes from "./AddEditNotes";
import { MdAdd } from "react-icons/md";
import CloudDesign1 from "../components/CloudDesign1";

Modal.setAppElement("#root"); 

export default function Homepage() {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  return (
    <div>
      
    <div className="relative ml-20 mr-4 h-screen">
      
      <SideNav />
      <div className="container mx-auto">
        <div className="grid grid-cols-3 gap-4 mt-8">
          {[1, 2, 3, 4].map((_, i) => (
            <main key={i} className="p-3">
              <NoteCard
                title="Hello"
                date="May 27, 2025"
                content="This is a note preview"
                tags="#note"
                isPinned={true} 
                onEdit={() => {}}
                onDelete={() => {}}
                onPinNote={() => {}}
              />
            </main>
          ))}
        </div>
      </div>

      <button
        className="w-16 h-16 flex items-center justify-center rounded-full bg-cyan-500 hover:bg-cyan-700 fixed right-10 bottom-10 z-100"
        onClick={() => {
          setOpenAddEditModal({ isShown: true, type: "add", data: null });
        }}
      >
        <MdAdd className="text-[32px] text-white" />
      </button>
      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() =>
          setOpenAddEditModal((prev) => ({ ...prev, isShown: false }))
        }
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        className="bg-white w-[40%] max-h-[75vh] rounded-md p-5 overflow-auto outline-none"
        contentLabel="Add/Edit Note"
      >
        <AddEditNotes
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          onClose={() => {
            setOpenAddEditModal({ isShown: false, type: "add", data: null });
          }}
        />
        
      </Modal>
      <CloudDesign1/>
    </div>
    
    </div>
  );
}
