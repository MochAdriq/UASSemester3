import eventServices from "../service/event-services.js";

const create = async (req, res, next) => {
  try {
    const user = req.user;
    const request = req.body;
    const result = await eventServices.create(user, request);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const get = async (req, res, next) => {
  try {
    const user = req.user;
    const eventId = req.params.eventId;
    const result = await eventServices.get(user, eventId);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const update = async (req, res, next) => {
  try {
    const user = req.user;
    const eventId = req.params.eventId;
    const request = req.body;
    request.eventId = eventId;

    const result = await eventServices.update(user, request);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const remove = async (req, res, next) => {
  try {
    const user = req.user;
    const eventId = req.params.eventId;

    await eventServices.remove(user, eventId);
    res.status(200).json({
      data: "OK",
    });
  } catch (e) {
    next(e);
  }
};

const search = async (req, res, next) => {
  try {
    const user = req.user;
    const request = {
      eventName: req.query.eventName,
      location: req.query.location,
      attendanceStatus: req.query.attendanceStatus,
      page: req.query.page,
      size: req.query.size,
    };

    const result = await eventServices.search(user, request);
    res.status(200).json({
      data: result.data,
      paging: result.paging,
    });
  } catch (e) {
    next(e);
  }
};

export default {
  create,
  get,
  update,
  remove,
  search,
};
