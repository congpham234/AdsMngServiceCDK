import { App } from 'aws-cdk-lib';
import { createStacks } from './support/stack-creator';
import { Stage } from './config/types';

const app = new App();

// Retrieve the 'stage' environment variable
const stage = process.env.STAGE;
if (!stage) {
  throw new Error('The \'STAGE\' environment variable must be defined.');
}

// Retrieve the 'region' environment variable
const region = process.env.AWS_DEFAULT_REGION;
if (!region) {
  throw new Error('The \'AWS_DEFAULT_REGION\' environment variable must be defined.');
}

// Ensure proper formatting for the stage
const formattedStage = stage.toLowerCase() as Stage;

createStacks(app, formattedStage, region);

app.synth();
