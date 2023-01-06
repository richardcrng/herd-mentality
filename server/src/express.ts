import express from "express";
import cors from "cors";
import { assertsIsProtoQAId } from "../../client/src/types/protoqa.types";
import { getQuestionById, getQuestionDatabase } from "./questions/manager";

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.redirect("https://herd-mentality.upsink.games");
});

app.get("/questions", async (req, res) => {
  const questions = await getQuestionDatabase();
  res.json({
    status: 'success',
    data: { questions }
  })
})

app.get("/question/:id", async ({ params: { id } }, res) => {
  assertsIsProtoQAId(id);
  const question = getQuestionById(id);
  res.json({
    status: 'success',
    data: { question }
  })
})

app.get("/ping", (req, res) => {
  res.json({ status: "success" });
});

export default app;
