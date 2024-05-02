import { Stack, StackProps } from 'aws-cdk-lib';
import { IRestApi, LambdaRestApi } from 'aws-cdk-lib/aws-apigateway';
import { IFunction } from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';
import { SERVICE_NAME } from '../config/constants';

export interface ApiGatewayStackProps extends StackProps {
  // vpc: IVpc;
  readonly lambdaFunction: IFunction;
}

export class ApiGatewayStack extends Stack {
  public readonly restApi: IRestApi;

  constructor(scope: Construct, id: string, props: ApiGatewayStackProps) {
    super(scope, id, props);

    this.restApi = new LambdaRestApi(this, `${SERVICE_NAME}ApiGatewayId`, {
      handler: props.lambdaFunction,
      restApiName: `${SERVICE_NAME}ApiGatewayName`,
      description: `${SERVICE_NAME} Rest Api Gateway`,
    });
  }
}
