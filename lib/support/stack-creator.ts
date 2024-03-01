import { App } from 'aws-cdk-lib';
import { LambdaStack } from '../stacks/lambda-stack';
import { ServiceRoleStack } from '../stacks/lambdarole-stack';
import { EcrStack } from '../stacks/ecr-stack';
import { DynamodbStack } from '../stacks/dynamodb-stack';
import { ApiGatewayStack } from '../stacks/apigateway-stack';

export interface Stacks {
  // vpcStack: VpcStack;
  serviceRoleStack: ServiceRoleStack;
  ecrRepoStack: EcrStack;
  lambdaStack: LambdaStack;
  dynamoDbStack: DynamodbStack;
  apiGatewayStack: ApiGatewayStack;
}

export interface CreateStacksResponse {
  stacks: Stacks;
}

export const createStacks = (app: App): CreateStacksResponse => {
  const stackPrefix = 'alpha-NA-us-west-2-DeliveryService';

  // const vpcStack = new VpcStack(
  //   app,
  //   `${stackPrefix}-DeliveryServiceVpcStack`,
  //   {},
  // );

  const serviceRoleStack = new ServiceRoleStack(app, `${stackPrefix}-ServiceRoleStack`, {});

  const ecrRepoStack = new EcrStack(app, `${stackPrefix}-ecrStack`, {
    serviceRole: serviceRoleStack.serviceRole,
  });

  const lambdaStack = new LambdaStack(app, `${stackPrefix}-LambdaStack`, {
    serviceRole: serviceRoleStack.serviceRole,
    ecrRepo: ecrRepoStack.ecrRepository,
  });

  const dynamoDbStack = new DynamodbStack(app, `${stackPrefix}-DynamoDbStack`, {
    serviceRole: serviceRoleStack.serviceRole,
  });

  const apiGatewayStack = new ApiGatewayStack(app, `${stackPrefix}-ApiGatewayStack`, {
    lambdaFunction: lambdaStack.lambdaFunction,
  });

  return {
    stacks: {
      // vpcStack,
      ecrRepoStack,
      serviceRoleStack,
      lambdaStack,
      dynamoDbStack,
      apiGatewayStack,
    },
  };
};
