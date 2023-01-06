import { FamilyFeudProtoQA, ProtoQAId } from '../types/protoqa.types'
import rawQuestions from './questions.json'

const QUESTIONS = rawQuestions as Record<ProtoQAId, FamilyFeudProtoQA>

export default QUESTIONS