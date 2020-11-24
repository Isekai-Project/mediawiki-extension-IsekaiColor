/**
 * UserInterface color tool.
 *
 * @abstract
 * @class
 * @extends ve.ui.Tool
 * @constructor
 * @param {OO.ui.ToolGroup} toolGroup
 * @param {Object} [config] Configuration options
 */
ve.ui.IsekaiColorTool = function VeUiIsekaiColorTool() {
    // Parent constructor
    ve.ui.IsekaiColorTool.super.apply( this, arguments );
};

/* Inheritance */
OO.inheritClass( ve.ui.IsekaiColorTool, ve.ui.AnnotationTool );

ve.ui.IsekaiColorTool.static.displayBothIconAndLabel = true;

/* Methods */
ve.ui.IsekaiColorTool.prototype.setActive = function (isActive) {
    ve.ui.IsekaiColorTool.super.prototype.setActive.apply( this, arguments );

    if(isActive){
        //更新图标
        var toolbarItem = ve.init.target.getToolbar().getToolGroupByName('color');
        if(toolbarItem) {
            if(this.constructor.static.annotation.attributes.color === 'none'){
                toolbarItem.setIcon('textColorTool');
            } else {
                toolbarItem.setIcon(this.constructor.static.icon);
            }
        }
    }
};

ve.ui.IsekaiColorTool.prototype.onUpdateState = function ( fragment ) {
    ve.ui.IsekaiColorTool.super.super.prototype.onUpdateState.apply(this, arguments);
    var i, len, annotation,
        annotations = fragment.getAnnotations(),
        thisColor = this.constructor.static.annotation.attributes.color;
    if(thisColor === 'none'){
        if(annotations.hasAnnotationWithName('color')){
            this.setActive(false);
        } else {
            this.setActive(true);
        }
    } else {
        for (i = 0, len = annotations.getLength(); i < len; i++) {
            annotation = annotations.get(i);
            if (annotation.name === 'color' && annotation.getAttribute('color') === thisColor) {
                this.setActive(true);
                return;
            }
        }
        this.setActive(false);
    }
};

/**
 * UserInterface IsekaiColor primary color tool.
 *
 * @class
 * @extends ve.ui.AnnotationTool
 * @constructor
 * @param {OO.ui.ToolGroup} toolGroup
 * @param {Object} [config] Configuration options
 */
ve.ui.IsekaiColorNoneTool = function VeUiIsekaiColorNoneTool() {
    ve.ui.IsekaiColorNoneTool.super.apply( this, arguments );
};
OO.inheritClass( ve.ui.IsekaiColorNoneTool, ve.ui.IsekaiColorTool );
ve.ui.IsekaiColorNoneTool.static.name = 'colorNone';
ve.ui.IsekaiColorNoneTool.static.group = 'color';
ve.ui.IsekaiColorNoneTool.static.icon = 'textColorNone';
ve.ui.IsekaiColorNoneTool.static.title = '无';
ve.ui.IsekaiColorNoneTool.static.annotation = { name: 'color', attributes: { color: 'none' } };
ve.ui.IsekaiColorNoneTool.static.commandName = 'colorNone';
ve.ui.toolFactory.register( ve.ui.IsekaiColorNoneTool );

ve.ui.commandRegistry.register(
    new ve.ui.Command(
        'colorNone', 'color', 'clear',
        { args: [], supportedSelections: [ 'linear', 'table' ] }
    )
);

/**
 * UserInterface IsekaiColor primary color tool.
 *
 * @class
 * @extends ve.ui.AnnotationTool
 * @constructor
 * @param {OO.ui.ToolGroup} toolGroup
 * @param {Object} [config] Configuration options
 */
