import {
    describe,
    expect,
    it,
  } from "vitest";
  import { vi } from "vitest";
  import updatetoNewEventData from "@/server/controller/Event/handleUpdateToNewExploreData"
  import { getMockReq, getMockRes } from "vitest-mock-express";
  import { Request, Response } from "express";
  import prisma from "../../../libs/__mocks__/prisma";
  
  interface AuthenticatedRequest extends Request {
    user?: any;
  }


  
  // mocks the prisma client ads the prisma mockDeep CLient to access the nested properties of prisma 
  vi.mock("../../../libs/prisma", async () => {
    const actual = await vi.importActual<typeof import("../../../libs/__mocks__/prisma")>("../../../libs/__mocks__/prisma");

    const mockedprismaResponse = [{
      eventId: "212",
      eventHost: "dsd",
      eventHostName: "dsdssd",
      eventTitle: "dsdfdsf",
      eventDate: new Date(),
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
          findMany: vi.fn().mockResolvedValue(mockedprismaResponse)
        },
      },
    };
  });


 
  



describe("Post Method - successful Request call ", () => {

  it("Receives a list of event IDs from the client and should check for other events that do not have the same IDs but match specific conditions.", async () => {


    const eventList = Array.from({ length: 24 }, (_, index) => {
      return `data`
    })

    const mockreq = getMockReq<AuthenticatedRequest>({
      decodedUserId: "sdfsdfops",
      body: {
        EventDataId: eventList
      }
    });
     
  const { res: mockres} = getMockRes({
    status: vi.fn().mockReturnThis(),
    json: vi.fn(),
  });
  


    const mockedprismaResponse = [{
      eventId: "212",
      eventHost: "dsd",
      eventHostName: "dsdssd",
      eventTitle: "dsdfdsf",
      eventDate: new Date(),
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


    await prisma.event.findMany.mockResolvedValue(mockedprismaResponse); //mocked Prisma Client instance

    await updatetoNewEventData(mockreq, mockres);

    // checks the statuscode 
     expect(mockres.status).toHaveBeenCalledWith(200);
    // checks if the json function was called once 
     expect(mockres.json).toHaveBeenCalledTimes(1); 
    // Checks if the json response is an array
     expect(mockres.json).toHaveBeenCalledWith(expect.any(Array)) 

    // Checks the array Structure 
     expect(mockres.json).toBeCalledWith(expect.arrayContaining([ 

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
 
  



  
  