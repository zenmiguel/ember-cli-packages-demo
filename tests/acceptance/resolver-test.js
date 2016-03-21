import { test } from 'qunit';
import moduleForAcceptance from 'ember-cli-packages-demo/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | resolver');

test('Can resolve routes from the boot app and pakcages', function(assert) {
  assert.ok(this.application.__container__.lookup('route:application') instanceof
    require('ember-cli-packages-demo/routes/application').default);

  // This will be async once we add lazy loading, so we need to visit another route first
  // visit('package1')
  // andThen(function() {
    assert.ok(this.application.__container__.lookup('route:package1') instanceof
        require('package1/routes/package1').default);
    assert.ok(this.application.__container__.lookup('route:package2') instanceof
      require('package2/routes/package2').default);
  // });
});
