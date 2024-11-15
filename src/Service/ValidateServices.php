<?php

namespace App\Service;

use App\Entity\Provinces;
use Doctrine\ORM\EntityManagerInterface;

class ValidateServices
{
    public function __construct(private EntityManagerInterface $em)
    {
    }

    public function getProvinceCode(): array
    {
        $em = $this->em;
        $provinces = $em->getRepository(Provinces::class)->findAll();
        $resArr = [];
        foreach ($provinces as $pr) {
            $resArr[] = $pr->getProvinceId();
        }
        return $resArr;
    }

    public function excelColumnErrMsg(string $row, string $column, string $msg): string
    {
        return 'แถวที่ '.$row.' column '. $column.' : '.$msg;
    }
}