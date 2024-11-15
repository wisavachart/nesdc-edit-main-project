<?php

namespace App\Service;

use App\Entity\Factors;
use App\Entity\Provinces;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\EntityManagerInterface;
use PhpOffice\PhpSpreadsheet\IOFactory;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use Symfony\Component\HttpFoundation\StreamedResponse;

class DownloadExcelTemplateServices
{
    public function __construct(private EntityManagerInterface $em){}

    public function alphas(){
        $alphas = array();
        $letter = 'A';
        while ($letter !== 'AAA') {
            $alphas[] = $letter++;
        }
        return $alphas;
    }

    public function template(string $type): StreamedResponse
    {
        $spreadsheet = new Spreadsheet();
        $em = $this->em;
        $sheet1 = $spreadsheet->getActiveSheet();
        $sheet1->setCellValue('A1','รหัสจังหวัด');
        $sheet1->setCellValue('B1','ชื่อจังหวัด');
        $sheet1->setCellValue('C1','ปี');
        if ($type == 'population') $sheet1->setCellValue('D1','ค่าข้อมูล');
        if ($type == 'houses') $sheet1->setCellValue('D1','ค่าข้อมูล');
        $sheet1->getColumnDimension('A')->setAutoSize(true);
        $sheet1->getColumnDimension('B')->setAutoSize(true);
        $sheet1->getColumnDimension('C')->setAutoSize(true);
        $sheet1->getColumnDimension('D')->setAutoSize(true);
        $sheet1->setTitle('ข้อมูล');

        $spreadsheet->createSheet();
        $spreadsheet->setActiveSheetIndex(1);
        $sheet2 = $spreadsheet->getActiveSheet();
        $provinces = $em->getRepository(Provinces::class)->findAll();

        $sheet2->setCellValue('A1','รหัสจังหวัด');
        $sheet2->setCellValue('B1','ชื่อจังหวัด');
        $i = 2;
        foreach ($provinces as $province){
            $sheet2->setCellValue('A'.$i,$province->getProvinceId());
            $sheet2->setCellValue('B'.$i,$province->getProvinceName());
            $i++;
        }
        $sheet2->getColumnDimension('A')->setAutoSize(true);
        $sheet2->getColumnDimension('B')->setAutoSize(true);
        $sheet2->setTitle('จังหวัด');

        $spreadsheet->setActiveSheetIndex(0);
        $writeTemplate = IOFactory::createWriter($spreadsheet,'Xlsx');
        $response = new StreamedResponse(
            function () use ($writeTemplate){
                $writeTemplate->save('php://output');
            }
        );
        return $response;
    }

    public function template2(): StreamedResponse {
        $spreadsheet = new Spreadsheet();
        $em = $this->em;
        $sheet1 = $spreadsheet->getActiveSheet();
        $sheet1->setCellValue('A1','รหัสจังหวัด');
        $sheet1->setCellValue('B1','ชื่อจังหวัด');
        $sheet1->setCellValue('C1','ปี');
        $sheet1->setCellValue('D1','GPP');
        $sheet1->setCellValue('E1','ค่าข้อมูล');
        $sheet1->getColumnDimension('A')->setAutoSize(true);
        $sheet1->getColumnDimension('B')->setAutoSize(true);
        $sheet1->getColumnDimension('C')->setAutoSize(true);
        $sheet1->getColumnDimension('D')->setAutoSize(true);
        $sheet1->getColumnDimension('E')->setAutoSize(true);
        $sheet1->setTitle('ข้อมูล');

        $spreadsheet->createSheet();
        $spreadsheet->setActiveSheetIndex(1);
        $sheet2 = $spreadsheet->getActiveSheet();
        $provinces = $em->getRepository(Provinces::class)->findAll();

        $sheet2->setCellValue('A1','รหัสจังหวัด');
        $sheet2->setCellValue('B1','ชื่อจังหวัด');
        $i = 2;
        foreach ($provinces as $province){
            $sheet2->setCellValue('A'.$i,$province->getProvinceId());
            $sheet2->setCellValue('B'.$i,$province->getProvinceName());
            $i++;
        }
        $sheet2->getColumnDimension('A')->setAutoSize(true);
        $sheet2->getColumnDimension('B')->setAutoSize(true);
        $sheet2->setTitle('จังหวัด');

        $spreadsheet->setActiveSheetIndex(0);
        $writeTemplate = IOFactory::createWriter($spreadsheet,'Xlsx');
        $response = new StreamedResponse(
            function () use ($writeTemplate){
                $writeTemplate->save('php://output');
            }
        );
        return $response;
    }

