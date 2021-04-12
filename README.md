# loopback4-cloudfront

## Installation

Install CloudfrontComponent using `npm`;

```sh
$ npm install loopback4-cloudfront
```

## Basic Use

Configure and load CloudfrontComponent in the application constructor
as shown below.

```ts
import {CloudfrontComponent, CloudfrontComponentOptions, DEFAULT_CLOUDFRONT_OPTIONS} from 'loopback4-cloudfront';
// ...
export class MyApplication extends BootMixin(ServiceMixin(RepositoryMixin(RestApplication))) {
  constructor(options: ApplicationConfig = {}) {
    const opts: CloudfrontComponentOptions = DEFAULT_CLOUDFRONT_OPTIONS;
    this.configure(CloudfrontBindings.COMPONENT).to(opts);

    // To configure Cloudfront Signer
    this.configure(CloudfrontBindings.SIGNER_CONFIG).to({
        keyPairId: 'your_keyPairId',
        privateKey: 'your_privateKey',
      });
    });

    this.component(CloudfrontComponent);
    // ...
  }
  // ...
}
```
