<?php

namespace App\Controller;

use App\Entity\Houses;
use App\Entity\Population;
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

class HousesController extends AbstractController
{
    #[Route('/api/houses/get-year', name: 'houses_get_year')]
    public function GetYear(EntityManagerInterface $em): Response
    {
        $year = $em->getRepository(Houses::class)->getYear();
        $yearArr = [];
        $yearArr[] = array(
            'yearId' => 0,
            'yearName' => 'ทั้งหมด',
        );
        foreach ($year as $val){
            $yearArr[] = array(
                'yearId' => $val['year'],
                'yearName' => $val['year'],
            );
        }
        return new JsonResponse([
            'year' => $yearArr
        ]);
    }

    #[Route('/api/houses/get-provinces', name: 'houses_get_provinces')]
    public function GetProvinces(EntityManagerInterface $em): Response
    {
        $provinces = $em->getRepository(Houses::class)->getProvincesByEn();
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

    #[Route('/api/houses/mass-upload', name: 'houses_mass_upload', methods: ['POST'])]
    public function MassUpload(EntityManagerInterface $em, Request $rq, ValidateServices $vds): Response
    {
        set_time_limit(-1);
        date_default_timezone_set('Asia/Bangkok');
        $date = date('Y-m-d');
        $currentDate = \DateTime::createFromFormat('Y-m-d',$date);

        $getFile = $rq->files->get('files');
        $email = $rq->get('email');
        $user = null;
        if ($email){
            $user = $em->getRepository(Users::class)->findOneBy(['email' => $email]);
        }
        $errMsg  = [];
        if ($user){
            if ($getFile) {
                $spreadSheet = IOFactory::load($getFile);
                $workSheet = $spreadSheet->getSheet(0);
                $rows = $workSheet->toArray();
                foreach ($rows as $key => $row) {
                    if ($key === 0 || !$row[0]) continue;
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
                    $houses = null;
                    if ($province) $houses = $em->getRepository(Houses::class)->findOneBy(['province' => $province, 'year' => $row[2]]);
                    if (!$houses) {
                        $houses = new Houses();
                        $houses->setUserCreate($user);
                        $houses->setDateCreate($currentDate);
                        $houses->setIsEnabled(1);
                    } else {
                        $houses->setUserUpdate($user);
                        $houses->setDateUpdate($currentDate);
                    }
                    if (is_numeric($row[2])) $houses->setYear($row[2]);
                    else $errMsg[] = $vds->excelColumnErrMsg($key + 1, 'C', 'กรุณาใส่ตัวเลข');
                    if (is_numeric($row[3])) $houses->setValue($row[3]);
                    else $errMsg[] = $vds->excelColumnErrMsg($key + 1, 'D', 'กรุณาใส่ตัวเลข');
                    if ($province) $houses->setProvince($province);
                    $em->persist($houses);
                }
                if (count($errMsg) == 0) $em->flush();
            }
        }
        return new JsonResponse($errMsg);
    }

    #[Route('/api/houses/search', name: 'houses_search', methods: ['POST'])]
    public function Search(EntityManagerInterface $em, Request $request): Response
    {
        $provinceId = $request->get('provinceId');
        $year = $request->get('year') ? $request->get('year') : null;
        $provinces = null;
        if ($provinceId){
            $provinces = $em->getRepository(Provinces::class)->findOneBy(['provinceId'=>$provinceId]);
        }

        $houses = $em->getRepository(Houses::class)->findByProvinceAndYear($provinces,$year);

        $housesArr = [];
        foreach ($houses as $val){
            $housesArr[] = array(
                'id' => $val->getId(),
                'provinceId' => $val->getProvince()?->getProvinceId(),
                'provinceName' => $val->getProvince()?->getProvinceName(),
                'year' => $val->getYear(),
                'value' => $val->getValue(),
                'isEnabled' => $val->isIsEnabled(),
            );
        }

        return new JsonResponse($housesArr);
    }

    #[Route('/api/houses/is-enabled', name: 'houses_is_enabled', methods: ['POST'])]
    public function IsEnabled(EntityManagerInterface $em, Request $request): Response
    {
        date_default_timezone_set('Asia/Bangkok');
        $date = date('Y-m-d');
        $currentDate = \DateTime::createFromFormat('Y-m-d',$date);

        $isEnabled = $request->get('isEnabled');
        $id = $request->get('id');
        $email = $request->get('email');
        if ($email){
            $user = $em->getRepository(Users::class)->findOneBy(['email' => $email]);
            if ($user) {
                if ($id) {
                    $val = $em->getRepository(Houses::class)->find($id);
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

    #[Route('/api/houses/update', name: 'houses_is_update', methods: ['POST'])]
    public function Update(EntityManagerInterface $em, Request $request): Response
    {
        date_default_timezone_set('Asia/Bangkok');
        $date = date('Y-m-d');
        $currentDate = \DateTime::createFromFormat('Y-m-d',$date);

        $id = $request->get('id');
        $email = $request->get('email');
        $value = $request->get('value');
        if ($email){
            $user = $em->getRepository(Users::class)->findOneBy(['email' => $email]);
            if ($user) {
                if ($id) {
                    $val = $em->getRepository(Houses::class)->find($id);
                    if ($val) {
                        $val->setValue($value);
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