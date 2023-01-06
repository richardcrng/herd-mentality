// https://github.com/iesl/protoqa-data/blob/master/DATAFORMAT.md
export interface FamilyFeudProtoQA {
  metadata: {
    /** unique id of this question */
    id: string;
    /** source of answer strings (eg. "umass-crowdsource", url, etc.) */
    source: string;
  };
  question: {
    /** original string form of this question */
    original: string;
    /** cleaned form of question suggested for model input */
    normalized: string;
  };
  answers: {
    raw: Record<string, number>;
    clusters: {
      [clusterId: string]: {
        count: number;
        answers: string[];
      }
    };
  };
  num: {
    answers: number;
    clusters: number;
  }
}