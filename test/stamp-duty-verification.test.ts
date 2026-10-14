import { describe, it } from 'node:test';
import assert from 'node:assert';
import { STAMP_DUTY_DATA, hasTodoVerify } from '../src/lib/calculators/stamp-duty-data';

describe('Stamp Duty Official Data Verification Guard (Brief Section 7)', () => {
  it('fails if any TODO_VERIFY remains in stamp-duty-data.ts', () => {
    const containsPlaceholders = hasTodoVerify(STAMP_DUTY_DATA);
    assert.strictEqual(
      containsPlaceholders,
      false,
      'RATE DATA UNVERIFIED: TODO_VERIFY placeholders remain in lib/calculators/stamp-duty-data.ts. ' +
      'Replace all TODO_VERIFY markers with official revenue office figures to allow this test to pass.'
    );
  });
});
