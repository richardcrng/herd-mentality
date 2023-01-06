import fs from 'fs/promises'
import path from 'path'
import { jsonl } from 'js-jsonl'
import { FamilyFeudProtoQA, ProtoQAId } from '../../../client/src/types/protoqa.types';

const dataPath = path.join(__dirname, "train.jsonl");

const QUESTIONS_DB: Record<ProtoQAId, FamilyFeudProtoQA> = {};

let parsedQuestionData: FamilyFeudProtoQA[] | undefined

export async function getAllQuestions(): Promise<FamilyFeudProtoQA[]> {
  return parsedQuestionData ?? await parseQuestionData()
}

export async function getQuestionById(id: ProtoQAId): Promise<FamilyFeudProtoQA> {
  const questionPreLoaded = QUESTIONS_DB[id];
  if (questionPreLoaded) return questionPreLoaded
  
  // if not already present, trying loading and parsing
  await parseQuestionData();
  const newlyLoadedQuestion = QUESTIONS_DB[id];
  if (newlyLoadedQuestion) return newlyLoadedQuestion;

  throw new Error(`Couldn't find question with id ${id}`)
}


export async function parseQuestionData(): Promise<FamilyFeudProtoQA[]> {
  const rawJsonlData = await fs.readFile(dataPath, { encoding: "utf8" });
  parsedQuestionData = jsonl.parse<FamilyFeudProtoQA>(rawJsonlData);
  parsedQuestionData.forEach(q => {
    QUESTIONS_DB[q.metadata.id] = q;
  })
  return parsedQuestionData;
}