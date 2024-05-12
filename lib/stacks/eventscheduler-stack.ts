/* eslint-disable */
import { aws_events_targets, Duration, Stack, StackProps } from 'aws-cdk-lib';
import { Rule, Schedule } from 'aws-cdk-lib/aws-events';
import { IFunction } from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';

export interface EventSchedulerStackProps extends StackProps {
  readonly lambdaFunction: IFunction;
}

export class EventSchedulerStack extends Stack {
  constructor(scope: Construct, id: string, props: EventSchedulerStackProps) {
    super(scope, id, props);
    // Schedule the Lambda function to be triggered every minute
    const rule = new Rule(this, 'PingLambdaEvery1Minute', {
      schedule: Schedule.rate(Duration.minutes(1)),
    });

    rule.addTarget(new aws_events_targets.LambdaFunction(props.lambdaFunction));
  }
}
