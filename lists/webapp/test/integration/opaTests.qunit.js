/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require(["logaligroup/lists/test/integration/AllJourneys"
	], function () {
		QUnit.start();
	});
});
