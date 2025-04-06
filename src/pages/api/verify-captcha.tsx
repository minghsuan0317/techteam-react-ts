import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

type Data = {
  success: boolean;
  message?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    const { token } = req.body;
    const secretKey = "6LdBgwsrAAAAAGuEiaO53nMvZL_svryrSmYJ2Ye2";

    try {
      const response = await axios.post(
        "https://www.google.com/recaptcha/api/siteverify",
        null,
        {
          params: {
            secret: secretKey,
            response: token,
          },
        }
      );
      const success: boolean = response.data.success;
      res.status(200).json({ success });
    } catch (error) {
      console.error("CAPTCHA verification failed:", error);
      res.status(500).json({ success: false, message: "CAPTCHA verification failed" });
    }
  } else {
    res.status(405).json({ success: false, message: "Method Not Allowed" });
  }
}
