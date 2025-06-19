import React from 'react'
import {MdOutlinePushPin} from "react-icons/md";
import {MdCreate, MdDelete} from "react-icons/md";
import {LuBookLock} from "react-icons/lu";
import {FiUnlock} from "react-icons/fi";

const NoteCard = ({title, date, content, tags, isPinned, isLocked, isSessionUnlocked, onEdit, onDelete, onPinNote, onLock, onUnlock
    }) => {
       const shouldBlur = isLocked && !isSessionUnlocked;
  return (
    <div className="border rounded p-4 bg-white hover:shadow-xl transition-all ease-in-out">
        <div className="flex items-center justify-between">
            <div>
                <h6 className="text-sm font-medium">{title}</h6>
                <span className="text-xs text-slate-500">{date}</span>
            </div>
        
        <MdOutlinePushPin className={`icon-btn ${isPinned ?  'text-primary' : 'text-slate-300'}`} onClick={onPinNote} />
        </div>

          <div className={shouldBlur ? "blur-sm pointer-events-none select-none" : ""}>
        <p className="text-xs text-slate-600 mt-2 overflow-hidden text-ellipsis whitespace-nowrap max-w-full">
          {content?.slice(0, 60)}
        </p>
        <div className="text-xs text-slate-500 mt-2">{tags}</div>
      </div>

        <div className="flex items-center justify-between mt-2"> 
          <div className="text-xs text-slate-500">{tags}</div>

          <div className="flex items-center gap-2">
            {isLocked ? (
              isSessionUnlocked ? (
                // ✅ Show LOCK button when unlocked in-session
                <LuBookLock
                  className="icon-btn hover:text-blue-500"
                  title="Lock Note"
                  onClick={onLock}
                />
              ) : (
                // 🔓 Still locked and not yet unlocked
                <FiUnlock
                  className="icon-btn hover:text-blue-500"
                  title="Unlock Note"
                  onClick={onUnlock}
                />
              )
            ) : (
              // Unlocked in DB — show Lock
              <LuBookLock
                className="icon-btn hover:text-blue-500"
                title="Lock Note"
                onClick={onLock}
              />
            )}
            <MdCreate
              className="icon-btn hover:text-green-600"
              onClick={onEdit}
            />
            <MdDelete
              className="icon-btn hover:text-red-500"
              onClick={onDelete}
            />  
          </div>
        </div>
    </div>


  )
}

export default NoteCard 