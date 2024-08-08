import express, { Request, Response } from "express";
import { encodeFunctionData } from "viem";

const app = express();
const port = 3000;

app.use(express.json());

app.post("/call-data-builder", (req: Request, res: Response) => {
  // this should be the data from the event that triggered the execution of your automation
  // You could do whatever logic needed to build the calldata
  // and then return the encoded calldata
  const data = req.body;

  const calldata = encodeFunctionData({
    functionName: "setSomeState",
    abi: [
      {
        type: "function",
        name: "setSomeState",
        inputs: [{ type: "uint256" }],
      },
    ],
    args: [BigInt(data.someState)],
  });

  res.json({
    calldata,
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