    public function template3(?string $template): StreamedResponse {
        $spreadsheet = new Spreadsheet();
        $em = $this->em;
        $sheet1 = $spreadsheet->getActiveSheet();
        $sheet1->setCellValue('A1','รหัสจังหวัด');
        $sheet1->setCellValue('B1','ชื่อจังหวัด');
        $sheet1->setCellValue('C1','รหัสปัจจัย');
        $sheet1->setCellValue('D1','ชื่อปัจจัย');
        $sheet1->setCellValue('E1','ปี');
//        if ($template == 'humanDevelopment') {
//            $sheet1->setCellValue('F1','การพัฒนาคน');
//        }
//        if ($template == 'economic') {
//            $sheet1->setCellValue('F1','เศรษฐกิจและความมั่นคง');
//        }
//        if ($template == 'environment') {
//            $sheet1->setCellValue('F1','สิ่งแวดล้อม');
//        }
//        if ($template == 'peace') {
//            $sheet1->setCellValue('F1','สันติและความยุติธรรม');
//        }
//        if ($template == 'partnership') {
//            $sheet1->setCellValue('F1','ความเป็นหุ้นส่วนการพัฒนา');
//        }
        $sheet1->setCellValue('F1','ค่าข้อมูล');
        $sheet1->getColumnDimension('A')->setAutoSize(true);
        $sheet1->getColumnDimension('B')->setAutoSize(true);
        $sheet1->getColumnDimension('C')->setAutoSize(true);
        $sheet1->getColumnDimension('D')->setAutoSize(true);
        $sheet1->getColumnDimension('E')->setAutoSize(true);
        $sheet1->getColumnDimension('F')->setAutoSize(true);
        $sheet1->setTitle('ข้อมูล');

        $spreadsheet->createSheet();
        $spreadsheet->setActiveSheetIndex(1);
        $sheet2 = $spreadsheet->getActiveSheet();
        $provinces = $em->getRepository(Provinces::class)->findAll();
        $sheet2->setCellValue('A1','รหัสจังหวัด');
        $sheet2->setCellValue('B1','ชื่อจังหวัด');
        $i = 2;
        foreach ($provinces as $province){
            $sheet2->setCellValue('A'.$i,$province->getProvinceId());
            $sheet2->setCellValue('B'.$i,$province->getProvinceName());
            $i++;
        }
        $sheet2->getColumnDimension('A')->setAutoSize(true);
        $sheet2->getColumnDimension('B')->setAutoSize(true);
        $sheet2->setTitle('จังหวัด');

        $spreadsheet->createSheet();
        $spreadsheet->setActiveSheetIndex(2);
        $sheet3 = $spreadsheet->getActiveSheet();
        if ($template == 'humanDevelopment') {
            $factors = $em->getRepository(Factors::class)->findBy(['subGroup' => '4']);
        }
        if ($template == 'economic') {
            $factors = $em->getRepository(Factors::class)->findBy(['subGroup' => '5']);
        }
        if ($template == 'environment') {
            $factors = $em->getRepository(Factors::class)->findBy(['subGroup' => '15']);
        }
        if ($template == 'peace') {
            $factors = $em->getRepository(Factors::class)->findBy(['subGroup' => '6']);
        }
        if ($template == 'partnership') {
            $factors = $em->getRepository(Factors::class)->findBy(['subGroup' => '7']);
        }
        $sheet3->setCellValue('A1','รหัสปัจจัย');
        $sheet3->setCellValue('B1','ชื่อปัจจัย');
        $i = 2;
        foreach ($factors as $fc){
            $sheet3->setCellValue('A'.$i,$fc->getId());
            $sheet3->setCellValue('B'.$i,$fc->getFactorName());
            $i++;
        }
        $sheet3->getColumnDimension('A')->setAutoSize(true);
        $sheet3->getColumnDimension('B')->setAutoSize(true);
        $sheet3->setTitle('ปัจจัย');

        $spreadsheet->setActiveSheetIndex(0);
        $writeTemplate = IOFactory::createWriter($spreadsheet,'Xlsx');
        $response = new StreamedResponse(
            function () use ($writeTemplate){
                $writeTemplate->save('php://output');
            }
        );
        return $response;
    }

