import { Router } from 'express';

import * as healthCheckController from '../controllers/healthCheckController.ts';

const healthCheckRouter: Router = Router();

/**
 * @swagger
 * /health-check:
 *   get:
 *     summary: Check the health of the service.
 *     description: Returns a JSON response indicating whether the service is running.
 *     tags: [Health Check]
 *     responses:
 *       200:
 *         description: Successful response.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: The status of the response.
 *                 data:
 *                   type: object
 *                   properties:
 *                     serverIsRunning:
 *                       type: boolean
 *                       description: Running status confirmation.
 *       500:
 *         description: Internal Server Error.
 *         content:
 *            application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: The status of the response.
 *                 message:
 *                   type: string
 *                   description: Error message.
 */

healthCheckRouter.get('/', healthCheckController.getHealthCheck);

export default healthCheckRouter;
