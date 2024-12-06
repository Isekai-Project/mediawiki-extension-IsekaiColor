<?php

namespace Isekai\VEComponents\Color;

use MediaWiki\MediaWikiServices;
use MediaWiki\Output\OutputPage;

class ColorHooks {
    public static function getColorScheme($skinName) {
        $config = MediaWikiServices::getInstance()->getMainConfig();

        $themeColorSchemes = $config->get('IsekaiVEComponentsThemeColorScheme');

        if (isset($themeColorSchemes[$skinName])) {
            return $themeColorSchemes[$skinName];
        }

        $defaultConfig = [
            'vector' => 'light',
            'timeless' => 'light',
            'monobook' => 'light',
            'minerva' => 'light',

            'darkcosmos' => 'dark',
        ];

        if (isset($defaultConfig[$skinName])) {
            return $defaultConfig[$skinName];
        }

        return 'light';
    }

    public static function onOutputPageBeforeHTML(OutputPage &$out) {
        if (in_array('ext.isekai.vecmps.color', $out->getModules())) {
            // 存在color组件
            $skinName = $out->getSkin()->getSkinName();
            $colorScheme = self::getColorScheme($skinName);
            switch ($colorScheme) {
                case 'light': // 亮色主题
                    $out->addModuleStyles('ext.isekai.vecmps.color.light');
                    break;
                case 'dark': // 暗色主题
                    $out->addModuleStyles('ext.isekai.vecmps.color.dark');
                    break;
            }
        }
    }
}
