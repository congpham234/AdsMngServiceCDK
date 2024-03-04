import { Stack, StackProps } from 'aws-cdk-lib';
import { IRestApi, LambdaRestApi } from 'aws-cdk-lib/aws-apigateway';
import { IFunction } from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';


export interface ApiGatewayStackProps extends StackProps {
  // vpc: IVpc;
  readonly lambdaFunction: IFunction;
}

export class ApiGatewayStack extends Stack {
  public readonly restApi: IRestApi;

  constructor(scope: Construct, id: string, props: ApiGatewayStackProps) {
    super(scope, id, props);

    this.restApi = new LambdaRestApi(this, 'DeliveryServApiGatewayId', {
      handler: props.lambdaFunction,
      restApiName: 'DeliveryServApiGatewayName',
      description: 'Delivery Service Rest Api Gateway',
    });
  }
}
