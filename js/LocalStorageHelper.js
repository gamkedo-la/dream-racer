var localStorageHelper = new LocalStorageHelper();

function LocalStorageHelper() {
  
  // Safe wrappers for localStorage methods

  this.getItem = function (keyName) {
    try {
      var storedValue = window.localStorage.getItem(keyName);
      return storedValue;
    }
    catch(e) {
      return null;
    }
  };

  this.setItem = function(keyName, keyValue) {
    try {
      window.localStorage.setItem(keyName, keyValue);
    }
    catch(e) {
    }
  };

  this.getFlag = function (keyName) {
      try {
          var storedValue = window.localStorage.getItem(keyName);
          return storedValue === "true";
      }
      catch(e) {
          return false;
      }
  };
  this.setFlag = this.setItem;
}
