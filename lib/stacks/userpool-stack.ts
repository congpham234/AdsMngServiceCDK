import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { SERVICE_NAME } from '../config/constants';
import { UserPool, UserPoolClient } from 'aws-cdk-lib/aws-cognito';

export type UserPoolStackProps = StackProps;

export class UserPoolStack extends Stack {
  public readonly userPool: UserPool;
  public readonly userPoolClient: UserPoolClient;

  constructor(scope: Construct, id: string, props?: UserPoolStackProps) {
    super(scope, id, props);

    // Create the Cognito User Pool
    this.userPool = new UserPool(this, `${SERVICE_NAME}UserPool`, {
      userPoolName: `${SERVICE_NAME}-user-pool`,
    });

    // Create the Cognito User Pool Client
    this.userPoolClient = new UserPoolClient(this, `${SERVICE_NAME}UserPoolClient`, {
      userPool: this.userPool,
      authFlows: { userPassword: true, adminUserPassword: true },
      generateSecret: true,
      userPoolClientName: `${SERVICE_NAME}-user-pool-client`,
    });
  }
}
