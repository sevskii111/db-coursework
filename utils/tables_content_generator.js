import disciplines from "../pages/api/db/disciplines";

let groups = {
  8091: `Баранов Алексей Сергеевич
  Бочкарев Борис Анатольевич
  Васильев Иван Владимирович
  Григорьев Дмитрий Игоревич
  Ефимов Артем Сергеевич
  Кудряшов Иван Сергеевич
  Кузин Иван Анатольевич
  Кулаков Игорь Юрьевич
  Лехновский Александр Денисович
  Мухачев Александр Александрович
  Петров Федор Максимович
  Попов Владимир Сергеевич
  Скородумов Сергей Сергеевич
  Федоров Илья Николаевич
  Шаклеин Всеволод Владиславович
  Шляханов Даниил Александрович`,
  8311: `Бармаков Виктор Алексеевич
  Васильев Герман Альбертович
  Васильев Данила Дмитриевич
  Виговский Леонид Александрович
  Дмитриев Денис Александрович
  Ерохин Антон Александрович
  Ефанов Максим Алексеевич
  Карачёв Святослав Игоревич
  Петров Даниил Владиславович
  Швырев Николай Евгеньевич
  Шуравин Евгений Сергеевич`,
  8421: `Андреева Анастасия Дмитриевна
  Бондарь Александр Александрович
  Валова Владислава Витальевна
  Васюнова Анастасия Андреевна
  Владимирова Анна Максимовна
  Грачёва Дарья Павловна
  Зайцева Виктория Дмитриевна
  Зыкова Яна Николаевна
  Иванова Анна Александровна
  Карпова София Алексеевна
  Карпусь Вероника Евгеньевна
  Кукшинова Екатерина Дмитриевна
  Лысанов Алексей Владимирович
  Маничева Екатерина Дмитриевна
  Мариева Екатерина Александровна
  Матеуш Ксения Владимировна
  Михайлова Виктория Андреевна
  Никитин Максим Алексеевич
  Сидь Екатерина Павловна
  Соколова Анастасия Алексеевна
  Сурин Илья Алексеевич
  Яковлева Полина Дмитриевна`,
};

let timetable = `
  (лек/пр) Экономика	Макаревич Анна Николаевна  
  (лек/пр/лаб) Теория языков программирования и методы трансляции	Макаров Владимир Алексеевич
  (лаб) Базы данных	Телина Ирина Сергеевна
  (лек/лаб) Сети и телекоммуникации	Журавлёва Мария Павловна
  (пр) Экономика	Макаревич Анна Николаевна
  (лек/лаб) Программирование: Объектно-ориентированное программирование	Абакумов М. А.
  (пр) Физическая культура и спорт	Гарина Нина Борисовна
  (пр) Физическая культура и спорт	Гарина Нина Борисовна
  (лек/пр) Моделирование систем	Эминов Стефан Ильич
  (лек) Базы данных	Телина Ирина Сергеевна
  (лек/лаб) Сети и телекоммуникации	Журавлёва Мария Павловна
  (лек/лаб) Программирование: Объектно-ориентированное программирование	Абакумов М. А.
  (пр/лаб) Моделирование систем	Эминов Стефан Ильич
  (пр) Экономика	Макаревич Анна Николаевна
  День самостоятельной работы студентов
  (пр) Современные технологии разработки программного обеспечения	Лазутченко А. Н.
  (пр) Современные технологии разработки программного обеспечения	Лазутченко А. Н.
  (пр) Современные технологии разработки программного обеспечения	Лазутченко А. Н.
  (лек/пр) Экономика	Макаревич Анна Николаевна
  (лек/пр/лаб) Архитектура компьютеров	Гарбарь Сергей Владиславович	
  (пр/лаб) Базы данных, экспертные системы и модели информационного поиска	Телина Ирина Сергеевна
  (пр/лаб) Вычислительная математика	Жгун Татьяна Валентиновна
  (пр) Физическая культура и спорт	Гарина Нина Борисовна
  (пр) Физическая культура и спорт	Гарина Нина Борисовна
  (пр) Экономика	Макаревич Анна Николаевна
  (лек/пр/лаб) Вычислительная математика	Жгун Татьяна Валентиновна
  (лек) Базы данных, экспертные системы и модели информационного поиска	Телина Ирина Сергеевна
  (пр/лаб) Базы данных, экспертные системы и модели информационного поиска	Телина Ирина Сергеевна
  (лаб) Современные технологии разработки программного обеспечения	Лазутченко А. Н.
  (пр) Концепции современного естествознания: Проблемы и методы современных естественных наук	Ковалевская Наталья Михайловна
  (пр) Экономика  Макаревич Анна Николаевна
  (лек) Современные технологии разработки программного обеспечения	Лазутченко А. Н.
  (лек/пр) Концепции современного естествознания: Математические модели в естествознании и экологии	Ласунский Александр Васильевич
  (пр) Теория коммуникации	Базикян Станислава Александровна
  (лк/пр) Личность и общество в современном литературном процессе	Баранов Дмитрий Кириллович
  (пр) Современность и журналистика	Василенко Ирина Васильевна
  (пр) Физическая культура и спорт	Ефимова Елена Васильевна
  (пр) Физическая культура и спорт	Ефимова Елена Васильевна
  (пр) Современность и журналистика	Василенко Ирина Васильевна
  (пр) История отечественной журналистики	Семенова Александра Леонидовна
  (лк/пр) Социология	Луковицкая Елена Геннадьевна
  (лк/пр) Особенности работы в телерадиостудиях	Янин Е. Е.
  (пр) Теория коммуникации	Базикян Станислава Александровна
  (пр) Функции института PR в современном обществе	Базикян Станислава Александровна
  (лк) Современность и журналистика	Василенко Ирина Васильевна
  (лк/пр) История отечественной журналистики	Семенова Александра Леонидовна`;

