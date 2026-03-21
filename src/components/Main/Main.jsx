import React from "react";
import Column from "../Column/Column";

// *ветка main*
const Main = () => {
  const columnsData = [
    {
      title: "Без статуса",
      cards: [
        {
          theme: "Web Design",
          themeColor: "orange",
          title: "Название задачи",
          date: "30.10.23",
        },
        {
          theme: "Research",
          themeColor: "green",
          title: "Название задачи",
          date: "30.10.23",
        },
        {
          theme: "Web Design",
          themeColor: "orange",
          title: "Название задачи",
          date: "30.10.23",
        },
        {
          theme: "Copywriting",
          themeColor: "purple",
          title: "Название задачи",
          date: "30.10.23",
        },
        {
          theme: "Web Design",
          themeColor: "orange",
          title: "Название задачи",
          date: "30.10.23",
        },
      ],
    },
    {
      title: "Нужно сделать",
      cards: [
        {
          theme: "Research",
          themeColor: "green",
          title: "Название задачи",
          date: "30.10.23",
        },
      ],
    },
    {
      title: "В работе",
      cards: [
        {
          theme: "Research",
          themeColor: "green",
          title: "Название задачи",
          date: "30.10.23",
        },
        {
          theme: "Copywriting",
          themeColor: "purple",
          title: "Название задачи",
          date: "30.10.23",
        },
        {
          theme: "Web Design",
          themeColor: "orange",
          title: "Название задачи",
          date: "30.10.23",
        },
      ],
    },
    {
      title: "Тестирование",
      cards: [
        {
          theme: "Research",
          themeColor: "green",
          title: "Название задачи",
          date: "30.10.23",
        },
      ],
    },
    {
      title: "Готово",
      cards: [
        {
          theme: "Research",
          themeColor: "green",
          title: "Название задачи",
          date: "30.10.23",
        },
      ],
    },
  ];

  return (
    <main className="main">
      <div className="container">
        <div className="main__block">
          <div className="main__content">
            {columnsData.map((column, index) => (
              <Column key={index} title={column.title} cards={column.cards} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Main;
