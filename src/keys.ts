import {BindingKey, CoreBindings} from '@loopback/core';
import {CloudFrontComponent} from './component';

export interface CloudFrontSignerConfig {
  keyPairId: string;
  privateKey: string;
}

/**
 * Binding keys used by this component.
 */
export namespace CloudFrontBindings {
  export const COMPONENT = BindingKey.create<CloudFrontComponent>(
    `${CoreBindings.COMPONENTS}.CloudFrontComponent`,
  );
  export const CLOUD_FRONT = BindingKey.create<AWS.CloudFront>(
    'aws.cloudFront',
  );
  export const SIGNER = BindingKey.create<AWS.CloudFront.Signer>(
    'aws.cloudFront.signer',
  );
  export const CLOUD_FRONT_CONFIG = BindingKey.create<AWS.CloudFront.Types.ClientConfiguration>(
    'aws.cloudFront.config',
  );
  export const SIGNER_CONFIG = BindingKey.create<CloudFrontSignerConfig>(
    'aws.cloudFront.signer.config',
  );
}
