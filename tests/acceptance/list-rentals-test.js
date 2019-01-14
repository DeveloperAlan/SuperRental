import { module, test } from 'qunit';
import {
    click,
    visit,
    currentURL,
    fillIn,
    keyEvent
} from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | list rentals', function (hooks) {
  setupApplicationTest(hooks);

  test('should show rentals as the home page', async function (assert) {
    await visit('/');
    assert.equal(currentURL(), '/rentals', 'should redirect automatically');
  });

  test('should link to information about the company', async function(assert) {
    await visit('/');
    await click('.menu-about');
    assert.equal(currentURL(), '/about', 'should navigate to about');
  })

  test('should link to contact information', async function(assert) {
    await visit('/');
    await click('.menu-contact');
    assert.equal(currentURL(), '/contact', 'should navigate to contact');
  })

  test('should list available rentals.', async function(assert){
    await visit('/');
    assert.equal(this.element.querySelectorAll('.listing').length, 3, 'should display 3 listings');
  })

  test('should filter the list of rentals by city.', function (assert) {
      visit('/');
      fillIn('.list-filter input', 'Seattle');
      keyEvent('.list-filter input', 'keyup', 69);
      andThen(function() {
        assert.equal(find('.listing').length, 1, 'should show 1 listing');
        assert.equal(find('.listing .location:contains("Seattle")').length, 1, 'should contain 1 listing with location Seattle');
      });
    });
});
