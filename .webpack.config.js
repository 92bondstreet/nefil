const isElectron = require('is-electron');

// define child rescript
module.exports = config => {
  /*
   * Compile for Electron for renderer process, providing a target
   * using JsonpTemplatePlugin , FunctionModulePlugin
   * for browser environments and NodeTargetPlugin
   * and ExternalsPlugin for CommonJS and Electron
   * built-in modules.
   * @see https://webpack.js.org/configuration/target/
   */

  if (process.env.BROWSER || process.env.ELECTRON_PACK) {
    config.target = 'electron-renderer';
  }

  return config;
};
