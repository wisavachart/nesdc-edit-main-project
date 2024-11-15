<?php

namespace App\Repository;

use App\Entity\Coefficient;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Coefficient>
 *
 * @method Coefficient|null find($id, $lockMode = null, $lockVersion = null)
 * @method Coefficient|null findOneBy(array $criteria, array $orderBy = null)
 * @method Coefficient[]    findAll()
 * @method Coefficient[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class CoefficientRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Coefficient::class);
    }

//    /**
//     * @return Coefficient[] Returns an array of Coefficient objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('c')
//            ->andWhere('c.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('c.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?Coefficient
//    {
//        return $this->createQueryBuilder('c')
//            ->andWhere('c.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
