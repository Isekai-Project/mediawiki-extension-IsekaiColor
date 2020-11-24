function getToolbarGroupId(name, target) {
    var toolbarGroups = target.static.toolbarGroups;
    for (var i = 0; i < toolbarGroups.length; i++) {
        var one = toolbarGroups[i];
        if (one.name === name) {
            return i;
        }
    }
    return false;
}

function fixTarget(target) {
    //注入工具栏
    var pageMenuId = getToolbarGroupId('style', target);
    target.static.toolbarGroups.splice(pageMenuId + 1, 0, {
        name: 'color',
        indicator: 'down',
        type: 'list',
        icon: 'textColorDanger',
        title: OO.ui.deferMsg('isekai-color-toolbar-color'),
        invisibleLabel: false,
        include: [{ group: 'color' }],
    });
}

for (var name in ve.init.mw.targetFactory.registry) {
    fixTarget(ve.init.mw.targetFactory.lookup(name));
}

ve.init.mw.targetFactory.on('register', function(name, target) {
    fixTarget(target);
});