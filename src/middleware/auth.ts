import bcrypt from "bcrypt";

const fixToken = process.env.SuperUserToken;
const authMiddleware = async (req: any, res: any, next: any) => {
  try {
    const token = req.header("Authorization").replace("Bearer", "");
    console.log(token);
    if (fixToken) {
      const isMatch = await bcrypt.compare(fixToken, token);
      if (!isMatch) {
        throw new Error("Invalid token");
      }
    } else {
      throw new Error("Invalid token");
    }
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate." });
  }
};

export default authMiddleware;
