import express, { Application, Request, Response } from "express";
import cors from "cors";
import { nanoid } from "nanoid";

const app: Application = express();
const port = 4000;

app.use(cors());
app.use(express.json());
app.get("/", (req: Request, res: Response) => {
  // anything
  res.send("Hello World11");
});

app.get("/tasks", (req: Request, res: Response) => {
  // fetch database products
  res.send(tasks);
});
const tasks = [
  { id: "1", name: "task 1" },
  { id: "2", name: "task 2" },
];

app.post("/tasks", (req: Request, res: Response) => {
  // add a new product to database
  const id = nanoid();
  const { name } = req.body;
  tasks.push({ id: "3", name });
  res.status(201).send([{ id }]);
  // res.send([]);
});

app.delete("/tasks/:id", (req: Request, res: Response) => {
  // delete a product from database
  const id = req.params.id;
  res.send("Delete a product");
});

app.put("/tasks/:id", (req, res) => {
  // update a product in database
  const id = req.params.id;
  res.send("Update a product");
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
