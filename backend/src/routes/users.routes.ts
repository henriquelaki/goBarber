import { response, Router } from 'express';
import multer from 'multer';

import CreateUserService from '../services/CreateUserService';
import UpdateUserAvatarService from '../services/UpdateUserAvatar';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import uploadConfig from '../config/upload';

const usersRouter = Router();
const upload = multer(uploadConfig);

//POST
usersRouter.post('/', async (request, response) => {
	const { name, email, password } = request.body;

	const createUser = new CreateUserService();

	const user = await createUser.execute({
		name,
		email,
		password,
	});

	const userWithoutPassword = {
		id: user.id,
		name: user.name,
		email: user.email,
		created_at: user.created_at,
		updated_at: user.updated_at,
	};

	return response.status(201).json(userWithoutPassword);
});

usersRouter.patch(
	'/avatar',
	ensureAuthenticated,
	upload.single('avatar'),
	async (request, response) => {
		const updateUserAvatar = new UpdateUserAvatarService();
		const user = await updateUserAvatar.execute({
			user_id: request.user.id,
			avatarFilename: request.file.filename,
		});

		const userWithoutPassword = {
			id: user.id,
			name: user.name,
			email: user.email,
			avatar: user.avatar,
			created_at: user.created_at,
			updated_at: user.updated_at,
		};

		return response.status(201).json(userWithoutPassword);
	}
);

export default usersRouter;
