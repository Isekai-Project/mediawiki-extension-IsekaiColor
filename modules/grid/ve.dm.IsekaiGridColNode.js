/**
 * Isekai set license meta item.
 *
 * @class
 * @extends ve.dm.TextStyleAnnotation
 * @constructor
 * @param {Object} element Reference to element in meta-linmod
 */
ve.dm.IsekaiGridColNode = function VeDmIsekaiGridColNode() {
    // Parent constructor
    ve.dm.IsekaiGridColNode.super.apply(this, arguments);
};

/* Inheritance */
OO.inheritClass(ve.dm.IsekaiGridColNode, ve.dm.BranchNode);

/* Static Properties */
ve.dm.IsekaiGridColNode.static.name = 'col';
ve.dm.IsekaiGridColNode.static.group = 'IsekaiVEComponents';
ve.dm.IsekaiGridColNode.static.matchTagNames = ['div'];
ve.dm.IsekaiGridColNode.static.matchRdfaTypes = ['mw:Extension/col'];
ve.dm.IsekaiGridColNode.static.inferFromView = true;

/* Methods */
ve.ce.IsekaiGridRowNode.prototype.setupBlockSlugs = function () {

};


/* Registration */
ve.dm.modelRegistry.register(ve.dm.IsekaiGridColNode);