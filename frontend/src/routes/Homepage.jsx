import { useState, useEffect } from "react";
import Modal from "react-modal";
import SideNav from "../components/SideNav";
import NoteCard from "../components/cards/NoteCard";
import AddEditNotes from "./AddEditNotes";
import { MdAdd } from "react-icons/md";
import CloudDesign1 from "../components/CloudDesign1";
import { useNoteStore } from "../store/noteStore.js";

Modal.setAppElement("#root");

export default function Homepage() {
	const [openAddEditModal, setOpenAddEditModal] = useState({
		isShown: false,
		type: "add",
		data: null,
	});

	const {
		error,
		isLoading,
		notes = [], // 👈 fallback in case notes is undefined
		getAllNotes,
		addNote,
		deleteNote,
		pinNote,
	} = useNoteStore();

	useEffect(() => {
		getAllNotes();
	}, []);

	return (
		<div className="ml-20 mr-4">
			<SideNav />
			<div className="container mx-auto">
				<div className="grid grid-cols-3 gap-4 mt-8">
				  {error && <p className="text-red-500">{error}</p>}				

				  {Array.isArray(notes) && notes.length > 0 ? (
				    notes.map((note) => (
				      <main key={note._id} className="p-3">
				        <NoteCard
				          title={note.title}
				          date={new Date(note.createdAt).toLocaleDateString()}
				          content={note.content}
				          tags={note.tags.join(", ")}
				          isPinned={note.isPinned}
				          onEdit={() =>
				            setOpenAddEditModal({ isShown: true, type: "edit", data: note })
				          }
				          onDelete={async () => {
				            if (window.confirm("Are you sure you want to delete this note?")) {
				              await deleteNote(note._id);
				              await getAllNotes();
				            }
				          }}
				          onPinNote={async () => {
							  try {
							    await pinNote(note._id, !note.isPinned);
							    await getAllNotes();
							  } catch (err) {
							    alert("Failed to update pin status");
							    console.error(err);
							  }
							}}
				        />
				      </main>
				    ))
				  ) : (
				    <p className="text-gray-500 col-span-3 text-center">No notes found.</p>
				  )}
				</div>
			</div>

			{/* Add button */}
			<button
				className="w-16 h-16 flex items-center justify-center rounded-full bg-cyan-500 hover:bg-cyan-700 fixed right-10 bottom-10 z-100"
				onClick={() => {
					setOpenAddEditModal({ isShown: true, type: "add", data: null });
				}}
			>
				<MdAdd className="text-[32px] text-white" />
			</button>

			{/* Modal for add/edit */}
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
					onClose={() =>
						setOpenAddEditModal({ isShown: false, type: "add", data: null })
					}
					onSubmit={async (title, content, tags) => {
						await addNote(title, content, tags);
						setOpenAddEditModal({ isShown: false, type: "add", data: null });
						await getAllNotes(); // 🔁 Refresh notes after adding
					}}
				/>
			</Modal>

			<CloudDesign1 />
		</div>
	);
}
