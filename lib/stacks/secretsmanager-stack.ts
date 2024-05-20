import { Stack, StackProps } from 'aws-cdk-lib';
import { IRole } from 'aws-cdk-lib/aws-iam';
import { Secret } from 'aws-cdk-lib/aws-secretsmanager';
import { Construct } from 'constructs';
import { SERVICE_NAME } from '../config/constants';

export interface SecretsManagerStackProps extends StackProps {
  readonly serviceRole: IRole;
}

export class SecretsManagerStack extends Stack {
  readonly bookingDotCom: Secret;
  readonly openAiApiKey: Secret;
  readonly googlePlacesApiKey: Secret;
  readonly secrets: Secret;

  constructor(scope: Construct, id: string, props: SecretsManagerStackProps) {
    super(scope, id, props);

    this.bookingDotCom = new Secret(this, 'BookingDotComAPIKeyId', {
      secretName: 'BookingDotComAPIKey',
      description: 'This is a secret for booking dot com Rapid API.',
    });

    this.openAiApiKey = new Secret(this, 'OpenAiAPIKeyId', {
      secretName: 'OpenAiAPIKeyId',
      description: 'This is a secret for OpenAi API key.',
    });

    this.googlePlacesApiKey = new Secret(this, 'GooglePlacesAPIKeyId', {
      secretName: 'GooglePlacesAPIKey',
      description: 'This is a secret for Google Places API key.',
    });

    this.secrets = new Secret(this, `${SERVICE_NAME}ExternalAPIKeyId`, {
      secretName: `${SERVICE_NAME}ExternalAPIKeyId`,
      description: 'This is a secret for all external api keys.',
    });

    this.secrets.grantRead(props.serviceRole);

    this.exportValue(this.bookingDotCom.secretArn);
    this.exportValue(this.openAiApiKey.secretArn);
    this.exportValue(this.googlePlacesApiKey.secretArn);
    this.exportValue(this.secrets.secretArn);
  }
}
