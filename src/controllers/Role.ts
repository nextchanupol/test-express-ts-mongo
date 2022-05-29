import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import Role from '../models/Role';

const get = (req: Request, res: Response, next: NextFunction) => {
    const { roleID } = req.params;

    return Role.findById(roleID)
        .then((role) =>
            role ? res.status(200).json({ role }) : res.status(404).json({ message: 'Not found' })
        )
        .catch((error) => res.status(500).json({ error }));
};

const list = (req: Request, res: Response, next: NextFunction) => {
    return Role.find()
        .then((roles) => res.status(200).json({ roles }))
        .catch((error) => res.status(500).json({ error }));
};

const create = (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.body;

    const role = new Role({
        _id: new mongoose.Types.ObjectId(),
        name,
    });

    return role
        .save()
        .then((role) => res.status(201).json({ role }))
        .catch((error) => res.status(500).json({ error }));
};
const update = (req: Request, res: Response, next: NextFunction) => {
    const { roleID } = req.params;

    return Role.findById(roleID)
        .then((role) => {
            if (role) {
                role.set(req.body);
                return role
                    .save()
                    .then((role) => res.status(201).json({ role }))
                    .catch((error) => res.status(500).json({ error }));
            } else {
                res.status(404).json({ message: 'Not found' });
            }
        })
        .catch((error) => res.status(500).json({ error }));
};
const del = (req: Request, res: Response, next: NextFunction) => {
    const { roleID } = req.params;

    return Role.findByIdAndDelete(roleID)
        .then((role) =>
            role
                ? res.status(201).json({ message: 'deleted' })
                : res.status(404).json({ message: 'Not found' })
        )
        .catch((error) => res.status(500).json({ error }));
};

export default {
    create,
    get,
    list,
    update,
    del,
};
