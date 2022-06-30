import express from 'express';
const router = express.Router();

import noteRoute from './note.route';
/**
 * Function contains Application routes
 *
 * @returns router
 */
const routes = () => {
  router.get('/', (req, res) => {
    res.json('Welcome');
  });
  router.use('/notes', noteRoute);

  return router;
};

export default routes;
