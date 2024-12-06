<?php

namespace Isekai\VEComponents\Grid;

use Wikimedia\Parsoid\DOM\DocumentFragment;
use Wikimedia\Parsoid\DOM\Element;
use Wikimedia\Parsoid\Ext\ExtensionTagHandler;
use Wikimedia\Parsoid\Ext\ParsoidExtensionAPI;
use Wikimedia\Parsoid\Tokens\KV;
use Wikimedia\Parsoid\Utils\DOMCompat;

class GridColTagHandler extends ExtensionTagHandler {
    public function toArgs(array $extArgs): array {
        $ret = [];
        /** @var KV $extArg */
        foreach ($extArgs as $extArg) {
            $ret[$extArg->k] = $extArg->v;
        }
        return $ret;
    }

    public function sourceToDom(ParsoidExtensionAPI $extApi, string $src, array $extArgs): DocumentFragment {
        $args = $this->toArgs($extArgs);

        unset($extArgs['source']);
        
        return $extApi->extTagToDOM(
            $extArgs,
            $src,
            [
                'wrapperTag' => 'div',
				'processInNewFrame' => true,
                'parseOpts' => [
                    'extTag' => 'col',
                    'context' => 'block'
                ],
            ]
        );
    }

    public function getInnerWikitext(ParsoidExtensionAPI $extApi, Element $dom) {
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

    public function domToWikitext(ParsoidExtensionAPI $extApi, Element $node, bool $wrapperUnmodified): string {
        $html2wtOpts = [
            'extName' => 'col',
        ];
        return $extApi->htmlToWikitext($html2wtOpts, DOMCompat::getOuterHTML($node->ownerDocument));
    }
}