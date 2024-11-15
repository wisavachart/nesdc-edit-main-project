<?php

namespace App\Repository;

use App\Entity\Escape;
use App\Entity\Factors;
use App\Entity\Provinces;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Escape>
 *
 * @method Escape|null find($id, $lockMode = null, $lockVersion = null)
 * @method Escape|null findOneBy(array $criteria, array $orderBy = null)
 * @method Escape[]    findAll()
 * @method Escape[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class EscapeRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Escape::class);
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
     * @return Escape[]
     */
    public function findByCondition(?Factors $factor, ?Factors $subFactor, ?Provinces $provinces, ?string $year): array
    {
        $query = $this->createQueryBuilder('p');
        if ($factor){
            $query->andWhere('p.factor = :factor')
                ->setParameter('factor',$factor);
        }
        if ($subFactor){
            $query->andWhere('p.subFactor = :subFactor')
                ->setParameter('subFactor',$subFactor);
        }
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

//    /**
//     * @return Escape[] Returns an array of Escape objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('e')
//            ->andWhere('e.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('e.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?Escape
//    {
//        return $this->createQueryBuilder('e')
//            ->andWhere('e.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
