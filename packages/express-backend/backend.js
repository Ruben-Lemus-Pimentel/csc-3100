import express from "express";
import cors from "cors";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

const users = {
  users_list: [
    { id: "xyz789", name: "Charlie", job: "Janitor" },
    { id: "abc123", name: "Mac", job: "Bouncer" },
    { id: "ppp222", name: "Mac", job: "Professor" },
    { id: "yat999", name: "Dee", job: "Aspiring actress" },
    { id: "zap555", name: "Dennis", job: "Bartender" }
  ]
};

const findUserByName = (name) => {
  return users.users_list.filter((user) => user.name === name);
};

const findUserById = (id) => {
  return users.users_list.find((user) => user.id === id);
};

const generateId = () => {
  return Math.random().toString(36).slice(2, 10);
};

const addUser = (user) => {
  const newUser = {
    ...user,
    id: generateId()
  };

  users.users_list.push(newUser);
  return newUser;
};

const deleteUserById = (id) => {
  const index = users.users_list.findIndex((user) => user.id === id);

  if (index === -1) {
    return undefined;
  }

  return users.users_list.splice(index, 1)[0];
};

const findUsersByNameAndJob = (name, job) => {
  return users.users_list.filter(
    (user) => user.name === name && user.job === job
  );
};

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;

  if (name !== undefined && job !== undefined) {
    const result = {
      users_list: findUsersByNameAndJob(name, job)
    };
    res.send(result);
  } else if (name !== undefined) {
    const result = {
      users_list: findUserByName(name)
    };
    res.send(result);
  } else {
    res.send(users);
  }
});

app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  const result = findUserById(id);

  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.post("/users", (req, res) => {
  const newUser = addUser(req.body);
  res.status(201).send(newUser);
});

app.delete("/users/:id", (req, res) => {
  const deletedUser = deleteUserById(req.params.id);

  if (deletedUser === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.status(204).send();
  }
});