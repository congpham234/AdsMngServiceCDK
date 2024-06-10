import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { SERVICE_NAME } from '../config/constants';
import { UserPool, UserPoolClient, OAuthScope, UserPoolIdentityProviderGoogle, ProviderAttribute, UserPoolClientIdentityProvider } from 'aws-cdk-lib/aws-cognito';
import { ISecret } from 'aws-cdk-lib/aws-secretsmanager';

export interface UserPoolStackProps extends StackProps {
  readonly googleClientId: ISecret;
  readonly googleClientSecret: ISecret;
}

export class UserPoolStack extends Stack {
  public readonly userPool: UserPool;
  public readonly userPoolClient: UserPoolClient;

  constructor(scope: Construct, id: string, props: UserPoolStackProps) {
    super(scope, id, props);

    // Create the Cognito User Pool
    this.userPool = new UserPool(this, `${SERVICE_NAME}UserPool`, {
      userPoolName: `${SERVICE_NAME}-user-pool`,
    });

    // Add Google as an Identity Provider
    const googleProvider = new UserPoolIdentityProviderGoogle(this, 'Google', {
      clientId: props.googleClientId.secretValue.unsafeUnwrap(),
      clientSecret: props.googleClientSecret.secretValue.unsafeUnwrap(),
      userPool: this.userPool,
      attributeMapping: {
        email: ProviderAttribute.GOOGLE_EMAIL,
        givenName: ProviderAttribute.GOOGLE_GIVEN_NAME,
        familyName: ProviderAttribute.GOOGLE_FAMILY_NAME,
      },
    });

    // Create the Cognito User Pool Client
    this.userPoolClient = new UserPoolClient(this, `${SERVICE_NAME}UserPoolClient`, {
      userPool: this.userPool,
      authFlows: { userPassword: true, adminUserPassword: true },
      generateSecret: true,
      userPoolClientName: `${SERVICE_NAME}-user-pool-client`,
      // Enable OAuth settings for social sign-in
      oAuth: {
        callbackUrls: ['https://d2v9cv67ztousb.cloudfront.net'],
        logoutUrls: ['https://d2v9cv67ztousb.cloudfront.net'],
        flows: {
          authorizationCodeGrant: true,
        },
        scopes: [OAuthScope.OPENID, OAuthScope.EMAIL, OAuthScope.PROFILE],
      },
      supportedIdentityProviders: [UserPoolClientIdentityProvider.GOOGLE],
    });

    this.userPoolClient.node.addDependency(googleProvider);
  }
}
