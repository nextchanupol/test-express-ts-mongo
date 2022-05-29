import express, { Router } from 'express';
import controller from '../controllers/Role';
const router = Router();

router.get('/get/:roleID', controller.get);
router.get('/list', controller.list);
router.post('/create', controller.create);
router.patch('/update/:roleID', controller.update);
router.delete('/delete/:roleID', controller.del);

export default router;
