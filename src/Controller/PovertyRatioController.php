<?php

namespace App\Controller;

use App\Entity\Coefficient;
use App\Entity\Configurations;
use App\Entity\OldEntity\Choice;
use App\Entity\OldEntity\Type;
use App\Entity\OldEntity\User;
use App\Entity\PovertyRatio;
use App\Entity\Provinces;
use App\Entity\Users;
use App\Service\PovertyRatioServices;
use App\Service\ValidateServices;
use Doctrine\ORM\EntityManagerInterface;
use PhpOffice\PhpSpreadsheet\IOFactory;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;


class PovertyRatioController extends AbstractController
{
    #[Route('/poverty/ratio', name: 'app_poverty_ratio')]
    public function index(EntityManagerInterface $em): Response
    {
        $u = $em->getRepository(PovertyRatio::class)->findAll();
        dd($u);
        return new JsonResponse('mass');
        echo json_encode($data, JSON_UNESCAPED_UNICODE);
        die();
        /*return $this->render('poverty_ratio/index.html.twig', [
            'controller_name' => 'PovertyRatioController',
        ]);*/
    }

    #[Route('poverty-ratio/get-master', name: 'poverty-ratio-get-master', methods: ['POST'])]
    public function GetMaster(EntityManagerInterface $em, Request $rq): Response
    {
        $max = $em->getRepository(Configurations::class)->findOneBy(['name' => 'Max']);
        $min = $em->getRepository(Configurations::class)->findOneBy(['name' => 'Min']);
        $province = $em->getRepository(PovertyRatio::class)->getProvince();
        $year = $em->getRepository(PovertyRatio::class)->getYear();
        $coefficient1 = $em->getRepository(Coefficient::class)->findOneBy(['d' => 1]);
        $coefficient0 = $em->getRepository(Coefficient::class)->findOneBy(['d' => 0]);
//        $province[] = array(
//            "province_id" => 0,
//            "province" => "ทั้งหมด",
//            "d" => 0
//        ) ;
//        $year[] = array(
//            "year" => "ทั้งหมด"
//        );
        return new JsonResponse([
            'max' => $max ? $max->getValue() : 0,
            'min' => $min ? $min->getValue() : 0,
            'year' => $year,
            'province' => $province,
            'coefficient1' => [
                'id' => $coefficient1->getId(),
                'b0' => $coefficient1->getB0(),
                'b1' => $coefficient1->getB1(),
                'b2' => $coefficient1->getB2(),
                'b3' => $coefficient1->getB3(),
                'b4' => $coefficient1->getB4(),
                'b5' => $coefficient1->getB5(),
                'b6' => $coefficient1->getB6(),
                'b7' => $coefficient1->getB7(),
                'd' => $coefficient1->getD(),
                'createDate' => $coefficient1->getDateCreate(),
                'updateDate' => $coefficient1->getDateUpdate(),
                'createById' => $coefficient1->getUserCreate()?->getId(),
                'createByName' => $coefficient1->getUserCreate()?->getName(),
                'updateById' => $coefficient1->getUserUpdate()?->getId(),
                'updateByName' => $coefficient1->getUserUpdate()?->getName(),
            ],
            'coefficient0' => [
                'id' => $coefficient0->getId(),
                'b0' => $coefficient0->getB0(),
                'b1' => $coefficient0->getB1(),
                'b2' => $coefficient0->getB2(),
                'b3' => $coefficient0->getB3(),
                'b4' => $coefficient0->getB4(),
                'b5' => $coefficient0->getB5(),
                'b6' => $coefficient0->getB6(),
                'b7' => $coefficient0->getB7(),
                'd' => $coefficient0->getD(),
                'createDate' => $coefficient0->getDateCreate(),
                'updateDate' => $coefficient0->getDateUpdate(),
                'createById' => $coefficient0->getUserCreate()?->getId(),
                'createByName' => $coefficient0->getUserCreate()?->getName(),
                'updateById' => $coefficient0->getUserUpdate()?->getId(),
                'updateByName' => $coefficient0->getUserUpdate()?->getName(),
            ]
        ]);
    }

    #[Route('api/coefficient/get-data', name: 'coefficient-get-data', methods: ['POST'])]
    public function CoefficientGetData(EntityManagerInterface $em, Request $rq): Response
    {
        $d = $rq->get('d') ?: 1;
        $data = $em->getRepository(Coefficient::class)->findOneBy(['d' => $d]);
        return new JsonResponse($data);
    }

