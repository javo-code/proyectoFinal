import { Router } from 'express';
import ChatController from '../controllers/chat.controllers.js';
const controller = new ChatController();

const router = Router();

router.get('/', controller.getAll)
    .get('/:id', controller.getById)
    .post('/', controller.create)
    .put('/:id', controller.update)
    .delete('/:id', controller.delete)

export default router;