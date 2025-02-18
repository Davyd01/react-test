import { render, screen, fireEvent } from "@testing-library/react";
import Todo from "./Todo";

test("Отображается заголовок TODO", () => {
  render(<Todo />);
  const titleElement = screen.getByText(/TODO/i);
  expect(titleElement).toBeInTheDocument();
});

test("Можно вводить текст в поле ввода", () => {
  render(<Todo />);
  const inputElement = screen.getByRole("textbox");

  fireEvent.change(inputElement, { target: { value: "Новая задача" } });

  expect(inputElement.value).toBe("Новая задача");
});

test("Кнопка 'Добавить' не добавляет пустую задачу", () => {
  render(<Todo />);
  const buttonElement = screen.getByText("Добавить");
  
  fireEvent.click(buttonElement);

  const listItems = screen.queryAllByRole("listitem");
  expect(listItems.length).toBe(0);
});

test("После ввода текста и нажатия кнопки 'Добавить' появляется новая задача", () => {
  render(<Todo />);
  const inputElement = screen.getByRole("textbox");
  const buttonElement = screen.getByText("Добавить");

  fireEvent.change(inputElement, { target: { value: "Купить молоко" } });
  fireEvent.click(buttonElement);

  const listItem = screen.getByText("Купить молоко");
  expect(listItem).toBeInTheDocument();
});
test("Кнопка 'Добавить' без текста не добавляет задачу и выводит ошибку", () => {
  render(<Todo />);
  const buttonElement = screen.getByText("Добавить");
  
  fireEvent.click(buttonElement);

  const listItems = screen.queryAllByRole("listitem");
  expect(listItems.length).toBe(0);

  const errorMessage = screen.queryByText("Введите задачу!"); 
  expect(errorMessage).toBeInTheDocument();
});

test("После удаления задачи, она исчезает из списка", () => {
  render(<Todo />);
  const inputElement = screen.getByRole("textbox");
  const addButton = screen.getByText("Добавить");

  fireEvent.change(inputElement, { target: { value: "Тестовая задача" } });
  fireEvent.click(addButton);

  const deleteButton = screen.getByText("Удалить");
  fireEvent.click(deleteButton);

  const listItems = screen.queryAllByRole("listitem");
  expect(listItems.length).toBe(0);
});
