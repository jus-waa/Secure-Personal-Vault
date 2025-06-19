import { useState, useEffect } from "react";
import Modal from "react-modal";
import SideNav from "../components/SideNav";
import NoteCard from "../components/cards/NoteCard";
import AddEditNotes from "./AddEditNotes";
import { MdAdd } from "react-icons/md";
import CloudDesign1 from "../components/CloudDesign1";
import { useNoteStore } from "../store/noteStore.js";
import toast from "react-hot-toast";

Modal.setAppElement("#root");

export default function Homepage() {
	const [unlockedNoteIds, setUnlockedNoteIds] = useState([]);
	const [openAddEditModal, setOpenAddEditModal] = useState({ isShown: false, type: "add", data: null });
	const [openUnlockModal, setOpenUnlockModal] = useState({ isShown: false, noteId: null, password: "" });
	const [openLockModal, setOpenLockModal] = useState({ isShown: false, noteId: null, password: "" });
	const [openForgotPasswordModal, setOpenForgotPasswordModal] = useState({ isShown: false, noteId: null, email: "", accountPassword: "" });

	const {
		error,
		isLoading,
		notes = [],
		getAllNotes,
		addNote,
		deleteNote,
		pinNote,
	} = useNoteStore();

	const [searchQuery, setSearchQuery] = useState("");

	useEffect(() => {
		getAllNotes();
	}, []);

	useEffect(() => {
		const handleRelock = (e) => {
			const noteId = e.detail;
			setUnlockedNoteIds((prev) => prev.filter(id => id !== noteId));
		};
		window.addEventListener("relockNote", handleRelock);
		return () => window.removeEventListener("relockNote", handleRelock);
	}, []);

	const filteredNotes = notes.filter(note =>
		note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
		note.content.toLowerCase().includes(searchQuery.toLowerCase())
	);

	const lockNote = async (noteId, password) => {
		try {
			const res = await fetch(`http://localhost:3000/api/v1/notes/lock-note/${noteId}`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				credentials: "include",
				body: JSON.stringify({ password }),
			});
			if (res.ok) {
				await getAllNotes();
				setUnlockedNoteIds((prev) => prev.filter(id => id !== noteId));
				toast.success("Note locked successfully!");
			} else {
				toast.error("Failed to lock note");
			}
		} catch (err) {
			console.error("Lock error:", err);
		}
	};

	const unlockNote = async (noteId, password) => {
		try {
			const res = await fetch(`http://localhost:3000/api/v1/notes/unlock-note/${noteId}`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				credentials: "include",
				body: JSON.stringify({ password }),
			});
			const data = await res.json();

			if (res.ok) {
				const noteRes = await fetch(`http://localhost:3000/api/v1/notes/get-note/${noteId}`, {
					method: "GET",
					credentials: "include",
				});
				const noteData = await noteRes.json();

				setUnlockedNoteIds((prev) => [...prev, noteId]);
				useNoteStore.setState((state) => ({
					notes: state.notes.map((n) =>
						n._id === noteId ? { ...n, ...noteData.note } : n
					),
				}));

				setOpenAddEditModal({
					isShown: true,
					type: "edit",
					data: { ...noteData.note, locked: true },
				});

				toast.success("Note unlocked temporarily.");
				return true;
			} else {
				toast.error(data.message || "Incorrect password.");
				return false;
			}
		} catch (err) {
			console.error("Unlock error:", err);
			toast.error("Failed to unlock the note.");
			return false;
		}
	};

	const forgotPasswordUnlock = async () => {
		try {
			const res = await fetch(`http://localhost:3000/api/v1/notes/forgot-password-unlock/${openForgotPasswordModal.noteId}`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				credentials: "include",
				body: JSON.stringify({
					email: openForgotPasswordModal.email,
					password: openForgotPasswordModal.accountPassword,
				}),
			});
			const data = await res.json();

			if (res.ok) {
				const noteData = data.note;
				setUnlockedNoteIds((prev) => [...prev, noteData._id]);

				useNoteStore.setState((state) => ({
					notes: state.notes.map((n) =>
						n._id === noteData._id ? { ...n, ...noteData } : n
					),
				}));

				setOpenAddEditModal({
					isShown: true,
					type: "edit",
					data: { ...noteData, locked: true },
				});
				toast.success("Note unlocked via account verification.");
				setOpenForgotPasswordModal({ isShown: false, noteId: null, email: "", accountPassword: "" });
			} else {
				toast.error(data.message || "Credentials invalid.");
			}
		} catch (err) {
			console.error(err);
			toast.error("Server error during unlock.");
		}
	};

	return (
		<div className="ml-20 mr-4">
			<SideNav searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
			<div className="container mx-auto">
				<div className="grid grid-cols-3 gap-4 mt-8">
					{error && <p className="text-red-500">{error}</p>}
					{Array.isArray(notes) && notes.length > 0 ? (
						filteredNotes.map((note) => (
							<main key={note._id} className="p-3">
								<NoteCard
									title={note.title}
									date={new Date(note.createdAt).toLocaleDateString()}
									content={note.content}
									tags={note.tags.join(", ")}
									isPinned={note.isPinned}
									isLocked={note.locked}
									isSessionUnlocked={unlockedNoteIds.includes(note._id)}
									onEdit={() => {
										const isUnlocked = unlockedNoteIds.includes(note._id);
										if (note.locked && !isUnlocked) {
											setOpenUnlockModal({ isShown: true, noteId: note._id, password: "" });
										} else {
											setOpenAddEditModal({ isShown: true, type: "edit", data: note });
										}
									}}
									onDelete={async () => {
										if (note.locked && !unlockedNoteIds.includes(note._id)) {
											const password = prompt("This note is locked. Enter password to delete:");
											if (!password) return;
											try {
												const res = await fetch(`http://localhost:3000/api/v1/notes/delete-locked/${note._id}`, {
													method: "POST",
													headers: { "Content-Type": "application/json" },
													credentials: "include",
													body: JSON.stringify({ password }),
												});
												const data = await res.json();
												if (res.ok && data.status === "success") {
													alert("Note deleted.");
													await getAllNotes();
												} else {
													alert(data.message || "Failed to delete.");
												}
											} catch (err) {
												console.error(err);
												alert("Something went wrong.");
											}
										} else {
											if (window.confirm("Are you sure you want to delete this note?")) {
												await deleteNote(note._id);
												await getAllNotes();
											}
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
									onLock={() => {
										const password = prompt("Set a password to lock this note:");
										if (!password) return;
										lockNote(note._id, password);
									}}
									onUnlock={() => {
										setOpenUnlockModal({ isShown: true, noteId: note._id, password: "" });
									}}
								/>
							</main>
						))
					) : (
						<p className="text-gray-500 col-span-3 text-center">No notes found.</p>
					)}
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
				onRequestClose={() => setOpenAddEditModal((prev) => ({ ...prev, isShown: false }))}
				overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
				className="bg-white w-[40%] max-h-[75vh] rounded-md p-5 overflow-auto outline-none"
				contentLabel="Add/Edit Note"
			>
				<AddEditNotes
					type={openAddEditModal.type}
					noteData={openAddEditModal.data}
					onClose={() => setOpenAddEditModal({ isShown: false, type: "add", data: null })}
					onSubmit={async (title, content, tags) => {
						await addNote(title, content, tags);
						setOpenAddEditModal({ isShown: false, type: "add", data: null });
						await getAllNotes();
					}}
				/>
			</Modal>

			<Modal
				isOpen={openUnlockModal.isShown}
				onRequestClose={() => setOpenUnlockModal({ isShown: false, noteId: null, password: "" })}
				overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
				className="bg-white w-[30%] max-h-[45vh] rounded-md p-5 overflow-auto outline-none"
				contentLabel="Unlock Note Modal"
			>
				<h2 className="text-lg font-semibold mb-4">Enter password to unlock note</h2>
				<input
					type="password"
					placeholder="Password"
					className="border p-2 w-full rounded mb-2"
					value={openUnlockModal.password}
					onChange={(e) =>
						setOpenUnlockModal((prev) => ({ ...prev, password: e.target.value }))
					}
				/>
				<p className="text-sm text-blue-600 hover:underline cursor-pointer mb-4"
					onClick={() => {
						setOpenUnlockModal({ isShown: false, noteId: null, password: "" });
						setOpenForgotPasswordModal({
							isShown: true,
							noteId: openUnlockModal.noteId,
							email: "",
							accountPassword: "",
						});
					}}
				>
					Forgot Password?
				</p>
				<div className="flex justify-end gap-2">
					<button
						className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
						onClick={() => setOpenUnlockModal({ isShown: false, noteId: null, password: "" })}
					>
						Cancel
					</button>
					<button
						className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
						onClick={async () => {
							const success = await unlockNote(openUnlockModal.noteId, openUnlockModal.password);
							if (success) {
								setOpenUnlockModal({ isShown: false, noteId: null, password: "" });
							}
						}}
					>
						Unlock
					</button>
				</div>
			</Modal>

			<Modal
				isOpen={openForgotPasswordModal.isShown}
				onRequestClose={() => setOpenForgotPasswordModal({ isShown: false, noteId: null, email: "", accountPassword: "" })}
				overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
				className="bg-white w-[30%] max-h-[50vh] rounded-md p-5 overflow-auto outline-none"
				contentLabel="Forgot Password Modal"
			>
				<h2 className="text-lg font-semibold mb-4">Verify credentials to unlock</h2>
				<input
					type="email"
					placeholder="Your Email"
					className="border p-2 w-full rounded mb-2"
					value={openForgotPasswordModal.email}
					onChange={(e) =>
						setOpenForgotPasswordModal((prev) => ({ ...prev, email: e.target.value }))
					}
				/>
				<input
					type="password"
					placeholder="Your Account Password"
					className="border p-2 w-full rounded mb-4"
					value={openForgotPasswordModal.accountPassword}
					onChange={(e) =>
						setOpenForgotPasswordModal((prev) => ({ ...prev, accountPassword: e.target.value }))
					}
				/>
				<div className="flex justify-end gap-2">
					<button
						className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
						onClick={() =>
							setOpenForgotPasswordModal({ isShown: false, noteId: null, email: "", accountPassword: "" })
						}
					>
						Cancel
					</button>
					<button
						className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
						onClick={forgotPasswordUnlock}
					>
						Verify & Unlock
					</button>
				</div>
			</Modal>

			<CloudDesign1 />
		</div>
	);
}
