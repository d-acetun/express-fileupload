import express from "express";
import { corsMiddleware } from "./middlewares/cors";
import router from "./routes/routes";
import { notFound } from "./middlewares/notFound";

const app = express();

app.use(express.json());
app.use(corsMiddleware());
app.disable("x-powered-by");

app.use("/api/v1", router);
app.use(notFound);

const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`);
});
