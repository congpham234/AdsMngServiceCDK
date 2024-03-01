import { Stack, StackProps } from 'aws-cdk-lib';
import { ApiDefinition, IRestApi, SpecRestApi } from 'aws-cdk-lib/aws-apigateway';
import { IFunction } from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';
import { join } from 'path';


export interface ApiGatewayStackProps extends StackProps {
  // vpc: IVpc;
  readonly lambdaFunction: IFunction;
}

export class ApiGatewayStack extends Stack {
  public readonly restApi: IRestApi;

  constructor(scope: Construct, id: string, props: ApiGatewayStackProps) {
    super(scope, id, props);
    this.restApi = new SpecRestApi(this, 'DeliveryServApiGatewayId', {
      restApiName: 'DeliveryServApiGatewayName',
      description: 'Delivery Service Rest Api Gateway',
      apiDefinition: ApiDefinition.fromAsset(join(__dirname, '.openapi-spec.json')),
    });
  }
}
