<?php

namespace App\Controller;

use App\Entity\Population;
use App\Entity\Provinces;
use App\Entity\Users;
use App\Service\ValidateServices;
use Doctrine\ORM\EntityManagerInterface;
use PhpOffice\PhpSpreadsheet\IOFactory;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\StreamedResponse;
use Symfony\Component\Routing\Annotation\Route;

class PopulationController extends AbstractController
{
    /*#[Route('/api/population/get-data-graph', name: 'population-get-data-graph', methods: ['POST'])]
    public function PovertyRatioGetDataGraph(EntityManagerInterface $em, Request $rq, ) : Response {
        $provinceId = $rq->get('provinceId') ? : null;
        $graphNo = $rq->get('graphNo') ? : null;
        $developFactor = $rq->get('developFactor') ? : null;
        $year = $em->getRepository(Population::class)->getYear();
        $population = $em->getRepository(Population::class)->findAll();
        if ($provinceId){
            $province = $em->getRepository(Provinces::class)->findOneBy(['provinceId' => $provinceId]);
            if ($province) {
                $population = $em->getRepository(Population::class)->findBy(['province' => $province]);
            }else {
                $population = null;
            }
        }
        $dataset = [];
        $data = [];
        if ($population){
            foreach ($population as $val){
                $data[$val->getProvince()->getId()]['data'][] = $val->getValue();
                $data[$val->getProvince()->getId()]['label'] = $val->getProvince()->getProvinceName();
                $data[$val->getProvince()->getId()]['id'] = $val->getProvince()->getProvinceId();
            }
        }

        foreach ($data as $val){
            $dataset[] = $val;
        }

        $label = [];
        foreach ($year as $val){
            $label[] = $val['year'];
        }

        $dataset['label'] = $label;
        $dataset['graphNo'] = $graphNo;
        $dataset['developFactor'] = $developFactor;

        return new JsonResponse($dataset);
    }*/

    #[Route('/api/population/get-year', name: 'population_get_year')]
    public function GetYear(EntityManagerInterface $em): Response
    {
        $year = $em->getRepository(Population::class)->getYear();
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

    #[Route('/api/population/get-provinces', name: 'population_get_provinces')]
    public function GetProvinces(EntityManagerInterface $em): Response
    {
        $provinces = $em->getRepository(Population::class)->getProvincesByEn();
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

    #[Route('/api/population/mass-upload', name: 'population_mass_upload', methods: ['POST'])]
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
                    $population = null ;
                    if ($province) $population = $em->getRepository(Population::class)->findOneBy(['province' => $province, 'year' => $row[2]]);
                    if (!$population) {
                        $population = new Population();
                        $population->setUserCreate($user);
                        $population->setDateCreate($currentDate);
                        $population->setIsEnabled(1);
                    } else {
                        $population->setUserUpdate($user);
                        $population->setDateUpdate($currentDate);
                    }
                    if (is_numeric($row[2])) $population->setYear($row[2]);
                    else $errMsg[] = $vds->excelColumnErrMsg($key + 1, 'C', 'กรุณาใส่ตัวเลข');
                    if (is_numeric($row[3])) $population->setValue($row[3]);
                    else $errMsg[] = $vds->excelColumnErrMsg($key + 1, 'D', 'กรุณาใส่ตัวเลข');
                    if ($province) $population->setProvince($province);
                    $em->persist($population);
                }
                if (count($errMsg) == 0) $em->flush();
            }
        }
        return new JsonResponse($errMsg);
    }

    #[Route('/api/population/search', name: 'population_search', methods: ['POST'])]
    public function Search(EntityManagerInterface $em, Request $request): Response
    {
        $provinceId = $request->get('provinceId');
        $year = $request->get('year') ? $request->get('year') : null;
        $provinces = null;
        if ($provinceId) {
            $provinces = $em->getRepository(Provinces::class)->findOneBy(['provinceId' => $provinceId]);
        }

        $populations = $em->getRepository(Population::class)->findByProvinceAndYear($provinces, $year);

        $populationArr = [];
        foreach ($populations as $population) {
            $populationArr[] = array(
                'id' => $population->getId(),
                'provinceId' => $population->getProvince()?->getProvinceId(),
                'provinceName' => $population->getProvince()?->getProvinceName(),
                'year' => $population->getYear(),
                'value' => $population->getValue(),
                'isEnabled' => $population->isIsEnabled(),
            );
        }

        return new JsonResponse($populationArr);
    }

    #[Route('/api/population/is-enabled', name: 'population_is_enabled', methods: ['POST'])]
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
                    $population = $em->getRepository(Population::class)->find($id);
                    if ($population) {
                        $population->setIsEnabled(!$isEnabled);
                        $population->setUserUpdate($user);
                        $population->setDateUpdate($currentDate);
                        $em->persist($population);
                        $em->flush();
                    }
                }
            }
        }
        return new JsonResponse();
    }

    #[Route('/api/population/update', name: 'population_is_update', methods: ['POST'])]
    public function Update(EntityManagerInterface $em, Request $request): Response
    {
        date_default_timezone_set('Asia/Bangkok');
        $date = date('Y-m-d');
        $currentDate = \DateTime::createFromFormat('Y-m-d', $date);

        $id = $request->get('id');
        $email = $request->get('email');
        $value = $request->get('value');
        if ($email) {
            $user = $em->getRepository(Users::class)->findOneBy(['email' => $email]);
            if ($user) {
                if ($id) {
                    $population = $em->getRepository(Population::class)->find($id);
                    if ($population) {
                        $population->setValue($value);
                        $population->setUserUpdate($user);
                        $population->setDateUpdate($currentDate);
                        $em->persist($population);
                        $em->flush();
                    }
                }
            }
        }
        return new JsonResponse();
    }
}