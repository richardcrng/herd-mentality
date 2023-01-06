import fs from 'fs/promises'
import path from 'path'
import { jsonl } from 'js-jsonl'
import { FamilyFeudProtoQA } from '../../../client/src/types/protoqa.types';

const dataPath = path.join(__dirname, "train.jsonl");

// const QUESTIONS_DB: Record<string, FamilyFeudProtoQA> = {};

let parsedQuestionData: FamilyFeudProtoQA[] | undefined

export async function getParsedQuestionData(): Promise<FamilyFeudProtoQA[]> {
  return parsedQuestionData ?? await parseQuestionData()
}

async function parseQuestionData(): Promise<FamilyFeudProtoQA[]> {
  const rawJsonlData = await fs.readFile(dataPath, { encoding: "utf8" });
  parsedQuestionData = jsonl.parse<FamilyFeudProtoQA>(rawJsonlData);
  return parsedQuestionData;
}