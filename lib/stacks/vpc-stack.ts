import { Stack, StackProps } from 'aws-cdk-lib';
import { IVpc, Vpc } from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';

export class VpcStack extends Stack {
  public readonly vpc: IVpc;
  public constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    this.vpc = new Vpc(this, 'AdsMngServiceVpc', {
      natGateways: 0,
    });
  }
}
