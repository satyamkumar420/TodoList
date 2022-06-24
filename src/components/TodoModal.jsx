import React, { useEffect, useState } from "react";
import styles from "../styles/modules/modal.module.scss";
import { MdOutlineClose } from "react-icons/md";
import { AnimatePresence, motion } from "framer-motion";
import Button from "./Button";
import { useDispatch } from "react-redux";
import { addTodo, updateTodo } from "../slices/todoSlice";
import { v4 as uuid } from "uuid";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const dropIn = {
  hidden: { opacity: 0, transform: "scale(0.9)" },
  visible: {
    transform: "scale(1)",
    opacity: 1,
    transition: { duration: 0.3, type: "spring", stiffness: 500, damping: 25 },
  },
  exit: { transform: "scale(0.9)", opacity: 0 },
};

function TodoModal({ type, ModalOpen, setModalOpen, todo }) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("incomplete");

  useEffect(() => {
    if (type === "update" && todo) {
      setTitle(todo.title);
      setStatus(todo.status);
    } else {
      setTitle("");
      setStatus("incomplete");
    }
  }, [type, todo, ModalOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title === "") {
      toast.error("Please enter a title.", {
        position: "top-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
        style: {
          fontSize: "1.5rem",
          color: "#e74c3c",
          fontFamily: "sans-serif",
          fontWeight: "bold",
          backgroundColor: "#1f2033",
          borderRadius: "1rem",
        },
      });
      return;
    }
    if (title && status) {
      if (type === "add") {
        dispatch(
          addTodo({
            id: uuid(),
            title,
            status,
            time: new Date().toLocaleString(),
          })
        );
        toast.success("Task Added SuccessFully", {
          position: "top-right",
          autoClose: 8000,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
          style: {
            fontSize: "1.5rem",
            color: "green",
            fontFamily: "sans-serif",
            fontWeight: "bold",
            backgroundColor: "#1f2033",
            borderRadius: "1rem",
          },
        });
      }
      if (type === "update") {
        if (todo.title !== title || todo.status !== status) {
          dispatch(updateTodo({ ...todo, title, status }));
          toast.success("Task Updated SuccessFully", {
            position: "top-right",
            autoClose: 8000,
            pauseOnHover: true,
            draggable: true,
            theme: "dark",
            style: {
              fontSize: "1.5rem",
              color: "green",
              fontFamily: "sans-serif",
              fontWeight: "bold",
              backgroundColor: "#1f2033",
              borderRadius: "1rem",
            },
          });
        } else {
          toast.error("No Changes Made", {
            position: "top-right",
            autoClose: 8000,
            pauseOnHover: true,
            draggable: true,
            theme: "dark",
            style: {
              fontSize: "1.5rem",
              color: "#e74c3c",
              fontFamily: "sans-serif",
              fontWeight: "bold",
              backgroundColor: "#1f2033",
              borderRadius: "1rem",
            },
          });
          return;
        }
      }
      setModalOpen(false);
    }
  };

  return (
    <AnimatePresence>
      {ModalOpen && (
        <motion.div
          className={styles.wrapper}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}>
          <motion.div
            className={styles.container}
            variants={dropIn}
            initial="hidden"
            animate="visible"
            exit="exit">
            <motion.div
              className={styles.closeButton}
              onClick={() => setModalOpen(false)}
              onKeyDown={() => setModalOpen(false)}
              tabIndex={0}
              role="button"
              initial={{ top: 40, opacity: 0 }}
              animate={{ top: -10, opacity: 1 }}
              exit={{ top: 40, opacity: 0 }}>
              <MdOutlineClose />
            </motion.div>
            <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
              <h1 className={styles.formTitle}>
                {type === "add" ? "Add" : "Update"} Task
              </h1>
              <label htmlFor="title">
                Title
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </label>
              <label htmlFor="status">
                Status
                <select
                  name="status"
                  id="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}>
                  <option value="incomplete">Incomplete</option>
                  <option value="complete">Complete</option>
                </select>
              </label>
              <div className={styles.buttonContainer}>
                <Button type="submit" variant="primary">
                  {type === "add" ? "Add Task" : "Update Task"}
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => setModalOpen(false)}
                  onKeyDown={() => setModalOpen(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default TodoModal;
