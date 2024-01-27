import { prismaClient } from "../src/application/database.js";
import bcrypt from "bcrypt";

export const removeTestUser = async () => {
  await prismaClient.user.deleteMany({
    where: {
      username: "test",
    },
  });
};

export const createTestUser = async () => {
  await prismaClient.user.create({
    data: {
      username: "test",
      password: await bcrypt.hash("rahasia", 10),
      name: "test",
      token: "test",
    },
  });
};

export const getTestUser = async () => {
  return prismaClient.user.findUnique({
    where: {
      username: "test",
    },
  });
};

export const removeAllTestEvents = async () => {
  await prismaClient.event.deleteMany({
    where: {
      username: "test",
    },
  });
};

export const createTestEvents = async () => {
  await prismaClient.event.create({
    data: {
      username: "test",
      eventName: "test",
      eventDate: "2024-02-01T07:30:00.000Z",
      location: "test",
      attendanceStatus: "MungkinHadir",
    },
  });
};

export const createManyTestEvents = async () => {
  for (let i = 0; i < 15; i++) {
    await prismaClient.event.create({
      data: {
        username: "test",
        eventName: "test",
        eventDate: "2024-02-01T07:30:00.000Z",
        location: "test",
        attendanceStatus: "MungkinHadir",
      },
    });
  }
};

export const getTestEvents = async () => {
  return prismaClient.event.findFirst({
    where: {
      username: "test",
      eventName: "test",
    },
  });
};
