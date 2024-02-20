import { Stack, StackProps } from 'aws-cdk-lib';
import { IRole, ManagedPolicy, Role, ServicePrincipal } from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';


export type ServiceRoleStackProps = StackProps

export class ServiceRoleStack extends Stack {
  public readonly serviceRole: IRole;

  constructor(scope: Construct, id: string, props: ServiceRoleStackProps) {
    super(scope, id, props);

    this.serviceRole = new Role(this, 'DeliveryServiceRoleId', {
      roleName: 'DeliveryServiceRoleName',
      assumedBy: new ServicePrincipal('lambda.amazonaws.com'),
      managedPolicies: [
        ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaVPCAccessExecutionRole'),
        ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole'),
      ],
    });
    // this.exportValue(this.serviceRole.roleArn);
  }
}
