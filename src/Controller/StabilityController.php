<?php

namespace App\Controller;

use App\Entity\Factors;
use App\Entity\Provinces;
use App\Entity\Stability;
use App\Entity\Users;
use App\Service\ValidateServices;
use Doctrine\ORM\EntityManagerInterface;
use PhpOffice\PhpSpreadsheet\IOFactory;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class StabilityController extends AbstractController
{
    #[Route('/api/stability/get-year', name: 'stability_get_year')]
    public function GetYear(EntityManagerInterface $em): Response
    {
        $year = $em->getRepository(Stability::class)->getYear();
        $yearArr = [];
        $yearArr[] = array(
            'yearId' => 0,
            'yearName' => 'ทั้งหมด',
        );
        foreach ($year as $val) {
            $yearArr[] = array(
                'yearId' => $val['year'],
                'yearName' => $val['year'],
            );
        }
        return new JsonResponse([
            'year' => $yearArr
        ]);
    }

    #[Route('/api/stability/get-provinces', name: 'stability_get_provinces')]
    public function GetProvinces(EntityManagerInterface $em): Response
    {
        $provinces = $em->getRepository(Stability::class)->getProvincesByEn();
        $provinceArr = [];
        $provinceArr[] = array(
            'provinceId' => 0,
            'provinceName' => "ทั้งหมด",
            'd' => 0,
        );
        foreach ($provinces as $province) {
            $provinceArr[] = array(
                'provinceId' => $province['provinceId'],
                'provinceName' => $province['provinceName'],
                'd' => $province['d'] ? 1 : 0,
            );
        }

        return new JsonResponse([
            'province' => $provinceArr
        ]);
    }

    #[Route('/api/stability/get-factor', name: 'stability_get_factor')]
    public function GetFactor(EntityManagerInterface $em): Response
    {
        $factors = $em->getRepository(Factors::class)->findBy(['subGroup' => '8']);
        $factorArr = [];

        foreach ($factors as $ft) {
            $factorArr[] = array(
                'factorId' => $ft->getId(),
                'factorName' => $ft->getFactorName(),
            );
        }
        return new JsonResponse([
            'factor' => $factorArr
        ]);
    }

    #[Route('/api/stability/search', name: 'stability_search', methods: ['POST'])]
    public function Search(EntityManagerInterface $em, Request $request): Response
    {
        $provinceId = $request->get('provinceId');
        $year = $request->get('year') ? $request->get('year') : null;
        $provinces = null;
        if ($provinceId) {
            $provinces = $em->getRepository(Provinces::class)->findOneBy(['provinceId' => $provinceId]);
        }

        $en = $em->getRepository(Stability::class)->findByProvinceAndYear($provinces, $year);

        $resArr = [];
        foreach ($en as $val) {
            $resArr[] = array(
                'id' => $val->getId(),
                'provinceId' => $val->getProvince()?->getProvinceId(),
                'provinceName' => $val->getProvince()?->getProvinceName(),
                'factorId' => $val->getFactor()->getId(),
                'factorName' => $val->getFactor()->getFactorName(),
                'subFactorId' => $val->getSubFactor()->getId(),
                'subFactorName' => $val->getSubFactor()->getFactorName(),
                'year' => $val->getYear(),
                'value1' => $val->getValue1(),
                'value2' => $val->getValue2(),
                'value3' => $val->getValue3(),
                'value4' => $val->getValue4(),
                'value5' => $val->getValue5(),
                'isEnabled' => $val->isIsEnabled(),
            );
        }

        return new JsonResponse($resArr);
    }

    #[Route('/api/stability/mass-upload', name: 'stability_mass_upload', methods: ['POST'])]
    public function MassUpload(EntityManagerInterface $em, Request $rq, ValidateServices $vds): Response
    {
        set_time_limit(-1);
        date_default_timezone_set('Asia/Bangkok');
        $date = date('Y-m-d');
        $currentDate = \DateTime::createFromFormat('Y-m-d', $date);

        $getFile = $rq->files->get('files');
        $email = $rq->get('email');
        $user = null;
        if ($email) {
            $user = $em->getRepository(Users::class)->findOneBy(['email' => $email]);
        }
        $errMsg  = [];
        if ($user) {
            if ($getFile) {
                $spreadSheet = IOFactory::load($getFile);
                $workSheet = $spreadSheet->getSheet(0);
                $rows = $workSheet->toArray();
                foreach ($rows as $key => $row) {
                    if ($key === 0 || !$row[0] || !$row[2] || !$row[4]) continue;
                    $province = null;
                    if (is_numeric($row[0])) {
                        $province = $em->getRepository(Provinces::class)
                            ->findOneBy(['provinceId' => $row[0]]);
                        if ($province) {
                            if ($province->getProvinceName() != trim($row[1])) {
                                $province = null;
                                $errMsg[] = $vds->excelColumnErrMsg($key + 1, 'A และ B', 'รหัสจังหวัด และชื่อจังหวัดไม่สอดคล้องกัน');
                            }
                        }else{
                            $errMsg[] = $vds->excelColumnErrMsg($key+1,'A','ไม่มีรหัสจังหวัดนี้');
                        }
                    }else{
                        $errMsg[] = $vds->excelColumnErrMsg($key+1,'A','กรุณาใส่ตัวเลข');
                    }
                    $factor = null;
                    if (is_numeric($row[2])) {
                        $factor = $em->getRepository(Factors::class)->findOneBy(['id' => $row[2], 'subGroup' => 8] );
                        if (!$factor) {
                            $errMsg[] = $vds->excelColumnErrMsg($key+1,'C','ไม่มีรหัสปัจจัยนี้');
                        } else{
                            if ($factor->getFactorName() != trim($row[3])) {
                                $factor = null;
                                $errMsg[] = $vds->excelColumnErrMsg($key + 1, 'C และ D', 'รหัสปัจจัย และชื่อปัจจัยไม่สอดคล้องกัน');
                            }
                        }
                    }else{
                        $errMsg[] = $vds->excelColumnErrMsg($key+1,'C','กรุณาใส่ตัวเลข');
                    }
                    $sfArr = [28,29,30,31,32,33];
                    $subFactor = null;
                    if (is_numeric($row[4])) {
                        $subFactor = $em->getRepository(Factors::class)->findOneBy(['id' => $row[4], 'subGroup' => $sfArr] );
                        if (!$subFactor) {
                            $errMsg[] = $vds->excelColumnErrMsg($key+1,'E','ไม่มีรหัสปัจจัยนี้');
                        }else{
                            if ($subFactor->getFactorName() != trim($row[5])) {
                                $subFactor = null;
                                $errMsg[] = $vds->excelColumnErrMsg($key + 1, 'E และ F', 'รหัสปัจจัยรอง และชื่อปัจจัยรองไม่สอดคล้องกัน');
                            }
                        }
                    }else{
                        $errMsg[] = $vds->excelColumnErrMsg($key+1,'E','กรุณาใส่ตัวเลข');
                    }
                    $en = null ;
                    if ($province && $factor && $subFactor) $en = $em->getRepository(Stability::class)->findOneBy([
                            'province' => $province,
                            'factor' => $factor,
                            'subFactor' => $subFactor,
                            'year' => $row[6]
                        ]);
                    if (!$en) {
                        $en = new Stability();
                        $en->setUserCreate($user);
                        $en->setDateCreate($currentDate);
                        $en->setIsEnabled(1);
                    } else {
                        $en->setUserUpdate($user);
                        $en->setDateUpdate($currentDate);
                    }
                    if ($province) $en->setProvince($province);
                    if ($factor) $en->setFactor($factor);
                    if ($subFactor) $en->setSubFactor($subFactor);
                    if (is_numeric($row[6])) $en->setYear($row[6]);
                    else $errMsg[] = $vds->excelColumnErrMsg($key + 1, 'G', 'กรุณาใส่ตัวเลข');
                    if (is_numeric($row[7])) $en->setValue1($row[7]);
                    else $errMsg[] = $vds->excelColumnErrMsg($key + 1, 'H', 'กรุณาใส่ตัวเลข');
                    if (is_numeric($row[8])) $en->setValue2($row[8]);
                    else $errMsg[] = $vds->excelColumnErrMsg($key + 1, 'I', 'กรุณาใส่ตัวเลข');
                    if (is_numeric($row[9])) $en->setValue3($row[9]);
                    else $errMsg[] = $vds->excelColumnErrMsg($key + 1, 'J', 'กรุณาใส่ตัวเลข');
                    if (is_numeric($row[10])) $en->setValue4($row[10]);
                    else $errMsg[] = $vds->excelColumnErrMsg($key + 1, 'K', 'กรุณาใส่ตัวเลข');
                    if (is_numeric($row[11])) $en->setValue5($row[11]);
                    else $errMsg[] = $vds->excelColumnErrMsg($key + 1, 'L', 'กรุณาใส่ตัวเลข');
                    $em->persist($en);
                }
                if (count($errMsg) == 0) $em->flush();
            }
        }
        return new JsonResponse($errMsg);
    }

    #[Route('/api/stability/update', name: 'partnership_is_update', methods: ['POST'])]
    public function Update(EntityManagerInterface $em, Request $request): Response
    {
        date_default_timezone_set('Asia/Bangkok');
        $date = date('Y-m-d');
        $currentDate = \DateTime::createFromFormat('Y-m-d', $date);

        $id = $request->get('id');
        $email = $request->get('email');
        $value1 = $request->get('value1');
        $value2 = $request->get('value2');
        $value3 = $request->get('value3');
        $value4 = $request->get('value4');
        $value5 = $request->get('value5');
        if ($email) {
            $user = $em->getRepository(Users::class)->findOneBy(['email' => $email]);
            if ($user) {
                if ($id) {
                    $val = $em->getRepository(Stability::class)->find($id);
                    if ($val) {
                        $val->setValue1($value1);
                        $val->setValue2($value2);
                        $val->setValue3($value3);
                        $val->setValue4($value4);
                        $val->setValue5($value5);
                        $val->setUserUpdate($user);
                        $val->setDateUpdate($currentDate);
                        $em->persist($val);
                        $em->flush();
                    }
                }
            }
        }
        return new JsonResponse();
    }

    #[Route('/api/stability/is-enabled', name: 'partnership_is_enabled', methods: ['POST'])]
    public function IsEnabled(EntityManagerInterface $em, Request $request): Response
    {
        date_default_timezone_set('Asia/Bangkok');
        $date = date('Y-m-d');
        $currentDate = \DateTime::createFromFormat('Y-m-d', $date);

        $isEnabled = $request->get('isEnabled');
        $id = $request->get('id');
        $email = $request->get('email');
        if ($email) {
            $user = $em->getRepository(Users::class)->findOneBy(['email' => $email]);
            if ($user) {
                if ($id) {
                    $val = $em->getRepository(Stability::class)->find($id);
                    if ($val) {
                        $val->setIsEnabled(!$isEnabled);
                        $val->setUserUpdate($user);
                        $val->setDateUpdate($currentDate);
                        $em->persist($val);
                        $em->flush();
                    }
                }
            }
        }
        return new JsonResponse();
    }
}