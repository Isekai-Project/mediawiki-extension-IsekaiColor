/**
 * Isekai color action.
 *
 * @class
 * @extends ve.ui.Action
 *
 * @constructor
 * @param {ve.ui.Surface} surface Surface to act on
 */
ve.ui.IsekaiColorAction = function VeUiIsekaiColorAction() {
    // Parent constructor
    ve.ui.IsekaiColorAction.super.apply(this, arguments);
};

/* Inheritance */
OO.inheritClass(ve.ui.IsekaiColorAction, ve.ui.Action);

/* Static Properties */
ve.ui.IsekaiColorAction.static.name = 'color';
ve.ui.IsekaiColorAction.static.methods = ['set', 'clear'];

/**
 * Set color.
 *
 * @param {string} color id
 * @return {boolean} Action was executed
 */
ve.ui.IsekaiColorAction.prototype.set = function(color) {
    ve.track('activity.color', { action: 'set' });

    var trimmedFragment,
        fragment = this.surface.getModel().getFragment();

    this.clear();

    if (fragment.getSelection() instanceof ve.dm.LinearSelection) {
        trimmedFragment = fragment.trimLinearSelection();
        if (!trimmedFragment.getSelection().isCollapsed()) {
            fragment = trimmedFragment;
        }
    }

    fragment.annotateContent('set', 'color', { attributes: { color } });
    return true;
};

/**
 * Clear color.
 * @return {boolean} Action was executed
 */
ve.ui.IsekaiColorAction.prototype.clear = function() {
    ve.track('activity.color', { action: 'clear' });
    this.surface.getModel().getFragment().annotateContent('clear', 'color');
    return true;
};

/* Registration */
ve.ui.actionFactory.register(ve.ui.IsekaiColorAction);