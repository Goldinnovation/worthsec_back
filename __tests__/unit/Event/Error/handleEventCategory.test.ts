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
  import userGetCategoryEvent from "@/server/controller/Event/handleEventCategoryReq";
  import { getMockReq, getMockRes } from "vitest-mock-express";
  import { Request, Response, } from "express";
  import prisma from "../../../../libs/__mocks__/prisma";
  
  interface AuthenticatedRequest extends Request {
    user?: any;
  }
  


  
  // mocks the prisma client ads the prisma mockDeep CLient to access the nested properties of prisma 
  vi.mock("../../../../libs/prisma", async () => {
   
    const actual = await vi.importActual<
      typeof import("../../../../libs/__mocks__/prisma")
    >("../../../../libs/__mocks__/prisma");
    // console.log(actual);
    const mockedprismaResponse =  [{
      eventId: "212",
      eventHost: "dsd",
      eventHostName: "dsdssd",
      eventTitle: "dsdfdsf",
      eventDate:  new Date(),
      eventType: "dsfdd",
      eventDescriptionContent: "dsdfsdfdf",
      eventTime: "Dsfsdff",
      ImageCoverUpload: "sfedsfds",
      eventInviteType: 1,
      eventAddress: "sdfsddsf",
      eventZipcode: "dsfsdfsdfdsf",
      cityType: "DSfsddf",
      selectedRangeofEvents: 43,
      createdAt: new Date(),
  }]
  
    return {
      ...actual,
      default: {
        event: {
          findMany: vi.fn().mockImplementation(() => {
            throw new Error("Internal Server Error")
          })
        },
      },
    };
  });


 
  



describe("Post Method - Error Request - Should through an error json message ", () => {
  it("Should through an Error message if the selectedCategory string is missing ", async () => {
    const ErrorRequest = getMockReq<AuthenticatedRequest>({

      decodedUserId: "sdfsdfops",


    });

    const { res: mockResponse, next: NextFunction} = getMockRes({
        status: vi.fn().mockReturnThis(),
        json: vi.fn()
      });


    await userGetCategoryEvent(ErrorRequest, mockResponse, NextFunction)

    //  Checks the statuscode of the response
    expect(mockResponse.status).toHaveBeenCalledWith(400); //Passes Test
    // checks the json response message 
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: "Invalid Request: selectedCategory does not match the requirements",
    });


  });

  it("Should through an Error message if the userId is missing ", async () => {
    const ErrorRequest = getMockReq<AuthenticatedRequest>({

      body: {
        cateogory: "kudssio",
      }

    });

    const { res: mockResponse, next: NextFunction} = getMockRes({
        status: vi.fn().mockReturnThis(),
        json: vi.fn()
      });


    await userGetCategoryEvent(ErrorRequest, mockResponse, NextFunction)

    //  Checks the statuscode of the response
    expect(mockResponse.status).toHaveBeenCalledWith(400); //Passes Test
    // checks the json response message 
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: "Invalid Request, userId does not exist",
    });


  });

  it("Should return a Internal Server Error", async () => {
    const ErrorRequest = getMockReq<AuthenticatedRequest>({
     decodedUserId: "sdfsdfops",
      body: {
        cateogory: "kudssio",
      }

    });

    const { res: mockResponse, next: NextFunction} = getMockRes({
        status: vi.fn().mockReturnThis(),
        json: vi.fn()
      });


    await userGetCategoryEvent(ErrorRequest, mockResponse, NextFunction)

    //  Checks the statuscode of the response
    expect(mockResponse.status).toHaveBeenCalledWith(500); //Passes Test
    // checks the json response message 
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: "Internal Server Error",
    });


  });

})
 