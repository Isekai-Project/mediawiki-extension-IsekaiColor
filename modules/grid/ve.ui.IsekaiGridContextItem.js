/**
 * Context item for isekai grid.
 *
 * @class
 * @extends ve.ui.LinearContextItem
 *
 * @param {ve.ui.Context} context Context item is in
 * @param {ve.dm.Model} model Model item is related to
 * @param {Object} config Configuration options
 */
ve.ui.IsekaiGridContextItem = function VeUiIsekaiGridContextItem( context, model, config ) {
	// Parent constructor
	ve.ui.IsekaiGridContextItem.super.call( this, context, model, config );

	// Initialization
	this.$element.addClass( 've-ui-IsekaiGridContextItem' );

	this.deleteButton = new OO.ui.ButtonWidget( {
		label: ve.msg( 'visualeditor-contextitemwidget-label-remove' ),
		flags: [ 'destructive' ]
	} );
	if ( !this.isReadOnly() ) {
		this.actionButtons.addItems( [ this.deleteButton, this.editButton ] );
	}

	// Events
	this.deleteButton.connect( this, { click: 'onDeleteButtonClick' } );

	this.editButton.setLabel( ve.msg( 'visualeditor-table-contextitem-properties' ) );
};

/* Inheritance */

OO.inheritClass( ve.ui.IsekaiGridContextItem, ve.ui.LinearContextItem );

/* Static Properties */

ve.ui.IsekaiGridContextItem.static.name = 'isekai-grid';

ve.ui.IsekaiGridContextItem.static.icon = 'table';

ve.ui.IsekaiGridContextItem.static.label = '分栏';

ve.ui.IsekaiGridContextItem.static.modelClasses = [ ve.dm.IsekaiGridRowNode, ve.dm.IsekaiGridColNode ];

ve.ui.IsekaiGridContextItem.static.commandName = 'isekai-grid';

ve.ui.IsekaiGridContextItem.static.embeddable = true;

/* Methods */

/**
 * Handle delete button click events.
 */
ve.ui.IsekaiGridContextItem.prototype.onDeleteButtonClick = function () {
	var surfaceModel = this.getFragment().getSurface();

	surfaceModel.getLinearFragment(
		surfaceModel.getSelectedNode().findParent( ve.dm.IsekaiGridRowNode ).getOuterRange()
	).delete();

	ve.track( 'activity.isekai-grid', { action: 'context-delete' } );
};

/* Registration */

ve.ui.contextItemFactory.register( ve.ui.IsekaiGridContextItem );
