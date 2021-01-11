<?php
namespace Isekai\Color;

use stringEncode\Exception;
use Wikimedia\Parsoid\Ext\DOMDataUtils;
use Wikimedia\Parsoid\Ext\ExtensionTagHandler;
use Wikimedia\Parsoid\Ext\ExtensionModule;
use Wikimedia\Parsoid\Ext\ParsoidExtensionAPI;
use Wikimedia\Parsoid\Ext\WTUtils;
use Wikimedia\Parsoid\Tokens\KV;
use Wikimedia\Parsoid\Utils\DOMCompat;
use Wikimedia\Parsoid\Utils\DOMUtils;

class ColorTagHandler extends ExtensionTagHandler {
    public function toArgs(array $extArgs): array {
        $ret = [];
        /** @var KV $extArg */
        foreach($extArgs as $extArg){
            $ret[$extArg->k] = $extArg->v;
        }
        return $ret;
    }

    public function sourceToDom(ParsoidExtensionAPI $extApi, string $src, array $extArgs): \DOMDocument
    {
        $src = preg_replace('/^([ ]*)([#*]+)/', '${1}<nowiki>${2}</nowiki>', $src);
        $args = $this->toArgs($extArgs);
        $content = $extApi->extTagToDOM(
            $extArgs,
            '',
            $src,
            [
                'wrapperTag' => 'span',
                'parseOpts' => [
                    'extTag' => 'color',
                    'context' => 'inline',
                ],
            ],
        );
        if(isset($args['type']) && in_array($args['type'], ColorTag::ALLOW_TYPES)) {
            $wrapper = DOMCompat::getBody($content)->firstChild;
            //设置class
            $wrapper->setAttribute('class', 'isekai-text-' . $args['type']);
            $wrapper->setAttribute('data-color', $args['type']);

            return $content;
        } else {
            return $content;
        }
    }

    public function getInnerWikitext(ParsoidExtensionAPI $extApi, \DOMElement $dom){
        $wikiText = '';
        foreach($dom->childNodes as $child){
            if($child instanceof \DOMText){
                /** @type \DOMText $child */
                $wikiText .= $child->nodeValue;
            } else {
                $wikiText .= $extApi->domToWikitext([], $child);
            }
        }
        return $wikiText;
    }

    public function domToWikitext(ParsoidExtensionAPI $extApi, \DOMElement $node, bool $wrapperUnmodified): string
    {
        $color = $node->getAttribute('data-color');

        if($color){
            $innerCode = $this->getInnerWikitext($extApi, $node);
            return "<color type=\"{$color}\">{$innerCode}</color>";
        } else {
            $html2wtOpts = [
                'extName' => 'color',
            ];
            return $extApi->htmlToWikitext($html2wtOpts, DOMCompat::getOuterHTML($node));
        }
    }
}