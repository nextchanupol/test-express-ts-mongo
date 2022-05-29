import express, { Router } from 'express';
import RoleRoutes from './Role';

const router = Router();

router.use('/roles', RoleRoutes);

export default router;
