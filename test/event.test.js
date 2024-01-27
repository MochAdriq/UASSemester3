import supertest from "supertest";
import {
  createManyTestEvents,
  createTestEvents,
  createTestUser,
  getTestEvents,
  removeAllTestEvents,
  removeTestUser,
} from "./test-util.js";
import { web } from "../src/application/web.js";
import { logger } from "../src/application/logging.js";

describe("POST /api/events", function () {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await removeAllTestEvents();
    await removeTestUser();
  });

  it("should can create new event", async () => {
    const result = await supertest(web)
      .post("/api/events")
      .set("Authorization", "test")
      .send({
        eventName: "test",
        eventDate: "2024-02-01T14:30:00",
        location: "test",
        attendanceStatus: "MungkinHadir",
      });

    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body);
    expect(result.body.data).toHaveProperty("eventId");
    expect(result.body.data.eventName).toBe("test");
    expect(result.body.data.eventDate).toBe("2024-02-01T07:30:00.000Z");
    expect(result.body.data.location).toBe("test");
    expect(result.body.data.attendanceStatus).toBe("MungkinHadir");
  });

  it("should reject if request is not valid", async () => {
    const result = await supertest(web)
      .post("/api/events")
      .set("Authorization", "test")
      .send({
        eventName: "",
        eventDate: "2024-02-01T14:30:00adsa",
        location: "test",
        attendanceStatus: "MungkinHadir",
      });

    logger.info(result.body);

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });
});

describe("GET /api/events/:eventId", function () {
  beforeEach(async () => {
    await createTestUser();
    await createTestEvents();
  });

  afterEach(async () => {
    await removeAllTestEvents();
    await removeTestUser();
  });

  it("should can get events", async () => {
    const testEvent = await getTestEvents();

    const result = await supertest(web)
      .get("/api/events/" + testEvent.eventId)
      .set("Authorization", "test");

    logger.info("-------");
    logger.info(result.body);
    logger.info("-------");

    expect(result.status).toBe(200);
    expect(result.body.data.eventId).toBe(testEvent.eventId);
    expect(result.body.data.eventName).toBe(testEvent.eventName);
    expect(result.body.data.eventDate).toBe(testEvent.eventDate.toISOString());
    expect(result.body.data.location).toBe(testEvent.location);
    expect(result.body.data.attendanceStatus).toBe(testEvent.attendanceStatus);
  });

  it("should return 404 if event id is not found", async () => {
    const testEvent = await getTestEvents();

    const result = await supertest(web)
      .get("/api/events/" + (testEvent.eventId + 1))
      .set("Authorization", "test");

    expect(result.status).toBe(404);
  });
});

describe("GET /api/events", function () {
  beforeEach(async () => {
    await createTestUser();
    await createTestEvents();
  });

  afterEach(async () => {
    await removeAllTestEvents();
    await removeTestUser();
  });

  it("should can update existing events", async () => {
    const testEvent = await getTestEvents();

    const result = await supertest(web)
      .put("/api/events/" + testEvent.eventId)
      .set("Authorization", "test")
      .send({
        eventName: "adrik",
        eventDate: "2025-02-01T14:30:00",
        location: "ciajraja",
        attendanceStatus: "Hadir",
      });

    logger.info("-------");
    logger.info(result.body);
    logger.info("-------");

    expect(result.status).toBe(200);
    expect(result.body.data.eventId).toBe(testEvent.eventId);
    expect(result.body.data.eventName).toBe("adrik");
    expect(result.body.data.eventDate).toBe("2025-02-01T07:30:00.000Z");
    expect(result.body.data.attendanceStatus).toBe("Hadir");
  });
  it("should reject if request is invalid", async () => {
    const testEvent = await getTestEvents();

    const result = await supertest(web)
      .put("/api/events/" + testEvent.eventId)
      .set("Authorization", "test")
      .send({
        eventName: "",
        eventDate: "",
        location: "",
        attendanceStatus: "Hadir",
      });

    logger.info("-------");
    logger.info(result.body);
    logger.info("-------");

    expect(result.status).toBe(400);
  });

  it("should reject if event is not found", async () => {
    const testEvent = await getTestEvents();

    const result = await supertest(web)
      .put("/api/events/" + (testEvent.eventId + 1))
      .set("Authorization", "test")
      .send({
        eventName: "adrik",
        eventDate: "2025-02-01T07:30:00.000Z",
        location: "dimanawe",
        attendanceStatus: "Hadir",
      });

    logger.info("-------");
    logger.info(result.body);
    logger.info("-------");

    expect(result.status).toBe(404);
  });
});

describe("DELETE /api/events/:eventId", function () {
  beforeEach(async () => {
    await createTestUser();
    await createTestEvents();
  });

  afterEach(async () => {
    await removeAllTestEvents();
    await removeTestUser();
  });

  it("should can delete event", async () => {
    let testEvent = await getTestEvents();
    const result = await supertest(web)
      .delete("/api/events/" + testEvent.eventId)
      .set("Authorization", "test");

    logger.info("-------");
    logger.info(result.body);
    logger.info("-------");
    expect(result.status).toBe(200);
    expect(result.body.data).toBe("OK");

    testEvent = await getTestEvents();
    expect(testEvent).toBeNull();
  });

  it("should reject if event is not found", async () => {
    let testEvent = await getTestEvents();
    const result = await supertest(web)
      .delete("/api/events/" + (testEvent.eventId + 1))
      .set("Authorization", "test");

    expect(result.status).toBe(404);
  });
});

describe("GET /api/events", function () {
  beforeEach(async () => {
    await createTestUser();
    await createManyTestEvents();
  });

  afterEach(async () => {
    await removeAllTestEvents();
    await removeTestUser();
  });

  it("should can search without parameter", async () => {
    const result = await supertest(web)
      .get("/api/events")
      .set("Authorization", "test");

    logger.info("-------");
    logger.info(result.error);
    logger.info("-------");

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(10);
    expect(result.body.paging.page).toBe(1);
    expect(result.body.paging.total_page).toBe(2);
    expect(result.body.paging.total_item).toBe(15);
  });
});
