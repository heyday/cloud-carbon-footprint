import { CloudWatch, CostExplorer } from 'aws-sdk'
import { AWS_REGIONS } from './AWSRegions'
import { path } from 'ramda'
import { GetCostAndUsageRequest, GetCostAndUsageResponse } from 'aws-sdk/clients/costexplorer'
import { GetMetricDataInput, GetMetricDataOutput } from 'aws-sdk/clients/cloudwatch'

export class AwsDecorator {
  private cloudWatch: CloudWatch
  private costExplorer: CostExplorer

  constructor(readonly region: string) {
    this.cloudWatch = new CloudWatch({
      region: region,
    })
    this.costExplorer = new CostExplorer({
      region: AWS_REGIONS.US_EAST_1, //must be us-east-1 to work
    })
  }
  private async getCostAndUsageResponse(
    params: CostExplorer.GetCostAndUsageRequest,
  ): Promise<CostExplorer.GetCostAndUsageResponse[]> {
    return [await this.costExplorer.getCostAndUsage(params).promise()]
  }

  private async getMetricDataResponse(
    params: CloudWatch.GetMetricDataInput,
  ): Promise<CloudWatch.GetMetricDataOutput[]> {
    return [await this.cloudWatch.getMetricData(params).promise()]
  }

  @enablePagination('NextPageToken')
  public async getCostAndUsageResponses(params: GetCostAndUsageRequest): Promise<GetCostAndUsageResponse[]> {
    return await this.getCostAndUsageResponse(params)
  }

  @enablePagination('NextToken')
  public async getMetricDataResponses(params: GetMetricDataInput): Promise<GetMetricDataOutput[]> {
    return await this.getMetricDataResponse(params)
  }
}

function enablePagination<RequestType, ResponseType>(nextPageProperty: string) {
  return (target: unknown, propertyKey: string, descriptor?: PropertyDescriptor) => {
    const originalMethod = descriptor.value
    descriptor.value = async function (props: RequestType) {
      const responses: ResponseType[] = []

      let latestResponse: ResponseType
      do {
        const args = [
          {
            ...props,
            [nextPageProperty]: path([responses.length, nextPageProperty], responses),
          },
        ]
        latestResponse = (await originalMethod.apply(this, args))[0]
        responses.push(latestResponse)
      } while (path([nextPageProperty], latestResponse))

      return responses
    }

    return descriptor
  }
}