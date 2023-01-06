import { parseQuestionData } from "./questions/manager";
import httpServer from "./server";

// parse question data on server start up
parseQuestionData()

const PORT = process.env.PORT ?? 4000;

httpServer.listen(PORT, undefined, () => {
  console.log(`Server listening on port ${PORT}`);
});
