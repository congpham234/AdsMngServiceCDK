import { Duration, Stack, StackProps } from 'aws-cdk-lib';
import { IRepository } from 'aws-cdk-lib/aws-ecr';
import { IRole } from 'aws-cdk-lib/aws-iam';
import { Code, Function, Handler, IFunction, Runtime } from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';


export interface LambdaStackProps extends StackProps {
  // vpc: IVpc;
  readonly serviceRole: IRole;
  readonly ecrRepo: IRepository;
}

export class LambdaStack extends Stack {
  public readonly lambdaFunction: IFunction;

  constructor(scope: Construct, id: string, props: LambdaStackProps) {
    super(scope, id, props);

    // Define Lambda function using ECR image as code
    this.lambdaFunction = new Function(this, 'AdsMngServiceLambdaId', {
      functionName: 'AdsMngServiceLambda',
      runtime: Runtime.FROM_IMAGE,
      handler: Handler.FROM_IMAGE,
      code: Code.fromEcrImage(props.ecrRepo, { tag: process.env.RUN_ID }),
      role: props.serviceRole,
      environment: {
        Stage: 'alpha', // TODO: make this configurable
      },
      memorySize: 3000,
      timeout: Duration.minutes(15),
      description: 'Ads Management Service Lambda',
      // vpc: props.vpc
    });
  }
}
