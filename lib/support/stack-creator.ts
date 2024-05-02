import { App } from 'aws-cdk-lib';
import { LambdaStack } from '../stacks/lambda-stack';
import { ServiceRoleStack } from '../stacks/lambdarole-stack';
import { EcrStack } from '../stacks/ecr-stack';
import { ApiGatewayStack } from '../stacks/apigateway-stack';
import { SecretsManagerStack } from '../stacks/secretsmanager-stack';
import { SERVICE_NAME } from '../config/constants';

export const createStacks = (app: App) => {
  const stackPrefix = `alpha-NA-us-west-2-${SERVICE_NAME}`;
  // const vpcStack = new VpcStack(
  //   app,
  //   `${stackPrefix}-VpcStack`,
  //   {},
  // );

  const ecrRepoStack = new EcrStack(app, `${stackPrefix}-EcrStack`, {});

  const serviceRoleStack = new ServiceRoleStack(app, `${stackPrefix}-ServiceRoleStack`, {});

  const lambdaStack = new LambdaStack(app, `${stackPrefix}-LambdaStack`, {
    serviceRole: serviceRoleStack.serviceRole,
    ecrRepo: ecrRepoStack.ecrRepository,
  });

  const apiGatewayStack = new ApiGatewayStack(app, `${stackPrefix}-ApiGatewayStack`, {
    lambdaFunction: lambdaStack.lambdaFunction,
  });


  const secretsManagerStack = new SecretsManagerStack(app, `${stackPrefix}-SecretsManagerStack`, {
    serviceRole: serviceRoleStack.serviceRole,
  });

  // const dynamoDbStack = new DynamodbStack(app, `${stackPrefix}-DynamoDbStack`, {
  //   serviceRole: serviceRoleStack.serviceRole,
  // });

  // const s3Stack = new S3Stack(app, `${stackPrefix}-S3Stack`, {
  //   serviceRole: serviceRoleStack.serviceRole,
  // });

  return {
    stacks: {
      // vpcStack,
      // dynamoDbStack,
      // s3Stack,
      ecrRepoStack,
      serviceRoleStack,
      lambdaStack,
      apiGatewayStack,
      secretsManagerStack,
    },
  };
};
