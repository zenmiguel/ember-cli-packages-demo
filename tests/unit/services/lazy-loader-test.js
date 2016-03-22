/* global require */
import { moduleFor, test } from 'ember-qunit';

moduleFor('service:lazy-loader', 'Unit | Service | lazy loader');

test('loads external packages and evaluates the loaded code for external packages', function(assert) {
  let service = this.subject();
  assert.notOk(service.isPackageLoaded('package2'));
  // Normally this would be a separate test, but we don't have an easy way to "unload" code in the browser
  assert.notOk(
    require._eak_seen['package2/routes/package2']);

  service.withPackage('package2').then(()=> {
    assert.ok(service.isPackageLoaded('package2'));
    assert.ok(require._eak_seen['package2/routes/package2']);
  });
});
