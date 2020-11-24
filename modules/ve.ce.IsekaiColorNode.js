/**
 * ContentEditable color annotation.
 *
 * @class
 * @extends ve.ce.TextStyleAnnotation
 * @constructor
 * @param {ve.dm.IsekaiColorNode} model Model to observe
 * @param {ve.ce.ContentBranchNode} [parentNode] Node rendering this annotation
 * @param {Object} [config] Configuration options
 */
ve.ce.IsekaiColorNode = function VeCeIsekaiColorNode() {
    // Parent constructor
    ve.ce.IsekaiColorNode.super.apply(this, arguments);

    // DOM changes
    this.$element.addClass('ve-ce-IsekaiColorNode');

    this.setColor(this.getModel().getAttribute('color'));
};

/* Inheritance */
OO.inheritClass(ve.ce.IsekaiColorNode, ve.ce.TextStyleAnnotation);

/* Static Properties */
ve.ce.IsekaiColorNode.static.name = 'color';
ve.ce.IsekaiColorNode.static.tagName = 'span';

ve.ce.IsekaiColorNode.static.allowedColor = ['primary', 'secondary', 'info', 'success', 'warning', 'danger'];

/* Method */
ve.ce.IsekaiColorNode.prototype.setColor = function(color) {
    var colorClass = 'isekai-text-' + color;
    if (!this.$element.hasClass(colorClass)) { //颜色已经存在就不用重设了
        this.removeColors();
        if (this.constructor.static.allowedColor.indexOf(color) !== -1) {
            this.$element.addClass(colorClass);
        }
    }
};

ve.ce.IsekaiColorNode.prototype.removeColors = function() {
    let classList = [];
    this.constructor.static.allowedColor.forEach((color) => {
        classList.push('isekai-text-' + color);
    });
    this.$element.removeClass(classList);
};

/* Registration */
ve.ce.annotationFactory.register(ve.ce.IsekaiColorNode);