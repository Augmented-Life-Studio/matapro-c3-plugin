const SDK = self.SDK;

////////////////////////////////////////////
// The plugin ID is how Construct identifies different kinds of plugins.
// *** NEVER CHANGE THE PLUGIN ID! ***
// If you change the plugin ID after releasing the plugin, Construct will think it is an entirely different
// plugin and assume it is incompatible with the old one, and YOU WILL BREAK ALL EXISTING PROJECTS USING THE PLUGIN.
// Only the plugin name is displayed in the editor, so to rename your plugin change the name but NOT the ID.
// If you want to completely replace a plugin, make it deprecated (it will be hidden but old projects keep working),
// and create an entirely new plugin with a different plugin ID.
const PLUGIN_ID = "MetaproPlugin";
////////////////////////////////////////////

const PLUGIN_VERSION = "3.11.0.0";
const PLUGIN_CATEGORY = "platform-specific";

const PLUGIN_CLASS = (SDK.Plugins.MetaproPlugin = class MyCustomPlugin extends (
  SDK.IPluginBase
) {
  constructor() {
    super(PLUGIN_ID);

    SDK.Lang.PushContext("plugins." + PLUGIN_ID.toLowerCase());

    this._info.SetName(self.lang(".name"));
    this._info.SetDescription(self.lang(".description"));
    this._info.SetVersion(PLUGIN_VERSION);
    this._info.SetCategory(PLUGIN_CATEGORY);
    this._info.SetAuthor("metapro");
    this._info.SetHelpUrl(self.lang(".help-url"));
    this._info.SetIsSingleGlobal(true);

    // File dependencies. Make sure these match with addon.json file-list
    this._info.AddFileDependency({
      filename: "icon.svg",
      type: "copy-to-output",
      fileType: "image/svg",
    });

    // Load domSide.js in the document context (main thread).
    // This is important for supporting the runtime's web worker mode.
    this._info.SetDOMSideScripts(["c3runtime/domSide.js"]);

    SDK.Lang.PushContext(".properties");

    this._info.SetProperties([
      new SDK.PluginProperty("text", "project-id", ""),
      new SDK.PluginProperty("text", "leaderboard-id", ""),
      new SDK.PluginProperty("text", "leaderboard-api-key", ""),
      new SDK.PluginProperty("text", "users-service-api-url", ""),
      new SDK.PluginProperty("text", "leaderboard-api-url", ""),
      new SDK.PluginProperty("text", "referral-api-url", ""),
      new SDK.PluginProperty("text", "nft-api-url", ""),
      new SDK.PluginProperty("text", "platform-id", ""),
    ]);

    SDK.Lang.PopContext(); // .properties

    SDK.Lang.PopContext();
  }
});

PLUGIN_CLASS.Register(PLUGIN_ID, PLUGIN_CLASS);
