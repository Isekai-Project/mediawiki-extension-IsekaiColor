/**
 * ContentEditable color annotation.
 *
 * @class
 * @extends ve.ce.TextStyleAnnotation
 * @constructor
 * @param {ve.dm.IsekaiGridColNode} model Model to observe
 * @param {ve.ce.ContentBranchNode} [parentNode] Node rendering this annotation
 * @param {Object} [config] Configuration options
 */
ve.ce.IsekaiGridColNode = function VeCeIsekaiGridColNode() {
    // Parent constructor
    ve.ce.IsekaiGridColNode.super.apply(this, arguments);

    // Mixin constructors
    ve.ce.ContentEditableNode.call(this);

    this.setEditing(true);

    // DOM changes
    this.$element
        .addClass('ve-ce-tableCellNode ve-ce-tableCellNode-data ve-ce-IsekaiGridColNode isekai-grid-col')
        .data('view', this);

    // Events
    this.connect(this, {
        teardown: 'onIsekaiGridColTeardown'
    });
};

/* Inheritance */
OO.inheritClass(ve.ce.IsekaiGridColNode, ve.ce.BranchNode);
OO.mixinClass(ve.ce.IsekaiGridColNode, ve.ce.ContentEditableNode);

/* Static Properties */
ve.ce.IsekaiGridColNode.static.name = 'col';
ve.ce.IsekaiGridColNode.static.tagName = 'div';
ve.ce.IsekaiGridColNode.static.removeEmptyLastChildOnEnter = true;
ve.ce.IsekaiGridColNode.static.trapsCursor = true;

/* Method */
ve.ce.IsekaiGridColNode.prototype.initialize = function () {
    // Add tooltip
    this.$element.attr('title', ve.msg('visualeditor-tablecell-tooltip'));
};

/**
 * Set the editing mode of a col node
 *
 * @param {boolean} enable Enable editing
 */
ve.ce.IsekaiGridColNode.prototype.setEditing = function (enable) {
    this.editing = enable;
    this.$element.toggleClass('ve-ce-IsekaiGridColNode-editing', enable);
    this.setContentEditable();
    if (this.getRoot()) {
        this.getRoot().getSurface().setActiveNode(enable ? this : null);
    }
    if (enable) {
        this.$element.removeAttr('title');
    } else {
        this.$element.attr('title', ve.msg('visualeditor-tablecell-tooltip'));
    }
};

/**
 * Handle teardown events
 *
 * Same functionality as the teardown handler in ve.ce.ActiveNode
 */
ve.ce.IsekaiGridColNode.prototype.onIsekaiGridColTeardown = function () {
    // If the col is active on teardown, ensure the surface's
    // activeNode is cleared.
    if (this.getRoot()) {
        var surface = this.getRoot().getSurface();
        if (surface.getActiveNode() === this) {
            surface.setActiveNode(null);
        }
    }
};

/**
 * @inheritdoc ve.ce.ContentEditableNode
 */
ve.ce.TableCellNode.prototype.setContentEditable = function () {
    // Overwite any state passed to setContentEditable with this.editing, so that
    // setContentEditable doesn't override the editing state.
    return ve.ce.ContentEditableNode.prototype.setContentEditable.call(this, this.editing);
};

/**
 * Execute the command associated with this node.
 */
ve.ce.FocusableNode.prototype.executeCommand = function () {
	if ( !this.model.isInspectable() ) {
		return;
	}
	var surface = this.focusableSurface.getSurface();
	var command = surface.commandRegistry.getCommandForNode( this );
	if ( command ) {
		command.execute( surface );
	}
};

/* Registration */
ve.ce.nodeFactory.register(ve.ce.IsekaiGridColNode);