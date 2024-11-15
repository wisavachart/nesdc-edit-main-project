<?php

namespace App\Repository;

use App\Entity\Factors;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Factors>
 *
 * @method Factors|null find($id, $lockMode = null, $lockVersion = null)
 * @method Factors|null findOneBy(array $criteria, array $orderBy = null)
 * @method Factors[]    findAll()
 * @method Factors[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class FactorsRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Factors::class);
    }

//    /**
//     * @return Factors[] Returns an array of Factors objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('f')
//            ->andWhere('f.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('f.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?Factors
//    {
//        return $this->createQueryBuilder('f')
//            ->andWhere('f.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