    #[Route('api/coefficient/update-data', name: 'coefficient-update-data', methods: ['POST'])]
    public function CoefficientUpdateInsertData(EntityManagerInterface $em, Request $rq): Response
    {
        date_default_timezone_set('Asia/Bangkok');
        $date = date('Y-m-d');
        $currentDate = \DateTime::createFromFormat('Y-m-d', $date);

        $email = $rq->get('email');
        $id = $rq->get('id');
        $b0 = $rq->get('b0');
        $b1 = $rq->get('b1');
        $b2 = $rq->get('b2');
        $b3 = $rq->get('b3');
        $b4 = $rq->get('b4');
        $b5 = $rq->get('b5');
        $b6 = $rq->get('b6');
        $b7 = $rq->get('b7');

        if ($id && $email) {
            $user = $em->getRepository(Users::class)->findOneBy(['email' => $email]);
            if ($user) {
                $coefficient = $em->getRepository(Coefficient::class)->find($id);
                if ($b0) $coefficient->setB0(floatval($b0));
                if ($b1) $coefficient->setB1(floatval($b1));
                if ($b2) $coefficient->setB2(floatval($b2));
                if ($b3) $coefficient->setB3(floatval($b3));
                if ($b4) $coefficient->setB4(floatval($b4));
                if ($b5) $coefficient->setB5(floatval($b5));
                if ($b6) $coefficient->setB6(floatval($b6));
                if ($b7) $coefficient->setB7(floatval($b7));
//            if ($d) $coefficient->setD(intval($d));
                $coefficient->setUserUpdate($user);
                $coefficient->setDateUpdate($currentDate);
                $em->persist($coefficient);
                $em->flush();
            }
        }

        $coefficient = $em->getRepository(Coefficient::class)->find($id);

        return new JsonResponse([
            'id' => $coefficient->getId(),
            'b0' => $coefficient->getB0(),
            'b1' => $coefficient->getB1(),
            'b2' => $coefficient->getB2(),
            'b3' => $coefficient->getB3(),
            'b4' => $coefficient->getB4(),
            'b5' => $coefficient->getB5(),
            'b6' => $coefficient->getB6(),
            'b7' => $coefficient->getB7(),
        ]);
    }

