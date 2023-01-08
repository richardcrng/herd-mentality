// import fs from "fs/promises";
// import path from "path";
// import { jsonl } from "js-jsonl";
import questionsData from './data.json'
import {
  FamilyFeudProtoQA,
  ProtoQAId,
} from "../../../client/src/types/protoqa.types";

// const dataPath = path.join(__dirname, "train.jsonl");

const QUESTIONS_DB = questionsData as Record<ProtoQAId, FamilyFeudProtoQA>;
const QUESTIONS_ARR = Object.values(QUESTIONS_DB)


export async function getAllQuestions(): Promise<FamilyFeudProtoQA[]> {
  return QUESTIONS_ARR;
}

export async function getQuestionById(
  id: ProtoQAId
): Promise<FamilyFeudProtoQA> {
  const questionPreLoaded = QUESTIONS_DB[id];
  if (questionPreLoaded) return questionPreLoaded;

  // if not already present, trying loading and parsing
  await parseQuestionData();
  const newlyLoadedQuestion = QUESTIONS_DB[id];
  if (newlyLoadedQuestion) return newlyLoadedQuestion;

  throw new Error(`Couldn't find question with id ${id}`);
}

export async function getQuestionDatabase(): Promise<typeof QUESTIONS_DB> {
  if (Object.values(QUESTIONS_DB)) {
    return QUESTIONS_DB;
  }

  // if not already present, trying loading and parsing
  await parseQuestionData();
  if (Object.values(QUESTIONS_DB)) {
    return QUESTIONS_DB;
  }

  throw new Error(`Questions database still seems empty even after parsing`);
}

export async function parseQuestionData(): Promise<FamilyFeudProtoQA[]> {
  // const rawJsonlData = await fs.readFile(dataPath, { encoding: "utf8" });
  // parsedQuestionData = jsonl.parse<FamilyFeudProtoQA>(rawJsonlData);
  // parsedQuestionData.forEach((q) => {
  //   QUESTIONS_DB[q.metadata.id] = q;
  // });
  return QUESTIONS_ARR;
}
