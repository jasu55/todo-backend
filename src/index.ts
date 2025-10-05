import express, { Application, Request, Response } from "express";
import cors from "cors";
import { nanoid } from "nanoid";
import fs from "node:fs";

const app: Application = express();
const port = 8000;

app.use(cors());
app.use(express.json());

function loadTasksFromFile() {
  const data = fs.readFileSync("data.txt", "utf8");
  const tasks = JSON.parse(data);
  return tasks;
}

function saveTasksToFile(
  tasks: { id: string, name: string, isChecked: boolean }[]
) {
  fs.writeFile("data.txt", JSON.stringify(tasks), (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("File written successfully");
    }
  });
}

app.get("/tasks", (req: Request, res: Response) => {
  // fetch database products
  const { status } = req.query;
  const tasks = loadTasksFromFile();

  const filteredTasks = tasks.filter((task: { isChecked: boolean }) => {
    if (status === "all") return true;
    if (status === "active") return task.isChecked === false;
    if (status === "completed") return task.isChecked === true;
    return true;
  });
  res.send(filteredTasks);
});

app.post("/tasks", (req: Request, res: Response) => {
  // add a new product to database
  const id = nanoid();
  const { name } = req.body;

  if (!name) {
    res.status(400).send({ message: "Name is required" });
    return;
  }

  const tasks = loadTasksFromFile();

  tasks.unshift({ id, name, isChecked: false });
  saveTasksToFile(tasks);

  res.status(201).send([{ id }]); // Created
});

app.delete("/tasks/:id", (req: Request, res: Response) => {
  // delete a product from database
  const id = req.params.id;
  const tasks = loadTasksFromFile();
  const newTasks = tasks.filter((task: { id: string }) => task.id !== id);
  saveTasksToFile(newTasks);
  res.sendStatus(204); // No Content
});

app.delete("/deleteAll", (req: Request, res: Response) => {
  console.log("DELETING ALL COMPLETES");
  // delete a product from database
  const tasks = loadTasksFromFile();
  const newTasks = tasks.filter(
    (task: { isChecked: boolean }) => task.isChecked == false
  );

  console.log("DELETING ALL COMPLETES", newTasks);
  saveTasksToFile(newTasks);
  res.sendStatus(204);
});

app.put("/tasks/:id", (req, res) => {
  // update a product in database
  const id = req.params.id;
  const name = req.body.name;
  const isChecked = req.body.isChecked;
  const tasks = loadTasksFromFile();
  const taskIndex = tasks.findIndex((task: { id: string }) => task.id === id);
  tasks[taskIndex].name = name;
  tasks[taskIndex].isChecked = isChecked;
  saveTasksToFile(tasks);
  res.sendStatus(204); // No Content
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
