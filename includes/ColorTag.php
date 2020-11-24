<?php
namespace Isekai\Color;

use Parser;
use PPFrame;

class ColorTag {
    public const ALLOW_TYPES = ['primary', 'secondary', 'info', 'success', 'warning', 'danger'];

    public static function onParserSetup(Parser $parser){
        $parser->setHook('color', self::class . '::create');
    }

    public static function create($text, $params, Parser $parser, PPFrame $frame){
        $parser->getOutput()->addModules('ext.isekai.color');

        $parsedText = $parser->recursiveTagParse($text, $frame);
        if(isset($params['type']) && in_array($params['type'], self::ALLOW_TYPES)){
            return '<span class="isekai-text-' . $params['type'] . '">' . $parsedText . '</span>';
        } else {
            return '<span>' . $parsedText . '</span>';
        }
    }
}