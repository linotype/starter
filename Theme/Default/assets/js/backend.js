import { Application } from "stimulus"
// import * as Turbo from "@hotwired/turbo"

import { library, dom } from "@fortawesome/fontawesome-svg-core";
import { faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons/faArrowAltCircleLeft";

library.add(faArrowAltCircleLeft);
dom.watch();

const application = Application.start()
const context = require.context("./../Field", true, /\.js$/)

function definitionsFromContext(context) {
    return context.keys()
        .map(function (key) { return definitionForModuleWithContextAndKey(context, key); })
        .filter(function (value) { return value; });
}

function definitionForModuleWithContextAndKey(context, key) {
    var identifier = identifierForContextKey(key);
    if (identifier) {
        return definitionForModuleAndIdentifier(context(key), identifier);
    }
}
function definitionForModuleAndIdentifier(module, identifier) {
    var controllerConstructor = module.default;
    if (typeof controllerConstructor == "function") {
        return { identifier: identifier, controllerConstructor: controllerConstructor };
    }
}
function identifierForContextKey(key) {
    var logicalName = key.replace(/^.*[\\\/]/, '').split('.')[0];
    if (logicalName) {
        return logicalName.replace(/_/g, "-").replace(/\//g, "--");
    }
}

application.load(definitionsFromContext(context))

// Turbo.start();