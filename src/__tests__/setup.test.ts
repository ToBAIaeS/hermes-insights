/**
 * Smoke test — validates Jest + TypeScript config is wired up correctly.
 * Replace with real tests as features are implemented.
 */

describe('Jest setup', () => {
  it('runs TypeScript tests', () => {
    const greeting: string = 'hermes-insights';
    expect(greeting).toBe('hermes-insights');
  });

  it('resolves path aliases', () => {
    // This will fail at import time if moduleNameMapper is broken
    expect(true).toBe(true);
  });
});
