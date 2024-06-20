const express = require("express"); // Подключаем express
const fs = require("fs"); // Подключаем файловую систему для работы с файлами
const path = require("path"); // Подключаем path для работы с путями
const app = express(); // Создаем экземпляр express
const port = 3000; // Задаем порт для сервера

const counterFile = path.join(__dirname, "counter.json"); // Путь к файлу с счетчиками

// Функция для чтения счетчиков из файла
const readCounter = () => {
  try {
    const data = fs.readFileSync(counterFile, "utf8"); // Читаем файл
    return JSON.parse(data); // Парсим JSON
  } catch (err) {
    return { "/": 0, "/about": 0 }; // Если файл не существует, инициализируем счетчики
  }
};

// Функция для записи счетчиков в файл
const writeCounter = (counter) => {
  fs.writeFileSync(counterFile, JSON.stringify(counter), "utf8"); // Записываем счетчики в файл
};

// Инициализация счетчиков
let counter = readCounter();

// Обработчик для маршрута "/"
app.get("/", (req, res) => {
  counter["/"] += 1; // Увеличиваем счетчик просмотров
  writeCounter(counter); // Сохраняем счетчики в файл
  res.send(
    `<h1>Home Page</h1><p>Views: ${counter["/"]}</p><a href="/about">Go to About</a>`
  ); // Отправляем ответ
});

// Обработчик для маршрута "/about"
app.get("/about", (req, res) => {
  counter["/about"] += 1; // Увеличиваем счетчик просмотров
  writeCounter(counter); // Сохраняем счетчики в файл
  res.send(
    `<h1>About Page</h1><p>Views: ${counter["/about"]}</p><a href="/">Go to Home</a>`
  ); // Отправляем ответ
});

// Обработчик для несуществующих маршрутов (404)
app.use((req, res) => {
  res.status(404).send("<h1>404 - Page Not Found</h1>"); // Отправляем ответ
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
