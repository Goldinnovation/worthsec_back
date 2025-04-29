import {
  describe,
  expect,
  test,
  beforeEach,
  afterEach,
  it,
  beforeAll,
} from "vitest";
import { vi } from "vitest";
// import { userFavourEvent } from "@/server/controller/Event/handleFavorEvent";
import { userFavorsEvent } from "../../../../controller/Event/handleFavorEvent";
import { getMockReq, getMockRes } from "vitest-mock-express";
import { Request, Response } from "express";
import prisma from "../../../../libs/__mocks__/prisma";

interface AuthenticatedRequest extends Request {
  user?: any;
}

// mocks the prisma client ads the prisma mockDeep CLient to access the nested properties of prisma
vi.mock("../../../../libs/prisma", async () => {
  const actual = await vi.importActual<
    typeof import("../../../../libs/__mocks__/prisma")
  >("../../../../libs/__mocks__/prisma");

  return {
    ...actual,
    default: {
      userFavourEvent: {
        create: vi.fn().mockImplementation(() => {
          throw new Error("Internal Server Error");
        }),
      },
    },
  };
});




describe("Post Method - Error Request on userFavorEventMobile function - should return an Error message if the data is invalid  ", () => {
  it("Should return error message that the event Id does not match requirements", async () => {
    const errRequst = getMockReq<AuthenticatedRequest>({
      decodedUserId: "sdfsdfops",

      body: {},
    });
    const { res: mockResponse } = getMockRes({
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    });

    const mockedprismaResponse = {
      currentUser_id: "sdfsdfopsd",
      event_id: "sdsdfsd",
      createdAt: new Date(),
      favourId: "1",
    };

    await userFavorsEvent(errRequst, mockResponse);

    await prisma.userFavourEvent.create.mockResolvedValue(mockedprismaResponse); //mocked Prisma Client instance
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: "Invalid Request: event Id does not match the requirements",
    });
  });

  it("Should return an error message that the userId does not exist", async () => {
    const errRequst = getMockReq<AuthenticatedRequest>({
      body: {
        favoreventId: "kudssio",
      },
    });

    const mockedprismaResponse = {
      currentUser_id: "sdfsdfopsd",
      event_id: "sdsdfsd",
      createdAt: new Date(),
      favourId: "1",
    };

    const { res: mockResponse } = getMockRes({
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    });

    await userFavorsEvent(errRequst, mockResponse);

    await prisma.userFavourEvent.create.mockResolvedValue(mockedprismaResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: "Invalid Request, userId does not exist",
    });
  });

  it("Should return an error Internal Server Error message and a statuscode 500", async () => {
    const errRequst = getMockReq<AuthenticatedRequest>({
      decodedUserId: "sdfsdfops",

      body: {
        favoreventId: "kudssio",
      },
    });

    const { res: mockResponse } = getMockRes({
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    });

    await userFavorsEvent(errRequst, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: "Internal Server Error",
    });
  });
});
