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
  import userJoinEvent from "../../../../controller/Event/handleJoinEvents";
  import { getMockReq, getMockRes } from "vitest-mock-express";
  import { Request, Response } from "express";

  
  interface AuthenticatedRequest extends Request {
    user?: any;
  }
  
  
  
  // mocks the prisma client ads the prisma mockDeep CLient to access the nested properties of prisma 
  vi.mock("../../../../libs/prisma", async () => {
    const actual = await vi.importActual<
      typeof import("../../../../libs/__mocks__/prisma")
    >("../../../../libs/__mocks__/prisma");
    // console.log(actual);
    return {
      ...actual,
      default: {
        userJoinEvent: { 
          create: vi.fn().mockImplementation(() => {
            throw new Error("Internal Server Error")
          })
        },
      },
    };
  });
  

  
 
  
  // Mock Response Data
  const { res: mockResponse, next: mockNext } = getMockRes({
    status: vi.fn().mockReturnThis(),
    json: vi.fn(),
  });

  describe("Post Method - Error Request, should return an Error message if the request is invalid - ", () => {
  
    it("Should return an error message that the request is invalid and the server eventId is required", async () => {
  
        const noEventIdReq = getMockReq<AuthenticatedRequest>({
            user: {
              userId: "sdfsdfops",
            },
          
          });
  
      await userJoinEvent(noEventIdReq, mockResponse, mockNext)
  
  
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Invalid Request, eventId is required",
      });
    })


    it("Should receive a bad request where the user ID is missing and respond with an internal server error message and a status code of 500", async () => {
  
        const noUserIdReq = getMockReq<AuthenticatedRequest>({

            body: {
              joinEventId: "sdfsdfops",
            }
          
          });
  
        await userJoinEvent(noUserIdReq, mockResponse, mockNext)
    
    
        expect(mockResponse.status).toHaveBeenCalledWith(400);
        // expect(mockResponse.json).toHaveBeenCalledWith({
        //   message: "Invalid Request, userId is required",
        // });
      })


  
  
  
  
  })
   
  
  