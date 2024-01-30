import Joi from "joi";

const createEventValidation = Joi.object({
  eventName: Joi.string().max(100).required(),
  eventDate: Joi.date(),
  location: Joi.string().max(100).required(),
  attendanceStatus: Joi.string()
    .valid("Hadir", "TidakHadir", "MungkinHadir")
    .required(),
});

const getEventValidation = Joi.number().positive().required();

const updateEventValidation = Joi.object({
  eventId: Joi.number().positive().required(),
  eventName: Joi.string().max(100).required(),
  eventDate: Joi.date(),
  location: Joi.string().max(100).required(),
  attendanceStatus: Joi.string()
    .valid("Hadir", "TidakHadir", "MungkinHadir")
    .required(),
});

const searchEventValidation = Joi.object({
  page: Joi.number().min(1).positive().default(1),
  size: Joi.number().min(1).positive().max(100).default(10),
  eventName: Joi.string().optional(),
  location: Joi.string().optional(),
  attendanceStatus: Joi.string()
    .valid("Hadir", "TidakHadir", "MungkinHadir")
    .optional(),
});

export {
  createEventValidation,
  getEventValidation,
  updateEventValidation,
  searchEventValidation,
};
