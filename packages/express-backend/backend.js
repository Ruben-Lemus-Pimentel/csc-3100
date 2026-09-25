import express from "express";
import cors from "cors";
import userServices from "./models/user-services.js";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", async (req, res) => {
  try {
    const result = await userServices.getUsers(
      req.query.name,
      req.query.job
    );

    res.send({ users_list: result });
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred in the server.");
  }
});

app.get("/users/:id", async (req, res) => {
  try {
    const result = await userServices.findUserById(req.params.id);

    if (result === null) {
      res.status(404).send("Resource not found.");
    } else {
      res.send(result);
    }
  } catch (error) {
    res.status(400).send("Invalid user ID.");
  }
});

app.post("/users", async (req, res) => {
  try {
    const savedUser = await userServices.addUser(req.body);
    res.status(201).send(savedUser);
  } catch (error) {
    console.log(error);
    res.status(400).send("Could not create user.");
  }
});

app.delete("/users/:id", async (req, res) => {
  try {
    const deletedUser = await userServices.deleteUserById(req.params.id);

    if (deletedUser === null) {
      res.status(404).send("Resource not found.");
    } else {
      res.status(204).end();
    }
  } catch (error) {
    res.status(400).send("Invalid user ID.");
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});