ve.ui.IsekaiColorPrimaryTool = function VeUiIsekaiColorPrimaryTool() {
    ve.ui.IsekaiColorPrimaryTool.super.apply( this, arguments );
};
OO.inheritClass( ve.ui.IsekaiColorPrimaryTool, ve.ui.IsekaiColorTool );
ve.ui.IsekaiColorPrimaryTool.static.name = 'colorPrimary';
ve.ui.IsekaiColorPrimaryTool.static.group = 'color';
ve.ui.IsekaiColorPrimaryTool.static.icon = 'textColorPrimary';
ve.ui.IsekaiColorPrimaryTool.static.title = '主要';
ve.ui.IsekaiColorPrimaryTool.static.annotation = { name: 'color', attributes: { color: 'primary' } };
ve.ui.IsekaiColorPrimaryTool.static.commandName = 'colorPrimary';
ve.ui.toolFactory.register( ve.ui.IsekaiColorPrimaryTool );

ve.ui.commandRegistry.register(
    new ve.ui.Command(
        'colorPrimary', 'color', 'set',
        { args: [ 'primary' ], supportedSelections: [ 'linear', 'table' ] }
    )
);

/**
 * UserInterface IsekaiColor secondary color tool.
 *
 * @class
 * @extends ve.ui.AnnotationTool
 * @constructor
 * @param {OO.ui.ToolGroup} toolGroup
 * @param {Object} [config] Configuration options
 */
ve.ui.IsekaiColorSecondaryTool = function VeUiIsekaiColorSecondaryTool() {
    ve.ui.IsekaiColorSecondaryTool.super.apply( this, arguments );
};
OO.inheritClass( ve.ui.IsekaiColorSecondaryTool, ve.ui.IsekaiColorTool );
ve.ui.IsekaiColorSecondaryTool.static.name = 'colorSecondary';
ve.ui.IsekaiColorSecondaryTool.static.group = 'color';
ve.ui.IsekaiColorSecondaryTool.static.icon = 'textColorSecondary';
ve.ui.IsekaiColorSecondaryTool.static.title = '次要';
ve.ui.IsekaiColorSecondaryTool.static.annotation = { name: 'color', attributes: { color: 'secondary' } };
ve.ui.IsekaiColorSecondaryTool.static.commandName = 'colorSecondary';
ve.ui.toolFactory.register( ve.ui.IsekaiColorSecondaryTool );

ve.ui.commandRegistry.register(
    new ve.ui.Command(
        'colorSecondary', 'color', 'set',
        { args: [ 'secondary' ], supportedSelections: [ 'linear', 'table' ] }
    )
);

/**
 * UserInterface IsekaiColor info color tool.
 *
 * @class
 * @extends ve.ui.AnnotationTool
 * @constructor
 * @param {OO.ui.ToolGroup} toolGroup
 * @param {Object} [config] Configuration options
 */
ve.ui.IsekaiColorInfoTool = function VeUiIsekaiColorInfoTool() {
    ve.ui.IsekaiColorInfoTool.super.apply( this, arguments );
};
OO.inheritClass( ve.ui.IsekaiColorInfoTool, ve.ui.IsekaiColorTool );
ve.ui.IsekaiColorInfoTool.static.name = 'colorInfo';
ve.ui.IsekaiColorInfoTool.static.group = 'color';
ve.ui.IsekaiColorInfoTool.static.icon = 'textColorInfo';
ve.ui.IsekaiColorInfoTool.static.title = '信息';
ve.ui.IsekaiColorInfoTool.static.annotation = { name: 'color', attributes: { color: 'info' } };
ve.ui.IsekaiColorInfoTool.static.commandName = 'colorInfo';
ve.ui.toolFactory.register( ve.ui.IsekaiColorInfoTool );

ve.ui.commandRegistry.register(
    new ve.ui.Command(
        'colorInfo', 'color', 'set',
        { args: [ 'info' ], supportedSelections: [ 'linear', 'table' ] }
    )
);

/**
 * UserInterface IsekaiColor success color tool.
 *
 * @class
 * @extends ve.ui.AnnotationTool
 * @constructor
 * @param {OO.ui.ToolGroup} toolGroup
 * @param {Object} [config] Configuration options
 */