let courseWorks = {
  8091: {
    course: "Базы данных_Телина Ирина Сергеевна",
    themes: [
      "БД «Проектное бюро»: сотрудники разных отделов участвуют в различных проектах фирмы.",
      "БД «Клиника»: пациенты из разных районов города лечатся в одной поликлинике у разных врачей по разным направлениям.",
      "БД «Медицинский холдинг»: пациенты из разных районов города лечатся в нескольких медучреждениях медицинского холдинга у разных врачей.",
      "БД «Обработка документации»: сотрудники одного из отделов фирмы берут документацию в одном из хранилищ фирмы (архиве, библиотеке).",
      "БД «Торговая фирма»: покупатели делают покупки товаров в магазинах торговой фирмы.",
      "БД «Зачисление в институт»: абитуриенты из разных потоков стали студентами групп разных факультетов вуза.",
      "БД «Абитуриент»: абитуриент одного потока стал студентом одной из групп по определенной специальности одного из факультетов вуза.",
      "БД «Кафедра»: студенты одной группы изучают дисциплины у преподавателей одной из кафедр",
      "БД «Обучение»: студенты разных групп изучают разные дисциплины у преподавателей разных кафедр.",
      "БД «Склады»: на один из складов торговой фирмы поступают товары от различных поставщиков и выдаются различным потребителям.",
      "БД «Работа с поставщиками»: на один из складов торговой фирмы поступают товары от различных поставщиков.",
      "БД «Товары потребителю от производителя»: товары, произведенные разными производителями, поступают на склад от различных поставщиков, и выдаются различным потребителям.",
      "БД «Отгрузка товара»: со склада фирмы выдаются товары различных поставщиков и различных производителей различным потребителям различных городов.",
      "БД «Поставки импорта»: на склад поступают товары различных производителей различных стран от поставщиков различных городов.",
      "БД «Разные товары фирмы потребителям»: со складов фирмы выдаются товары от различных поставщиков различным потребителям из различных городов.",
      "БД «Зарплата»: сотрудникам разных отделов фирмы начисляется зарплата по ЕТС.",
    ],
  },

  8311: {
    course: "Вычислительная математика_Жгун Татьяна Валентиновна",
    themes: [
      "Ротор векторного поля как умножение двух векторов (векторное)",
      "Возрастающий постулат — актуальная национальная задача",
      "Нормальный интеграл Фурье глазами современников",
      "Изоморфный бином Ньютона: предпосылки и развитие",
      "Действительный определитель системы линейных уравнений: основные моменты",
      "Почему поразительно векторное поле?",
      "Стремящийся сходящийся ряд — актуальная национальная задача",
      "Почему последовательно дифференциальное уравнение?",
      "Стремящийся интеграл по ориентированной области в XXI веке",
      "Скалярное поле как интеграл Дирихле",
      "Почему монотонно комплексное число?",
    ],
  },

  8421: {
    course: "Теория коммуникации_Базикян Станислава Александровна",
    themes: [
      "Резкий психоз: мышление или ассоциация?",
      "Конформность как действие",
      "Девиантный филогенез: цикл или сновидение?",
      "Диссонансный скрытый смысл — актуальная национальная задача",
      "Когнитивный генезис: гипотеза и теории",
      "Опасный код: гипотеза и теории",
      "Почему параллельно чувство?",
      "Диалогический контрапункт в XXI веке",
      "Экзистенциальный онтогенез речи — актуальная национальная задача",
      "Восприятие как познание текста",
      "Стихотворение как социализация",
      "Диссонансный бихевиоризм: агрессия или рифма?",
      "Материалистический инсайт: предпосылки и развитие",
      "Оппортунический эскапизм: гипотеза и теории",
      "Почему теоретически возможен строфоид?",
      "Урбанистический бихевиоризм — актуальная национальная задача",
      "Заимствование как дольник",
      "Почему параллельна ложная цитата?",
      "Групповой палимпсест глазами современников",
      "Самонаблюдение как гекзаметр",
      "Почему изменяем гомеостаз?",
      "Почему доступна генеративная поэтика?",
    ],
  },
};

