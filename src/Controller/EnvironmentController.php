<?php

namespace App\Controller;

use App\Entity\Environment;
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

class EnvironmentController extends AbstractController
{
    #[Route('/api/environment/get-year', name: 'environment_get_year')]
    public function GetYear(EntityManagerInterface $em): Response
    {
        $year = $em->getRepository(Environment::class)->getYear();
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

    #[Route('/api/environment/get-factor', name: 'environment_get_factor')]
    public function GetFactor(EntityManagerInterface $em): Response
    {
        $factors = $em->getRepository(Factors::class)->findBy(['subGroup' => '15']);
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

    #[Route('/api/environment/search', name: 'environment_search', methods: ['POST'])]
    public function Search(EntityManagerInterface $em, Request $request): Response
    {
        $provinceId = $request->get('provinceId');
        $year = $request->get('year') ? $request->get('year') : null;
        $provinces = null;
        if ($provinceId) {
            $provinces = $em->getRepository(Provinces::class)->findOneBy(['provinceId' => $provinceId]);
        }

        $en = $em->getRepository(Environment::class)->findByProvinceAndYear($provinces, $year);

        $housesArr = [];
        foreach ($en as $val) {
            $housesArr[] = array(
                'id' => $val->getId(),
                'provinceId' => $val->getProvince()?->getProvinceId(),
                'provinceName' => $val->getProvince()?->getProvinceName(),
                'year' => $val->getYear(),
                'value' => $val->getValue(),
                'factorId' => $val->getFactor()->getId(),
                'factorName' => $val->getFactor()->getFactorName(),
                'isEnabled' => $val->isIsEnabled(),
            );
        }

        return new JsonResponse($housesArr);
    }

    #[Route('/api/environment/mass-upload', name: 'environment_mass_upload', methods: ['POST'])]
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
        $errMsg = [];
        if ($user) {
            if ($getFile) {
                $spreadSheet = IOFactory::load($getFile);
                $workSheet = $spreadSheet->getSheet(0);
                $rows = $workSheet->toArray();
                foreach ($rows as $key => $row) {
                    if ($key === 0 || !$row[0] || !$row[2]) continue;
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
                        $factor = $em->getRepository(Factors::class)->findOneBy(['id' => $row[2], 'subGroup' => 15]);
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
                    $en = null ;
                    if ($province && $factor) $en = $em->getRepository(Environment::class)->findOneBy(['province' => $province, 'year' => $row[4], 'factor' => $factor]);
                    if (!$en) {
                        $en = new Environment();
                        $en->setUserCreate($user);
                        $en->setDateCreate($currentDate);
                        $en->setIsEnabled(1);
                    } else {
                        $en->setUserUpdate($user);
                        $en->setDateUpdate($currentDate);
                    }
                    if (is_numeric($row[4])) $en->setYear($row[4]);
                    else $errMsg[] = $vds->excelColumnErrMsg($key + 1, 'E', 'กรุณาใส่ตัวเลข');
                    if (is_numeric($row[5])) $en->setValue($row[5]);
                    else $errMsg[] = $vds->excelColumnErrMsg($key + 1, 'F', 'กรุณาใส่ตัวเลข');
                    if ($province) $en->setProvince($province);
                    if ($factor) $en->setFactor($factor);
                    $em->persist($en);
                }
                if (count($errMsg) == 0) $em->flush();
            }
        }
        return new JsonResponse($errMsg);
    }

    #[Route('/api/environment/is-enabled', name: 'environment_is_enabled', methods: ['POST'])]
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
                    $val = $em->getRepository(Environment::class)->find($id);
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

    #[Route('/api/environment/update', name: 'environment_is_update', methods: ['POST'])]
    public function Update(EntityManagerInterface $em, Request $request): Response
    {
        date_default_timezone_set('Asia/Bangkok');
        $date = date('Y-m-d');
        $currentDate = \DateTime::createFromFormat('Y-m-d', $date);

        $id = $request->get('id');
        $email = $request->get('email');
        $value = $request->get('value');
        $factorId = $request->get('factorId');
        if ($email && $factorId) {
            $user = $em->getRepository(Users::class)->findOneBy(['email' => $email]);
            $factor = $em->getRepository(Factors::class)->find($factorId);
            if ($user && $factor) {
                if ($id) {
                    $val = $em->getRepository(Environment::class)->find($id);
                    if ($val) {
                        $val->setValue($value);
                        $val->setFactor($factor);
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