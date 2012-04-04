var summary = require('../src/summary.js').summary;

describe('forMethods (all mocked)', function() {

  beforeEach(function() {
    spyOn(summary, 'getNumberOfImplementedMethods');
  });

  it('should call `summary.getNumberOfImplementedMethods` properly', function() {
    var funcs = [function() {}];
    summary.forMethods(funcs);
    expect(summary.getNumberOfImplementedMethods).toHaveBeenCalledWith(funcs);
  });

  it('should have return value of `summary.getNumberOfImplementedMethods` in `numImplemnted`', function() {
    summary.getNumberOfImplementedMethods.andReturn('myValue');
    var methodsSummary = summary.forMethods([]);
    expect(methodsSummary.numImplemented).toBe('myValue');
  });

  it('should set `numTotal` to 0 for no methods', function() {
    var methodsSummary = summary.forMethods([]);
    expect(methodsSummary.numTotal).toBe(0);
  });

  it('should set `numTotal` to 3 for 3 methods', function() {
    // The values don't matter, since we mock all underlying functions
    // that's why we can also pass in integers, we just test the amount here.
    var methodsSummary = summary.forMethods([1,2,3]);
    expect(methodsSummary.numTotal).toBe(3);
  });

});

describe('forMethods (no mocking)', function() {

  it('should return {numTotal:1, numImplemented:1}', function() {
    var actual = summary.forMethods([function(){}]);
    var expected = {numTotal: 1, numImplemented:1};
    expect(actual).toEqual(expected);
  });

  it('should return {numTotal:0, numImplemented:0}', function() {
    var actual = summary.forMethods([]);
    var expected = {numTotal: 0, numImplemented:0};
    expect(actual).toEqual(expected);
  });

  it('should return {numTotal:1, numImplemented:0} for a dummy function', function() {
    var actual = summary.forMethods([summary.dummyFunction]);
    var expected = {numTotal: 1, numImplemented:0};
    expect(actual).toEqual(expected);
  });

});

describe('getNumberOfImplementedMethods', function() {

  it('should return 2', function() {
    var actual = summary.getNumberOfImplementedMethods([function() {}, function() {}]);
    expect(actual).toBe(2);
  });

  it('should return 1', function() {
    var actual = summary.getNumberOfImplementedMethods([function() {}]);
    expect(actual).toBe(1);
  });

  it('should return 2', function() {
    var actual = summary.getNumberOfImplementedMethods([function() {}, function() {}]);
    expect(actual).toBe(2);
  });

  it('should return 0', function() {
    var actual = summary.getNumberOfImplementedMethods([]);
    expect(actual).toBe(0);
  });

  it('should return 0 for dummyFunctions only', function() {
    var actual = summary.getNumberOfImplementedMethods([summary.dummyFunction, summary.dummyFunction]);
    expect(actual).toBe(0);
  });

});


describe('getMethodDetails', function() {

  it('should return `isDummy=false`', function() {
    var actual = summary.getMethodDetails(function(){});
    expect(actual.isDummy).toBe(false);
  });

  it('should return `isDummy=true`', function() {
    var actual = summary.getMethodDetails(summary.dummyFunction);
    expect(actual.isDummy).toBe(true);
  });

});
