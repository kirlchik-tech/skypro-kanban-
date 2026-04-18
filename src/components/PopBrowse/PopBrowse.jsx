import React from "react";
import { Link, useParams } from "react-router-dom";
import Calendar from "../Calendar/Calendar";

const PopBrowse = () => {
  const { id } = useParams();

  return (
    <div className="pop-browse" id="popBrowse">
      <div className="pop-browse__container">
        <div className="pop-browse__block">
          <div className="pop-browse__content">
            <div className="pop-browse__top-block">
              <h3 className="pop-browse__ttl">Название задачи</h3>
              <div className="categories__theme theme-top _orange _active-category">
                <p className="_orange">Web Design</p>
              </div>
            </div>

            <div className="pop-browse__wrap">
              <Calendar isEditable={false} />
            </div>

            <div className="pop-browse__btn-browse">
              <div className="btn-group">
                <button className="btn-browse__edit _btn-bor _hover03">
                  Редактировать задачу
                </button>
                <button className="btn-browse__delete _btn-bor _hover03">
                  Удалить задачу
                </button>
              </div>

              <Link to="/">
                <button className="btn-browse__close _btn-bg _hover01">
                  Закрыть
                </button>
              </Link>
            </div>

            <div className="pop-browse__btn-edit _hide">
              <div className="btn-group">
                <button className="btn-edit__edit _btn-bg _hover01">
                  Сохранить
                </button>
                <button className="btn-edit__edit _btn-bor _hover03">
                  Отменить
                </button>
                <button
                  className="btn-edit__delete _btn-bor _hover03"
                  id="btnDelete"
                >
                  Удалить задачу
                </button>
              </div>
              <Link to="/">
                <button className="btn-edit__close _btn-bg _hover01">
                  Закрыть
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopBrowse;
