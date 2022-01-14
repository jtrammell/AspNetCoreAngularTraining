import { DecorateBooleanPipe } from './pipes';

describe('DecorateBooleanPipe', () => {
  it('create an instance', () => {
    const pipe = new DecorateBooleanPipe();
    expect(pipe).toBeTruthy();
  });
});
