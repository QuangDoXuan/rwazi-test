import { ServiceTypeEnum } from "../../libs/common/enum";
import datasource from "../../libs/database/datasource";
import { ServiceController } from "./controller";
import { Request, Response } from "express";

describe("ServiceController", () => {
  let controller: ServiceController;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let responseObject: any;

  beforeAll(() => {
    datasource.getConnection()
  })

  beforeEach(() => {
    controller = new ServiceController();
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

  it("GET /api/services returned 1 items", async () => {
    const mockParams: any = {
      lat: 21.036056,
      long: 105.782275,
      name: "Big",
      radius: 5000,
      serviceType: ServiceTypeEnum.SUPERMARKET,
      page: 1,
      pageSize: 10
    };
    const expectedStatusCode = 200;
    mockRequest.query = mockParams;
    await controller.search(mockRequest as Request, mockResponse as Response);
    expect(responseObject.statusCode).toBe(expectedStatusCode)
    expect(responseObject.data?.items?.length).toBe(1)
  })

  it("GET /api/services returned 1 items in radius of 5000m with serviceType = supermarket", async () => {
    const mockParams: any = {
      lat: 21.036056,
      long: 105.782275,
      name: "Big",
      radius: 5000,
      serviceType: ServiceTypeEnum.SUPERMARKET,
      page: 1,
      pageSize: 10
    };
    const expectedStatusCode = 200;
    mockRequest.query = mockParams;
    await controller.search(mockRequest as Request, mockResponse as Response);
    expect(responseObject.statusCode).toBe(expectedStatusCode)
    expect(responseObject.data?.items?.length).toBe(1)
  })

  it("GET /api/services: returned 0 items in radius of 1000m with serviceType = supermarket", async () => {
    const mockParams: any = {
      lat: 21.036056,
      long: 105.782275,
      name: "Big",
      radius: 1000,
      serviceType: ServiceTypeEnum.SUPERMARKET,
      page: 1,
      pageSize: 10
    };
    const expectedStatusCode = 200;
    mockRequest.query = mockParams;
    await controller.search(mockRequest as Request, mockResponse as Response);
    expect(responseObject.statusCode).toBe(expectedStatusCode)
    expect(responseObject.data?.items?.length).toBe(0)
  })
});