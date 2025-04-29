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
          findMany: vi.fn().mockResolvedValue(mockedprismaResponse),
        },
      },
    };
  });


  // Created the Mock request data
  const mockRequest = getMockReq<AuthenticatedRequest>({
    
    decodedUserId: "sdfsdfops",
    
    body: {
        cateogory: "kudssio",
    }
  });

 
  
  // Mock Response Data
  const { res: mockResponse, next: NextFunction} = getMockRes({
    status: vi.fn().mockReturnThis(),
    json: vi.fn()
  });


describe("Post Method - Successful Request - selected category type queries the database to find events with the same cateegory Type",() => {
  it("receives a string that represents a selected category type. Afterwards queries in the database for Events matching the category Type", async () => {
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
  
  
    await prisma.event.findMany.mockResolvedValue(mockedprismaResponse); 
  
   await userGetCategoryEvent(mockRequest, mockResponse, NextFunction)
  
     //  Checks the statuscode of the response
    expect(mockResponse.status).toHaveBeenCalledWith(200); //Passes Test
    // checks that the json response is function
    expect(mockResponse.json).toBeTypeOf("function") //Passes Test
    //  checks that json function was called once 
    expect(mockResponse.json).toHaveBeenCalledTimes(1); //Passes Test
    // Checks that json response is an array
    expect(mockResponse.json).toHaveBeenCalledWith(expect.any(Array)) //Passes Test- 
    
    // Checks the array Structure 
    expect(mockResponse.json).toBeCalledWith(expect.arrayContaining([  //Passes Test

      expect.objectContaining({
        eventId: "212",
      eventHost: "dsd",
      eventHostName: "dsdssd",
      eventTitle: "dsdfdsf",
      eventDate:  expect.any(Date),
      eventType: "dsfdd",
      eventDescriptionContent: "dsdfsdfdf",
      eventTime: "Dsfsdff",
      ImageCoverUpload: "sfedsfds",
      eventInviteType: 1,
      eventAddress: "sdfsddsf",
      eventZipcode: "dsfsdfsdfdsf",
      cityType: "DSfsddf",
      selectedRangeofEvents: 43,
      createdAt: expect.any(Date),
      })
    ]))


  });
  
})


describe("Post Method - Error Request - Should through an error json message ", () => {
  it("Should through an Error message if the selectedCategory string is missing ", async () => {
    const ErrorRequest = getMockReq<AuthenticatedRequest>({

      decodedUserId: "sdfsdfops",


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


    await userGetCategoryEvent(ErrorRequest, mockResponse, NextFunction)

    //  Checks the statuscode of the response
    expect(mockResponse.status).toHaveBeenCalledWith(400); //Passes Test
    // checks the json response message 
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: "Invalid Request, userId does not exist",
    });


  });
})
 