    #[Route('/poverty-ratio/mass-upload', name: 'poverty-ratio-mass-upload', methods: ['POST'])]
    public function MassUploadPovertyRatio(EntityManagerInterface $em, Request $rq, ValidateServices $vds): Response
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
        $errMsg = [];
        if ($user) {
            if ($getFile) {
                $spreadSheet = IOFactory::load($getFile);
                $workSheet = $spreadSheet->getSheet(0);
                $rows = $workSheet->toArray();
                foreach ($rows as $key => $row) {
                    if ($key === 0 || !$row[0]) continue;
                    $province = null ;
                    $povertyRatio = null ;
                    if (is_numeric($row[0])) {
                        $province = $em->getRepository(Provinces::class)->findOneBy(['provinceId' => $row[0]]);
                        if ($province) {
                            if ($province->getProvinceName() == trim($row[1])) {
                                $povertyRatio = $em->getRepository(PovertyRatio::class)->findOneBy(['province_id' => $row[0], 'year' => $row[2]]);
                            } else {
                                $errMsg[] = $vds->excelColumnErrMsg($key + 1, 'A และ B', 'รหัสจังหวัด และชื่อจังหวัดไม่สอดคล้องกัน');
                            }
                        }else{
                            $errMsg[] = $vds->excelColumnErrMsg($key + 1, 'A', 'กรุณาใส่ตัวเลข');
                        }
                    }else{
                        $errMsg[] = $vds->excelColumnErrMsg($key + 1, 'A', 'กรุณาใส่ตัวเลข');
                    }
                    if (!$povertyRatio) {
                        $povertyRatio = new PovertyRatio();
                        $povertyRatio->setUserCreate($user);
                        $povertyRatio->setDateCreate($currentDate);
                        $povertyRatio->setEnabled(1);
                    } else {
                        $povertyRatio->setUserUpdate($user);
                        $povertyRatio->setDateUpdate($currentDate);
                    }
                    if ($province) $povertyRatio->setProvince($province->getProvinceName());
                    if ($province) $povertyRatio->setProvinceId($province->getProvinceId());
                    if (is_numeric($row[2])) $povertyRatio->setYear($row[2]);
                    else $errMsg[] = $vds->excelColumnErrMsg($key + 1, 'C', 'กรุณาใส่ตัวเลข');
                    if (is_numeric($row[3])) $povertyRatio->setY(floatval($row[3]));
                    else $errMsg[] = $vds->excelColumnErrMsg($key + 1, 'D', 'กรุณาใส่ตัวเลข');
                    if (is_numeric($row[4])) $povertyRatio->setX1(floatval($row[4]));
                    else $errMsg[] = $vds->excelColumnErrMsg($key + 1, 'E', 'กรุณาใส่ตัวเลข');
                    if (is_numeric($row[5])) $povertyRatio->setX2(floatval($row[5]));
                    else $errMsg[] = $vds->excelColumnErrMsg($key + 1, 'F', 'กรุณาใส่ตัวเลข');
                    if (is_numeric($row[6])) $povertyRatio->setX4(floatval($row[6]));
                    else $errMsg[] = $vds->excelColumnErrMsg($key + 1, 'G', 'กรุณาใส่ตัวเลข');
                    if (is_numeric($row[7])) $povertyRatio->setX5(floatval($row[7]));
                    else $errMsg[] = $vds->excelColumnErrMsg($key + 1, 'H', 'กรุณาใส่ตัวเลข');
                    if (is_numeric($row[8])) $povertyRatio->setX3(floatval($row[8]));
                    else $errMsg[] = $vds->excelColumnErrMsg($key + 1, 'I', 'กรุณาใส่ตัวเลข');
                    if (is_numeric($row[9])) $povertyRatio->setX6(floatval($row[9]));
                    else $errMsg[] = $vds->excelColumnErrMsg($key + 1, 'J', 'กรุณาใส่ตัวเลข');
                    $d = 1;
                    if (isset($row[10])) {
                        if (is_numeric($row[10])) {
                            if ($row[10] = 0) $d = 0;
                        }
                    }
                    $povertyRatio->setD($d);
                    $em->persist($povertyRatio);

                }
            }
            /*$data = [];
            $remove = [];
            if ($getFile) {
                $spreadSheet = IOFactory::load($getFile);
                $workSheet = $spreadSheet->getSheet(0);
                $rows = $workSheet->toArray();
                foreach ($rows as $key => $row) {
                    if ($key === 0 || !$row[1]) continue;
                    $provinceId = $row[1];
                    $provinceName = $row[0];
                    if (!isset($data[$provinceId])) {
                        $data[$provinceId]['id'] = $provinceId;
                        $data[$provinceId]['name'] = $provinceName;
                        $data[$provinceId]['year'] = [];
                        $remove[$provinceId]['id'] = $provinceId;
                        $remove[$provinceId]['year'] = [];
                    }
                    $year = $row[2];
                    $data[$provinceId]['year'][$year] = [
                        'y' => $row[3],
                        'x1' => $row[4],
                        'x2' => $row[5],
                        'x3' => $row[6],
                        'x4' => $row[7],
                        'x5' => $row[8],
                        'x6' => $row[9],
                        'd' => $row[10]
                    ];
                    $remove[$provinceId]['year'][] = $year;
                }
            }*/
            ///// ลบข้อมูลเก่าออกก่อน
            /*foreach ($remove as $rm){
                $remove = $em->getRepository(PovertyRatio::class)->findBy(['province_id' => $rm['id'], 'year' => $rm['year']]);
                foreach ($remove as $rmd){
                    $em->remove($rmd);
                }
            }*/
            ///// insert ข้อมูลใหม่
            /*foreach ($data as $keyD1 => $d1) {
                foreach ($d1['year'] as $keyD2 => $d2) {
                    $povertyRatio = new PovertyRatio();
                    $povertyRatio->setProvince($d1['name']);
                    $povertyRatio->setProvinceId($d1['id']);
                    $povertyRatio->setYear($keyD2);
                    $povertyRatio->setY(floatval($d2['y']));
                    $povertyRatio->setX1(floatval($d2['x1']));
                    $povertyRatio->setX2(floatval($d2['x2']));
                    $povertyRatio->setX3(floatval($d2['x3']));
                    $povertyRatio->setX4(floatval($d2['x4']));
                    $povertyRatio->setX5(floatval($d2['x5']));
                    $povertyRatio->setX6(floatval($d2['x6']));
                    $povertyRatio->setD($d2['d'] ? : 0);
                    $povertyRatio->setUserCreate($user);
                    $povertyRatio->setDateCreate($currentDate);
                    $em->persist($povertyRatio);
                }
            }*/
            if (count($errMsg) == 0) $em->flush();
        }
        return new JsonResponse($errMsg);
    }

    #[Route('/poverty-ratio/get-data', name: 'poverty-ratio-get-data', methods: ['POST'])]
    public function PovertyRatioGetData(EntityManagerInterface $em, Request $rq): Response
    {
        $provinceId = $rq->get('provinceId') ? : null;
        $province = $rq->get('province') ?: null;
        $yearFrom = $rq->get('yearFrom') ?: null;
        $yearTo = $rq->get('yearTo') ?: null;
        $d = $rq->get('d') ?: 1;
        $province != 'ทั้งหมด' ? : $province = null  ;
        $yearFrom != 'ทั้งหมด' ? : $yearFrom = null  ;
//        if ($yearFrom && !$yearTo) $yearTo = $yearFrom;

        //dd($provinceId,$province,$year,$d);
        // ตาก 215, เชียงราย 205, มุกดาหาร 105 , นครพนม 106 , ตราด 404, ระนอง 303, สงขลา 308

        $povertyRatios = $em->getRepository(PovertyRatio::class)->filterData($provinceId, $province, $yearFrom, $yearTo, $d);
        $data = [];
        foreach ($povertyRatios as $val) {
            $data[] = [
                "id" => $val->getId(),
                "provinceId" => $val->getProvinceId(),
                "province" => $val->getProvince(),
                "year" => $val->getYear(),
                "y" => $val->getY(),
                "x1" => $val->getX1(),
                "x2" => $val->getX2(),
                "x3" => $val->getX3(),
                "x4" => $val->getX4(),
                "x5" => $val->getX5(),
                "x6" => $val->getX6(),
                "d" => $val->getD(),
                "userCreateId" => $val->getUserCreate()?->getId(),
                "userCreateName" => $val->getUserCreate()?->getName(),
                "dateCreate" => $val->getDateCreate()?->format('d/m/Y H:i:s'),
                "userUpdateId" => $val->getUserUpdate()?->getId(),
                "userUpdateName" => $val->getUserUpdate()?->getName(),
                "dateUpdate" => $val->getDateUpdate()?->format('d/m/Y H:i:s'),
                "enabled" => $val->isEnabled()
            ];
//            if (($val->getProvinceId() == 215) || ($val->getProvinceId() == 205) || ($val->getProvinceId() == 105) || ($val->getProvinceId() == 106 || ($val->getProvinceId() == 404) || ($val->getProvinceId() == 303) || ($val->getProvinceId() == 308))) {
//                $data[] = [
//                    "id" => $val->getId(),
//                    "provinceId" => $val->getProvinceId(),
//                    "province" => $val->getProvince(),
//                    "year" => $val->getYear(),
//                    "y" => $val->getY(),
//                    "x1" => $val->getX1(),
//                    "x2" => $val->getX2(),
//                    "x3" => $val->getX3(),
//                    "x4" => $val->getX4(),
//                    "x5" => $val->getX5(),
//                    "x6" => $val->getX6(),
//                    "d" => $val->getD(),
//                    "userCreateId" => $val->getUserCreate()?->getId(),
//                    "userCreateName" => $val->getUserCreate()?->getName(),
//                    "dateCreate" => $val->getDateCreate()?->format('d/m/Y H:i:s'),
//                    "userUpdateId" => $val->getUserUpdate()?->getId(),
//                    "userUpdateName" => $val->getUserUpdate()?->getName(),
//                    "dateUpdate" => $val->getDateUpdate()?->format('d/m/Y H:i:s'),
//                    "enabled" => $val->isEnabled()
//                ];
//            }
        }

        // $data[] = [
        //         "id" => 1,
        //         "provinceId" => 103,
        //         "province" => 'เลย',
        //         "year" => 2560,
        //         "y" => 1.280933845,
        //         "x1" => 4.178226046,
        //         "x2" => 2.768831673,
        //         "x3" => 7.998671361,
        //         "x4" => 8.053251154,
        //         "x5" => 5.749392986,
        //         "x6" => 5.164,
        //         "d" => 1,
        //         "userCreateId" => 1,
        //         "userCreateName" => 'admin',
        //         "dateCreate" => '7/1/2024 10:20:00',
        //         "userUpdateId" => 1,
        //         "userUpdateName" => 'admin',
        //         "dateUpdate" => '7/1/2024 10:20:00',
        // ];

        //dd($data);

        return new JsonResponse($data);
    }

    #[Route('/poverty-ratio/get-data-list', name: 'poverty-ratio-get-data-list', methods: ['POST'])]
    public function PovertyRatioGetDataList(EntityManagerInterface $em, Request $rq, PovertyRatioServices $sv): Response
    {
        $provinceId = $rq->get('provinceId') ?: null;
        $year = $rq->get('year') ?: null;
        $toYear = $rq->get('toYear') ?: null;
        $x1 = $rq->get('x1') ?: null;
        $x2 = $rq->get('x2') ?: null;
        $x3 = $rq->get('x3') ?: null;
        $x4 = $rq->get('x4') ?: null;
        $x5 = $rq->get('x5') ?: null;
        $x6 = $rq->get('x6') ?: null;

        //dd($provinceId,$year,$toYear,$x1,$x2,$x3,$x4,$x5,$x6);

        $xAxisEach = [];
        $xAxises = [];
        $yAxisEach = [];
        $yAxises = [];

        $xAxisEach = [
            "scaleType" => "band",
            "id" => "years",
            "label" => "years",
            "data" => []
        ];

        $yAxisEach = [
            "type" => 'line',
            "id" => 'provertyRatio',
            "yAxisKey" => 'provertyRatio',
            "data" => [],
            "label" => "provertyRatio",
            "color" => "red"
        ];

        $values = $em->getRepository(PovertyRatio::class)->getBarGraph($provinceId, $year, $toYear, $x1, $x2, $x3, $x4, $x5, $x6);

        $arrX1 = [];
        $arrX2 = [];
        $arrX3 = [];
        $arrX4 = [];
        $arrX5 = [];
        $arrX6 = [];

        foreach ($values as $value) {
            $xAxisEach['data'][] = $value['year'];
            /*$yAxisEach['data'][] = $value['y']*10;
            if (isset($value['x1'])) $arrX1[] = $value['x1']*10;
            if (isset($value['x2'])) $arrX2[] = $value['x2']*10;
            if (isset($value['x3'])) $arrX3[] = $value['x3']*10;
            if (isset($value['x4'])) $arrX4[] = $value['x4']*10;
            if (isset($value['x5'])) $arrX5[] = $value['x5']*10;
            if (isset($value['x6'])) $arrX6[] = $value['x6']*10;*/
            $yAxisEach['data'][] = log($value['y']);
            if (isset($value['x1'])) $arrX1[] = log($value['x1']);
            if (isset($value['x2'])) $arrX2[] = log($value['x2']);
            if (isset($value['x3'])) $arrX3[] = log($value['x3']);
            if (isset($value['x4'])) $arrX4[] = log($value['x4']);
            if (isset($value['x5'])) $arrX5[] = log($value['x5']);
            if (isset($value['x6'])) $arrX6[] = log($value['x6']);
        }

        $xAxises[] = $xAxisEach;
        $yAxises[] = $yAxisEach;

        if (count($arrX1) > 0) $yAxises[] = $sv->CreateYaxis($arrX1, 'x1', 'สัดส่วนวัยแรงงาน', '#2E96FF');
        if (count($arrX2) > 0) $yAxises[] = $sv->CreateYaxis($arrX2, 'x2', 'สัดส่วนวัยสูงอายุ', '#B800D8');
        if (count($arrX3) > 0) $yAxises[] = $sv->CreateYaxis($arrX3, 'x3', 'สัดส่วนคนต่างด้าว', '#60009B');
        if (count($arrX4) > 0) $yAxises[] = $sv->CreateYaxis($arrX4, 'x4', 'สัดส่วนรับแจ้งคดียาเสพติด', '#2731C8');
        if (count($arrX5) > 0) $yAxises[] = $sv->CreateYaxis($arrX5, 'x5', 'สัดส่วนรับแจ้งฐานความผิดพิเศษ', '#03008D');
        if (count($arrX6) > 0) $yAxises[] = $sv->CreateYaxis($arrX6, 'x6', 'สัดส่วนจำนวนแพทย์', '#02B2AF');


        /* $yAxisEach = [
             "type"=> 'bar',
             "id"=> 'x0',
             "yAxisKey"=> 'ratios',
             "data"=> [6.2, 6.2],
         ];

         $yAxises[] = $yAxisEach;

         $yAxisEach = [
             "type"=> 'bar',
             "id"=> 'x1',
             "yAxisKey"=> 'ratios',
             "data"=> [4.2, 4.2],
         ];

         $yAxises[] = $yAxisEach;*/

        $data[] = [$xAxises, $yAxises];

        return new JsonResponse($data);
    }

    #[Route('api/poverty-ratio/search', name: 'poverty-ratio-search', methods: ['POST'])]
    public function PovertyRatioSearch(EntityManagerInterface $em, Request $rq): Response
    {
        $provinceId = $rq->get('provinceId') ?: null;
        $year = $rq->get('year') ?: null;
        $toYear = $rq->get('toYear') ?: null;
        $d = $rq->get('d') ?: null;
        if (!$toYear) $toYear = $year;

        $povertyRatio = $em->getRepository(PovertyRatio::class)->search($provinceId, $year, $toYear, $d);
        $data = [];
        foreach ($povertyRatio as $val) {
            $data[] = [
                "id" => $val->getId(),
                "provinceId" => $val->getProvinceId(),
                "province" => $val->getProvince(),
                "year" => $val->getYear(),
                "y" => $val->getY(),
                "x1" => $val->getX1(),
                "x2" => $val->getX2(),
                "x3" => $val->getX3(),
                "x4" => $val->getX4(),
                "x5" => $val->getX5(),
                "x6" => $val->getX6(),
                "d" => $val->getD(),
                "userCreateId" => $val->getUserCreate()?->getId(),
                "userCreateName" => $val->getUserCreate()?->getName(),
                "dateCreate" => $val->getDateCreate()?->format('d/m/Y H:i:s'),
                "userUpdateId" => $val->getUserUpdate()?->getId(),
                "userUpdateName" => $val->getUserUpdate()?->getName(),
                "dateUpdate" => $val->getDateUpdate()?->format('d/m/Y H:i:s'),
            ];
        }
        return new JsonResponse($data);
    }

    #[Route('api/poverty-ratio/update-insert-data', name: 'poverty-ratio-update-insert-data', methods: ['POST'])]
    public function PovertyRatioUpdateData(EntityManagerInterface $em, Request $rq): Response
    {
        date_default_timezone_set('Asia/Bangkok');
        $date = date('Y-m-d');
        $currentDate = \DateTime::createFromFormat('Y-m-d', $date);

        $id = $rq->get('id');
        $email = $rq->get('email');
        $year = $rq->get('year');
        $provinceId = $rq->get('provinceId');
        $province = $rq->get('province');

        $y = $rq->get('y');
        $x1 = $rq->get('x1');
        $x2 = $rq->get('x2');
        $x3 = $rq->get('x3');
        $x4 = $rq->get('x4');
        $x5 = $rq->get('x5');
        $x6 = $rq->get('x6');
        $d = $rq->get('d');
        ///// update
        if ($id && $year && $provinceId && $email) {
            $povertyRatio = $em->getRepository(PovertyRatio::class)->findOneBy(['id' => $id, 'year' => $year, 'province_id' => $provinceId]);
            $user = $em->getRepository(Users::class)->findOneBy(['email' => $email]);
            if ($povertyRatio && $user) {
                if ($y) $povertyRatio->setY(floatval($y));
                if ($x1) $povertyRatio->setX1(floatval($x1));
                if ($x2) $povertyRatio->setX2(floatval($x2));
                if ($x3) $povertyRatio->setX3(floatval($x3));
                if ($x4) $povertyRatio->setX4(floatval($x4));
                if ($x5) $povertyRatio->setX5(floatval($x5));
                if ($x6) $povertyRatio->setX6(floatval($x6));
                if (is_numeric($d)) $povertyRatio->setD($d);
                $povertyRatio->setUserUpdate($user);
                $povertyRatio->setDateUpdate($currentDate);
                $em->persist($povertyRatio);
                $em->flush();
            }
        }
        ///// insert
        if (!$id && $year && $provinceId && $email) {
            $povertyRatio = $em->getRepository(PovertyRatio::class)->findOneBy(['year' => $year, 'province_id' => $provinceId]);
            $user = $em->getRepository(Users::class)->findOneBy(['email' => $email]);
            if (!$povertyRatio && $user) {
                $povertyRatio = new PovertyRatio();
                $povertyRatio->setProvince($province);
                $povertyRatio->setProvinceId($provinceId);
                $povertyRatio->setYear($year);
                if ($y) $povertyRatio->setY(floatval($y));
                if ($x1) $povertyRatio->setX1(floatval($x1));
                if ($x2) $povertyRatio->setX2(floatval($x2));
                if ($x3) $povertyRatio->setX3(floatval($x3));
                if ($x4) $povertyRatio->setX4(floatval($x4));
                if ($x5) $povertyRatio->setX5(floatval($x5));
                if ($x6) $povertyRatio->setX6(floatval($x6));
                if (is_numeric($d)) $povertyRatio->setD($d);
                $povertyRatio->setUserCreate($user);
                $povertyRatio->setDateCreate($currentDate);
                $em->persist($povertyRatio);
                $em->flush();
            }
        }
        return new JsonResponse();
    }

    #[Route('api/poverty-ratio/delete-data', name: 'poverty-ratio-delete-data', methods: ['POST'])]
    public function PovertyRatioDeleteData(EntityManagerInterface $em, Request $rq): Response
    {
        $id = $rq->get('id');
        if ($id) {
            $povertyRatio = $em->getRepository(PovertyRatio::class)->find($id);
            $em->remove($povertyRatio);
            $em->flush();
        }
        return new JsonResponse();
    }

    #[Route('api/poverty-ratio/disabled', name: 'disabled-poverty-ratio', methods: ['POST'])]
    public function DisabledPovertyRatio(EntityManagerInterface $em, Request $rq): Response
    {
        date_default_timezone_set('Asia/Bangkok');
        $date = date('Y-m-d');
        $currentDate = \DateTime::createFromFormat('Y-m-d', $date);

        $id = $rq->get('id');
        $email = $rq->get('email');
        if ($id && $email) {
            $povertyRatio = $em->getRepository(PovertyRatio::class)->find($id);
            $user = $em->getRepository(Users::class)->findOneBy(['email' => $email]);
            if ($povertyRatio && $user) {
                $povertyRatio->setEnabled(0);
                $povertyRatio->setDateUpdate($currentDate);
                $povertyRatio->setUserUpdate($user);
                $em->persist($povertyRatio);
                $em->flush();
            }
        }
        return new JsonResponse();
    }

    #[Route('api/poverty-ratio/enabled', name: 'enabled-poverty-ratio', methods: ['POST'])]
    public function EnabledPovertyRatio(EntityManagerInterface $em, Request $rq): Response
    {
        date_default_timezone_set('Asia/Bangkok');
        $date = date('Y-m-d');
        $currentDate = \DateTime::createFromFormat('Y-m-d', $date);

        $id = $rq->get('id');
        $email = $rq->get('email');
        if ($id && $email) {
            $povertyRatio = $em->getRepository(PovertyRatio::class)->find($id);
            $user = $em->getRepository(Users::class)->findOneBy(['email' => $email]);
            if ($povertyRatio && $user) {
                $povertyRatio->setEnabled(1);
                $povertyRatio->setDateUpdate($currentDate);
                $povertyRatio->setUserUpdate($user);
                $em->persist($povertyRatio);
                $em->flush();
            }
        }
        return new JsonResponse();
    }

    #[Route('api/user/get-data', name: 'user-get-data', methods: ['GET'])]
    public function GetUsersData(EntityManagerInterface $em): Response
    {
        $users = $em->getRepository(Users::class)->findAll();
        $res = [];
        foreach ($users as $us) {
            $res[] = [
                'id' => $us->getId(),
                'email' => $us->getEmail(),
                'roleName' => implode(', ', $us->getRoles()),
                'role' => $us->getRoles(),
                'name' => $us->getName(),
                'status' => $us->isIsEnabled(),
//                'password' => $us->getPassword(),
            ];
        }
        return new JsonResponse($res);
    }

    #[Route('api/user/get-data-by-id', name: 'user-get-data-by-id', methods: ['POST'])]
    public function GetUsersDataById(EntityManagerInterface $em, Request $rq,): Response
    {
        $id = $rq->get('id');
        $us = $em->getRepository(Users::class)->find($id);
        $res = [];
        if ($us) {
            $res[] = [
                'id' => $us->getId(),
                'email' => $us->getEmail(),
                'roles' => $us->getRoles(),
                'name' => $us->getName(),
            ];
        }
        return new JsonResponse($res);
    }

    #[Route('api/user/update-insert', name: 'user-update-insert', methods: ['POST'])]
    public function UserUpdateInsert(EntityManagerInterface $em, Request $rq, UserPasswordHasherInterface $encoder): Response
    {
        $id = $rq->get('id');
        $email = $rq->get('email');
        $roles = $rq->get('roles');
        $password = $rq->get('password');
        $name = $rq->get('name');
        if ($id) {
            $user = $em->getRepository(Users::class)->find($id);
            if ($user) {
                if ($email) $user->setEmail($email);
                if ($roles) $user->setRoles((array)$roles);
                if ($name) $user->setName($name);
                if ($password) {
                    $encodedPassword = $encoder->hashPassword($user, $password);
                    $user->setPassword($encodedPassword);
                }
            }
        } else {
            $user = $em->getRepository(Users::class)->findOneBy(['email' => $email]);
            if (!$user) {
                $user = new Users();
                $user->setEmail($email);
                $user->setName($name);
                $user->setRoles((array)$roles);
                $user->setIsEnabled(1);

                $encodedPassword = $encoder->hashPassword($user, $password);
                $user->setPassword($encodedPassword);
            }
        }
        $em->persist($user);
        $em->flush();

        return new JsonResponse();
    }

    #[Route('api/user/disabled/{id}', name: 'disabled-user', methods: ['POST'])]
    public function DisabledUser(EntityManagerInterface $em, int $id): Response
    {
//        $id = $rq->get('id');
        if ($id) {
            $user = $em->getRepository(Users::class)->find($id);
            if ($user) {
                $user->setIsEnabled(0);
                $em->persist($user);
                $em->flush();
            }
        }
        return new JsonResponse();
    }

    #[Route('api/user/enabled/{id}', name: 'enabled-user', methods: ['POST'])]
    public function EnabledUser(EntityManagerInterface $em, int $id): Response
    {
        if ($id) {
            $user = $em->getRepository(Users::class)->find($id);
            if ($user) {
                $user->setIsEnabled(1);
                $em->persist($user);
                $em->flush();
            }
        }
        return new JsonResponse();
    }

    #[Route('api/user/reset-pass', name: 'user-reset-pass', methods: ['POST'])]
    public function UserResetPass(EntityManagerInterface $em, Request $rq, UserPasswordHasherInterface $encoder): Response
    {
        $email = $rq->get('email');
        $oldPassword = $rq->get('oldPassword');
        $confirmPassword = $rq->get('confirmPassword');
        if ($email) {
            $user = $em->getRepository(Users::class)->findOneBy(['email' => $email]);
            if ($user) {
                /*$isPasswordValid = $encoder->isPasswordValid($user, $oldPassword);
                if ($isPasswordValid) {*/
                if ($confirmPassword) {
                    $encodedPassword = $encoder->hashPassword($user, $confirmPassword);
                    $user->setPassword($encodedPassword);

                    $em->persist($user);
                    $em->flush();
                }
                /*} else {
                    return new JsonResponse([
                        'status' => false,
                        'message' => 'รหัสผ่านเดิมไม่ถูกต้อง'
                    ]);
                }*/
            } else {
                return new JsonResponse([
                    'status' => false,
                    'message' => 'ผู้ใช้นี้ไม่มีในระบบ'
                ]);
            }
        }
        return new JsonResponse([
            'status' => true,
        ]);
    }

    #[Route('/poverty-ratio/get-data-graph', name: 'poverty-ratio-get-data-graph', methods: ['POST'])]
    public function PovertyRatioGetDataGraph(EntityManagerInterface $em, Request $rq, PovertyRatioServices $sv): Response
    {
        $provinceId = $rq->get('provinceId') ?: null;
        $graphNo = $rq->get('graphNo') ?: null;
        $developFactor = $rq->get('developFactor') ?: null;

        /* 1.ข้อมูลสถิติ จำนวนประชากร if $graphNo = 1 , $developFactor= จำนวนประชากร เอาแค่ ตาก,เชียงราย 
           2.ข้อมูลสถิติ จำนวนบ้านเรือน if $graphNo = 1 , $developFactor= จำนวนบ้านเรือน , เอาแค่ ตาก,เชียงราย 
           
           3.ข้อมูลสถิติ จำนวนคนจน if $graphNo = 2 $developFactor= จำนวนคนจน , เอาแค่ จังหวัดนครพนม จังหวัเชียงราย จังหวัดตาก จังหวัดระนอง จังหวัดสงขลา จังหวัดตราด
           4.ข้อมูลสถิติ ผลิตภัณฑ์มวลรวม (GPP) การค้าชายแดน if $graphNo = 2 $developFactor= ผลิตภัณฑ์มวลรวม (GPP) การค้าชายแดน , เอาแค่ จังหวัดนครพนม จังหวัเชียงราย จังหวัดตาก จังหวัดระนอง จังหวัดสงขลา จังหวัดตราด
           5.ข้อมูลสถิติ การพัฒนาคน if $graphNo = 3 $developFactor= การพัฒนาคน 
           6.ข้อมูลสถิติ เศรษฐกิจและความมั่นคง if $graphNo = 3 $developFactor= เศรษฐกิจและความมั่นคง
           7.ข้อมูลสถิติ สิ่งแวดล้อม if $graphNo = 3 $developFactor= สิ่งแวดล้อม
           8.ข้อมูลสถิติ สันติและความยุติธรรม if $graphNo = 3 $developFactor= สันติและความยุติธรรม
           9.ข้อมูลสถิติ ความเป็นหุ้นส่วนการพัฒนา if $graphNo = 3 $developFactor= ความเป็นหุ้นส่วนการพัฒนา

           [{
                dataset  :[
                    {
                        data : [532353,
                            539553,
                            618382,
                            631965,
                            644267,
                            654676,
                            665620,
                            670265,
                            676583,
                            684140],
                        label:'ตาก',
                        id:'106', // ใช้ provinceId
                    },{
                        data : [1204660,
                            1207699,
                            1277950,
                            1282544,
                            1287615,
                            1292130,
                            1298304,
                            1295026,
                            1298425,
                            1299636],
                            label:'เชียงราย',
                            id:'105', // ใช้ provinceId
                    }
                ],
                label : [ // ใช้ปีทั้งหมดของจังหวัดที่มี developFactor:1 
                    '2556',
                    '2557',
                    '2558',
                    '2559',
                    '2560',
                    '2561',
                    '2562',
                    '2563',
                    '2564',
                    '2565'
                ],
                graphNo:1,
                developFactor:1
            }]

           10.ข้อมูลสถิติ ผลกระทบปัจจัยด้านสถานการณ์ความมั่นคง if $graphNo = 4 provinceId= 106
           [{
                dataset: [
                    {
                        data: [90,
                            90,
                            105],
                        label: 'น้อยที่สุด',
                        id: '106',
                    }, {
                        data: [10,
                            12,
                            3],
                        label: 'น้อย',
                        id: '106',
                    }, {
                        data: [8,
                            6,
                            1],
                        label: 'ปานกลาง',
                        id: '106',
                    }, {
                        data: [1,
                            0,
                            0],
                        label: 'มากที่สุด',
                        id: '106',
                    }
                ],
                label: ['ระดับผลกระทบ (คน/ร้อยละ)'],
                graphNo: 4,
                developFactor: 1
            }]
            
           11.1 ข้อมูลสถิติ การหลุดพ้นความยากจน (11.1 กราฟวงกลม) if $graphNo = 5 provinceId= 106
           11.2 ข้อมูลสถิติ การหลุดพ้นความยากจน (11.2 กราฟแท่ง) if $graphNo = 6 provinceId= 106
        */

        /* $yAxisEach = [
            "type"=> 'bar',
            "id"=> 'x0',
            "yAxisKey"=> 'ratios',
            "data"=> [6.2, 6.2],
        ];

        $yAxises[] = $yAxisEach;

        $yAxisEach = [
            "type"=> 'bar',
            "id"=> 'x1',
            "yAxisKey"=> 'ratios',
            "data"=> [4.2, 4.2],
        ];

        $yAxises[] = $yAxisEach;*/

        // $data[] = [$xAxises,$yAxises];

        $data[] = [];

        return new JsonResponse($data);
    }
}
