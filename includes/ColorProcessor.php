<?php
namespace Isekai\Color;

use DOMElement;
use Wikimedia\Parsoid\Ext\DOMProcessor;
use Wikimedia\Parsoid\Ext\ParsoidExtensionAPI;
use Wikimedia\Parsoid\Utils\DOMCompat;

class ColorProcessor extends DOMProcessor
{
    public function htmlPreprocess(ParsoidExtensionAPI $extApi, DOMElement $root): void
    {
        throw new \Exception("");
    }

    public function wtPostprocess(ParsoidExtensionAPI $extApi, DOMElement $root, array $options, bool $atTopLevel): void
    {
        throw new \Exception("");
    }
}