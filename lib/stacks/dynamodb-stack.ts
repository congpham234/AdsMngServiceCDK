import { Stack, StackProps } from 'aws-cdk-lib';
import { AttributeType, BillingMode, ITable, Table } from 'aws-cdk-lib/aws-dynamodb';
import { IRole } from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';
import { SERVICE_NAME } from '../config/constants';

export interface DynamodbStackProps extends StackProps {
  // VPC thingy to add here
  readonly serviceRole: IRole;
}

export class DynamodbStack extends Stack {
  public readonly travelPlansTable: ITable;
  // public readonly itinerariesTable: ITable;

  constructor(scope: Construct, id: string, props: DynamodbStackProps) {
    super(scope, id, props);

    // TravelPlans Table
    this.travelPlansTable = new Table(this, `${SERVICE_NAME}TravelPlans`, {
      tableName: 'TravelPlans',
      partitionKey: { name: 'userId', type: AttributeType.STRING },
      sortKey: { name: 'planId', type: AttributeType.STRING },
      billingMode: BillingMode.PAY_PER_REQUEST,
    });

    this.travelPlansTable.grantReadWriteData(props.serviceRole);
    this.exportValue(this.travelPlansTable.tableArn);

    // Itineraries Table
    // this.itinerariesTable = new Table(this, `${SERVICE_NAME}ItinerariesTable`, {
    //   tableName: 'Itineraries',
    //   partitionKey: { name: 'userId_planId', type: AttributeType.STRING },
    //   sortKey: { name: 'itineraryId', type: AttributeType.STRING },
    //   billingMode: BillingMode.PAY_PER_REQUEST,
    // });

    // this.itinerariesTable.grantReadWriteData(props.serviceRole);
    // this.exportValue(this.itinerariesTable.tableArn);
  }
}
