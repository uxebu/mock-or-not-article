var summary = {

  // The only method used from the outside.
  forMethods: function(methods) {
    return {
      numTotal: methods.length,
      numImplemented: this.getNumberOfImplementedMethods(methods)
    };
  },

  getNumberOfImplementedMethods: function(methods) {
    var totals = 0;
    if (methods.length > 0) {
      totals = methods.map(this.isMethodImplemented.bind(this));
      totals = totals.reduce(function(prev, cur) {
        return 0 + prev + cur
      });
    }
    return 0 + totals;
  },

  isMethodImplemented: function(method) {
    var details = this.getMethodDetails(method);
    return details.exists && !details.isDummy;
  },

  getMethodDetails: function(method) {
    return {
      exists: typeof method == 'function',
      isDummy: ''+method == ''+this.dummyFunction
    };
  },

  dummyFunction: function(){
    console.warn('not implemented')
  }
};

module.exports.summary = summary;
