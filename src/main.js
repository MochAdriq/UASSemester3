import { web } from "./application/web.js";
import { logger } from "./application/logging.js";

const host = 3000;

web.listen(host, () => {
  logger.info(`App start at http://localhost:${host}`);
});
