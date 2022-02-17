import jwt from "jsonwebtoken";
import {
  findVideoIdByUser,
  updateStats,
  insertStats,
} from "../../lib/db/hasura";

export default async function stats(req, res) {
  if (req.method === "POST") {
    try {
      const token = req.cookies.token;
      if (!token) {
        res.status(403).send({ msg: "not authorized" });
      } else {
        const { videoId, favorited, watched = true } = req.body;
        if (videoId) {
          const decoded = jwt.verify(token, process.env.JWT_SECRET);

          const userId = decoded.issuer;

          const findVideoId = await findVideoIdByUser(token, userId, videoId);
          if (findVideoId) {
            const response = await updateStats(token, {
              favorited,
              watched,
              userId,
              videoId,
            });
            res.send({ data: response });
          } else {
            const response = await insertStats(token, {
              favorited,
              watched,
              userId,
              videoId,
            });
            res.send({ data: response });
          }
        }
      }
    } catch (error) {
      res.status(500).send({ done: false, error: error?.message });
    }
  }
}
