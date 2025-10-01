import express, { Application, Request, Response } from "express";
import cors from "cors";
import { nanoid } from "nanoid";

const app: Application = express();
const port = 8000;

let tasks = [
  { id: "1", name: "task 1", isChecked: false },
  { id: "2", name: "task 2", isChecked: false },
];

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  console.log("Hello World");
  res.send("Hello World11");
});

app.get("/tasks", (req: Request, res: Response) => {
  // fetch database products
  res.send(tasks);
});

app.post("/tasks", (req: Request, res: Response) => {
  // add a new product to database
  const id = nanoid();
  const { name } = req.body;

  if (!name) {
    res.status(400).send({ message: "Name is required" });
    return;
  }

  tasks.unshift({ id, name, isChecked: false });
  res.status(201).send([{ id }]); // Created
});

app.delete("/tasks/:id", (req: Request, res: Response) => {
  // delete a product from database
  const id = req.params.id;
  const newTasks = tasks.filter((task) => task.id !== id);
  tasks = newTasks;
  res.sendStatus(204); // No Content
});

app.put("/tasks/:id", (req, res) => {
  // update a product in database
  const id = req.params.id;
  const name = req.body.name;
  const isChecked = req.body.isChecked;
  const taskIndex = tasks.findIndex((task) => task.id === id);
  tasks[taskIndex].name = name;
  tasks[taskIndex].isChecked = isChecked;
  res.sendStatus(204); // No Content
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
// xaxa
