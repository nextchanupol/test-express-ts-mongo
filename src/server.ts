import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import { config } from './config/config';
import Logging from './libs/Logging';
import Routes from './routes';

const router = express();

mongoose
    .connect(config.mongo.url, { retryWrites: true, w: 'majority' })
    .then(() => {
        Logging.info('connected to mongo');
        startServer();
    })
    .catch((error) => {
        Logging.error('Unable to connect to mongo');
        Logging.error(error);
    });

const startServer = () => {
    router.use(express.urlencoded({ extended: true }));
    router.use(express.json());

    router.use((req, res, next) => {
        /** Request*/
        Logging.info(
            `request => Method: ${req.method} | URL: ${req.url} | IP:[${req.socket.remoteAddress}]`
        );

        /** Response */
        res.on('finish', () => {
            Logging.info(
                `request => Method: ${req.method} | URL: ${req.url} | IP:[${req.socket.remoteAddress}] | status: ${req.statusCode}`
            );
        });

        next();
    });

    /** Routes */
    router.use(Routes);

    router.get('/status', (req, res, next) => res.status(200).json({ message: 'OK' }));

    /**	Error */
    router.use((req, res, next) => {
        const err = new Error('not found');

        Logging.error(err);

        return res.status(404).json({ message: err.message });
    });

    http.createServer(router).listen(config.server.port, () =>
        Logging.info(`server is listening on port ${config.server.port}`)
    );
};
