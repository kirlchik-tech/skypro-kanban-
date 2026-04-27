import React from "react";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../context/ModalContext";
import { logout } from "../../services/auth";

const PopUser = () => {
  const { isExitOpen, closeExit } = useModal();
  const navigate = useNavigate();

  const handleExit = () => {
    logout();
    closeExit();
    navigate("/login");
  };

  if (!isExitOpen) return null;

  return (
    <div className="pop-exit" style={{ display: "block" }}>
      <div className="pop-exit__container">
        <div className="pop-exit__block">
          <div className="pop-exit__ttl">
            <h2>Выйти из аккаунта?</h2>
          </div>
          <form className="pop-exit__form" id="formExit" action="#">
            <div className="pop-exit__form-group">
              <button
                className="pop-exit__exit-yes _hover01"
                onClick={handleExit}
              >
                Да, выйти
              </button>
              <button
                className="pop-exit__exit-no _hover03"
                onClick={(e) => {
                  e.preventDefault();
                  closeExit();
                }}
              >
                Нет, остаться
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PopUser;
