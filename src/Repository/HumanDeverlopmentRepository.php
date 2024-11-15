<?php

namespace App\Repository;

use App\Entity\Factors;
use App\Entity\HumanDeverlopment;
use App\Entity\Provinces;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<HumanDeverlopment>
 *
 * @method HumanDeverlopment|null find($id, $lockMode = null, $lockVersion = null)
 * @method HumanDeverlopment|null findOneBy(array $criteria, array $orderBy = null)
 * @method HumanDeverlopment[]    findAll()
 * @method HumanDeverlopment[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class HumanDeverlopmentRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, HumanDeverlopment::class);
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
     * @return Provinces[]
     */
    public function getProvincesByEn() : array {
        $query = $this->createQueryBuilder('p')
            ->leftJoin('p.province', 'c')
            ->select('c.provinceId, c.provinceName, c.d')
            ->groupBy('c.provinceId, c.provinceName, c.d');

        return $query->getQuery()
            ->getResult();
    }

    /**
     * @return HumanDeverlopment[]
     */
    public function findByProvinceAndYear(?Provinces $provinces, ?string $year): array
    {
        $query = $this->createQueryBuilder('p');
        if ($provinces){
            $query->andWhere('p.province = :province')
                ->setParameter('province',$provinces);
        }
        if ($year){
            $query->andWhere('p.year = :year')
                ->setParameter('year',$year);
        }
        return $query->getQuery()->getResult();
    }

    /**
     * @return HumanDeverlopment[]
     */
    public function orderByProvince(?Provinces $provinces, ?Factors $factor): array
    {
        $query = $this->createQueryBuilder('p')
            ->leftJoin('p.province','c');
        if ($provinces){
            $query->andWhere('p.province = :province')
                ->setParameter('province',$provinces);
        }
        if ($factor) {
            $query->andWhere('p.factor = :factor')
                ->setParameter('factor',$factor);
        }
        return $query
            ->andWhere('p.isEnabled = :isEnabled')
            ->setParameter('isEnabled',1)
            ->orderBy('c.provinceName', 'ASC')
            ->addOrderBy('p.year','ASC')
            ->getQuery()
            ->getResult();
    }

//    /**
//     * @return HumanDeverlopment[] Returns an array of HumanDeverlopment objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('h')
//            ->andWhere('h.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('h.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?HumanDeverlopment
//    {
//        return $this->createQueryBuilder('h')
//            ->andWhere('h.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
