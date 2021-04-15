import {config, Getter, Provider} from '@loopback/core';
import {CloudFront} from 'aws-sdk';
import {CloudFrontBindings} from '../keys';

export class CloudFrontProvider implements Provider<CloudFront> {
  constructor(
    @config.getter({fromBinding: CloudFrontBindings.CLOUD_FRONT_CONFIG})
    private getCloudfrontConfig: Getter<
      CloudFront.Types.ClientConfiguration | undefined
    >,
  ) {}

  async value() {
    const options = await this.getCloudfrontConfig();

    return new CloudFront(options);
  }
}
