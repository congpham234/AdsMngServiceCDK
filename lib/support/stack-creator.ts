import { App } from 'aws-cdk-lib';
import { LambdaStack } from '../stacks/lambda-stack';
import { ServiceRoleStack } from '../stacks/lambdarole-stack';
import { EcrStack } from '../stacks/ecr-stack';
import { DynamodbStack } from '../stacks/dynamodb-stack';
import { ApiGatewayStack } from '../stacks/apigateway-stack';
import { S3Stack } from '../stacks/s3-stack';

export interface Stacks {
  // vpcStack: VpcStack;
  ecrRepoStack: EcrStack;
  serviceRoleStack?: ServiceRoleStack;
  lambdaStack?: LambdaStack;
  dynamoDbStack?: DynamodbStack;
  apiGatewayStack?: ApiGatewayStack;
  s3Stack?: S3Stack;
}

export interface CreateStacksResponse {
  stacks: Stacks;
}

export const createStacks = (app: App): CreateStacksResponse => {
  const stackPrefix = 'alpha-NA-us-west-2-AdsMngService';
  // const vpcStack = new VpcStack(
  //   app,
  //   `${stackPrefix}-AdsMngServiceVpcStack`,
  //   {},
  // );

  const ecrRepoStack = new EcrStack(app, `${stackPrefix}-ecrStack`, {});

  const serviceRoleStack = new ServiceRoleStack(app, `${stackPrefix}-ServiceRoleStack`, {});

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

  const s3Stack = new S3Stack(app, `${stackPrefix}-S3Stack`, {
    serviceRole: serviceRoleStack.serviceRole,
  });

  return {
    stacks: {
      // vpcStack,
      ecrRepoStack,
      serviceRoleStack,
      lambdaStack,
      dynamoDbStack,
      apiGatewayStack,
      s3Stack,
    },
  };
};
