"use strict";

module.exports = async function (fastify, opts) {
  let postsMasterSchema = fastify.mongo.db.collection("postsMaster");

  fastify.get(
    "/getAvailablePosts",
    { preValidation: [fastify.authenticate] },
    async function (request, reply) {
      try {
        console.log("user is : ", request.user);
        let results = await postsMasterSchema.find({}).toArray();
        if (results.length <= 0) {
          return {
            error: -1,
            errorMsg: "available Posts not found in database",
          };
        }

        console.log(
          "available posts: ",
          JSON.stringify(results[0].availablePosts, null, 2)
        );
        return {
          error: 0,
          errorMsg: "",
          availablePosts: [...results[0].availablePosts],
        };
      } catch (e) {
        console.log(
          "exception in processing /available posts :",
          JSON.stringify(e, null, 2)
        );
        return { error: -1, errorMsg: JSON.stringify(e) };
      }
    }
  );
};
