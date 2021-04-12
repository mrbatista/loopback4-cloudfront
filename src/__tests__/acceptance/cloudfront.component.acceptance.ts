import {Application} from '@loopback/core';
import {expect} from '@loopback/testlab';
import {CloudfrontComponent} from '../../component';
import {CloudfrontBindings} from '../../keys';

describe('CloudfrontComponent', () => {
  let app: Application;

  describe('Default configuration', () => {
    before(givenAppWithDefaultConfig);

    it('does not bind a cloudfront provider', async () => {
      expect(app.isBound(CloudfrontBindings.PROVIDER)).to.be.true();
      const cloudfront = await app.get(CloudfrontBindings.PROVIDER);
      expect(cloudfront).to.be.ok();
      expect(cloudfront.createDistribution).to.be.Function();
    });

    it('binds a cloudfront signer', async () => {
      expect(app.isBound(CloudfrontBindings.SIGNER_PROVIDER)).to.be.false();
    });

    async function givenAppWithDefaultConfig() {
      app = givenApplication();
      app.component(CloudfrontComponent);
    }
  });

  describe('Custom configuration', () => {
    before(givenAppWithCustomConfig);

    it('does not bind a cloudfront provider', async () => {
      expect(app.isBound(CloudfrontBindings.PROVIDER)).to.be.false();
    });

    it('binds a cloudfront signer', async () => {
      app.configure(CloudfrontBindings.SIGNER_CONFIG).to({
        keyPairId: 'fake_keyPairId',
        privateKey: 'fake_privateKey',
      });

      expect(app.isBound(CloudfrontBindings.SIGNER_PROVIDER)).to.be.true();

      const cloudfrontSigner = await app.get(
        CloudfrontBindings.SIGNER_PROVIDER,
      );
      expect(cloudfrontSigner).to.be.ok();
      expect(cloudfrontSigner.getSignedUrl).to.be.Function();
    });

    async function givenAppWithCustomConfig() {
      app = givenApplication();
      app.configure(CloudfrontBindings.COMPONENT).to({
        enableCloudfront: false,
        enableCloudfrontSigner: true,
      });
      app.component(CloudfrontComponent);
    }
  });

  function givenApplication() {
    return new Application();
  }
});
