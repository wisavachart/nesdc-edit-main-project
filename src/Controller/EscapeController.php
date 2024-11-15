<?php

namespace App\Controller;

use App\Entity\Escape;
use App\Entity\Factors;
use App\Entity\Provinces;
use App\Entity\Users;
use App\Service\ValidateServices;
use Doctrine\ORM\EntityManagerInterface;
use PhpOffice\PhpSpreadsheet\IOFactory;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class EscapeController extends AbstractController
{
    #[Route('/api/escape/get-year', name: 'escape_get_year')]
    public function GetYear(EntityManagerInterface $em): Response
    {
        $year = $em->getRepository(Escape::class)->getYear();
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

    #[Route('/api/escape/get-provinces', name: 'escape_get_provinces')]
    public function GetProvinces(EntityManagerInterface $em): Response
    {
        $provinces = $em->getRepository(Escape::class)->getProvincesByEn();
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

    #[Route('/api/escape/get-factor', name: 'escape_get_factor')]
    public function GetFactor(EntityManagerInterface $em): Response
    {
        $escape = $em->getRepository(Factors::class)->findBy(['subGroup' => '9']);
        $escapeArr = [];
        foreach ($escape as $ft) {
            $subEscape = $em->getRepository(Factors::class)->findBy(['subGroup' => $ft->getId()]);
            $subEscapeArr = [];
            $subEscapeArr[] = array(
                'factorId' => 0,
                'factorName' => 'ทั้งหมด',
            );
            if (count($subEscape) > 0) {
                foreach ($subEscape as $sb) {
                    $subEscapeArr[] = array(
                        'factorId' => $sb->getId(),
                        'factorName' => $sb->getFactorName(),
                    );
                }
            }
            $escapeArr[] = array(
                'factorId' => $ft->getId(),
                'factorName' => $ft->getFactorName(),
                'subFactor' => $subEscapeArr,
            );
        }
        return new JsonResponse([
            'escape' => $escapeArr,
        ]);
    }

    #[Route('/api/escape/search', name: 'escape_search', methods: ['POST'])]
    public function Search(EntityManagerInterface $em, Request $request): Response
    {
        $provinceId = $request->get('provinceId');
        $factorId = $request->get('factorId');
        $subFactorId = $request->get('subFactorId');
//        dd($factorId);
        $year = $request->get('year') ? $request->get('year') : null;
        $provinces = null;
        $factor = null;
        if ($factorId) {
            $factor = $em->getRepository(Factors::class)->find($factorId);
        }
        $subFactor = null;
        if ($subFactorId) {
            $subFactor = $em->getRepository(Factors::class)->find($subFactorId);
        }
        if ($provinceId) {
            $provinces = $em->getRepository(Provinces::class)->findOneBy(['provinceId' => $provinceId]);
        }
        $en = $em->getRepository(Escape::class)->findByCondition($factor, $subFactor, $provinces, $year);
        $resArr = [];
        foreach ($en as $val) {
            $resArr[] = array(
                'id' => $val->getId(),
                'provinceId' => $val->getProvince()?->getProvinceId(),
                'provinceName' => $val->getProvince()?->getProvinceName(),
                'factorId' => $val->getFactor()->getId(),
                'factorName' => $val->getFactor()->getFactorName(),
                'subFactorId' => $val->getSubFactor()?->getId(),
                'subFactorName' => $val->getSubFactor()?->getFactorName(),
                'year' => $val->getYear(),
                'have' => $val->isHave() ? 'มี' : 'ไม่มี',
                'value' => $val->getValue(),
                'yes' => $val->getYes(),
                'no' => $val->getNo(),
                'isEnabled' => $val->isIsEnabled(),
            );
        }
        return new JsonResponse($resArr);
    }

    #[Route('/api/escape/mass-upload', name: 'escape_mass_upload', methods: ['POST'])]
    public function MassUpload(EntityManagerInterface $em, Request $rq, ValidateServices $vds): Response
    {
        set_time_limit(-1);
        date_default_timezone_set('Asia/Bangkok');
        $date = date('Y-m-d');
        $currentDate = \DateTime::createFromFormat('Y-m-d', $date);
        $getFile = $rq->files->get('files');
//        $fileType = $rq->get('fileType');
        $email = $rq->get('email');
        $user = null;
        if ($email) {
            $user = $em->getRepository(Users::class)->findOneBy(['email' => $email]);
        }
        $errMsg = [];
        if ($user) {
            $spreadSheet = IOFactory::load($getFile);
            $fileType = $spreadSheet->getSheetNames()[0];
            $workSheet = $spreadSheet->getSheet(0);
            if ($workSheet) {
                $rows = $workSheet->toArray();
                foreach ($rows as $key => $row) {
                    if ($fileType == 'escape1') {
                        if ($key === 0 || !$row[0] || !$row[4]) continue;
                        $province = null;
                        if (is_numeric($row[0])) {
                            $province = $em->getRepository(Provinces::class)
                                ->findOneBy(['provinceId' => $row[0]]);
                            if ($province) {
                                if ($province->getProvinceName() != trim($row[1])) {
                                    $province = null;
                                    $errMsg[] = $vds->excelColumnErrMsg($key + 1, 'A และ B', 'รหัสจังหวัด และชื่อจังหวัดไม่สอดคล้องกัน');
                                }
                            } else {
                                $errMsg[] = $vds->excelColumnErrMsg($key + 1, 'A', 'ไม่มีรหัสจังหวัดนี้');
                            }
                        } else {
                            $errMsg[] = $vds->excelColumnErrMsg($key + 1, 'A', 'กรุณาใส่ตัวเลข');
                        }
                        $factor = $em->getRepository(Factors::class)
                            ->find(64);
                        $subFactor = null;
                        if (is_numeric($row[2])) {
                            $subFactor = $em->getRepository(Factors::class)->findOneBy(['id' => $row[2], 'subGroup' => 64]);
                            if (!$subFactor) {
                                $errMsg[] = $vds->excelColumnErrMsg($key + 1, 'C', 'ไม่มีรหัสปัจจัยนี้');
                            } else {
                                if ($subFactor->getFactorName() != trim($row[3])) {
                                    $subFactor = null;
                                    $errMsg[] = $vds->excelColumnErrMsg($key + 1, 'C และ D', 'รหัสปัจจัย และชื่อปัจจัยไม่สอดคล้องกัน');
                                }
                            }
                        } else {
                            $errMsg[] = $vds->excelColumnErrMsg($key + 1, 'C', 'กรุณาใส่ตัวเลข');
                        }
                        if (trim($row[5]) == 'มี' || trim($row[5]) == 'ไม่มี') {
                        } else {
                            $errMsg[] = $vds->excelColumnErrMsg($key + 1, 'F', 'กรุณาใส่ มี หรือ ไม่มี');
                        }
                        if (trim($row[5]) == 'มี') {
                            $a = [] ;
                            $a[] = $province?->getId();
                            $a[] = $factor?->getId();
                            $a[] = $subFactor?->getId();
                            $en = null;
                            if ($province && $factor && $subFactor) $en = $em->getRepository(Escape::class)
                                ->findOneBy([
                                    'province' => $province,
                                    'year' => $row[4],
                                    'factor' => $factor,
                                    'subFactor' => $subFactor,
                                    'have' => true
                                ]);
                            $a[] = $en?->getId();
                            if (!$en) {
                                $en = new Escape();
                                $en->setUserCreate($user);
                                $en->setDateCreate($currentDate);
                                $en->setIsEnabled(1);
                            } else {
                                $en->setUserUpdate($user);
                                $en->setDateUpdate($currentDate);
                            }
                            if (is_numeric($row[4])) $en->setYear($row[4]);
                            else $errMsg[] = $vds->excelColumnErrMsg($key + 1, 'E', 'กรุณาใส่ตัวเลข');
                            if (is_numeric($row[6])) $en->setValue($row[6]);
                            else $errMsg[] = $vds->excelColumnErrMsg($key + 1, 'G', 'กรุณาใส่ตัวเลข');
                            if ($province) $en->setProvince($province);
                            if ($factor) $en->setFactor($factor);
                            if ($subFactor) $en->setSubFactor($subFactor);
                            $en->setHave(1);
                            $em->persist($en);
//                            if ($province && $factor && $subFactor) {
//                                if ($province->getProvinceName() == trim($row[1])) {
//                                    if ($subFactor->getFactorName() == trim($row[3])) {
//                                    }else{
//                                        $errMsg[] = $vds->excelColumnErrMsg($key + 1, 'C และ D', 'รหัสปัจจัย และชื่อปัจจัยไม่สอดคล้องกัน');
//                                    }
//                                }else{
//                                    $errMsg[] = $vds->excelColumnErrMsg($key + 1, 'A และ B', 'รหัสจังหวัด และชื่อจังหวัดไม่สอดคล้องกัน');
//                                }
//                            } else {
//                                if (!$province) $errMsg[] = $vds->excelColumnErrMsg($key + 1, 'A', 'ไม่มีรหัสจังหวัดนี้');
//                                if (!$factor) $errMsg[] = $vds->excelColumnErrMsg($key + 1, 'C', 'ไม่มีรหัสปัจจัยหลักนี้');
//                                if (!$subFactor) $errMsg[] = $vds->excelColumnErrMsg($key + 1, 'E', 'ไม่มีรหัสปัจจัยรองนี้');
//                            }
                        }
                        if (trim($row[5]) == 'ไม่มี') {
                            $en = null;
                            if ($province && $factor) $en = $em->getRepository(Escape::class)
                                ->findOneBy([
                                    'province' => $province,
                                    'year' => $row[4],
                                    'factor' => $factor,
                                    'have' => false
                                ]);
                            if (!$en) {
                                $en = new Escape();
                                $en->setUserCreate($user);
                                $en->setDateCreate($currentDate);
                                $en->setIsEnabled(1);
                            } else {
                                $en->setUserUpdate($user);
                                $en->setDateUpdate($currentDate);
                            }
                            if (is_numeric($row[4])) $en->setYear($row[4]);
                            else $errMsg[] = $vds->excelColumnErrMsg($key + 1, 'E', 'กรุณาใส่ตัวเลข');
                            if (is_numeric($row[6])) $en->setValue($row[6]);
                            else $errMsg[] = $vds->excelColumnErrMsg($key + 1, 'G', 'กรุณาใส่ตัวเลข');
                            if ($province) $en->setProvince($province);
                            if ($factor) $en->setFactor($factor);
                            $en->setHave(0);
                            $em->persist($en);
                        }
                    }
                    if ($fileType == 'escape2') {
                        if ($key === 0 || !$row[0] || !$row[2]) continue;
                        $province = null;
                        if (is_numeric($row[0])) {
                            $province = $em->getRepository(Provinces::class)->findOneBy(['provinceId' => $row[0]]);
                            if ($province) {
                                if ($province->getProvinceName() != trim($row[1])) {
                                    $province = null;
                                    $errMsg[] = $vds->excelColumnErrMsg($key + 1, 'A และ B', 'รหัสจังหวัด และชื่อจังหวัดไม่สอดคล้องกัน');
                                }
                            } else {
                                $errMsg[] = $vds->excelColumnErrMsg($key + 1, 'A', 'ไม่มีรหัสจังหวัดนี้');
                            }
                        } else {
                            $errMsg[] = $vds->excelColumnErrMsg($key + 1, 'A', 'กรุณาใส่ตัวเลข');
                        }
                        $factor = $em->getRepository(Factors::class)
                            ->find(65);
                        $en = null;
                        if ($province && $factor) $en = $em->getRepository(Escape::class)
                            ->findOneBy([
                                'province' => $province,
                                'year' => $row[2],
                                'factor' => $factor
                            ]);
                        if (!$en) {
                            $en = new Escape();
                            $en->setUserCreate($user);
                            $en->setDateCreate($currentDate);
                            $en->setIsEnabled(1);
                        } else {
                            $en->setUserUpdate($user);
                            $en->setDateUpdate($currentDate);
                        }
                        if (is_numeric($row[2])) $en->setYear($row[2]);
                        else $errMsg[] = $vds->excelColumnErrMsg($key + 1, 'C', 'กรุณาใส่ตัวเลข');
                        if (is_numeric($row[3])) $en->setYes($row[3]);
                        else $errMsg[] = $vds->excelColumnErrMsg($key + 1, 'D', 'กรุณาใส่ตัวเลข');
                        if (is_numeric($row[4])) $en->setNo($row[4]);
                        else $errMsg[] = $vds->excelColumnErrMsg($key + 1, 'E', 'กรุณาใส่ตัวเลข');
                        if ($province) $en->setProvince($province);
                        if ($factor) $en->setFactor($factor);
                        $em->persist($en);
                    }
                    if ($fileType == 'escapeOrder') {
                        if ($key === 0 || !$row[0] || !$row[2]) continue;
                        $province = null;
                        if (is_numeric($row[0])) {
                            $province = $em->getRepository(Provinces::class)->findOneBy(['provinceId' => $row[0]]);
                            if ($province) {
                                if ($province->getProvinceName() != trim($row[1])) {
                                    $province = null;
                                    $errMsg[] = $vds->excelColumnErrMsg($key + 1, 'A และ B', 'รหัสจังหวัด และชื่อจังหวัดไม่สอดคล้องกัน');
                                }
                            } else {
                                $errMsg[] = $vds->excelColumnErrMsg($key + 1, 'A', 'ไม่มีรหัสจังหวัดนี้');
                            }
                        } else {
                            $errMsg[] = $vds->excelColumnErrMsg($key + 1, 'A', 'กรุณาใส่ตัวเลข');
                        }
                        $factor = $em->getRepository(Factors::class)
                            ->find(66);
                        $subFactor = null;
                        if (is_numeric($row[2])) {
                            $subFactor = $em->getRepository(Factors::class)->findOneBy(['id' => $row[2], 'subGroup' => 66]);
                            if (!$subFactor) {
                                $errMsg[] = $vds->excelColumnErrMsg($key + 1, 'C', 'ไม่มีรหัสปัจจัยนี้');
                            } else {
                                if ($subFactor->getFactorName() != trim($row[3])) {
                                    $subFactor = null;
                                    $errMsg[] = $vds->excelColumnErrMsg($key + 1, 'C และ D', 'รหัสปัจจัย และชื่อปัจจัยไม่สอดคล้องกัน');
                                }
                            }
                        } else {
                            $errMsg[] = $vds->excelColumnErrMsg($key + 1, 'C', 'กรุณาใส่ตัวเลข');
                        }
                        $en = null;
                        if ($province && $factor && $subFactor) $en = $em->getRepository(Escape::class)
                            ->findOneBy([
                                'province' => $province,
                                'factor' => $factor
                            ]);
                        if (!$en) {
                            $en = new Escape();
                            $en->setUserCreate($user);
                            $en->setDateCreate($currentDate);
                            $en->setIsEnabled(1);
                        } else {
                            $en->setUserUpdate($user);
                            $en->setDateUpdate($currentDate);
                        }
                        if (is_numeric($row[4])) $en->setValue($row[4]);
                        else $errMsg[] = $vds->excelColumnErrMsg($key + 1, 'E', 'กรุณาใส่ตัวเลข');
                        if ($province) $en->setProvince($province);
                        if ($factor) $en->setFactor($factor);
                        if ($subFactor) $en->setSubFactor($subFactor);
                        $em->persist($en);
                    }
                }
                if (count($errMsg) == 0) $em->flush();
            } else {
                return new JsonResponse($errMsg);
            }
        }
        return new JsonResponse($errMsg);
    }

    #[Route('/api/escape/is-enabled', name: 'escape_is_enabled', methods: ['POST'])]
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
                    $val = $em->getRepository(Escape::class)->find($id);
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

    #[Route('/api/escape/update', name: 'escape_is_update', methods: ['POST'])]
    public function Update(EntityManagerInterface $em, Request $request): Response
    {
        date_default_timezone_set('Asia/Bangkok');
        $date = date('Y-m-d');
        $currentDate = \DateTime::createFromFormat('Y-m-d', $date);

        $id = $request->get('id');
        $email = $request->get('email');
        $value = $request->get('value');
        $factorId = $request->get('factorId');
        $yes = $request->get('yes');
        $no = $request->get('no');
        if ($email && $factorId) {
            $user = $em->getRepository(Users::class)->findOneBy(['email' => $email]);
            $factor = $em->getRepository(Factors::class)->find($factorId);
            if ($user && $factor) {
                if ($id) {
                    $val = $em->getRepository(Escape::class)->find($id);
                    if ($val) {
                        if ($factorId == 64) {
                            $val->setValue($value);
                            $val->setUserUpdate($user);
                            $val->setDateUpdate($currentDate);
                            $em->persist($val);
                        }
                        if ($factorId == 65) {
                            $val->setYes($yes);
                            $val->setNo($no);
                            $val->setUserUpdate($user);
                            $val->setDateUpdate($currentDate);
                            $em->persist($val);
                        }
                        if ($factorId == 66) {
                            $val->setValue($value);
                            $val->setUserUpdate($user);
                            $val->setDateUpdate($currentDate);
                            $em->persist($val);
                        }
                        $em->flush();
                    }
                }
            }
        }
        return new JsonResponse();
    }
}