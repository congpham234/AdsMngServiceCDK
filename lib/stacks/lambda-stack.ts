import { Stack, StackProps } from "aws-cdk-lib";
import { Repository } from "aws-cdk-lib/aws-ecr";
import { Role, ServicePrincipal } from "aws-cdk-lib/aws-iam";
import { Code, Function, Runtime } from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";


interface LambdaStackProps extends StackProps {
  githubRepoOwner: string;
  githubRepoName: string;
  githubBranch: string;
}

export class LambdaStack extends Stack {
  constructor(scope: Construct, id: string, props: LambdaStackProps) {
    super(scope, id, props);

    // Create ECR repository
    const ecrRepository = new Repository(this, 'DeliveryServiceEcrRepoId', {
      repositoryName: 'DeliveryServiceEcrRepo',
    });

    // Grant Lambda permissions to pull images from ECR
    const lambdaRole = new Role(this, 'DeliveryServiceLambdaRoleId', {
      assumedBy: new ServicePrincipal('lambda.amazonaws.com'),
    });
    ecrRepository.grantPull(lambdaRole);

    // Define Lambda function using ECR image as code
    const lambdaFunction = new Function(this, 'DeliveryServiceLambdaId', {
      runtime: Runtime.NODEJS_16_X,
      handler: 'index.handler',
      code: Code.fromEcrImage(ecrRepository, { tag: 'latest' }),
      role: lambdaRole,
    });
  }
}