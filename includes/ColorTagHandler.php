<?php

namespace Isekai\Color;

use Exception;
use Wikimedia\Parsoid\DOM\DocumentFragment;
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
        foreach ($extArgs as $extArg) {
            $ret[$extArg->k] = $extArg->v;
        }
        return $ret;
    }

    public function sourceToDom(ParsoidExtensionAPI $extApi, string $src, array $extArgs): DocumentFragment {
        $src = preg_replace('/^([ ]*)([#*]+)/', '${1}<nowiki>${2}</nowiki>', $src);
        $args = $this->toArgs($extArgs);

        if (isset($args['type']) && in_array($args['type'], ColorTag::ALLOW_TYPES)) {
            // 设置class
            $extApi->addNewArg($extArgs, 'class', 'isekai-text-' . $args['type']);
            $extApi->addNewArg($extArgs, 'data-color', $args['type']);
        }
        
        return $extApi->extTagToDOM(
            $extArgs,
            '',
            $src,
            [
                'wrapperTag' => 'span',
                'parseOpts' => [
                    'extTag' => 'color',
                    'context' => 'inline'
                ],
            ],
        );;
    }

    public function getInnerWikitext(ParsoidExtensionAPI $extApi, \DOMElement $dom) {
        $wikiText = '';
        foreach ($dom->childNodes as $child) {
            if ($child instanceof \DOMText) {
                $wikiText .= $child->nodeValue;
            } else {
                $wikiText .= $extApi->domToWikitext([], $child);
            }
        }
        return $wikiText;
    }

    public function domToWikitext(ParsoidExtensionAPI $extApi, \DOMElement $node, bool $wrapperUnmodified): string {
        $color = $node->getAttribute('data-color');

        if ($color) {
            $innerCode = $this->getInnerWikitext($extApi, $node);
            return "<color type=\"{$color}\">{$innerCode}</color>";
        } else {
            $html2wtOpts = [
                'extName' => 'color',
            ];
            return $extApi->htmlToWikitext($html2wtOpts, DOMCompat::getOuterHTML($node->ownerDocument));
        }
    }
}