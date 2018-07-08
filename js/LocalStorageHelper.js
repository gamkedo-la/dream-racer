var localStorageHelper = new LocalStorageHelper();
let isLocalStorageInitialized = false;
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

function setupLocalStorage() {
    isLocalStorageInitialized = localStorageHelper.getFlag(localStorageKey.IsLocalStorageInitialized);
    if (!isLocalStorageInitialized) {
        isLocalStorageInitialized = true;
        musicVolume = DEFAULT_MUSIC_VOLUME;
        sfxVolume = DEFAULT_SFX_VOLUME;

        showedHelp = false;

        localStorageHelper.setFlag(localStorageKey.IsLocalStorageInitialized, isLocalStorageInitialized);
        localStorageHelper.setFlag(localStorageKey.ShowedHelp, showedHelp);
        localStorageHelper.setItem(localStorageKey.MusicVolume, musicVolume);
        localStorageHelper.setItem(localStorageKey.SFXVolume, sfxVolume);
    }
    else {
        showedHelp = localStorageHelper.getFlag(localStorageKey.ShowedHelp);
        musicVolume = parseFloat(localStorageHelper.getItem(localStorageKey.MusicVolume));
        sfxVolume = parseFloat(localStorageHelper.getItem(localStorageKey.SFXVolume));
    }
    MusicVolumeManager.updateVolume();
    SFXVolumeManager.updateVolume();
}