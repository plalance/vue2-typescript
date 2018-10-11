/**
 * Provide methods to deal with type elements
 */
export const TypeUtils = {

  /**
   * Check whether value is a number
   * @param n
   * @returns {boolean}
   */
  isNumber : function(obj : any) {
    return !isNaN(parseFloat(obj)) && isFinite(obj);
  },

  /**
   * Check whether value is a function
   * @param obj
   * @returns {boolean}
   */
  isFunction : function(obj) {
    return (typeof (obj) == 'function');
  },

  // ----------------------------------------------------------------------

  /**
   * Check whether obj is Empty depending of its type.
   * Results :
   *         []        true, empty array
   *         {}        true, empty object
   *         null      true
   *         undefined true
   *         ""        true, empty string
   *         ''        true, empty string
   *         0         false, number
   *         true      false, boolean
   *         false     false, boolean
   *         Date      false
   *         function  false
   * @param obj object
   */
  isEmpty : function(obj : any){
    if (obj === undefined)
      return true;

    if (typeof (obj) == 'function' || typeof (obj) == 'number' || typeof (obj) == 'boolean' || Object.prototype.toString.call(obj) === '[object Date]')
      return false;

    if (obj == null || obj.length === 0)
      return true;

    // empty object
    if (typeof (obj) == "object") {
      for (var f in obj)
        return false;

      return true;
    }

    return false;
  }
}
