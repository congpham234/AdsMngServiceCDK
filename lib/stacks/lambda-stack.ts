import { Duration, Stack, StackProps } from 'aws-cdk-lib';
import { IRepository } from 'aws-cdk-lib/aws-ecr';
import { IRole } from 'aws-cdk-lib/aws-iam';
import { Code, Function, Handler, IFunction, Runtime } from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';
import { SERVICE_NAME } from '../config/constants';


export interface LambdaStackProps extends StackProps {
  // vpc: IVpc;
  readonly serviceRole: IRole;
  readonly ecrRepo: IRepository;
}

export class LambdaStack extends Stack {
  public readonly lambdaFunction: IFunction;

  constructor(scope: Construct, id: string, props: LambdaStackProps) {
    super(scope, id, props);

    // Grant service role to pull the new code to lambda function
    props.ecrRepo.grantPull(props.serviceRole);

    // Define Lambda function using ECR image as code
    this.lambdaFunction = new Function(this, `${SERVICE_NAME}LambdaId`, {
      functionName: `${SERVICE_NAME}Lambda`,
      runtime: Runtime.FROM_IMAGE,
      handler: Handler.FROM_IMAGE,
      code: Code.fromEcrImage(props.ecrRepo, { tag: process.env.RUN_ID }),
      role: props.serviceRole,
      environment: {
        STAGE: 'alpha', // TODO: make this configurable
        NODE_OPTIONS: '--enable-source-maps',
      },
      memorySize: 3000,
      timeout: Duration.minutes(15),
      description: `${SERVICE_NAME} Lambda`,
      // vpc: props.vpc
    });
  }
}
