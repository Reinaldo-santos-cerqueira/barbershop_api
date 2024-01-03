import express from 'express';
import { AuthenticationControllers } from '../../controllers';

export const AuthenticationRoutes = express.Router();

const authenticationControllers = new AuthenticationControllers();

AuthenticationRoutes.post('/createdClient', authenticationControllers.createdClient);
AuthenticationRoutes.post('/createdEmployee', authenticationControllers.createdEmployee);