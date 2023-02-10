<?php
namespace Isekai\Color;

use DOMElement;
use Wikimedia\Parsoid\DOM\Node;
use Wikimedia\Parsoid\Ext\DOMProcessor;
use Wikimedia\Parsoid\Ext\ParsoidExtensionAPI;

class ColorProcessor extends DOMProcessor {
    public function htmlPreprocess(ParsoidExtensionAPI $extApi, DOMElement $root): void {
        throw new \Exception("");
    }

    public function wtPostprocess(ParsoidExtensionAPI $extApi, Node $root, array $options, bool $atTopLevel): void
    {
        throw new \Exception("");
    }
}