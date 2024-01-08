import React, { useContext } from "react";
import { AppContext } from "../../../../App";
import { Button, Modal } from "antd";
import useAuth from "../../../../hooks/useAuth";
import ModalCreate from "./ModalCreate";
import useBoolean from "../../../../hooks/useBoolean";
import { Link } from "react-router-dom";

const User = () => {
  const { user } = useContext(AppContext);
  const { logOut } = useAuth();
  return (
    <div className="user-info">
      <Link
        to={`/user/${user.id}`}
        style={{
          textDecoration: "none",
          color: "blue",
        }}
      >
        {user.username}
      </Link>
      <ButtonCreatePost />
      <Button type="primary" danger onClick={logOut}>
        Logout
      </Button>
    </div>
  );
};

export default User;

const ButtonCreatePost = () => {
  const { value: isOpen, setFalse, setTrue } = useBoolean();
  return (
    <>
      <Button type="primary" onClick={setTrue}>
        Create
      </Button>
      <Modal title="New post" open={isOpen} onCancel={setFalse} footer={false}>
        <ModalCreate close={setFalse} />
      </Modal>
    </>
  );
};
