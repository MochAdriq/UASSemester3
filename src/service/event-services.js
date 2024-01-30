import { validate } from "../validation/validation.js";
import {
  createEventValidation,
  getEventValidation,
  searchEventValidation,
  updateEventValidation,
} from "../validation/event-validation.js";
import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";

const create = async (user, request) => {
  const event = validate(createEventValidation, request);
  event.username = user.username;

  return prismaClient.event.create({
    data: event,
    select: {
      eventId: true,
      eventName: true,
      eventDate: true,
      location: true,
      attendanceStatus: true,
    },
  });
};

const get = async (user, eventId) => {
  eventId = validate(getEventValidation, eventId);

  const event = await prismaClient.event.findFirst({
    where: {
      username: user.username,
      eventId: eventId,
    },
    select: {
      eventId: true,
      eventName: true,
      eventDate: true,
      location: true,
      attendanceStatus: true,
    },
  });

  if (!event) {
    throw new ResponseError(404, "event is not found");
  }

  return event;
};

const update = async (user, request) => {
  const event = validate(updateEventValidation, request);

  const totalEventInDatabase = await prismaClient.event.count({
    where: {
      username: user.username,
      eventId: parseInt(request.eventId),
    },
  });

  if (totalEventInDatabase !== 1) {
    throw new ResponseError(404, "event is not found");
  }

  return prismaClient.event.update({
    where: {
      eventId: parseInt(request.eventId),
    },
    data: {
      eventName: event.eventName,
      eventDate: event.eventDate,
      location: event.location,
      attendanceStatus: event.attendanceStatus,
    },
    select: {
      eventId: true,
      eventName: true,
      eventDate: true,
      location: true,
      attendanceStatus: true,
    },
  });
};

const remove = async (user, eventId) => {
  eventId = validate(getEventValidation, eventId);

  const totalInDatabase = await prismaClient.event.count({
    where: {
      username: user.username,
      eventId: eventId,
    },
  });

  if (totalInDatabase !== 1) {
    throw new ResponseError(404, "event is not found");
  }

  return prismaClient.event.delete({
    where: {
      eventId: eventId,
    },
  });
};

const search = async (user, request) => {
  request = validate(searchEventValidation, request);

  // 1 ((page - 1) * size) = 0
  // 2 ((page - 1) * size) = 10
  const skip = (request.page - 1) * request.size;

  const filters = [];

  filters.push({
    username: user.username,
  });

  if (request.eventName) {
    filters.push({
      eventName: {
        contains: request.eventName,
      },
    });
  }

  if (request.location) {
    filters.push({
      location: {
        contains: request.location,
      },
    });
  }

  if (request.attendanceStatus) {
    filters.push({
      attendanceStatus: {
        contains: request.attendanceStatus,
      },
    });
  }

  const event = await prismaClient.event.findMany({
    where: {
      AND: filters,
    },
    take: request.size,
    skip: skip,
  });

  const totalItems = await prismaClient.event.count({
    where: {
      AND: filters,
    },
  });

  return {
    data: event,
    paging: {
      page: request.page,
      total_item: totalItems,
      total_page: Math.ceil(totalItems / request.size),
    },
  };
};

export default {
  create,
  get,
  update,
  remove,
  search,
};
