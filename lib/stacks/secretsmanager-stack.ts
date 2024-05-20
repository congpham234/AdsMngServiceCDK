import { Stack, StackProps } from 'aws-cdk-lib';
import { IRole } from 'aws-cdk-lib/aws-iam';
import { Secret } from 'aws-cdk-lib/aws-secretsmanager';
import { Construct } from 'constructs';
import { SERVICE_NAME } from '../config/constants';

export interface SecretsManagerStackProps extends StackProps {
  readonly serviceRole: IRole;
}

export class SecretsManagerStack extends Stack {
  readonly secrets: Secret;

  constructor(scope: Construct, id: string, props: SecretsManagerStackProps) {
    super(scope, id, props);

    this.secrets = new Secret(this, `${SERVICE_NAME}ExternalAPIKeyId`, {
      secretName: `${SERVICE_NAME}ExternalAPIKeyId`,
      description: 'This is a secret for all external api keys.',
    });

    this.secrets.grantRead(props.serviceRole);
  }
}
