import { Router } from 'express';

const healthCheckRouter = Router();

/**
 * @swagger
 * /health-check:
 *   get:
 *     summary: Check the health of the service.
 *     description: Returns a JSON response indicating whether the service is running.
 *     responses:
 *       200:
 *         description: OK. The service is running.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isRunning:
 *                   type: boolean
 *                   description: Indicates whether the service is running.
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Internal Server Error
 *     tags:
 *       - Health Check
 */

healthCheckRouter.get('/', (req, res) => res.json({ isRunning: true }));

export default healthCheckRouter;