    public function template4(?string $template): StreamedResponse {
        $spreadsheet = new Spreadsheet();
        $em = $this->em;
        $sheet1 = $spreadsheet->getActiveSheet();
        $sheet1->setCellValue('A1','รหัสจังหวัด');
        $sheet1->setCellValue('B1','ชื่อจังหวัด');
        if ($template == 'escape1') {
            $sheet1->setCellValue('C1','รหัสปัจจัย');
            $sheet1->setCellValue('D1','ชื่อปัจจัย');
            $sheet1->setCellValue('E1', 'ปี');
            $sheet1->setCellValue('F1', 'have');
            $sheet1->setCellValue('G1', 'value');
            $sheet1->setTitle('escape1');
        }
        if ($template == 'escape2') {
            $sheet1->setCellValue('C1', 'ปี');
            $sheet1->setCellValue('D1','yes');
            $sheet1->setCellValue('E1','no');
            $sheet1->setTitle('escape2');
        }
        if ($template == 'escapeOrder') {
            $sheet1->setCellValue('C1','รหัสปัจจัย');
            $sheet1->setCellValue('D1','ชื่อปัจจัย');
            $sheet1->setCellValue('E1', 'value');
            $sheet1->setTitle('escapeOrder');
        }
        $sheet1->getColumnDimension('A')->setAutoSize(true);
        $sheet1->getColumnDimension('B')->setAutoSize(true);
        $sheet1->getColumnDimension('C')->setAutoSize(true);
        $sheet1->getColumnDimension('D')->setAutoSize(true);
        $sheet1->getColumnDimension('E')->setAutoSize(true);
        $sheet1->getColumnDimension('F')->setAutoSize(true);
        $sheet1->getColumnDimension('G')->setAutoSize(true);

        $spreadsheet->createSheet();
        $spreadsheet->setActiveSheetIndex(1);
        $sheet2 = $spreadsheet->getActiveSheet();
        $provinces = $em->getRepository(Provinces::class)->findAll();
        $sheet2->setCellValue('A1','รหัสจังหวัด');
        $sheet2->setCellValue('B1','ชื่อจังหวัด');
        $factors = [];
        if ($template == 'escape1') {
            $factors = $em->getRepository(Factors::class)->findBy(['subGroup' => '64']);
        }
        if ($template == 'escapeOrder') {
            $factors = $em->getRepository(Factors::class)->findBy(['subGroup' => '66']);
        }
        $i = 2;
        foreach ($provinces as $province){
            $sheet2->setCellValue('A'.$i,$province->getProvinceId());
            $sheet2->setCellValue('B'.$i,$province->getProvinceName());
            $i++;
        }
        $sheet2->getColumnDimension('A')->setAutoSize(true);
        $sheet2->getColumnDimension('B')->setAutoSize(true);
        $sheet2->setTitle('จังหวัด');

        $spreadsheet->createSheet();
        $spreadsheet->setActiveSheetIndex(2);
        $sheet3 = $spreadsheet->getActiveSheet();
        $sheet3->setCellValue('A1','รหัสปัจจัย');
        $sheet3->setCellValue('B1','ชื่อปัจจัย');
        $i = 2;
        foreach ($factors as $fc){
            $sheet3->setCellValue('A'.$i,$fc->getId());
            $sheet3->setCellValue('B'.$i,$fc->getFactorName());
            $i++;
        }
        $sheet3->getColumnDimension('A')->setAutoSize(true);
        $sheet3->getColumnDimension('B')->setAutoSize(true);
        $sheet3->setTitle('ปัจจัย');

        $spreadsheet->setActiveSheetIndex(0);
        $writeTemplate = IOFactory::createWriter($spreadsheet,'Xlsx');
        $response = new StreamedResponse(
            function () use ($writeTemplate){
                $writeTemplate->save('php://output');
            }
        );
        return $response;
    }

