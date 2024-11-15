<?php

namespace App\Controller;

use App\Entity\Economic;
use App\Entity\Environment;
use App\Entity\Escape;
use App\Entity\Factors;
use App\Entity\Houses;
use App\Entity\HumanDeverlopment;
use App\Entity\Partnership;
use App\Entity\Peace;
use App\Entity\PoorPeople;
use App\Entity\Population;
use App\Entity\Provinces;
use App\Entity\Stability;
use App\Service\DownloadExcelTemplateServices;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class MasterDataController extends AbstractController
{
    #[Route('/api/master/factor', name: 'master-get-factor', methods: ['GET'])]
    public function MasterFactor(EntityManagerInterface $em): Response
    {
        $factor = $em->getRepository(Factors::class)->findBy(['subGroup' => null]);
        $factorArr = [];
        foreach ($factor as $ft) {
            $factorArr[$ft->getId()]['id'] = $ft->getId();
            $factorArr[$ft->getId()]['factorName'] = $ft->getFactorName();
            $factorArr[$ft->getId()]['factorNameEn'] = $ft->getFactorNameEng();
            $subFactor = $em->getRepository(Factors::class)->findBy(['subGroup' => $ft->getId()]);
            foreach ($subFactor as $sft) {
                $val = array(
                    'id' => $sft->getId(),
                    'factorName' => $sft->getFactorName(),
                    'factorNameEn' => $sft->getFactorNameEng(),
                );
                $factorArr[$ft->getId()]['subFactor'][] = $val;
            }
        }
        return new JsonResponse($factorArr);
    }

    #[Route('/api/master/get-data-graph', name: 'master-get-data-graph', methods: ['POST'])]
    public function PovertyRatioGetDataGraph(EntityManagerInterface $em, Request $rq,): Response
    {
        $provinceId = $rq->get('provinceId') ?: null;
        $graphNo = $rq->get('graphNo') ?: null;
        $developFactor = $rq->get('developFactor') ?: null;
        $developFactorId = $rq->get('developFactorId') ?: null;

        $dataset = [];
        $data = [];
        $values = null;
        $year = null;
        $typeOfGraph = null;
        if ($graphNo == 1 && $developFactor == 'population') {
            $typeOfGraph = 1;
            $year = $em->getRepository(Population::class)->getYear();
            $values = $em->getRepository(Population::class)->orderByProvince(null);
            if ($provinceId) {
                $province = $em->getRepository(Provinces::class)->findOneBy(['provinceId' => $provinceId]);
                if ($province) {
                    $values = $em->getRepository(Population::class)->orderByProvince($province);
                } else {
                    $values = null;
                }
            }
        }

        if ($graphNo == 1 && $developFactor == 'houses') {
            $typeOfGraph = 1;
            $year = $em->getRepository(Houses::class)->getYear();
            $values = $em->getRepository(Houses::class)->orderByProvince(null);
            if ($provinceId) {
                $province = $em->getRepository(Provinces::class)->findOneBy(['provinceId' => $provinceId]);
                if ($province) {
                    $values = $em->getRepository(Houses::class)->orderByProvince($province);
                } else {
                    $values = null;
                }
            }
        }

        if ($graphNo == 2 && ($developFactor == 'poorPeople' || $developFactor == 'gpp')) {
            $typeOfGraph = 1;
            $year = $em->getRepository(PoorPeople::class)->getYear();
            $values = $em->getRepository(PoorPeople::class)->orderByProvince(null);
            if ($provinceId) {
                $province = $em->getRepository(Provinces::class)->findOneBy(['provinceId' => $provinceId]);
                if ($province) {
                    $values = $em->getRepository(PoorPeople::class)->orderByProvince($province);
                } else {
                    $values = null;
                }
            }
        }

        $factor = null;
        if ($developFactorId) $factor = $em->getRepository(Factors::class)->find($developFactorId);

        if ($graphNo == 3 && $developFactor == 'humanDeverlopment') {
            $typeOfGraph = 2;
            $year = $em->getRepository(HumanDeverlopment::class)->getYear();
            $values = $em->getRepository(HumanDeverlopment::class)->orderByProvince(null, null);
            if ($factor) $values = $em->getRepository(HumanDeverlopment::class)->orderByProvince(null, $factor);
            if ($provinceId) {
                $province = $em->getRepository(Provinces::class)->findOneBy(['provinceId' => $provinceId]);
                if ($province) {
                    if ($factor) $values = $em->getRepository(HumanDeverlopment::class)->orderByProvince($province, $factor);
                    else $values = $em->getRepository(HumanDeverlopment::class)->orderByProvince($province, null);
                } else {
                    $values = null;
                }
            }
        }

        if ($graphNo == 3 && $developFactor == 'economic') {
            $typeOfGraph = 2;
            $year = $em->getRepository(Economic::class)->getYear();
            $values = $em->getRepository(Economic::class)->orderByProvince(null, null);
            if ($factor) $values = $em->getRepository(Economic::class)->orderByProvince(null, $factor);
            if ($provinceId) {
                $province = $em->getRepository(Provinces::class)->findOneBy(['provinceId' => $provinceId]);
                if ($province) {
                    if ($factor) $values = $em->getRepository(Economic::class)->orderByProvince($province, $factor);
                    else $values = $em->getRepository(Economic::class)->orderByProvince($province, null);
                } else {
                    $values = null;
                }
            }
        }

        if ($graphNo == 3 && $developFactor == 'environment') {
            $typeOfGraph = 2;
            $year = $em->getRepository(Environment::class)->getYear();
            $values = $em->getRepository(Environment::class)->orderByProvince(null, null);
            if ($factor) $values = $em->getRepository(Environment::class)->orderByProvince(null, $factor);
            if ($provinceId) {
                $province = $em->getRepository(Provinces::class)->findOneBy(['provinceId' => $provinceId]);
                if ($province) {
                    if ($factor) $values = $em->getRepository(Environment::class)->orderByProvince($province, $factor);
                    else $values = $em->getRepository(Environment::class)->orderByProvince($province, null);
                } else {
                    $values = null;
                }
            }
        }

        if ($graphNo == 3 && $developFactor == 'peace') {
            $typeOfGraph = 2;
            $year = $em->getRepository(Peace::class)->getYear();
            $values = $em->getRepository(Peace::class)->orderByProvince(null, null);
            if ($factor) $values = $em->getRepository(Peace::class)->orderByProvince(null, $factor);
            if ($provinceId) {
                $province = $em->getRepository(Provinces::class)->findOneBy(['provinceId' => $provinceId]);
                if ($province) {
                    if ($factor) $values = $em->getRepository(Peace::class)->orderByProvince($province, $factor);
                    else $values = $em->getRepository(Peace::class)->orderByProvince($province, null);
                } else {
                    $values = null;
                }
            }
        }

        if ($graphNo == 3 && $developFactor == 'partnership') {
            $typeOfGraph = 2;
            $year = $em->getRepository(Partnership::class)->getYear();
            $values = $em->getRepository(Partnership::class)->orderByProvince(null, null);
            if ($factor) $values = $em->getRepository(Partnership::class)->orderByProvince(null, $factor);
            if ($provinceId) {
                $province = $em->getRepository(Provinces::class)->findOneBy(['provinceId' => $provinceId]);
                if ($province) {
                    if ($factor) $values = $em->getRepository(Partnership::class)->orderByProvince($province, $factor);
                    else $values = $em->getRepository(Partnership::class)->orderByProvince($province, null);
                } else {
                    $values = null;
                }
            }
        }

        if ($values) {
            foreach ($values as $val) {
                if ($typeOfGraph == 1) {
                    if ($developFactor == 'gpp') {
                        $data[$val->getProvince()->getProvinceId()]['data'][] = $val->getGpp();
                    } else {
                        $data[$val->getProvince()->getProvinceId()]['data'][] = $val->getValue();
                    }
                    $data[$val->getProvince()->getProvinceId()]['label'] = $val->getProvince()->getProvinceName();
                    $data[$val->getProvince()->getProvinceId()]['color'] = $val->getProvince()->getProvinceName() == 'ประเทศ' ? '#F59656'
                        : ($val->getProvince()->getProvinceName() == 'เชียงราย' ? '#C9F723'
                            : ($val->getProvince()->getProvinceName() == 'ตราด' ? '#56ECF5'
                                : ($val->getProvince()->getProvinceName() == 'ตาก' ? '#EE65F5'
                                    : ($val->getProvince()->getProvinceName() == 'นครพนม' ? '#B534F7'
                                        : ($val->getProvince()->getProvinceName() == 'มุกดาหาร' ? '#71A0A3'
                                            : ($val->getProvince()->getProvinceName() == 'ระนอง' ? '#6C7A3B'
                                                : ($val->getProvince()->getProvinceName() == 'สงขลา' ? '#3230F5' : '')))))));
                    $data[$val->getProvince()->getProvinceId()]['id'] = $val->getProvince()->getProvinceId();
                }
                if ($typeOfGraph == 2) {
                    $data[$val->getFactor()->getId()][$val->getProvince()->getProvinceId()]['data'][] = $val->getValue();
                    $data[$val->getFactor()->getId()][$val->getProvince()->getProvinceId()]['label'] = $val->getProvince()->getProvinceName();
                    $data[$val->getFactor()->getId()][$val->getProvince()->getProvinceId()]['color'] = $val->getProvince()->getProvinceName() == 'ประเทศ' ? '#F59656'
                        : ($val->getProvince()->getProvinceName() == 'เชียงราย' ? '#C9F723'
                            : ($val->getProvince()->getProvinceName() == 'ตราด' ? '#56ECF5'
                                : ($val->getProvince()->getProvinceName() == 'ตาก' ? '#EE65F5'
                                    : ($val->getProvince()->getProvinceName() == 'นครพนม' ? '#B534F7'
                                        : ($val->getProvince()->getProvinceName() == 'มุกดาหาร' ? '#71A0A3'
                                            : ($val->getProvince()->getProvinceName() == 'ระนอง' ? '#6C7A3B'
                                                : ($val->getProvince()->getProvinceName() == 'สงขลา' ? '#3230F5' : '')))))));
                    $data[$val->getFactor()->getId()][$val->getProvince()->getProvinceId()]['id'] = $val->getProvince()->getProvinceId();
                    if (!isset($data[$val->getFactor()->getId()]['year']['year'])) $data[$val->getFactor()->getId()]['year']['year'] = [];
                    if (!is_numeric(array_search($val->getYear(), $data[$val->getFactor()->getId()]['year']['year'])))
                        $data[$val->getFactor()->getId()]['year']['year'][] = $val->getYear();
                }
            }
        }
        if ($typeOfGraph == 1) {
            $dataset['dataset'][0] = null;
            foreach ($data as $val) {
                if ($val['id'] != 999) {
                    $dataset['dataset'][] = $val;
                } else {
                    $dataset['dataset'][0] = $val;
                }
            }
            if ($dataset['dataset'][0] == null) {
                unset($dataset['dataset'][0]);
                $dataset['dataset'] = array_values($dataset['dataset']);
            }
            $label = [];
            foreach ($year as $val) {
                $label[] = $val['year'];
            }
            $dataset['label'] = $label;
            $dataset['graphNo'] = $graphNo;
            $dataset['developFactor'] = $developFactor;
        }

        $newDataSet = [];
        if ($typeOfGraph == 2) {
            foreach ($data as $key => $fac) {
                $dataset['dataset'] = [];
                $dataset['dataset'][0] = null;
                foreach ($fac as $keyV => $val) {
                    if ($keyV != 'year') {
                        if ($val['id'] != 999) {
                            $dataset['dataset'][] = $val;
                        } else {
                            $dataset['dataset'][0] = $val;
                        }
                        $dataset['graphNo'] = $graphNo;
                        $dataset['developFactor'] = $developFactor;
                    }
                    if ($keyV == 'year') $dataset['label'] = $val['year'];
                }
                if ($dataset['dataset'][0] == null) {
                    unset($dataset['dataset'][0]);
                    $dataset['dataset'] = array_values($dataset['dataset']);
                }
                $newDataSet[] = $dataset;
            }
        }
        return new JsonResponse($typeOfGraph == 2 ? $newDataSet : $dataset);
    }

    #[Route('/api/master/get-data-graph-10', name: 'master-get-data-graph-10', methods: ['POST'])]
    public function DataGraph10(EntityManagerInterface $em, Request $rq,): Response
    {
        $provinceId = $rq->get('provinceId') ?: null;
        $graphNo = $rq->get('graphNo') ?: null;
        $developFactor = $rq->get('developFactor') ?: null;
        $dataset = [];
        $values = null;
        $province = null;
        $factor = $em->getRepository(Factors::class)->find(66);
        if ($provinceId) {
            $province = $em->getRepository(Provinces::class)->findOneBy(['provinceId' => $provinceId]);
        }
        if ($province) {
            $values = $em->getRepository(Stability::class)->findBy(['province' => $province, 'isEnabled' => 1]);
            $values2 = $em->getRepository(Escape::class)->findBy(['province' => $province, 'isEnabled' => 1], ['value' => 'DESC']);
            $values3 = $em->getRepository(Escape::class)->findBy(['province' => $province, 'isEnabled' => 1, 'factor' => $factor], ['value' => 'ASC']);
        } else {
            $values = $em->getRepository(Stability::class)->findBy(['isEnabled' => 1]);
            $values2 = $em->getRepository(Escape::class)->findBy(['isEnabled' => 1]);
            $values3 = $em->getRepository(Escape::class)->findBy(['factor' => $factor, 'isEnabled' => 1], ['value' => 'ASC']);
        }
        foreach ($values as $val) {
            if (!isset($dataset['dataGraph10'][$val->getFactor()->getFactorNameEng()])) {
                $dataset['dataGraph10'][$val->getFactor()->getFactorNameEng()] = [];
            }

            $val1 = $val->getValue1() ?: 0;
            $val2 = $val->getValue2() ?: 0;
            $val3 = $val->getValue3() ?: 0;
            $val4 = $val->getValue4() ?: 0;
            $val5 = $val->getValue5() ?: 0;

            $sum = $val1 + $val2 + $val3 + $val4 + $val5;

            $dataset['dataGraph10'][$val->getFactor()->getFactorNameEng()]['dataSet'][] = [
                'graph10Data1' => round(($val1 / $sum) * 100, 2),
                'graph10Data2' => round(($val2 / $sum) * 100, 2),
                'graph10Data3' => round(($val3 / $sum) * 100, 2),
                'graph10Data4' => round(($val4 / $sum) * 100, 2),
                'graph10Data5' => round(($val5 / $sum) * 100, 2),
                'levelData' => wordwrap($val->getSubFactor()->getFactorName(),'20','
', false),
//                'levelData' => [implode('
//', $this->getMBStrSplit($val->getSubFactor()->getFactorName(), 20))],
                'levelData2' => $val->getSubFactor()->getFactorNameEng(),
            ];
        }

        $sumAnswer = 0;
        $have = 0;
        $notHave = 0;
        foreach ($values2 as $val2) {
            if ($val2->getFactor()->getId() == 64) {
                $sumAnswer = $sumAnswer + $val2->getValue() ?: 0;
                if ($val2->isHave()) {
                    $have = $have + $val2->getValue() ;
                    $dataset['dataGraph11']['graph11_1']['data1'][] = [
                        'label' => $val2->getSubFactor()?->getFactorName().' (คน) ',
                        'value' => $val2->getValue(),
                        'year' => $val2->getYear(),
                        'have' =>'มี',
                        'color' => $val2->getSubFactor()?->getFactorName() == 'ประถมศึกษา' ? '#efe9e2'
                            : ($val2->getSubFactor()?->getFactorName() == 'มัธยมศึกษาตอนต้น' ? '#ff6600'
                                : ($val2->getSubFactor()?->getFactorName() == 'มัธยมศึกษาตอนปลาย' ? '#8c99aa' : ''))
                    ];
                }else{
                    $notHave = $notHave + $val2->getValue() ;
                }
            } elseif ($val2->getFactor()->getId() == 65) {
                $dataset['dataGraph11']['graph11_1']['data2'][] = [
                    'label' => 'ได้ (คน) ',
                    'value' => $val2->getYes(),
                    'year' => $val2->getYear(),
                    'color' => '#1c537a'
                ];
                $dataset['dataGraph11']['graph11_1']['data2'][] = [
                    'label' => 'ไม่ได้ (คน) ',
                    'value' => $val2->getNo(),
                    'year' => $val2->getYear(),
                    'color' => '#ff6600'
                ];
            }
        }
        $sumTable = [
            'have' => $have,
            'perHave' => round(($have/($have+$notHave))*100,2),
            'notHave' => $notHave,
            'perNotHave' => round(($notHave/($have+$notHave))*100,2),
            'sum' => $have+$notHave,
        ];
        foreach ($values3 as $val3) {
            if ($val3->getFactor()->getId() == 66) {
                $dataset['dataGraph11']['graph11_2']['dataSet'][] = [
                    'graph11_2Data' => $val3->getValue() ? 6 - $val3->getValue() : 6,
                    'graph11_2LevelData' => $val3->getSubFactor()?->getFactorName(),
                ];
            }
        }
        $province = $em->getRepository(Provinces::class)->findOneBy(['provinceId' => $provinceId]);
        $provinceArr[] = array(
            'provinceId' => $province->getProvinceId(),
            'provinceName' => $province->getProvinceName() . ' (ข้อมูลสำรวจ ' . $sumAnswer . ' คน)',
            'd' => $province->getD(),
        );
        $dataset['province'] = $provinceArr;
        $dataset['sumTable'] = $sumTable;
        return new JsonResponse($dataset);
    }

    #[Route('/api/master/get-data-graph-11-province', name: 'master-get-data-graph-11-province', methods: ['POST'])]
    public function DataGraph11ProvinceAndCal(EntityManagerInterface $em, Request $rq,): Response
    {
        $provinceId = $rq->get('provinceId') ?: null;
        $year = $rq->get('year') ?: null;

        $dataset = [];
        $province = null;
        $factor = $em->getRepository(Factors::class)->find(64);
        if ($provinceId) $province = $em->getRepository(Provinces::class)->findOneBy(['provinceId' => $provinceId]);
        if ($province) {
            $values = $em->getRepository(Escape::class)->findBy(['province' => $province, 'factor' => $factor, 'isEnabled' => 1], ['value' => 'DESC']);
            if ($year) $values = $em->getRepository(Escape::class)
                ->findBy([
                    'province' => $province,
                    'factor' => $factor,
                    'year' => $year,
                    'isEnabled' => 1], ['value' => 'DESC']);
        } else {
            $values = $em->getRepository(Escape::class)->findBy(['factor' => $factor,'isEnabled' => 1]);
            if ($year) $em->getRepository(Escape::class)
                ->findBy([
                    'factor' => $factor,
                    'year' => $year,
                    'isEnabled' => 1]);
        }
        $prepareProvince = [];
        foreach ($values as $val) {
            //dd($val);
            $prepareProvince[$val->getProvince()->getId()] = [
                'provinceId' => $val->getProvince()->getProvinceId(),
                'provinceName' => $val->getProvince()->getProvinceName(),
                'value' => !isset($prepareProvince[$val->getProvince()->getId()]['value']) ? $val->getValue() : $prepareProvince[$val->getProvince()->getId()]['value'] + $val->getValue() ,
                'd' => $val->getProvince()->getD() ? 1 : 0,
            ];
        }
        $province = [];
        foreach ($prepareProvince as $val){
            $province[] = [
                'provinceId' => $val['provinceId'],
                'provinceName' => $val['provinceName'].' (ข้อมูลสำรวจ '.$val['value'].' คน)',
                'd' => $val['d'],
            ];
        }
        return new JsonResponse($province);
    }

    private function utf8_wordwrap($string, $width=75, $break="\n", $cut=false)
    {
        if($cut) {
            // Match anything 1 to $width chars long followed by whitespace or EOS,
            // otherwise match anything $width chars long
            $search = '/(.{1,'.$width.'})(?:\s|$)|(.{'.$width.'})/uS';
            $replace = '$1$2'.$break;
        } else {
            // Anchor the beginning of the pattern with a lookahead
            // to avoid crazy backtracking when words are longer than $width
            $search = '/(?=\s)(.{1,'.$width.'})(?:\s|$)/uS';
            $replace = '$1'.$break;
        }
        return preg_replace($search, $replace, $string);
    }

    private function getMBStrSplit($string, $split_length = 1)
    {
        mb_internal_encoding('UTF-8');
        mb_regex_encoding('UTF-8');

        $split_length = ($split_length <= 0) ? 1 : $split_length;
        $mb_strlen = mb_strlen($string, 'utf-8');
        $array = array();
        $i = 0;

        while ($i < $mb_strlen) {
            $array[] = mb_substr($string, $i, $split_length);
            $i = $i + $split_length;
        }

        return $array;
    }

//    #[Route('/api/master/get-data-graph-11', name: 'master-get-data-graph-11', methods: ['POST'])]
//    public function DataGraph11(EntityManagerInterface $em, Request $rq,): Response
//    {
//        $provinceId = $rq->get('provinceId') ?: null;
////        $graphNo = $rq->get('graphNo') ?: null;
////        $developFactor = $rq->get('developFactor') ?: null;
////        $values = null;
//
//        $dataset = [];
//        $province = null;
//        if ($provinceId) $province = $em->getRepository(Provinces::class)->findOneBy(['provinceId' => $provinceId]);
//        if ($province) {
//            $escape = $em->getRepository(Escape::class)->findBy(['province' => $province],['value' => 'DESC']);
//            foreach ($escape as $es) {
//                if (!isset($dataset[$es->getFactor()->getId()])) $dataset[$es->getFactor()->getId()] = [];
//                if ($es->getFactor()->getId() == 64) {
//                    $dataset[$es->getFactor()->getId()]['data'][] = [
//                        'label' => $es->getSubFactor()?->getFactorName(),
//                        'year' => $es->getYear(),
//                        'value' => $es->getValue(),
//                        'have' => $es->isHave() ? 'มี' : 'ไม่มี',
//                    ];
//                } elseif ($es->getFactor()->getId() == 65) {
//                    $dataset[$es->getFactor()->getId()]['data'][] = [
//                        'year' => $es->getYear(),
//                        'yes' => $es->getYes(),
//                        'no' => $es->getNo(),
//                    ];
//
//                }
//            }
//            $factor = $em->getRepository(Factors::class)->find(66);
//            $escape2 = $em->getRepository(Escape::class)->findBy(['province' => $province,'factor' => $factor],['value' => 'ASC']);
//            foreach ($escape2 as $es2) {
//                if (!isset($dataset[$es2->getFactor()->getId()])) $dataset[$es2->getFactor()->getId()] = [];
//                if ($es2->getFactor()->getId() == 66) {
//                    $dataset[$es2->getFactor()->getId()]['data'][] = [
//                        'factor' => $es2->getSubFactor()?->getFactorName(),
//                        'value' => $es2->getValue() ? 6 - $es2->getValue() : 6,
//                    ];
//                }
//            }
//        }
//
//        return new JsonResponse($dataset);
//    }


    #[Route('/api/master/get-provinces', name: 'master_get_provinces')]
    public function GetProvinces(EntityManagerInterface $em): Response
    {
        $provinces = $em->getRepository(Provinces::class)->findAll();
        $provinceArr = [];
        $provinceArr[] = array(
            'provinceId' => 0,
            'provinceName' => "ทั้งหมด",
            'd' => 0,
        );
        foreach ($provinces as $province) {
            $provinceArr[] = array(
                'provinceId' => $province->getProvinceId(),
                'provinceName' => $province->getProvinceName(),
                'd' => $province->getD() ? 1 : 0,
            );
        }

        return new JsonResponse([
            'province' => $provinceArr
        ]);
    }

    #[Route('/api/master/get-provinces-by-d', name: 'master_get_provinces_by_d')]
    public function GetProvincesByD(EntityManagerInterface $em): Response
    {
        $provinces = $em->getRepository(Provinces::class)->findBy(['d' => 1], ['provinceName' => 'ASC']);
        $provinceArr = [];
        $provinceArr2 = [];
        $provinceArr[] = array(
            'provinceId' => 0,
            'provinceName' => "ทั้งหมด",
            'd' => 0,
            'color' => ''
        );
        foreach ($provinces as $province) {
            if ($province->getProvinceName() == 'ประเทศ') {
                $provinceArr[] = array(
                    'provinceId' => $province->getProvinceId(),
                    'provinceName' => $province->getProvinceName(),
                    'd' => $province->getD(),
                    'color' => '#F59656'
                );
            } else {
                $provinceArr2[] = array(
                    'provinceId' => $province->getProvinceId(),
                    'provinceName' => $province->getProvinceName(),
                    'd' => $province->getD(),
                    'color' => $province->getProvinceName() == 'เชียงราย' ? '#C9F723'
                        : ($province->getProvinceName() == 'ตราด' ? '#56ECF5'
                            : ($province->getProvinceName() == 'ตาก' ? '#EE65F5'
                                : ($province->getProvinceName() == 'นครพนม' ? '#B534F7'
                                    : ($province->getProvinceName() == 'มุกดาหาร' ? '#71A0A3'
                                        : ($province->getProvinceName() == 'ระนอง' ? '#6C7A3B'
                                            : ($province->getProvinceName() == 'สงขลา' ? '#3230F5' : ''))))))
                );
            }
        }
        foreach ($provinceArr2 as $val) {
            $provinceArr[] = $val;
        }
        return new JsonResponse([
            'province' => $provinceArr
        ]);
    }

    #[Route('/api/master/download-template', name: 'master_download_template', methods: ['GET'])]
    public function DownloadTemplate(Request $request, DownloadExcelTemplateServices $excelTemplateServices): Response
    {
        ini_set('memory_limit', '-1');
        date_default_timezone_set('Asia/Bangkok');

        $template = $request->query->get('template');
        $response = '';

        if ($template == 'population' || $template == 'houses') {
            $response = $excelTemplateServices->template($template);
        } elseif ($template == 'poverty') {
            $response = $excelTemplateServices->template6();
        } elseif ($template == 'poorPeople') {
            $response = $excelTemplateServices->template2();
        } elseif (
            $template == 'humanDevelopment' ||
            $template == 'economic' ||
            $template == 'environment' ||
            $template == 'peace' ||
            $template == 'partnership'
        ) {
            $response = $excelTemplateServices->template3($template);
        } elseif ($template == 'stability') {
            $response = $excelTemplateServices->template5($template);
        } elseif ($template == 'escape1' || $template == 'escape2' || $template == 'escapeOrder') {
            $response = $excelTemplateServices->template4($template);
        }

        if ($response) {
            $response->headers->set('Content-Type', 'application/vnd.ms-excel');
            $response->headers->set('Content-Disposition', 'attachment;filename="truck_inspection.xlsx"');
            $response->headers->set('Cache-Control', 'max-age=0');
        }
        return $response;
    }
}