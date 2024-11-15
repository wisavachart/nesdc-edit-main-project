<?php

namespace App\Service;

// use JetBrains\PhpStorm\ArrayShape;

class PovertyRatioServices
{
    // #[ArrayShape(["type" => "string", "id" => "string", "yAxisKey" => "string", "data" => "array"])]
    public function CreateYaxis(array $arrX, string $id, string $label, string $color): array
    {
        return [
            "type" => 'bar',
            "id" => $id,
            "label" => $label,
            "yAxisKey" => 'ratios',
            "data" => $arrX,
            "color" => $color,
        ];
    }
}
