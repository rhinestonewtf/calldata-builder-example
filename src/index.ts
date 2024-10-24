import {
  getAutoSaveAction,
  getExecuteScheduledOrderAction,
} from "@rhinestone/module-sdk";
import express, { Request, Response } from "express";

const app = express();
const port = 3000;

app.use(express.json());

app.post("/scheduled-orders", (req: Request, res: Response) => {
  const data = req.body;

  const executeScheduledOrderAction = getExecuteScheduledOrderAction({
    jobId: data.static.jobId,
  });

  res.json({
    calldata: executeScheduledOrderAction.data,
  });
});

app.post("/auto-savings", async (req: Request, res: Response) => {
  const data = req.body;

  const autoSaveAction = await getAutoSaveAction({
    token: data.dynamic.token,
    amountReceived: data.dynamic.amountReceived,
  });

  res.json({
    calldata: autoSaveAction.data,
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
