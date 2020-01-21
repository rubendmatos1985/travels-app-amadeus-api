import Express, { Request, Response, NextFunction } from "express";
import { renderReactApp } from "./renderReactApp";

declare const module: any;

function main() {
  const express = Express();
  const port = 8080;
  express.use(Express.static("build"));
  express.get("/*", async (req: Request, res: Response, next: NextFunction) => {
    const result = await renderReactApp(req);

    return res.send(result);
  });

  const server = express.listen(port);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => server.close());
  }
}

main();
