import datasource from "../../libs/database/datasource";
import { FavoriteController } from "./controller";
import { Request, Response } from "express";

describe("FavoriteController", () => {
  let controller: FavoriteController;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let responseObject: any;

  beforeAll(() => {
    datasource.getConnection()
  })

  beforeEach(() => {
    controller = new FavoriteController();
    mockRequest = {};
    mockResponse = {
      statusCode: 0,
      send: jest.fn().mockImplementation((result) => {
        responseObject = result;
      }),
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockImplementation((result) => {
        responseObject = result;
      }),
    }
  });

  afterAll(() => {
    datasource.closeConnection()
  })

  it("POST /api/favorites: Action add to favorite", async () => {
    const expectedStatusCode = 200;
    (mockRequest as any).user = {
      email: "testuser@gmail.com",
      id: 10,
    }
    mockRequest.body = {
      actionType: "like",
      serviceId: 1,
    }
    await controller.addToFavorite(mockRequest as any, mockResponse as Response);
    await controller.getListFavorite(mockRequest as any, mockResponse as Response)
    expect(responseObject.statusCode).toBe(expectedStatusCode)
    expect(responseObject.data?.items?.length).toBe(1)
  })

  it("GET /api/favorites: Get user's favorite stores", async () => {
    const expectedStatusCode = 200;
    (mockRequest as any).user = {
      email: "testuser@gmail.com",
      id: 10,
    }
    await controller.getListFavorite(mockRequest as any, mockResponse as Response)
    expect(responseObject.statusCode).toBe(expectedStatusCode)
    expect(responseObject.data?.items?.length).toBe(1)
  })

  it("POST /api/favorites: Action remove from favorite", async () => {
    const expectedStatusCode = 200;
    (mockRequest as any).user = {
      email: "testuser@gmail.com",
      id: 10,
    }
    mockRequest.body = {
      actionType: "dislike",
      serviceId: 1,
    }
    await controller.addToFavorite(mockRequest as any, mockResponse as Response);
    await controller.getListFavorite(mockRequest as any, mockResponse as Response)
    expect(responseObject.statusCode).toBe(expectedStatusCode)
    expect(responseObject.data?.items?.length).toBe(0)
  })
});
