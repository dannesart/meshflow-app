import Joi from "Joi";

type TUser = {
  name: string;
  email: string;
  id: string;
};

const UserValidator = Joi.object({
  title: Joi.string().min(3).max(30).required(),
  description: Joi.string().min(10).max(300).required(),
  deadline: Joi.date(),
  status: Joi.string().required(),
});

export { UserValidator, TUser };
