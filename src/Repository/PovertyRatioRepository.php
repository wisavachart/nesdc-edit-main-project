<?php

namespace App\Repository;

use App\Entity\PovertyRatio;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<PovertyRatio>
 *
 * @method PovertyRatio|null find($id, $lockMode = null, $lockVersion = null)
 * @method PovertyRatio|null findOneBy(array $criteria, array $orderBy = null)
 * @method PovertyRatio[]    findAll()
 * @method PovertyRatio[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class PovertyRatioRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, PovertyRatio::class);
    }

    /**
     * @return PovertyRatio[]
    */
    public function filterData($provinceId, $province, $yearFrom, $d) : array {

        $query = $this->createQueryBuilder('p');
        $query->select('p');

        if ($provinceId){
            $query->andWhere('p.province_id = :provinceId')
                ->setParameter('provinceId',$provinceId);
        }
        if ($province){
            $query->andWhere('p.province = :province')
                ->setParameter('province',$province);
        }
        if ($yearFrom){
            $query->andWhere('p.year = :yearFrom')
                ->setParameter('yearFrom',$yearFrom);
            /*$query->andWhere('p.year <= :yearTo')
                ->setParameter('yearTo',$yearTo);*/
        }
        if ($d){
            $query->andWhere('p.d = :d')
                ->setParameter('d',$d);
        }

        return $query->orderBy('p.province_id','ASC')
            ->getQuery()
            ->getResult();
    }

    public function getProvince() : array {
//        $arrPro = ['ตาก','เชียงราย','มุกดาหาร','นครพนม','ตราด','ระนอง','สงขลา'];
        $query = $this->createQueryBuilder('p')
//            ->andWhere('p.d = 1')
//            ->andWhere('p.province IN (:arrPro)')
//            ->setParameter('arrPro',$arrPro)
            ->select('p.province_id, p.province, p.d')
            ->groupBy('p.province_id')
            ->addGroupBy('p.province')
            ->addGroupBy('p.d');

        return $query->orderBy('p.province','ASC')
            ->getQuery()
            ->getResult();
    }

    public function getYear() : array {
        $query = $this->createQueryBuilder('p')
            ->select('p.year')
            ->groupBy('p.year');

        return $query->orderBy('p.year','ASC')
            ->getQuery()
            ->getResult();
    }

    /**
     * @return PovertyRatio[]
     */
    public function getBarGraph(?int $provinceId,
                                string $year,
                                string $toYear,
                                ?int $x1,
                                ?int $x2,
                                ?int $x3,
                                ?int $x4,
                                ?int $x5,
                                ?int $x6 ) : array {

        $query = $this->createQueryBuilder('p')
            ->andWhere('p.d = 1')
            ->andWhere('p.province_id = :provinceId')
            ->setParameter('provinceId',$provinceId)
            ->andWhere('p.year >= :year')
            ->setParameter('year',$year)
            ->andWhere('p.year <= :yearTo')
            ->setParameter('yearTo',$toYear);

        $query->select('p.year,p.y');

        if ($x1) $query->addSelect('p.x1');
        if ($x2) $query->addSelect('p.x2');
        if ($x3) $query->addSelect('p.x3');
        if ($x4) $query->addSelect('p.x4');
        if ($x5) $query->addSelect('p.x5');
        if ($x6) $query->addSelect('p.x6');

        return $query->orderBy('p.year','ASC')
            ->getQuery()
            ->getResult();
    }

    public function search(?int $provinceId,?string $year,?string $toYear,?int $d) : array {
        $query = $this->createQueryBuilder('p');

        if ($provinceId) {
            $query->andWhere('p.province_id = :provinceId')
                ->setParameter('provinceId', $provinceId);
        }
        if ($year) {
            $query->andWhere('p.year >= :year')
                ->setParameter('year', $year);
            $query->andWhere('p.year <= :yearTo')
                ->setParameter('yearTo', $toYear);
        }
        if ($d){
            $query->andWhere('p.d = :d')
                ->setParameter('d',$d);
        }

        return $query->orderBy('p.year','ASC')
            ->getQuery()
            ->getResult();
    }

//    /**
//     * @return PovertyRatio[] Returns an array of PovertyRatio objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('p')
//            ->andWhere('p.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('p.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?PovertyRatio
//    {
//        return $this->createQueryBuilder('p')
//            ->andWhere('p.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
