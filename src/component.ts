import {
  Component,
  config,
  ContextTags,
  injectable,
  ProviderMap,
} from '@loopback/core';
import {CloudFrontBindings} from './keys';
import {CloudFrontProvider, CloudFrontSignerProvider} from './providers';

export interface CloudFrontComponentOptions {
  enableCloudFront?: boolean;
  enableCloudFrontSigner?: boolean;
}

export const DEFAULT_CLOUD_FRONT_OPTIONS: CloudFrontComponentOptions = {
  enableCloudFront: true,
  enableCloudFrontSigner: false,
};

@injectable({tags: {[ContextTags.KEY]: CloudFrontBindings.COMPONENT}})
export class CloudFrontComponent implements Component {
  providers: ProviderMap = {};

  constructor(
    @config()
    cloudfrontConfig: CloudFrontComponentOptions = DEFAULT_CLOUD_FRONT_OPTIONS,
  ) {
    if (cloudfrontConfig.enableCloudFront) {
      this.providers[CloudFrontBindings.CLOUD_FRONT.key] = CloudFrontProvider;
    }

    if (cloudfrontConfig.enableCloudFrontSigner) {
      this.providers[CloudFrontBindings.SIGNER.key] = CloudFrontSignerProvider;
    }
  }
}
