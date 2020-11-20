import { Router } from 'express';
import { parseISO } from 'date-fns';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';
import { getCustomRepository } from 'typeorm';

import enureAuthenticated from '../middlewares/ensureAuthenticated';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);
//POST
appointmentsRouter.post('/', async (request, response) => {
	const { provider_id, date } = request.body;

	const parsedDate = parseISO(date);

	const createAppointment = new CreateAppointmentService();

	const appointment = await createAppointment.execute({
		provider_id,
		date: parsedDate,
	});
	return response.status(201).json(appointment);
});

//GET
appointmentsRouter.get('/', async (request, response) => {
	const appointmentsRepository = getCustomRepository(AppointmentsRepository);
	const appointments = await appointmentsRepository.find();
	return response.status(200).json(appointments);
});

export default appointmentsRouter;
