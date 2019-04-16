"use strict";

const {
  models: { Route, Highlight }
} = require("indie-campers-data");

const logic = {
  /**
   * Finds the routs with starting and end points 
   * (indiferently if it is start or end)
   * 
   * @param {string} start 
   * @param {string} end 
   * 
   * @throws {TypeError} in start or end not being string
   * @throws {Error} in same value of start and end
   * @throws {Error} in empty start or end values
   * 
   * @returns {Array} Array of the routes objects
   */
  listHighlights(start, end) {
    if (typeof start !== "string") throw TypeError(start + " is not a string");
    if (!start.trim().length) throw Error("start cannot be empty");

    if (typeof end !== "string") throw TypeError(end + " is not a string");
    if (!end.trim().length) throw Error("end cannot be empty");

    if (start === end) throw Error("start and end cannot be the same");

    return (async () => {
      let routes = await Route.find({
        $or: [{ start, end }, { start: end, end: start }]
      }).lean();

      routes = routes.map(route => {
        route.id = route._id.toString();
        delete route._id;
        delete route.__v;

        return route;
      });

      return routes;
    })();
  },

  /**
   * It finds the closest higlight to an entry lan and lng
   * 
   * @param {number} lat 
   * @param {number} lng 
   * 
   * @throws {TypeError} in lat or lng not being a number
   * 
   * @returns {Object} The closest highlight found
   */
  retrieveClosestHighlight(lat, lng) {
    if (typeof lat !== "number") throw TypeError(lat + " is not a number");
    if (typeof lng !== "number") throw TypeError(lng + " is not a number");

    function distance(p1, p2, q1, q2) {
      return Math.sqrt(Math.pow(p1 - q1, 2) + Math.pow(p2 - q2, 2));
    }

    return (async () => {
      const highlights = await Highlight.find().lean();
      const minimumDistance = highlights.reduce(
        (accumulator, current) =>
          Math.min(
            distance(Number(current.lat), Number(current.lng), lat, lng),
            accumulator
          ),
        Infinity
      );

      return highlights.find(
        highlight =>
          distance(Number(highlight.lat), Number(highlight.lng), lat, lng) ===
          minimumDistance
      );
    })();
  }
};

module.exports = logic;
