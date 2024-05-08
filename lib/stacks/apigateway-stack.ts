import { Stack, StackProps } from 'aws-cdk-lib';
import { AuthorizationType, CognitoUserPoolsAuthorizer, IRestApi, LambdaRestApi } from 'aws-cdk-lib/aws-apigateway';
import { IFunction } from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';
import { SERVICE_NAME } from '../config/constants';
import { IUserPool } from 'aws-cdk-lib/aws-cognito';

export interface ApiGatewayStackProps extends StackProps {
  // vpc: IVpc;
  readonly lambdaFunction: IFunction;
  readonly userPool: IUserPool;
}

export class ApiGatewayStack extends Stack {
  public readonly restApi: IRestApi;
  public readonly authorizer: CognitoUserPoolsAuthorizer;

  constructor(scope: Construct, id: string, props: ApiGatewayStackProps) {
    super(scope, id, props);

    // Create a Cognito user pool authorizer
    this.authorizer = new CognitoUserPoolsAuthorizer(this, `${SERVICE_NAME}Authorizer`, {
      cognitoUserPools: [props.userPool],
      authorizerName: `${SERVICE_NAME}CognitoAuthorizer`,
      identitySource: 'method.request.header.Authorization',
    });

    this.restApi = new LambdaRestApi(this, `${SERVICE_NAME}ApiGatewayId`, {
      handler: props.lambdaFunction,
      restApiName: `${SERVICE_NAME}ApiGatewayName`,
      description: `${SERVICE_NAME} Rest Api Gateway`,
      defaultMethodOptions: {
        authorizer: this.authorizer,
        authorizationType: AuthorizationType.COGNITO,
      },
    });
  }
}
