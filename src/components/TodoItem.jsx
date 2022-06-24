// import { format } from "date-fns";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { MdDelete, MdEdit } from "react-icons/md";
import { useDispatch } from "react-redux";
import { todoDelete, updateTodo } from "../slices/todoSlice";
import styles from "../styles/modules/todoitem.module.scss";
import { getClasses } from "../utils/getClasses";
import { toast } from "react-toastify";
import CheckButton from "./CheckButton";
import TodoModal from "./TodoModal";

const child = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

function TodoItem({ todo }) {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);

  useEffect(() => {
    if (todo.status === "complete") {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, [todo.status]);

  const handleCheck = () => {
    setChecked(!checked);
    dispatch(
      updateTodo({
        ...todo,
        status: checked ? "incomplete" : "complete",
      })
    );
  };

  const handleDelete = () => {
    dispatch(todoDelete(todo.id));
    toast.warning("Task Deleted SuccessFully", {
      position: "top-right",
      autoClose: 8000,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
      style: {
        fontSize: "1.5rem",
        color: "#ffda2b",
        fontFamily: "sans-serif",
        fontWeight: "bold",
        backgroundColor: "#1f2033",
        borderRadius: "1rem",
      },
    });
  };
  const handleEdit = () => {
    setUpdateModalOpen(true);
  };

  return (
    <>
      <motion.div className={styles.item} variants={child}>
        <div className={styles.todoDetails}>
          <CheckButton checked={checked} handleCheck={handleCheck} />
          <div className={styles.texts}>
            <p
              className={getClasses([
                styles.todoText,
                todo.status === "complete" && styles["todoText--completed"],
              ])}>
              {todo.title}
            </p>
            <p className={styles.time}>
              {todo.time}

              {/* {format(new Date(todo.time), "p, MM/dd/yyyy")} */}
            </p>
          </div>
        </div>
        <div className={styles.todoActions}>
          <div
            // Delete button
            className={styles.icon}
            onClick={() => handleDelete()}
            onKeyDown={() => handleDelete()}
            role="button"
            tabIndex={0}>
            <MdDelete className={styles.delete} />
          </div>
          <div
            // Edit button
            className={styles.icon}
            onClick={() => handleEdit()}
            onKeyDown={() => handleEdit()}
            role="button"
            tabIndex={0}>
            <MdEdit className={styles.edit} />
          </div>
        </div>
      </motion.div>
      <TodoModal
        type="update"
        ModalOpen={updateModalOpen}
        setModalOpen={setUpdateModalOpen}
        todo={todo}
      />
    </>
  );
}

export default TodoItem;
