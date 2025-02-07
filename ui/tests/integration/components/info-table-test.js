import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

const TITLE = 'My Table';
const HEADER = 'Cool Header';
const ITEMS = ['https://127.0.0.1:8201', 'hello', 3];

module('Integration | Component | InfoTable', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.set('title', TITLE);
    this.set('header', HEADER);
    this.set('items', ITEMS);
  });

  test('it renders', async function (assert) {
    await render(hbs`<InfoTable
        @title={{title}}
        @header={{header}}
        @items={{items}}
      />`);

    assert.dom('[data-test-info-table]').exists();
    assert.dom('[data-test-info-table] th').includesText(HEADER, `shows the table header`);

    const rows = document.querySelectorAll('.info-table-row');
    assert.equal(rows.length, ITEMS.length, 'renders an InfoTableRow for each item');

    rows.forEach((row, i) => {
      assert.equal(row.innerText, ITEMS[i], 'handles strings and numbers as row values');
    });
  });
});
