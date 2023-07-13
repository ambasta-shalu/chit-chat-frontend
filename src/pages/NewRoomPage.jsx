import React from "react";
import "../css/NewRoomPage.css";
import Logo from "../components/Logo";
import { useFormik } from "formik";
import { Toaster, toast } from "react-hot-toast";
import { validateNewRoom } from "../helper/ValidateForm";
import { useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";

function NewRoomPage() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      userName: "",
    },
    validate: validateNewRoom,
    onSubmit: async (values) => {
      try {
        const roomCode = await nanoid();
        navigate(`/chat/${roomCode}`, {
          state: {
            IS_NEW_ROOM: true,
            USER_NAME: values.userName,
            ROOM_CODE: roomCode,
          },
          replace: true,
        });
      } catch (error) {
        toast.error(error.message);
      }
    },
  });

  return (
    <div className="newroom__page">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <Logo />
      <div className="newroom__contents">
        <h1 className="newroom__heading">Create New Chat Room </h1>

        <form className="newroom__form" onSubmit={formik.handleSubmit}>
          <input
            type="text"
            placeholder="User Name"
            id="userName"
            name="userName"
            onChange={formik.handleChange}
            value={formik.values.userName}
          />
          {formik.errors.userName && (
            <p className="input__error">{formik.errors.userName}</p>
          )}
          <button className="create__room__btn" type="submit">
            Create Room
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewRoomPage;