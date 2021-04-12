import {Binding, config, Getter, inject, Provider} from '@loopback/core';
import * as AWS from 'aws-sdk';
import {CloudfrontBindings, CloudfrontSignerConfig} from '../keys';

export class CloudfrontSignerProvider
  implements Provider<AWS.CloudFront.Signer> {
  constructor(
    @config.getter({fromBinding: CloudfrontBindings.SIGNER_CONFIG})
    private getCloudfrontSignerConfig: Getter<CloudfrontSignerConfig>,
  ) {}

  @inject.binding()
  private binding: Binding<unknown>;

  async value() {
    const options = await this.getCloudfrontSignerConfig();

    if (options == null) {
      throw new Error(
        `Cloudfornt signer is not configured. Please configure ${this.binding.key}.`,
      );
    }

    const {keyPairId, privateKey} = options;

    return new AWS.CloudFront.Signer(keyPairId, privateKey);
  }
}
