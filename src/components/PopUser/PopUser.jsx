import React from "react";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../context/ModalContext";
import { useAuth } from "../../context/AuthContext";

const PopUser = () => {
  const navigate = useNavigate();

  const { isExitOpen, closeExit } = useModal();
  const { logout } = useAuth();

  const handleExit = () => {
    logout();
    closeExit();
    navigate("/login", { replace: true });
  };

  const handleCancel = () => {
    closeExit();
  };

  if (!isExitOpen) return null;

  return (
    <div className="pop-exit" style={{ display: "block" }}>
      <div className="pop-exit__container">
        <div className="pop-exit__block">
          <div className="pop-exit__ttl">
            <h2>Выйти из аккаунта?</h2>
          </div>

          <div className="pop-exit__form">
            <div className="pop-exit__form-group">
              <button
                type="button"
                className="pop-exit__exit-yes _hover01"
                onClick={handleExit}
              >
                Да, выйти
              </button>

              <button
                type="button"
                className="pop-exit__exit-no _hover03"
                onClick={handleCancel}
              >
                Нет, остаться
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopUser;
