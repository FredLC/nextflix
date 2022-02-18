import jwt from "jsonwebtoken";
import {
  findVideoIdByUser,
  updateStats,
  insertStats,
} from "../../lib/db/hasura";

export default async function stats(req, res) {
  try {
    const token = req.cookies.token;
    if (!token) {
      res.status(403).send({ msg: "not authorized" });
    } else {
      const { videoId } = req.method === "POST" ? req.body : req.query;

      if (videoId) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const userId = decoded.issuer;

        const findVideoId = await findVideoIdByUser(token, userId, videoId);
        const doesStatsExist = findVideoId.length > 0;

        if (req.method === "POST") {
          const { favorited, watched = true } = req.body;

          if (doesStatsExist) {
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
        } else {
          if (doesStatsExist) {
            res.send(findVideoId);
          } else {
            res.status(404).send({ user: null, msg: "Video not found" });
          }
        }
      }
    }
  } catch (error) {
    res.status(500).send({ done: false, error: error?.message });
  }
}
