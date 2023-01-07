import { FamilyFeudProtoQA, ProtoQAId } from '../types/protoqa.types'
import rawQuestions from './questions.json'

export const QUESTIONS_DICT = rawQuestions as Record<ProtoQAId, FamilyFeudProtoQA>
export const QUESTIONS_ARR = Object.values(QUESTIONS_DICT)
console.log(QUESTIONS_ARR.length)