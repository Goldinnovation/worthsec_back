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
import { exploreEvents } from "../../../controller/Event/handleExploreEvents";
import { getMockReq, getMockRes } from "vitest-mock-express";
import { Request, Response } from "express";
import prisma from "../../../libs/__mocks__/prisma";
import * as  getUserFriendsInterests from "../../../controller/Event/handleExploreEvents";
import * as processUserData  from "../../../controller/Event/handleExploreEvents";
import  * as getSpecifiedEventData  from "../../../controller/Event/handleExploreEvents";


interface AuthenticatedRequest extends Request {
  user?: any;
}

type Role = 'ADMIN' | 'USER';

// mocks the prisma client ads the prisma mockDeep CLient to access the nested properties of prisma
vi.mock("../../../libs/prisma", async () => {
  const actual = await vi.importActual<
    typeof import("../../../libs/__mocks__/prisma")
  >("../../../libs/__mocks__/prisma");
  // console.log(actual);

  const mockedAccountRes = {
    userInterest: {
      interest_list: ["dsfdsf", "dfdsf", "dssdfs", "dsfdfd", "dsfdsfdf"],
    },
    userTouser:  [
      { userFollowed: '6363afd2-5729-4fbd-973f-eed21e9131f0' },
      { userFollowed: 'e0e8dce7-e4f9-4ca7-b1ca-98ebb812a4ac' }
    ]
    ,
    createdAt: new Date(),
    userId: "dwewefe",
    userName: "EWDewew", 
    userEmail: "dscdssd",
    userPassword1: "DScsdcsd", 
    role: "USER" as Role
  };


  const mockedEventRes = [
    {
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
    },
  ];

  return {
    ...actual,
    default: {
      account: {
        findUnique: vi.fn().mockResolvedValue(mockedAccountRes),
      
      },
      event: {
        findMany: vi.fn().mockResolvedValue(mockedEventRes),
      },
    },
  };
});


 

// Mock Response Data

describe("Get Method - Successful Request - check if the user exist and queries the user selected interest data from the database  ", () => {
    afterEach(() => {
        vi.restoreAllMocks()
      })
  
    it("Checks if the user exist in the database and returns the list of user's interests", async () => {
    const userRequest = getMockReq<AuthenticatedRequest>({
      user: {
        userId: "sdfsdfops",
      },
      body: {
        city: "Berlin",
      },
    });

    const { res: serverRes } = getMockRes({
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    });

    const mockedAccountRes = {
      userInterest: {
        interest_list: ["dsfdsf", "dfdsf", "dssdfs", "dsfdfd", "dsfdsfdf"],
      },
      userTouser:  [
        { userFollowed: '6363afd2-5729-4fbd-973f-eed21e9131f0' },
        { userFollowed: 'e0e8dce7-e4f9-4ca7-b1ca-98ebb812a4ac' }
      ]
      ,
      createdAt: new Date(),
      userId: "dwewefe",
      userName: "EWDewew", 
      userEmail: "dscdssd",
      userPassword1: "DScsdcsd",
      role: "USER" as Role

    };

    const processUserDataSpy = vi.spyOn(processUserData, 'processUserData').mockResolvedValue();

    

    
 

    await prisma.account.findUnique.mockResolvedValue(mockedAccountRes); //mocked Prisma Client response
    await exploreEvents(userRequest, serverRes);


    expect(processUserDataSpy.getMockName()).toEqual('processUserData')
    expect(processUserData.processUserData(mockedAccountRes, userRequest, serverRes))
    expect(processUserDataSpy).toHaveBeenCalledTimes(1) 
    // expect(serverRes.status).toHaveBeenCalledWith(200); //Passes Test

    // expect(serverRes.json).toHaveBeenCalledWith(expect.any(Array)); //Passes Test

  });

  it("Checks if the user exist in the database and returns the list of user's interests", async () => {
    

    const FriendsInterestSpy = vi.spyOn(getUserFriendsInterests, 'getUserFriendsInterests').mockResolvedValue();

    const userRequest = getMockReq<AuthenticatedRequest>({
      user: {
        userId: "sdfsdfops",
      },
      body: {
        city: "Berlin",
      },
    });

    const { res: serverRes } = getMockRes({
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    });

    const userInterestData = [ 'dsfdsf', 'dfdsf', 'dssdfs', 'dsfdfd', 'dsfdsfdf' ]

    const userFriendsId = [ 'friendId1', 'friendId2', 'friendId3', 'friendId4' ]
  

    

    
 
    expect(FriendsInterestSpy.getMockName()).toEqual('getUserFriendsInterests')
    expect(getUserFriendsInterests.getUserFriendsInterests(userInterestData, userFriendsId, userRequest, serverRes))
    expect(FriendsInterestSpy).toHaveBeenCalledTimes(1) 
 
  });


  it("Checks if the user exist in the database and returns the list of user's interests", async () => {
    

    const specificatedEvent = vi.spyOn(getSpecifiedEventData, 'getSpecifiedEventData').mockResolvedValue();

    const userRequest = getMockReq<AuthenticatedRequest>({
      user: {
        userId: "sdfsdfops",
      },
      body: {
        city: "Berlin",
      },
    });

    const mockedEventRes = [
        {
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
        },
      ];

    const { res: serverRes } = getMockRes({
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    });

    const userInterestData = [ 'dsfdsf', 'dfdsf', 'dssdfs', 'dsfdfd', 'dsfdsfdf' ]

    const interestData = [ 'interest1', 'interes2', 'interest3', 'interest5' ]

    // await prisma.event.findMany.mockResolvedValue(mockedEventRes); //mocked Prisma Client response

  
    await exploreEvents(userRequest, serverRes);
    

 
    
 
    expect(specificatedEvent.getMockName()).toEqual('getSpecifiedEventData')
    expect(getUserFriendsInterests.getSpecifiedEventData( interestData, userRequest, serverRes))
    expect(specificatedEvent).toHaveBeenCalledTimes(1) 
  
  });
 
 

});








describe("Get Method - Error Request - checks if the Error Request receives a response with json Message", () => {
  it("Checks if the response json includes an Error Message and Invalid Request status code of 500", async () => {
    const ErrorReq = getMockReq<AuthenticatedRequest>({
      Body: {
        userId: "sdfsdfops",
      },
    });

    const { res: serverRes } = getMockRes({
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    });

    const getUserInterestMockedResponse = {
      userInterest: {
        interest_list: ["dsfdsf", "dfdsf", "dssdfs", "dsfdfd", "dsfdsfdf"],
      },
      createdAt: new Date(),
      userId: "dwewefe",
      userName: "EWDewew",
      userEmail: "dscdssd",
      userPassword1: "DScsdcsd",
      role: "USER" as Role
    };

    const mockedEventDataResponse = [
      {
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
      },
    ];

    // Checkks if the mockedResponse is queal to the return value of the prisma schema
    await prisma.account.findUnique.mockResolvedValue(
      getUserInterestMockedResponse
    ); //mocked Prisma Client response
    await prisma.event.findMany.mockResolvedValue(mockedEventDataResponse);
    await exploreEvents(ErrorReq, serverRes);

    expect(serverRes.status).toHaveBeenCalledWith(500); //Passes Test

    expect(serverRes.json).toHaveBeenCalledWith({
      message: "Internal Server Error",
    });
  });
});