export function generateTables() {
  function parseTimetable() {
    const lines = timetable.split("\n");
    let discipline_teacher_map = {};
    for (const line of lines) {
      let [discipline, teacher] = line.split("\t");
      if (!teacher) {
        continue;
      }
      discipline = discipline.split(" ")[1].trim();
      teacher = teacher.trim();
      if (!discipline_teacher_map[discipline]) {
        discipline_teacher_map[discipline] = new Set();
      }
      discipline_teacher_map[discipline].add(teacher);
    }
    return discipline_teacher_map;
  }

  const discipline_teacher_map = parseTimetable();
  let fill_disciplines = `INSERT INTO
  discipline (
    discipline_name
  )
  VALUES
`;
  let fill_teachers = `INSERT INTO
  teacher (
    teacher_name,
    teacher_surname,
    teacher_patronymic
  )
VALUES
`;
  let fill_courses = `INSERT INTO
  course (
    discipline_id,
    teacher_id
)
VALUES
  `;
  let fill_students = `INSERT INTO
  student (
    student_name,
    student_surname,
    student_patronymic
)
VALUES
  `;
  let fill_courseworks = `INSERT INTO
  coursework (
    student_id,
    course_id,
    coursework_theme
)
VALUES
  `;
  let discipline_id = 1;
  let teacher_id = 1;
  let course_id = 1;
  let teachers_cache = {};
  let course_id_map = {};
  for (const discipline in discipline_teacher_map) {
    fill_disciplines += `('${discipline}'),\n`;
    course_id_map[discipline] = discipline_id;
    for (const teacher of discipline_teacher_map[discipline]) {
      if (!teachers_cache[teacher]) {
        const [surname, name, patronymic] = teacher.split(" ");
        fill_teachers += `('${name}', '${surname}', '${patronymic}'),\n`;
        teachers_cache[teacher] = teacher_id++;
      }
      fill_courses += `(${discipline_id}, ${teachers_cache[teacher]}),\n`;
      course_id_map[`${discipline}_${teacher}`] = course_id;
      course_id++;
    }
    discipline_id++;
  }

  let student_id = 1;
  for (const group in groups) {
    const course_id = course_id_map[courseWorks[group].course];
    const themes = courseWorks[group].themes;
    let theme_ind = 0;
    const groupStudens = groups[group].split("\n").map((s) => s.trim());
    for (let i = 0; i < groupStudens.length; i++) {
      const [name, surname, patronymic] = groupStudens[i].split(" ");
      fill_students += `('${name}', '${surname}', '${patronymic}'),\n`;
      fill_courseworks += `(${student_id}, ${course_id}, '${
        themes[theme_ind++]
      }'),\n`;
      student_id++;
    }
  }

  function clearInsert(i) {
    return i.substr(0, i.length - 2) + ";";
  }

  fill_disciplines = clearInsert(fill_disciplines);
  fill_teachers = clearInsert(fill_teachers);
  fill_courses = clearInsert(fill_courses);
  fill_students = clearInsert(fill_students);
  fill_courseworks = clearInsert(fill_courseworks);

  return [
    fill_disciplines,
    fill_teachers,
    fill_courses,
    fill_students,
    fill_courseworks,
  ];
}
