import { App } from 'aws-cdk-lib';
import { VpcStack } from '../stacks/vpc-stack';

export interface Stacks {
  vpcStack: VpcStack;
}

export interface CreateStacksResponse {
  stacks: Stacks;
}

export const createStacks = (app: App): CreateStacksResponse => {
  const stackPrefix = 'alpha-NA-us-west-2';

  const vpcStack = new VpcStack(app, `${stackPrefix}-DeliveryServiceVpcStack`, {});

  return {
    stacks: {
      vpcStack
    }
  }
}