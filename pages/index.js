import { useState, useEffect } from "react";
import Head from "next/head";
import axios from "axios";
import styles from "../styles/Home.module.css";
import { ButtonGroup, Button } from "reactstrap";

export default function Home() {
  const [tables, setTables] = useState(null);
  useEffect(async () => {
    const result = await axios("/api/db/check");
    setTables(result.data.exists);
  }, []);

  function main() {
    if (tables === null) {
      return "Loading...";
    } else if (tables) {
      return (
        <ButtonGroup vertical>
          <a href="/students" className="btn btn-primary">
            Студенты
          </a>
          <a href="/teachers" className="btn btn-primary">
            Преподаватели
          </a>
          <a href="/disciplines" className="btn btn-primary">
            Дисциплины
          </a>
          <a href="/courses" className="btn btn-primary">
            Дисциплины преподавателей
          </a>
          <a href="/courseworks" className="btn btn-primary">
            Курсовые работы
          </a>
          <a href="/archive" className="btn btn-info">
            Арихв тем курсовых работ
          </a>
          <a href="/teachers_count" className="btn btn-info">
            Колличетво дисциплин у каждого преподавателя
          </a>
          <a href="/list" className="btn btn-info">
            Все преподаватели и студенты
          </a>
          <Button
            color="danger"
            onClick={async () => {
              if (confirm("Вы уверены что хотите удалить всё?")) {
                await axios("/api/db/drop");
                setTables(false);
              }
            }}
          >
            Удалить всё
          </Button>
        </ButtonGroup>
      );
    } else {
      return (
        <button
          onClick={async () => {
            const result = await axios("/api/db/create");

            setTables(result.data.success);
          }}
          className="btn btn-primary"
        >
          Создать таблицы, тригеры, представления, индексы и заполнить таблицы
          исходными данными
        </button>
      );
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Курсовая работа Шаклеин 8091</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>{main()}</main>
    </div>
  );
}