    public function template5(?string $template): StreamedResponse {
        $spreadsheet = new Spreadsheet();
        $em = $this->em;
        $sheet1 = $spreadsheet->getActiveSheet();
        $sheet1->setCellValue('A1','รหัสจังหวัด');
        $sheet1->setCellValue('B1','ชื่อจังหวัด');
        $sheet1->setCellValue('C1','รหัสปัจจัยหลัก');
        $sheet1->setCellValue('D1','ชื่อปัจจัยหลัก');
        $sheet1->setCellValue('E1','รหัสปัจจัยรอง');
        $sheet1->setCellValue('F1','ชื่อปัจจัยรอง');
        $sheet1->setCellValue('G1', 'ปี');
        $sheet1->setCellValue('H1', 'ค่าข้อมูล1');
        $sheet1->setCellValue('I1', 'ค่าข้อมูล2');
        $sheet1->setCellValue('J1', 'ค่าข้อมูล3');
        $sheet1->setCellValue('K1', 'ค่าข้อมูล4');
        $sheet1->setCellValue('L1', 'ค่าข้อมูล5');
        $sheet1->setTitle('stability');
        $sheet1->getColumnDimension('A')->setAutoSize(true);
        $sheet1->getColumnDimension('B')->setAutoSize(true);
        $sheet1->getColumnDimension('C')->setAutoSize(true);
        $sheet1->getColumnDimension('D')->setAutoSize(true);
        $sheet1->getColumnDimension('E')->setAutoSize(true);
        $sheet1->getColumnDimension('F')->setAutoSize(true);
        $sheet1->getColumnDimension('G')->setAutoSize(true);
        $sheet1->getColumnDimension('H')->setAutoSize(true);
        $sheet1->getColumnDimension('I')->setAutoSize(true);
        $sheet1->getColumnDimension('J')->setAutoSize(true);
        $sheet1->getColumnDimension('K')->setAutoSize(true);
        $sheet1->getColumnDimension('L')->setAutoSize(true);

        $spreadsheet->createSheet();
        $spreadsheet->setActiveSheetIndex(1);
        $sheet2 = $spreadsheet->getActiveSheet();
        $provinces = $em->getRepository(Provinces::class)->findAll();
        $sheet2->setCellValue('A1','รหัสจังหวัด');
        $sheet2->setCellValue('B1','ชื่อจังหวัด');
        $i = 2;
        foreach ($provinces as $province){
            $sheet2->setCellValue('A'.$i,$province->getProvinceId());
            $sheet2->setCellValue('B'.$i,$province->getProvinceName());
            $i++;
        }
        $sheet2->getColumnDimension('A')->setAutoSize(true);
        $sheet2->getColumnDimension('B')->setAutoSize(true);
        $sheet2->setTitle('จังหวัด');

        $spreadsheet->createSheet();
        $spreadsheet->setActiveSheetIndex(2);
        $sheet3 = $spreadsheet->getActiveSheet();
        $sheet3->setCellValue('A1','รหัสปัจจัยหลัก');
        $sheet3->setCellValue('B1','ชื่อปัจจัยหลัก');
        $factors = $em->getRepository(Factors::class)->findBy(['subGroup' => '8']);
        $subFactorArr = [];
        $f = 2;
        foreach ($factors as $fc){
            $subFactorArr[] = $fc->getId();
            $sheet3->setCellValue('A'.$f,$fc->getId());
            $sheet3->setCellValue('B'.$f,$fc->getFactorName());
            $f++;
        }
        $sheet3->getColumnDimension('A')->setAutoSize(true);
        $sheet3->getColumnDimension('B')->setAutoSize(true);
        $sheet3->setTitle('ปัจจัยหลัก');

        $spreadsheet->createSheet();
        $spreadsheet->setActiveSheetIndex(3);
        $sheet4 = $spreadsheet->getActiveSheet();
        $sheet4->setCellValue('A1','รหัสปัจจัยรอง');
        $sheet4->setCellValue('B1','ชื่อปัจจัยรอง');
        $subFactors = $em->getRepository(Factors::class)->findBy(['subGroup' => $subFactorArr]);
        $s = 2;
        foreach ($subFactors as $fc){
            $sheet4->setCellValue('A'.$s,$fc->getId());
            $sheet4->setCellValue('B'.$s,$fc->getFactorName());
            $s++;
        }
        $sheet4->getColumnDimension('A')->setAutoSize(true);
        $sheet4->getColumnDimension('B')->setAutoSize(true);
        $sheet4->setTitle('ปัจจัยรอง');

        $spreadsheet->setActiveSheetIndex(0);
        $writeTemplate = IOFactory::createWriter($spreadsheet,'Xlsx');
        $response = new StreamedResponse(
            function () use ($writeTemplate){
                $writeTemplate->save('php://output');
            }
        );
        return $response;
    }