ve.ui.IsekaiColorSuccessTool = function VeUiIsekaiColorSuccessTool() {
    ve.ui.IsekaiColorSuccessTool.super.apply( this, arguments );
};
OO.inheritClass( ve.ui.IsekaiColorSuccessTool, ve.ui.IsekaiColorTool );
ve.ui.IsekaiColorSuccessTool.static.name = 'colorSuccess';
ve.ui.IsekaiColorSuccessTool.static.group = 'color';
ve.ui.IsekaiColorSuccessTool.static.icon = 'textColorSuccess';
ve.ui.IsekaiColorSuccessTool.static.title = '完成/绿';
ve.ui.IsekaiColorSuccessTool.static.annotation = { name: 'color', attributes: { color: 'success' } };
ve.ui.IsekaiColorSuccessTool.static.commandName = 'colorSuccess';
ve.ui.toolFactory.register( ve.ui.IsekaiColorSuccessTool );

ve.ui.commandRegistry.register(
    new ve.ui.Command(
        'colorSuccess', 'color', 'set',
        { args: [ 'success' ], supportedSelections: [ 'linear', 'table' ] }
    )
);

/**
 * UserInterface IsekaiColor warning color tool.
 *
 * @class
 * @extends ve.ui.AnnotationTool
 * @constructor
 * @param {OO.ui.ToolGroup} toolGroup
 * @param {Object} [config] Configuration options
 */
ve.ui.IsekaiColorWarningTool = function VeUiIsekaiColorWarningTool() {
    ve.ui.IsekaiColorWarningTool.super.apply( this, arguments );
};
OO.inheritClass( ve.ui.IsekaiColorWarningTool, ve.ui.IsekaiColorTool );
ve.ui.IsekaiColorWarningTool.static.name = 'colorWarning';
ve.ui.IsekaiColorWarningTool.static.group = 'color';
ve.ui.IsekaiColorWarningTool.static.icon = 'textColorWarning';
ve.ui.IsekaiColorWarningTool.static.title = '警示/黄';
ve.ui.IsekaiColorWarningTool.static.annotation = { name: 'color', attributes: { color: 'warning' } };
ve.ui.IsekaiColorWarningTool.static.commandName = 'colorWarning';
ve.ui.toolFactory.register( ve.ui.IsekaiColorWarningTool );

ve.ui.commandRegistry.register(
    new ve.ui.Command(
        'colorWarning', 'color', 'set',
        { args: [ 'warning' ], supportedSelections: [ 'linear', 'table' ] }
    )
);

/**
 * UserInterface IsekaiColor danger color tool.
 *
 * @class
 * @extends ve.ui.AnnotationTool
 * @constructor
 * @param {OO.ui.ToolGroup} toolGroup
 * @param {Object} [config] Configuration options
 */
ve.ui.IsekaiColorDangerTool = function VeUiIsekaiColorDangerTool() {
    ve.ui.IsekaiColorDangerTool.super.apply( this, arguments );
};
OO.inheritClass( ve.ui.IsekaiColorDangerTool, ve.ui.IsekaiColorTool );
ve.ui.IsekaiColorDangerTool.static.name = 'colorDanger';
ve.ui.IsekaiColorDangerTool.static.group = 'color';
ve.ui.IsekaiColorDangerTool.static.icon = 'textColorDanger';
ve.ui.IsekaiColorDangerTool.static.title = '重要/红';
ve.ui.IsekaiColorDangerTool.static.annotation = { name: 'color', attributes: { color: 'danger' } };
ve.ui.IsekaiColorDangerTool.static.commandName = 'colorDanger';
ve.ui.toolFactory.register( ve.ui.IsekaiColorDangerTool);

ve.ui.commandRegistry.register(
    new ve.ui.Command(
        'colorDanger', 'color', 'set',
        { args: [ 'danger' ], supportedSelections: [ 'linear', 'table' ] }
    )
);