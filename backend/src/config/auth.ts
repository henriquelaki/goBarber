export default {
	jwt: {
        secret: process.env.JWT_SECRET || '80186c6fd729f940f002fec42f829cc0',
        expiresIn: '1d',
	},
};