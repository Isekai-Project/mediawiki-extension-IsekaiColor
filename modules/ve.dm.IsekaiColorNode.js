/**
 * Isekai set license meta item.
 *
 * @class
 * @extends ve.dm.TextStyleAnnotation
 * @constructor
 * @param {Object} element Reference to element in meta-linmod
 */
ve.dm.IsekaiColorNode = function VeDmIsekaiColorNode() {
    // Parent constructor
    ve.dm.IsekaiColorNode.super.apply(this, arguments);
};

/* Inheritance */
OO.inheritClass(ve.dm.IsekaiColorNode, ve.dm.TextStyleAnnotation);

/* Static Properties */
ve.dm.IsekaiColorNode.static.name = 'color';
ve.dm.IsekaiColorNode.static.group = 'color';
ve.dm.IsekaiColorNode.static.matchTagNames = ['span'];
ve.dm.IsekaiColorNode.static.matchRdfaTypes = ['mw:Extension/color'];
ve.dm.IsekaiColorNode.static.inferFromView = true;

/* Methods */
ve.dm.IsekaiColorNode.static.toDataElement = function(domElements) {
    var element = domElements[0];
    var color = element.getAttribute('data-color');
    return {
        type: this.name,
        attributes: {
            color
        },
    };
};

ve.dm.IsekaiColorNode.static.toDomElements = function(dataElement, doc) {
    var divElement = doc.createElement('span');
    divElement.setAttribute('typeof', 'mw:Extension/color');
    divElement.setAttribute('data-mw', JSON.stringify({
        name: this.name,
        attrs: {
            type: dataElement.attributes.color
        },
    }));
    divElement.setAttribute('data-color', dataElement.attributes.color);
    return [divElement];
};

/**
 * @return {Object}
 */
ve.dm.IsekaiColorNode.prototype.getComparableObject = function() {
    return { type: 'textColor/' + this.getAttribute('color') };
};

/* Registration */
ve.dm.modelRegistry.register(ve.dm.IsekaiColorNode);