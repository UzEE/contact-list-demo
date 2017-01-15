import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('data-of-birth-picker', 'Integration | Component | data of birth picker', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{data-of-birth-picker}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#data-of-birth-picker}}
      template block text
    {{/data-of-birth-picker}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
