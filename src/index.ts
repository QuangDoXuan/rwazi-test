import express, { Express, Request, Response } from "express";
import { env } from "./configs/env";
import authRouter from "./apps/auth/router";
import userRouter from "./apps/users/router";
import bodyParser from "body-parser";
import serviceRouter from "./apps/services/router";
import favoriteRouter from "./apps/favorites/router";

const app: Express = express();
app.use(bodyParser.json())

const routes = [
  authRouter,
  userRouter,
  serviceRouter,
  favoriteRouter
]

routes.forEach((route) => {
  app.use("/api", route)
})

// app.use('/auth', authRouter)
// app.use('/users', userRouter)
// app.use('/services', serviceRouter)
// app.use('/users', favoriteRouter)

app.listen(env.port, () => {
  console.log(`[server]: Server is running at http://localhost:${env.port}`);
});
