/**
 * ContentEditable color annotation.
 *
 * @class
 * @extends ve.ce.TextStyleAnnotation
 * @constructor
 * @param {ve.dm.IsekaiGridRowNode} model Model to observe
 * @param {ve.ce.ContentBranchNode} [parentNode] Node rendering this annotation
 * @param {Object} [config] Configuration options
 */
ve.ce.IsekaiGridRowNode = function VeCeIsekaiGridRowNode() {
	// Parent constructor
	ve.ce.IsekaiGridRowNode.super.apply(this, arguments);

	this.editingFragment = null;

	// Properties
	this.surface = null;

	// DOM changes
	this.$element.addClass('ve-ce-IsekaiGridRowNode isekai-grid-row');
	// this.$element.prop('contentEditable', 'false');
};

/* Inheritance */
OO.inheritClass(ve.ce.IsekaiGridRowNode, ve.ce.BranchNode);

/* Static Properties */
ve.ce.IsekaiGridRowNode.static.name = 'row';
ve.ce.IsekaiGridRowNode.static.tagName = 'div';

/* Method */

/**
 * @inheritdoc
 */
ve.ce.IsekaiGridRowNode.prototype.onSetup = function () {
	// Parent method
	ve.ce.IsekaiGridRowNode.super.prototype.onSetup.call(this);

	window._isekaiRow = this;

	// Exit if already setup or not attached
	if ( this.surface || !this.root ) {
		return;
	}
	this.surface = this.getRoot().getSurface();
	
	ve.ce.IsekaiGridEvents.static.instance.onSetup(this.surface, this);
};

/**
 * @inheritdoc
 */
ve.ce.IsekaiGridRowNode.prototype.onTeardown = function () {
	// Parent method
	ve.ce.IsekaiGridRowNode.super.prototype.onTeardown.call(this);
	
	ve.ce.IsekaiGridEvents.static.instance.onTearDown(this);
};

ve.ce.IsekaiGridRowNode.prototype.setFocusedIn = function (isFocusedIn) {
	console.log('onFocusedIn', isFocusedIn);
};

/* Registration */
ve.ce.nodeFactory.register(ve.ce.IsekaiGridRowNode);