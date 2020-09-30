import express from "express";
// any other routes imports would go here
function getRoutes() {
  // create a router for all the routes of our app
  const router = express.Router();
  router.use("/test", (req, res) => {
    res.status(200).send("Okay");
  });
  return router;
}
export { getRoutes };
