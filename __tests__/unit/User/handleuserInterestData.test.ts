import {
  describe,
  expect,
  it,
} from "vitest";
import { vi } from "vitest";
import storeInterestData from "@/server/controller/User/handleuserInterestData";
import { getMockReq, getMockRes } from "vitest-mock-express";
import { Request, Response } from "express";
import prisma from "../../../libs/__mocks__/prisma";

interface AuthenticatedRequest extends Request {
  user?: any;
}

// mocks the prisma client ads the prisma mockDeep CLient to access the nested properties of prisma 
vi.mock("../../../libs/prisma", async () => {
  const actual = await vi.importActual<
    typeof import("../../../libs/__mocks__/prisma")
  >("../../../libs/__mocks__/prisma");
  // console.log(actual);
  return {
    ...actual,
    default: {
      userInterest: {
        create: vi.fn().mockResolvedValue,
      },
    },
  };
});

// Created the Mock request data
const mockRequest = getMockReq<AuthenticatedRequest>({
  decodedUserId: "sdfsdfops",
  body: {
    pickedIntesrest: ["time", "Movie", "Festival", "Movie", "Techno"]
  }
});

// Error Request 
const ErrorRequest = getMockReq<AuthenticatedRequest>({
  decodedUserId: "sdfsdfops",
  body: 
   ["time", "Movie", "Festival", "Movie", "Techno"]
  
});

 

// Mock Response Data
const { res: mockResponse, next: nextFunction} = getMockRes({
  status: vi.fn().mockReturnThis(),
  json: vi.fn(),
});



describe("Post Method - successful Request call ",() => {
  
it("should store the user selected interest data and return a message", async () => {
  const mockedprismaResponse = {
    user_interest_id: "sdfsdfopsd",
    interest_list: ["time", "Movie", "Festival"],
    IntersetId: "hkbhbkzvk",
    id: 1, // Simulate generated ID
  };

  await prisma.userInterest.create.mockResolvedValue(mockedprismaResponse); 

  await storeInterestData(mockRequest, mockResponse, nextFunction);

  expect(mockResponse.status).toHaveBeenCalledWith(200);
  expect(mockResponse.json).toHaveBeenCalledWith({
    message: "Interests are successfully stored",
  });



});
})



describe("Post method - Error Request ", () => {

  it("Should return an Error Statement if the Request Data does not match the conditions ", async() => {

    const mockedprismaResponse = {
      user_interest_id: "sdfsdfopsd",
      interest_list: ["time", "Movie", "Festival"],
      IntersetId: "hkbhbkzvk",
      id: 1, // Simulate generated ID
    };

    await prisma.userInterest.create.mockResolvedValue(mockedprismaResponse); //mocked Prisma Client instance
  
    await storeInterestData(ErrorRequest, mockResponse, nextFunction);
    
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: "Invalid Request, selectedInterests is required",
    });
  })
})