    public function template6(): StreamedResponse {
        $spreadsheet = new Spreadsheet();
        $spreadsheet->setActiveSheetIndex(0);
        $em = $this->em;
        $sheet1 = $spreadsheet->getActiveSheet();
        $sheet1->setCellValue('A1','รหัสจังหวัด');
        $sheet1->setCellValue('B1','ชื่อจังหวัด');
        $sheet1->setCellValue('C1', 'ปี');
        $sheet1->setCellValue('D1', 'สัดส่วนคนจน');
        $sheet1->setCellValue('E1', 'สัดส่วนประชากรจากการทะเบียน รวมวัยแรงงาน (15-59 ปี)');
        $sheet1->setCellValue('F1', 'สัดส่วนประชากรจากการทะเบียน รวมวัยสูงอายุ (60 ปีขึ้นไป)');
        $sheet1->setCellValue('G1', 'รวมรับแจ้งคดียาเสพติด');
        $sheet1->setCellValue('H1', 'รับแจ้งฐานความผิดพิเศษ');
        $sheet1->setCellValue('I1', 'จำนวนคนต่างด้าวที่ได้รับอนุญาตทำงาน');
        $sheet1->setCellValue('J1', 'จำนวนแพทย์');
        $sheet1->setTitle('poverty');

        $spreadsheet->createSheet();
        $spreadsheet->setActiveSheetIndex(1);
        $sheet2 = $spreadsheet->getActiveSheet();
        $provinces = $em->getRepository(Provinces::class)->findAll();
        $sheet2->setCellValue('A1','รหัสจังหวัด');
        $sheet2->setCellValue('B1','ชื่อจังหวัด');
        $i = 2;
        foreach ($provinces as $province){
            $sheet2->setCellValue('A'.$i,$province->getProvinceId());
            $sheet2->setCellValue('B'.$i,$province->getProvinceName());
            $i++;
        }
        $sheet2->getColumnDimension('A')->setAutoSize(true);
        $sheet2->getColumnDimension('B')->setAutoSize(true);
        $sheet2->setTitle('จังหวัด');

        $spreadsheet->setActiveSheetIndex(0);
        $writeTemplate = IOFactory::createWriter($spreadsheet,'Xlsx');
        $response = new StreamedResponse(
            function () use ($writeTemplate){
                $writeTemplate->save('php://output');
            }
        );
        return $response;
    }
}