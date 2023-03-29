import { expect } from 'chai';
import { merge, set } from './helpers';

describe('set function', () => {
  const keypath = 'test';
  const value = 'some value';
  let obj: Record<string, unknown>;

  beforeEach(() => {
    obj = {};
  });

  it('should set a value by keypath to the object', () => {
    set(obj, keypath, value);

    expect(obj).to.haveOwnProperty(keypath, value);
  });

  it('should return original object', () => {
    const result = set(obj, keypath, value);

    obj.test2 = 'another value';

    expect(result).to.equal(obj);
  });

  it("should return original object if it's is not an object", () => {
    const notAnObject = 'string';

    const result = set(notAnObject, keypath, value);

    expect(result).to.eq(notAnObject);
  });

  it('should throw an error if path is not a string', () => {
    const keypathNotAString = 10;

    // @ts-ignore because we want to check behaviour in runtime
    const f = () => set(obj, keypathNotAString, value);

    expect(f).to.throw(Error);
  });
});

describe('merge function', () => {
  let objLeft: Record<string, unknown>;

  beforeEach(() => {
    objLeft = { a: 'a' };
  });

  it('should merge objects', () => {
    let objRight: Record<string, unknown>;
    objRight = { b: 'b' };

    merge(objLeft, objRight);

    expect(objLeft).to.haveOwnProperty('a', 'a');
    expect(objLeft).to.haveOwnProperty('b', 'b');
  });

  it('should contain property once', () => {
    let objRight: Record<string, unknown>;
    objRight = { a: 'a' };

    merge(objLeft, objRight);

    const entries = Object.entries(objLeft);

    expect(objLeft).to.haveOwnProperty('a', 'a');
    expect(entries.length).to.eq(1);
  });
});
