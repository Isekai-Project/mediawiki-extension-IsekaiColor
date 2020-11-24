<?php
namespace Isekai\Color;

use Skin;
use OutputPage;

class Hooks {
    public static function initConfig(){
        global $wgIsekaiColorThemes;
        $defaultConfig = [
            'vector' => 'light',
            'timeless' => 'light',
            'monobook' => 'light',
            'minervaneue' => 'light',

            'darkcosmos' => 'dark',
        ];

        foreach($defaultConfig as $theme => $mode){
            if(!isset($wgIsekaiColorThemes[$theme])){
                $wgIsekaiColorThemes[$theme] = $mode;
            }
        }
    }

    public static function onOutputPageBeforeHTML(OutputPage &$out){
        global $wgIsekaiColorThemes;
        if(in_array('ext.isekai.color', $out->getModules())){
            //存在color
            $skinName = $out->getSkin()->getSkinName();
            if(isset($wgIsekaiColorThemes[$skinName])){
                switch($wgIsekaiColorThemes[$skinName]){
                    case 'light': //亮色主题
                        $out->addModuleStyles('ext.isekai.color.light');
                    break;
                    case 'dark': //暗色主题
                        $out->addModuleStyles('ext.isekai.color.dark');
                    break;
                }
            }
        }
    }
}