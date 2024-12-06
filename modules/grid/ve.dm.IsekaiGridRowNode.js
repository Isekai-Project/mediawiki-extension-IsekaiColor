/**
 * Isekai set license meta item.
 *
 * @class
 * @extends ve.dm.TextStyleAnnotation
 * @constructor
 * @param {Object} element Reference to element in meta-linmod
 */
ve.dm.IsekaiGridRowNode = function VeDmIsekaiGridRowNode() {
    // Parent constructor
    ve.dm.IsekaiGridRowNode.super.apply(this, arguments);
};

/* Inheritance */
OO.inheritClass(ve.dm.IsekaiGridRowNode, ve.dm.BranchNode);

/* Static Properties */
ve.dm.IsekaiGridRowNode.static.name = 'row';
ve.dm.IsekaiGridRowNode.static.group = 'IsekaiVEComponents';
ve.dm.IsekaiGridRowNode.static.matchTagNames = ['div'];
ve.dm.IsekaiGridRowNode.static.matchRdfaTypes = ['mw:Extension/row'];
ve.dm.IsekaiGridRowNode.static.inferFromView = true;

/* Methods */

/* Registration */
ve.dm.modelRegistry.register(ve.dm.IsekaiGridRowNode);