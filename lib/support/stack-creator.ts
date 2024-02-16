import { App } from 'aws-cdk-lib';
import { LambdaStack } from '../stacks/lambda-stack';
import { ServiceRoleStack } from '../stacks/lambda-role-stack';
import { EcrStack } from '../stacks/ecr-stack';

export interface Stacks {
  // vpcStack: VpcStack;
  serviceRoleStack: ServiceRoleStack;
  ecrRepoStack: EcrStack;
  lambdaStack: LambdaStack;
}

export interface CreateStacksResponse {
  stacks: Stacks;
}

export const createStacks = (app: App): CreateStacksResponse => {
  const stackPrefix = 'alpha-NA-us-west-2-DeliveryService';

  // Cost some unknown fucking money so i am commenting it out.
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

  return {
    stacks: {
      // vpcStack,
      ecrRepoStack,
      serviceRoleStack,
      lambdaStack,
    },
  };
};
