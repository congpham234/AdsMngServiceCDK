import { Stack, StackProps } from 'aws-cdk-lib';
import { IRole } from 'aws-cdk-lib/aws-iam';
import { Secret } from 'aws-cdk-lib/aws-secretsmanager';
import { Construct } from 'constructs';

export interface SecretsManagerStackProps extends StackProps {
  readonly serviceRole: IRole;
}

export class SecretsManagerStack extends Stack {
  readonly bookingDotCom: Secret;
  readonly openAiApiKey: Secret;
  readonly googlePlacesApiKey: Secret;

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

    this.bookingDotCom.grantRead(props.serviceRole);
    this.openAiApiKey.grantRead(props.serviceRole);
    this.googlePlacesApiKey.grantRead(props.serviceRole);
  }
}
