/**
 * @class
 */
ve.ce.IsekaiGridEvents = function VeCeIsekaiGridEvents() {
    this.surface = null;
};

OO.initClass(ve.ce.IsekaiGridEvents);

OO.mixinClass(ve.ce.View, OO.EventEmitter);

ve.ce.IsekaiGridEvents.static.currentRow = null;
ve.ce.IsekaiGridEvents.static.rowNodes = [];

ve.ce.IsekaiGridEvents.prototype.onSetup = function (surface, rowNode) {
    ve.ce.IsekaiGridEvents.static.rowNodes.push([rowNode, rowNode.getModel()]);

    if (this.surface !== null) { // Already setup
        return;
    }

    this.surface = surface;

    this.surface.getModel().connect(this, { select: 'onSurfaceModelSelect' });
};

ve.ce.IsekaiGridEvents.prototype.onTearDown = function (rowNode) {
    ve.ce.IsekaiGridEvents.static.rowNodes = ve.ce.IsekaiGridEvents.static.rowNodes.filter(function (row) {
        return row[0] !== rowNode;
    });

    if (ve.ce.IsekaiGridEvents.static.currentRow === rowNode) {
        ve.ce.IsekaiGridEvents.static.currentRow = null;
    }

    if (ve.ce.IsekaiGridEvents.static.rowNodes.length === 0 && this.surface) {
        this.surface.getModel().disconnect(this);
        this.surface = null;
    }
};

ve.ce.IsekaiGridEvents.prototype.findRowModelNode = function (node) {
    var maxDepth = 6;
    var currentNode = node;
    for (var i = 0; i < maxDepth; i ++) {
        if (!currentNode) {
            return null;
        }

        if (currentNode.type === 'col') {
            currentNode = currentNode.parent;
        }
        if (currentNode.type === 'row') {
            return currentNode;
        }
        if (currentNode.type === 'document' || currentNode === null) {
            return null;
        }
        currentNode = currentNode.parent;
    }
    return null;
};

ve.ce.IsekaiGridEvents.prototype.onSurfaceModelSelect = function (selection) { // Check if the selection is in a row
    var fragment = this.surface.getModel().getFragment(selection);
    window._fragment = fragment;

    var siblingNodes = fragment.getSiblingNodes();
    if (siblingNodes.length === 0) return;

    var selectedNode = siblingNodes[0].node;
    var rowModelNode = this.findRowModelNode(selectedNode);

    var rowNode = ve.ce.IsekaiGridEvents.static.rowNodes.find(function (row) {
        return row[1] === rowModelNode;
    });

    if (!rowNode) { // Not in a row
        if (ve.ce.IsekaiGridEvents.static.currentRow) {
            ve.ce.IsekaiGridEvents.static.currentRow.setFocusedIn(false);
            ve.ce.IsekaiGridEvents.static.currentRow = null;
        }
        return;
    } else {
        rowNode = rowNode[0];
    }

    if (ve.ce.IsekaiGridEvents.static.currentRow === rowNode) { // Already focused
        return;
    } else if (ve.ce.IsekaiGridEvents.static.currentRow) { // Another row is focused
        ve.ce.IsekaiGridEvents.static.currentRow.setFocusedIn(false);
    }

    rowNode.setFocusedIn(true);
    ve.ce.IsekaiGridEvents.static.currentRow = rowNode;
};

ve.ce.IsekaiGridEvents.static.instance = new ve.ce.IsekaiGridEvents();