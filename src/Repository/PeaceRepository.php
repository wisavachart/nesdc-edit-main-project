<?php

namespace App\Repository;

use App\Entity\Factors;
use App\Entity\Peace;
use App\Entity\Provinces;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Peace>
 *
 * @method Peace|null find($id, $lockMode = null, $lockVersion = null)
 * @method Peace|null findOneBy(array $criteria, array $orderBy = null)
 * @method Peace[]    findAll()
 * @method Peace[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class PeaceRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Peace::class);
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
     * @return Peace[]
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
     * @return Peace[]
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
//     * @return Peace[] Returns an array of Peace objects
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

//    public function findOneBySomeField($value): ?Peace
//    {
//        return $this->createQueryBuilder('p')
//            ->andWhere('p.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
