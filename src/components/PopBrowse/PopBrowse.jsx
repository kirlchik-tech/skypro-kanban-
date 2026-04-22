import React, { useState } from "react";
import Calendar from "../Calendar/Calendar";
import { useModal } from "../../context/ModalContext";

const PopBrowse = () => {
  const { isBrowseOpen, selectedCard, closeBrowse } = useModal();
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(selectedCard?.title || "");
  const [editDescription, setEditDescription] = useState("");
  const [editStatus, setEditStatus] = useState(
    selectedCard?.status || "Без статуса",
  );

  if (!isBrowseOpen) return null;

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    // Здесь позже будет логика сохранения
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditTitle(selectedCard?.title || "");
    setEditDescription("");
    setEditStatus(selectedCard?.status || "Без статуса");
  };

  const statuses = [
    "Без статуса",
    "Нужно сделать",
    "В работе",
    "Тестирование",
    "Готово",
  ];

  return (
    <div className="pop-browse" style={{ display: "block" }}>
      <div className="pop-browse__container">
        <div className="pop-browse__block">
          <div className="pop-browse__content">
            <div className="pop-browse__top-block">
              {isEditing ? (
                <input
                  type="text"
                  className="pop-browse__edit-input"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  style={{
                    fontSize: "20px",
                    fontWeight: 600,
                    padding: "8px 12px",
                    borderRadius: "8px",
                    border: "0.7px solid rgba(148, 166, 190, 0.4)",
                    background: "transparent",
                    color: "#000",
                    width: "70%",
                  }}
                />
              ) : (
                <h3 className="pop-browse__ttl">
                  {selectedCard?.title || "Название задачи"}
                </h3>
              )}
              <div className="categories__theme theme-top _orange _active-category">
                <p className="_orange">{selectedCard?.topic || "Web Design"}</p>
              </div>
            </div>

            <div className="pop-browse__status status">
              <p className="status__p subttl">Статус</p>
              <div className="status__themes">
                {isEditing ? (
                  <select
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value)}
                    className="status__select"
                    style={{
                      padding: "11px 14px",
                      borderRadius: "24px",
                      border: "0.7px solid rgba(148, 166, 190, 0.4)",
                      background: "transparent",
                      fontSize: "14px",
                    }}
                  >
                    {statuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                ) : (
                  <div className="status__theme _gray">
                    <p className="_gray">
                      {selectedCard?.status || "Без статуса"}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="pop-browse__wrap">
              <form className="pop-browse__form form-browse" action="#">
                <div className="form-browse__block">
                  <label htmlFor="textArea01" className="subttl">
                    Описание задачи
                  </label>
                  {isEditing ? (
                    <textarea
                      className="form-browse__area"
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                      placeholder="Введите описание задачи..."
                      style={{
                        maxWidth: "370px",
                        width: "100%",
                        padding: "14px",
                        borderRadius: "8px",
                        border: "0.7px solid rgba(148, 166, 190, 0.4)",
                        background: "#eaeef6",
                        fontSize: "14px",
                        height: "200px",
                      }}
                    />
                  ) : (
                    <textarea
                      className="form-browse__area"
                      readOnly
                      placeholder="Введите описание задачи..."
                      style={{
                        maxWidth: "370px",
                        width: "100%",
                        padding: "14px",
                        borderRadius: "8px",
                        border: "0.7px solid rgba(148, 166, 190, 0.4)",
                        background: "#eaeef6",
                        fontSize: "14px",
                        height: "200px",
                      }}
                    />
                  )}
                </div>
              </form>
              <Calendar
                isEditable={isEditing}
                selectedDate={selectedCard?.date || "09.09.23"}
              />
            </div>

            <div className="theme-down__categories theme-down">
              <p className="categories__p subttl">Категория</p>
              <div className="categories__theme _orange _active-category">
                <p className="_orange">{selectedCard?.topic || "Web Design"}</p>
              </div>
            </div>

            {isEditing ? (
              <div className="pop-browse__btn-edit" style={{ display: "flex" }}>
                <div className="btn-group">
                  <button
                    className="btn-edit__edit _btn-bg _hover01"
                    onClick={handleSave}
                  >
                    Сохранить
                  </button>
                  <button
                    className="btn-edit__edit _btn-bor _hover03"
                    onClick={handleCancel}
                  >
                    Отменить
                  </button>
                  <button
                    className="btn-edit__delete _btn-bor _hover03"
                    id="btnDelete"
                  >
                    Удалить задачу
                  </button>
                </div>
                <button
                  className="btn-edit__close _btn-bg _hover01"
                  onClick={closeBrowse}
                >
                  Закрыть
                </button>
              </div>
            ) : (
              <div className="pop-browse__btn-browse">
                <div className="btn-group">
                  <button
                    className="btn-browse__edit _btn-bor _hover03"
                    onClick={handleEdit}
                  >
                    Редактировать задачу
                  </button>
                  <button className="btn-browse__delete _btn-bor _hover03">
                    Удалить задачу
                  </button>
                </div>
                <button
                  className="btn-browse__close _btn-bg _hover01"
                  onClick={closeBrowse}
                >
                  Закрыть
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopBrowse;
