<?php
namespace Isekai\VEComponents\Grid;

use MediaWiki\Parser\Parser;
use MediaWiki\Html\Html;
use PPFrame;

class GridTags {
    /**
     * @throws \MWException
     */
    public static function onParserSetup(Parser $parser) {
        $parser->setHook('row', self::class . '::createRow');
        $parser->setHook('col', self::class . '::createCol');
    }

    public static function createRow($content, $params, Parser $parser, PPFrame $frame) {
        $parser->getOutput()->addModules(['ext.isekai.vecmps.grid']);

        $mobileDirection = $params['mobile-dir'] ?? 'top-to-bottom';
        $alignItems = $params['align-items'] ?? 'top';
        $sizeTemplate = $params['size-tpl'] ?? 'default';

        $classList = ['isekai-grid-row'];

        if ($mobileDirection === "bottom-to-top") {
            $classList[] = 'xs-bottom-to-top';
        }

        if ($sizeTemplate !== "default") {
            $classList[] = 'size-tpl-' . $sizeTemplate;
        }

        switch ($alignItems) {
            case 'center':
                $classList[] = 'flex-align-center';
                break;
            case 'bottom':
                $classList[] = 'flex-align-bottom';
                break;
        }

        $parsedContent = $parser->recursiveTagParse($content, $frame);
        return Html::openElement('div', [
            'class' => implode(" ", $classList)
        ]) . $parsedContent .
        Html::closeElement('div');
    }

    public static function createCol($content, $params, Parser $parser, PPFrame $frame) {
        $parsedContent = $parser->recursiveTagParse($content, $frame);
        return Html::openElement('div', [
            'class' => 'isekai-grid-col'
        ]) .  $parsedContent .
        Html::closeElement('div');
    }
}