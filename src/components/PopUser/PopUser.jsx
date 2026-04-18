import React from "react";
import { Link } from "react-router-dom";

const PopUser = ({ logout }) => {
  return (
    <div className="pop-exit" id="popExit">
      <div className="pop-exit__container">
        <div className="pop-exit__block">
          <div className="pop-exit__ttl">
            <h2>Выйти из аккаунта?</h2>
          </div>
          <form className="pop-exit__form" id="formExit" action="#">
            <div className="pop-exit__form-group">
              <button
                type="button"
                className="pop-exit__exit-yes _hover01"
                onClick={logout}
              >
                Да, выйти
              </button>

              <Link to="/">
                <button type="button" className="pop-exit__exit-no _hover03">
                  Нет, остаться
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PopUser;
