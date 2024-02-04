import { App } from 'aws-cdk-lib';
import { LambdaStack } from '../stacks/lambda-stack';
import { ServiceRoleStack } from '../stacks/lambda-role';

export interface Stacks {
  // vpcStack: VpcStack;
  serviceRoleStack: ServiceRoleStack;
  lambdaStack: LambdaStack;
}

export interface CreateStacksResponse {
  stacks: Stacks;
}

export const createStacks = (app: App): CreateStacksResponse => {
  const stackPrefix = 'alpha-NA-us-west-2-DeliveryService-';

  // const vpcStack = new VpcStack(
  //   app,
  //   `${stackPrefix}-DeliveryServiceVpcStack`,
  //   {},
  // );

  const serviceRoleStack = new ServiceRoleStack(app, `${stackPrefix}-ServiceRoleStack`, {});

  const lambdaStack = new LambdaStack(app, `${stackPrefix}-LambdaStack`, {
    serviceRole: serviceRoleStack.serviceRole,
  });

  return {
    stacks: {
      // vpcStack,
      serviceRoleStack,
      lambdaStack,
    },
  };
};
