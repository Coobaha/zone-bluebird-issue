require('zone.js/dist/zone-node');
require('zone.js/dist/zone-bluebird');
const Bluebird = require('bluebird');
const knex = require('knex');


async function errorIsUndefinedWithPatchedBluebird(prefix) {
  console.log(prefix, 'start')
  try {
    const db = await knex({
      client: 'pg',

    });
    await db('nomination')
      .insert({someData: true})
      .returning('id');
  } catch (e) {
    console.log(prefix, 'did error')
    console.log(e);
  }
  console.log(prefix, 'done')
}


async function test() {
  await errorIsUndefinedWithPatchedBluebird('NOT PATCHED');
  Zone[Zone.__symbol__('bluebird')](Bluebird);
  await errorIsUndefinedWithPatchedBluebird('PATCHED');
}

test();